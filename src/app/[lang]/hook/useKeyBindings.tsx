import { useEffect } from "react";

const useKeyBindings = (bindings: { keys: string[]; action: () => void }[]) => {
  useEffect(() => {
    const onKeyStroke = (e: KeyboardEvent) => {
      bindings.forEach((binding) => {
        if (binding.keys.includes(e.key)) {
          binding.action && binding.action();
        }
      });
    };

    document.addEventListener("keydown", onKeyStroke);
    // before unmount or add new bindings, remove old bindings
    return () => document.removeEventListener("keydown", onKeyStroke);
  }, [bindings]);
};

export default useKeyBindings;
