"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Container from "../ui/container";
import usePage from "./page.hook";

export default function Page() {
  const { loading, animating, ...page } = usePage();

  const onSubmit = () => {
    page.addLoading();
  };

  const onReset = () => {};

  return (
    <div className="app">
      <Loading show={loading} animate={animating} />
      {!loading && (
        <>
          <Container onReset={onReset} onSubmit={onSubmit} />
          <Footer />
        </>
      )}
    </div>
  );
}
