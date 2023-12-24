import { useEffect, useState } from "react";

const usePage = () => {
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    // trigger bounce out animation, and stop loading after 1.5s
    if (animating) {
      timer = setTimeout(() => {
        setAnimating(false);
      }, 1000);
    }
    if (!animating) {
      // one of the way to hide loading after bounce out
      timer = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms is the duration of the animation
    }
    return () => clearTimeout(timer);
  }, [animating]);

  const addLoading = () => {
    setLoading(true);
    setAnimating(true);
  };

  return {
    loading,
    animating,
    addLoading,
  };
};

export default usePage;
