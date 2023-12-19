import { useEffect } from "react";

const useKeyBindings = (bindings: { [key: string]: () => void }) => {
  useEffect(() => {
    const onKeyStroke = (e: KeyboardEvent) => {
      const action = bindings[e.key];
      if (action) {
        action();
      }
    };

    document.addEventListener("keydown", onKeyStroke);
    // before unmount or add new bindings, remove old bindings
    return () => document.removeEventListener("keydown", onKeyStroke);
  }, [bindings]);
};

export default useKeyBindings;
