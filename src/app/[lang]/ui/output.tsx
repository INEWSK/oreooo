import { cn, loadOreoImages, translateOreoKeys } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

type OutputProps = {
  back: () => void;
  oreoList: OreoKey[];
};

type ImageList = {
  o: HTMLImageElement;
  r: HTMLImageElement;
  of: HTMLImageElement;
};

export const downloadImage = ({
  url,
  filename,
}: {
  url: string;
  filename: string;
}) => {
  if (!url) return;
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
};

export default function Output({ back, oreoList }: OutputProps) {
  const t = useTranslations();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgUrl = useRef<string>("");
  const [error, setError] = useState(false);
  const oreoString = translateOreoKeys(oreoList, t);

  type DrawItem = {
    image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
  };

  const convertImage = useCallback(
    (list: OreoKey[], imageList: ImageList) => {
      const copyList = [...list] as Array<OreoKey | "of">;

      if (copyList[copyList.length - 1] === "-") {
        copyList.pop();
      }

      copyList.forEach((item, i) => {
        if (i !== 0 && item === "o") copyList[i] = "of";
      });

      const OREO_HEIGHT = 24;
      const GAP_HEIGHT = 72;
      const LAST_OREO_HEIGHT = 160 - OREO_HEIGHT;

      let canvasHeight = 0;

      const drawList = copyList.reduce((acc: DrawItem[], item) => {
        if (item === "-") {
          canvasHeight += GAP_HEIGHT;
        } else {
          const drawItem = {
            image: imageList[item],
            x: item === "r" ? 10 : 0,
            y: canvasHeight,
            width: item === "r" ? 220 : 240,
            height: item === "r" ? 155 : 160,
          };
          canvasHeight += OREO_HEIGHT;
          acc.unshift(drawItem);
        }
        return acc;
      }, []);

      canvasHeight += LAST_OREO_HEIGHT;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.height = canvasHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawList.forEach(({ image, x, y, width, height }) => {
        ctx.drawImage(image, x, y, width, height);
      });

      imgUrl.current = canvas.toDataURL("image/png");
    },
    []
  );

  const generate = useCallback(async () => {
    if (!oreoList.length) return;
    try {
      setError(false);
      const oreoImages = await loadOreoImages();
      convertImage(oreoList, oreoImages);
    } catch {
      setError(true);
      imgUrl.current = "";
    }
  }, [oreoList, convertImage]);

  useEffect(() => {
    generate();
  }, [generate]);

  const safeName = (oreoString || "oreo").replace(/[\\/:*?"<>|]/g, "").slice(0, 40);

  return (
    <div className={cn("output", !oreoList.length && "hidden")}>
      <div className="card">
        <p className="brand">OREOOO</p>
        <h2 className="title">{t("output.meta")}</h2>
        <h3 className="sub-title">{oreoString}</h3>
        <div className="output-image">
          <canvas
            width="240"
            height="0"
            ref={canvasRef}
            role="img"
            aria-label={oreoString || t("output.meta")}
          />
          {error && <p className="output-error">{t("output.error")}</p>}
        </div>
        <div className="btn-group">
          <button className="btn" type="button" onClick={back}>
            {t("output.back")}
          </button>
          <button
            className="btn"
            type="button"
            disabled={error}
            onClick={() =>
              downloadImage({
                url: imgUrl.current,
                filename: `${safeName || "oreo"}.png`,
              })
            }
          >
            {t("output.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
