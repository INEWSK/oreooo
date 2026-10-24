"use client";

import Footer from "@/components/footer";
import Input from "@/components/input";
import Loading from "@/components/loading";
import Output from "@/components/output";
import { usePage } from "@/hooks/use-page";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function OreoApp() {
  const { loading, animating, addLoading } = usePage();
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);

  const submit = (next: OreoKey[]) => {
    addLoading();
    setOreoList(next);
  };

  return (
    <div className="app">
      <Loading show={loading} animate={animating} />
      <main className={cn("main", loading && "hidden")}>
        <Input submit={submit} show={!oreoList.length} />
        <Output back={() => setOreoList([])} oreoList={oreoList} />
        <Footer />
      </main>
    </div>
  );
}
