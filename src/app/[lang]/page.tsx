"use client";

import Footer from "@/components/footer";
import Home from "@/components/home";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Index() {
  const t = useTranslations("Index");
  // const [oreoList, setOreoList] = useState<OreoKey[]>([]);

  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (animating) {
      timer = setTimeout(() => {
        setAnimating(false);
      }, 1000); // trigger bounce out animation after 1s
    } else {
      // one of the way to hide loading after bounce out
      timer = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms is the duration of the animation
    }
    return () => clearTimeout(timer);
  }, [animating]);

  // const handleSubmit = (newList: OreoKey[]) => {};

  return (
    <div className="container">
      {loading && (
        <div
          className={`transition-all transform ${
            animating ? `animate-bounce-in` : `animate-bounce-out`
          }`}
        >
          <Loading />
        </div>
      )}
      {!loading && (
        <>
          <Home />
          <Footer />
        </>
      )}
    </div>
  );
}
