import { useState } from "react";
import Form from "./form";
import Output from "./output";

export default function Container({ show = false }: { show?: boolean }) {
  const [oreoList, setOreoList] = useState<OreoKey[]>(["o", "r", "-"]);

  const submit = (oreoList: OreoKey[]) => {
    setOreoList(oreoList);
  };

  const back = () => {
    setOreoList([]);
  };

  return (
    <main className={`main ${show ? `block` : `hidden`}`}>
      <Form submit={submit} />
      <Output back={back} oreoList={oreoList} />
    </main>
  );
}
