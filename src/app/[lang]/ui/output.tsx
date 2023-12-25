import { cn, loadImage, translateOreoKeys } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "use-intl";

type OutputProps = {
  back: () => void;
  oreoList: OreoKey[];
};

type ImageList = {
  o: HTMLImageElement;
  r: HTMLImageElement;
  of: HTMLImageElement;
};

export const downloadImage = ({ url }: { url: string }) => {
  const link = document.createElement("a");
  link.download = "oreo.png";
  link.href = url;
  link.click();
};

const loadOreoImages = async () => {
  const [o, r, of] = await Promise.all([
    loadImage("assets/images/o.png"),
    loadImage("assets/images/r.png"),
    loadImage("assets/images/of.png"),
  ]);
  return { o, r, of };
};

export default function Output({ back, oreoList }: OutputProps) {
  const t = useTranslations();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgUrl = useRef<string>("");
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
      const copyList = [...list];

      // remove last "-" if exist
      if (copyList[copyList.length - 1] === "-") {
        copyList.pop();
      }

      // change to "of" after "o"
      copyList.map(
        (item, i) => i !== 0 && item === "o" && (copyList[i] = "of")
      );

      const OREO_HEIGHT = 24;
      const GAP_HEIGHT = 72;
      const LAST_OREO_HEIGHT = 160 - OREO_HEIGHT;

      // calculate canvas height
      let canvasHeight = 0;

      const drawList = copyList.reduce((acc: DrawItem[], item: OreoKey) => {
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

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.height = canvasHeight;
        drawList.map(({ image, x, y, width, height }) => {
          ctx.drawImage(image, x, y, width, height);
        });
      }

      imgUrl.current = canvas.toDataURL("image/png");
    },
    [canvasRef, imgUrl]
  );

  const generate = useCallback(async () => {
    const oreoImages = await loadOreoImages();
    convertImage(oreoList, oreoImages);
  }, [oreoList, convertImage]);

  useEffect(() => {
    generate();
  }, [oreoList, convertImage, generate]);

  return (
    <div className={cn("output", !oreoList.length && "hidden")}>
      <div className="card">
        <h2 className="title">{t("output.meta")}</h2>
        <h3 className="sub-title">{oreoString}</h3>
        <div className="output-image">
          <canvas width="240" height="0" ref={canvasRef} />
        </div>
        <div className="control">
          <button className="btn" type="button" onClick={back}>
            {t("output.back")}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => downloadImage({ url: imgUrl.current })}
          >
            {t("output.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
