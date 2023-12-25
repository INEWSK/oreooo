import TooltipComponent from "@/components/tooltip";
import { cn, generateRandomOreoList, translateOreoKeys } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import useKeyBindings from "../hook/useKeyBindings";

const OreoKey = ["o", "r", "and", "-1"];

export default function Input({
  submit,
  show,
}: {
  submit: (oreoList: OreoKey[]) => void;
  show: boolean;
}) {
  const t = useTranslations();
  const [oreoList, setOreoList] = useState<OreoKey[]>([]);
  const oreoString = translateOreoKeys(oreoList, t);

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
          setOreoList((prev) => [...prev, "o"]);
        }
        if (value === "r") {
          setOreoList((prev) => [...prev, "r"]);
        }
        break;
      case "enter":
        oreoList.length && submit(oreoList);
        setOreoList([]);
        break;
      case "remove":
        oreoList.length && setOreoList((prev) => prev.slice(0, -1));
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

  const onClick = (e: any) => {
    const value = e.currentTarget.getAttribute("data-key");

    const actionMap = {
      o: () => action("add", "o"),
      r: () => action("add", "r"),
      and: () => action("add", "-"),
      "-1": () => action("remove"),
      generate: () => action("enter"),
    };

    const actionValue = actionMap[value as keyof typeof actionMap];

    actionValue && actionValue();
  };

  const bindings = [
    { keys: ["Enter"], action: () => action("enter") },
    { keys: ["o"], action: () => action("add", "o") },
    { keys: ["r"], action: () => action("add", "r") },
    { keys: ["-", " "], action: () => action("add", "-") },
    { keys: ["Backspace"], action: () => action("remove") },
  ];

  useKeyBindings(bindings);

  return (
    <div className={cn("form", !show && "hidden")}>
      <div className="card">
        <div className="tooltip">
          <TooltipComponent>
            <ul>
              {["title", "o/r", "-/space", "enter", "backspace"].map((key) => {
                return <li key={key}>{t(`tooltip.${key}`)}</li>;
              })}
            </ul>
          </TooltipComponent>
        </div>
        <h2 className="title">{t("input.meta")}</h2>
        <div className="input-box">
          <input
            type="text"
            id="oreo-input"
            placeholder={t("input.placeholder")}
            value={oreoString}
          />
          <span
            className="trailing"
            onClick={() =>
              oreoList.length
                ? setOreoList([])
                : setOreoList(generateRandomOreoList())
            }
          >
            {!oreoList.length ? (
              <span title={t("input.random")}>
                <FaRandom className="random" />
              </span>
            ) : (
              <span>
                <FaTimes className="remove" />
              </span>
            )}
          </span>
        </div>
        <div className="control">
          {OreoKey.map((key) => (
            <div className="btn" key={key} data-key={key} onClick={onClick}>
              {t(`input.btn.${key}`)}
            </div>
          ))}
        </div>
      </div>
      <button
        className="submit-btn"
        data-key="generate"
        type="button"
        disabled={!oreoList.length}
        onClick={onClick}
      >
        {t("input.generate")}
      </button>
    </div>
  );
}
