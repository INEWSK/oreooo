import { useCallback, useEffect, useRef } from "react";

type OutputProps = {
  back: () => void;
  oreoList: OreoKey[];
};

export default function Output({ back, oreoList }: OutputProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const oreoText = oreoList.join("");
  const imgUrl = useRef<string>("");

  const loadImage = useCallback((src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = src;
    });
  }, []);

  const loadOreoImages = useCallback(async () => {
    const [o, r, of] = await Promise.all([
      loadImage("assets/images/o.png"),
      loadImage("assets/images/r.png"),
      loadImage("assets/images/of.png"),
    ]);
    return { o, r, of };
  }, [loadImage]);

  const generate = useCallback(async () => {
    if (!canvasRef.current) return;
    const oreoImages = await loadOreoImages();
    await generateImage(canvasRef.current, oreoList, oreoImages);
  }, [oreoList, loadOreoImages]);

  const generateImage = (
    canvas: HTMLCanvasElement,
    list: OreoKey[],
    imageList: { [key: string]: HTMLImageElement }
  ) => {
    const copyList = [...list];
    const drawList: {
      image: HTMLImageElement;
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    // remove last "-" if exist
    if (copyList[copyList.length - 1] === "-") {
      copyList.pop();
    }

    // calculate canvas height
    let height = 0;
    copyList.forEach((item) => {
      if (item === "-") {
        height += 72;
      } else {
        const drawItem = {
          image: imageList[item],
          x: item === "r" ? 10 : 0,
          y: height,
          width: item === "r" ? 220 : 240,
          height: item === "r" ? 155 : 160,
        };
        drawList.splice(0, 0, drawItem);
        height += 24;
      }
    });
    height += 160 - 24; // add last oreo height

    const ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.height = height;
      drawList.forEach((item) => {
        ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
      });
    }

    imgUrl.current = canvas.toDataURL("image/png");
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = "oreo.png";
    link.href = imgUrl.current;
    link.click();
  };

  useEffect(() => {
    generate();
  }, [oreoList, generate]);

  return (
    <div className="card output">
      <h2 className="title">{`Here's your`}</h2>
      <h3 className="sub-title">{oreoText}</h3>
      <div className="output-image">
        <canvas width="240" height="0" ref={canvasRef} />
      </div>
      <div className="control">
        <button className="btn" type="button" onClick={back}>
          Back
        </button>
        <button className="btn" type="button" onClick={downloadImage}>
          Save Image
        </button>
      </div>
    </div>
  );
}
