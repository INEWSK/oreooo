# OREOOO!

Build an Oreo-style word stack and save it as a PNG.

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo

- Live demo: [https://oreooo.inewsk.me](https://oreooo.inewsk.me)
- This repo builds a **static export** (`output: "export"`) for GitHub Pages.

## Keyboard shortcuts

| Key           | Action            |
| ------------- | ----------------- |
| `o` / `r`     | Input "O" or "RE" |
| `-` / `Space` | Input separator   |
| `Enter`       | Generate          |
| `Backspace`   | Delete last       |

## Static build / GitHub Pages

```bash
# local static build (no basePath)
yarn build
# output in ./out

# GitHub project pages style base path
BASE_PATH=/oreooo yarn build
```

Deploy workflow: `.github/workflows/deploy.yml`  
After enabling **Settings → Pages → GitHub Actions**, pushes to `main` publish `./out`.

- Default `BASE_PATH` is `/oreooo` (project site URL).
- For a custom domain at the site root, set `BASE_PATH` to an empty string in the workflow env.

## Contributing

UI copy lives in `messages/*.json` (`en`, `zh-hant`, `ja`).  
If new glyphs are needed, place the full font at `src/shared/fonts/Naikai.source.woff2` and run `yarn font:subset`.

## License

MIT — see [LICENSE](./LICENSE)

## Acknowledgments

[ddiu8081/oreooo](https://github.com/ddiu8081/oreooo/)
