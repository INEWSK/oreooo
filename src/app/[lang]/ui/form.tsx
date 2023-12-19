import { useCallback, useMemo, useState } from "react";
import { FaRandom } from "react-icons/fa";
import useKeyBindings from "../hook/useKeyBindings";

const OreoKey = ["O", "R", "and", "-1"];

export default function Form({ submit }: { submit: () => void }) {
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);
  console.log("🚀 ~ file: form.tsx:9 ~ Form ~ oreoList:", oreoList);
  const bindings = useMemo(
    () => ({
      Enter: () => submit(),
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

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current += 1;
  //   console.log(`onClick has been recreated ${renderCount.current} time(s)`);
  // }, [onClick]);

  return (
    <div className="container">
      <div className="form">
        <label className="title">{`I would like: `}</label>
        <div className="input-box">
          <input
            type="text"
            id="oreo-input"
            placeholder="Oreo..."
            value={oreoList.join("")}
            readOnly
          />
          <span className="trailing">
            <FaRandom />
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
      <button className="submit-btn" type="button" onClick={() => submit()}>
        Generate
      </button>
    </div>
  );
}
