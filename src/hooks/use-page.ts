import { useEffect, useState } from "react";

export function usePage() {
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (animating) {
      timer = setTimeout(() => setAnimating(false), 1000);
    } else {
      timer = setTimeout(() => setLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [animating]);

  const addLoading = () => {
    setLoading(true);
    setAnimating(true);
  };

  return { loading, animating, addLoading };
}
