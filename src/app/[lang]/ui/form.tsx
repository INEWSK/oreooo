import { useMemo, useState } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import useKeyBindings from "../hook/useKeyBindings";

const OreoKey = ["O", "R", "and", "-1"];

export default function Form({
  submit,
}: {
  submit: (oreoList: OreoKey[]) => void;
}) {
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);
  const bindings = useMemo(
    () => ({
      Enter: () => submit(oreoList),
      o: () => setOreoList([...oreoList, "o"]),
      r: () => setOreoList([...oreoList, "r"]),
      "-": () =>
        oreoList.length > 0 && oreoList[oreoList.length - 1] !== "-"
          ? setOreoList([...oreoList, "-"])
          : null,
      Backspace: () =>
        oreoList.length > 0 && setOreoList(oreoList.slice(0, -1)),
    }),
    [oreoList, submit]
  );

  useKeyBindings(bindings);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;

    switch (value) {
      case "O":
        setOreoList((prev) => [...prev, "o"]);
        break;
      case "R":
        setOreoList((prev) => [...prev, "r"]);
        break;
      case "and":
        setOreoList((prev) => {
          return prev.length > 0 && prev[prev.length - 1] !== "-"
            ? [...prev, "-"]
            : prev;
        });
        break;
      case "-1":
        setOreoList((prev) => prev.slice(0, -1));
        break;
      default:
        break;
    }
  };

  const trailing = (
    <span
      className="trailing"
      onClick={() =>
        oreoList.length > 0 ? setOreoList([]) : setOreoList(["o", "r"])
      }
    >
      {oreoList.length === 0 ? (
        <FaRandom className="random" />
      ) : (
        <FaTimes className="remove" />
      )}
    </span>
  );

  return (
    <>
      <div className="card form">
        <label className="title">{`I would like: `}</label>
        <div className="input-box">
          <input
            type="text"
            id="oreo-input"
            placeholder="Oreo..."
            value={oreoList.join("")}
            readOnly
          />
          {trailing}
        </div>
        <div className="control">
          {OreoKey.map((key) => (
            <div className="btn" key={key} onClick={onClick}>
              {key}
            </div>
          ))}
        </div>
      </div>
      <button
        className="submit-btn"
        type="button"
        onClick={() => submit(oreoList)}
      >
        Generate
      </button>
    </>
  );
}
