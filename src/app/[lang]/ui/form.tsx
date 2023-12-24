import { generateRandomOreoList } from "@/utils";
import { useState } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import useKeyBindings from "../hook/useKeyBindings";

const OreoKey = ["O", "R", "and", "-1"];

export default function Form({
  submit,
  show,
}: {
  submit: (oreoList: OreoKey[]) => void;
  show: boolean;
}) {
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);

  const action = (action: string, value?: string) => {
    switch (action) {
      case "add":
        if (value === "-") {
          setOreoList((prev) =>
            prev.length && prev[prev.length - 1] !== "-"
              ? [...prev, "-"]
              : [...prev]
          );
        }
        if (value === "o") {
          setOreoList((prev) => (prev.length ? [...prev, "of"] : ["o"]));
        }
        if (value === "r") {
          setOreoList((prev) => [...prev, "r"]);
        }
        break;
      case "remove":
        oreoList.length > 0 && setOreoList((prev) => prev.slice(0, -1));
        break;
      case "random":
        setOreoList(generateRandomOreoList());
        break;
      case "clear":
        setOreoList([]);
        break;
      default:
        break;
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;

    const actionMap = {
      O: () => action("add", "o"),
      R: () => action("add", "r"),
      and: () => action("add", "-"),
      "-1": () => action("remove"),
    };

    const actionValue = actionMap[value as keyof typeof actionMap];

    actionValue && actionValue();
  };

  const bindings = [
    { keys: ["Enter"], action: () => submit(oreoList) },
    { keys: ["o"], action: () => action("add", "o") },
    { keys: ["r"], action: () => action("add", "r") },
    { keys: ["-", " "], action: () => action("add", "-") },
    { keys: ["Backspace"], action: () => action("remove") },
  ];

  useKeyBindings(bindings);

  return (
    <div className={`form ${!show ? "hidden" : "block"}`}>
      <div className="card">
        <h2 className="title">{`I'd like: `}</h2>
        <div className="input-box">
          <input
            type="text"
            id="oreo-input"
            placeholder="Oreo..."
            value={oreoList.join("")}
            readOnly
          />
          <span
            className="trailing"
            onClick={() =>
              oreoList.length > 0
                ? setOreoList([])
                : setOreoList(generateRandomOreoList())
            }
          >
            {oreoList.length === 0 ? (
              <FaRandom className="random" />
            ) : (
              <FaTimes className="remove" />
            )}
          </span>
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
        disabled={!oreoList.length}
        onClick={() => submit(oreoList)}
      >
        Generate
      </button>
    </div>
  );
}
