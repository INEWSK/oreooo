import Result from "./result";

export default function Container({ show = false }: { show?: boolean }) {
  const result: OreoKey[] = [];

  const submit = (oreoList: OreoKey[]) => {};

  const back = () => {};

  return (
    <main className={`main ${show ? `block` : `hidden`}`}>
      {/* <Form submit={submit} /> */}
      <Result back={back} result={result} />
    </main>
  );
}
