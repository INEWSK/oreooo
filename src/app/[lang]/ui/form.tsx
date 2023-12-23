import { getRandomInteger } from "@/utils";
import { useMemo, useState } from "react";
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

  const generateRandomOreoList = (): OreoKey[] => {
    const keys = ["o", "r", "-"];
    // type OreoKey = "o" | "r" | "-"
    const randomList: OreoKey[] = Array.from(
      { length: getRandomInteger(3, 10) },
      () => {
        const index = getRandomInteger(0, 2);
        return keys[index] as OreoKey;
      }
    );

    // remove "-" from the beginning and the end
    if (randomList[0] === "-") randomList.shift();
    if (randomList[randomList.length - 1] === "-") randomList.pop();

    return randomList.length ? randomList : generateRandomOreoList();
  };

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
        onClick={() => submit(oreoList)}
      >
        Generate
      </button>
    </div>
  );
}
