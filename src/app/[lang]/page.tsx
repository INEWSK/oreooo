"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { useState } from "react";
import usePage from "./hook/usePage";
import Input from "./ui/input";
import Output from "./ui/output";

export default function Page() {
  const { loading, animating, ...page } = usePage();
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);

  const submit = (oreoList: OreoKey[]) => {
    page.addLoading();
    setOreoList(oreoList);
  };

  const back = () => {
    setOreoList([]);
  };

  return (
    <div className="app">
      <Loading show={loading} animate={animating} />
      <main className={cn("main", loading && "hidden")}>
        <Input submit={submit} show={!oreoList.length} />
        <Output back={back} oreoList={oreoList} />
        <Footer />
      </main>
    </div>
  );
}
