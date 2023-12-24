"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { useState } from "react";
import usePage from "./hook/usePage";
import Input from "./ui/input";
import Output from "./ui/output";

export default function Page() {
  const { loading, animating, ...page } = usePage();
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);
  const show = oreoList.length === 0;

  const submit = (oreoList: OreoKey[]) => {
    setOreoList(oreoList);
  };

  const back = () => {
    setOreoList([]);
  };

  return (
    <div className="app">
      <Loading show={loading} animate={animating} />
      <main className={`main ${loading ? "hidden" : "block"}`}>
        <Input submit={submit} show={show} />
        <Output back={back} oreoList={oreoList} />
        <Footer />
      </main>
    </div>
  );
}
