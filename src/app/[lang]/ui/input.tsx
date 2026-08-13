import TooltipComponent from "@/components/tooltip";
import {
  cn,
  generateRandomOreoList,
  MAX_OREO_LENGTH,
  translateOreoKeys,
} from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import useKeyBindings from "../hook/useKeyBindings";

const OreoKeys = ["o", "r", "and", "-1"] as const;

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
  const atLimit = oreoList.length >= MAX_OREO_LENGTH;

  const action = (actionName: string, value?: string) => {
    switch (actionName) {
      case "add":
        if (value === "-") {
          setOreoList((prev) => {
            if (prev.length >= MAX_OREO_LENGTH) return prev;
            return prev.length && prev[prev.length - 1] !== "-"
              ? [...prev, "-"]
              : [...prev];
          });
        }
        if (value === "o" || value === "r") {
          setOreoList((prev) =>
            prev.length >= MAX_OREO_LENGTH ? prev : [...prev, value]
          );
        }
        break;
      case "enter":
        if (oreoList.length) submit(oreoList);
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

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  useKeyBindings(
    [
      { keys: ["Enter"], action: () => action("enter") },
      { keys: ["o"], action: () => action("add", "o") },
      { keys: ["r"], action: () => action("add", "r") },
      { keys: ["-", " "], action: () => action("add", "-") },
      { keys: ["Backspace"], action: () => action("remove") },
    ],
    show
  );

  const shortcutKeys = ["title", "o/r", "-/space", "enter", "backspace"] as const;

  return (
    <div className={cn("form", !show && "hidden")}>
      <div className="card">
        <div className="tooltip">
          <TooltipComponent label={t("tooltip.title")}>
            <ul>
              {shortcutKeys.map((key) => (
                <li key={key}>{t(`tooltip.${key}`)}</li>
              ))}
            </ul>
          </TooltipComponent>
        </div>
        <p className="brand">OREOOO</p>
        <h2 className="title">{t("input.meta")}</h2>
        <details className="shortcuts-mobile">
          <summary>{t("tooltip.title")}</summary>
          <ul>
            {shortcutKeys.map((key) => (
              <li key={key}>{t(`tooltip.${key}`)}</li>
            ))}
          </ul>
        </details>
        <div className="input-box">
          <input
            type="text"
            id="oreo-input"
            placeholder={t("input.placeholder")}
            value={oreoString}
            readOnly
            aria-label={t("input.meta")}
          />
          <button
            type="button"
            className="trailing"
            aria-label={oreoList.length ? t("input.clear") : t("input.random")}
            title={oreoList.length ? t("input.clear") : t("input.random")}
            onClick={() =>
              oreoList.length
                ? setOreoList([])
                : setOreoList(generateRandomOreoList())
            }
          >
            {!oreoList.length ? (
              <FaRandom className="random" aria-hidden />
            ) : (
              <FaTimes className="remove" aria-hidden />
            )}
          </button>
        </div>
        <div className="btn-group">
          {OreoKeys.map((key) => (
            <button
              key={key}
              type="button"
              className="btn"
              data-key={key}
              disabled={key !== "-1" && atLimit}
              onClick={onClick}
            >
              {t(`input.btn.${key}`)}
            </button>
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
