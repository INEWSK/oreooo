import { useEffect, useRef } from "react";

type KeyBinding = {
  keys: string[];
  action: () => void;
};

const useKeyBindings = (bindings: KeyBinding[], enabled = true) => {
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  useEffect(() => {
    if (!enabled) return;

    const onKeyStroke = (e: KeyboardEvent) => {
      const binding = bindingsRef.current.find((item) =>
        item.keys.includes(e.key)
      );
      if (!binding) return;

      e.preventDefault();
      binding.action();
    };

    document.addEventListener("keydown", onKeyStroke);
    return () => document.removeEventListener("keydown", onKeyStroke);
  }, [enabled]);
};

export default useKeyBindings;
