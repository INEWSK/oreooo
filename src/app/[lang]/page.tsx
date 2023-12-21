"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import usePage from "./hook/usePage";
import Container from "./ui/container";

export default function Page() {
  const { loading, animating, ...page } = usePage();

  const render = () => {
    return (
      <>
        <Loading show={loading} animate={animating} />
        <Container show={!loading} />
        <Footer show={!loading} />
      </>
    );
  };

  return <div className="app">{render()}</div>;
}
