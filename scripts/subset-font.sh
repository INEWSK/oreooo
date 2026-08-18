#!/usr/bin/env bash
# Rebuild the subset Naikai font from message packs + UI chrome strings.
# Place the full font at src/shared/fonts/Naikai.source.woff2 (gitignored), then:
#   ./scripts/subset-font.sh
# Requires: pip install fonttools brotli
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="${HOME}/.local/bin:${PATH}"

SOURCE="$ROOT/src/shared/fonts/Naikai.source.woff2"
OUT="$ROOT/src/shared/fonts/Naikai.woff2"
CHARS_FILE="$ROOT/scripts/font-chars.txt"

if [[ ! -f "$SOURCE" ]]; then
  echo "Missing $SOURCE"
  echo "Restore the full font (e.g. from git history) before re-subsetting."
  exit 1
fi

ROOT="$ROOT" python3 <<'PY'
import json, os, pathlib, re

root = pathlib.Path(os.environ["ROOT"])
chars = set("OREOOO Github Blog Kurokawa Yuji / | - + … · 0123456789")
chars.update("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
chars.update("':,.!?()[]{}<>\"“”‘’—–_&@#%*= \n\t")

for path in (root / "messages").glob("*.json"):
    data = json.loads(path.read_text(encoding="utf-8"))

    def walk(value):
        if isinstance(value, dict):
            for item in value.values():
                walk(item)
        elif isinstance(value, list):
            for item in value:
                walk(item)
        elif isinstance(value, str):
            chars.update(re.sub(r"\{[^}]+\}", "", value))

    walk(data)

text = "".join(sorted(chars))
(root / "scripts/font-chars.txt").write_text(text, encoding="utf-8")
print(f"unique chars: {len(chars)}")
PY

pyftsubset "$SOURCE" \
  --text-file="$CHARS_FILE" \
  --flavor=woff2 \
  --layout-features='*' \
  --notdef-glyph \
  --notdef-outline \
  --recommended-glyphs \
  --name-IDs='*' \
  --name-legacy \
  --name-languages='*' \
  --output-file="$OUT"

ls -lh "$OUT"
