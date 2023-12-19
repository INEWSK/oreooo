"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import usePage from "./hook/usePage";
import Container from "./ui/container";

export default function Page() {
  const { loading, animating, ...page } = usePage();

  const onSubmit = () => {
    page.addLoading();
  };

  const onReset = () => {};

  const render = () => {
    if (loading) {
      return <Loading show={loading} animate={animating} />;
    }

    if (!loading) {
      return (
        <>
          <Container onReset={onReset} onSubmit={onSubmit} />
          <Footer />
        </>
      );
    }
  };

  return <div className="app">{render()}</div>;
}
