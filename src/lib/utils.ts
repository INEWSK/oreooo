import { clsx, type ClassValue } from "clsx";
import type { TranslationValues } from "next-intl";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const getRandomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomOreoList = () => {
  const keys = ["o", "r", "-"];

  const randomList = Array.from({ length: getRandomInteger(3, 12) }).reduce(
    (acc: string[], _, i) => {
      const last = acc[i - 1];
      if (last === "-") {
        return [...acc, keys[getRandomInteger(0, 1)]];
      } else {
        return [...acc, keys[getRandomInteger(0, 2)]];
      }
    },
    []
  );

  if (randomList[0] === "-") randomList.shift();
  if (randomList[randomList.length - 1] === "-") randomList.pop();

  return randomList as OreoKey[];
};

export const translateOreoKeys = (
  oreoKeys: OreoKey[],
  t: (key: string, values?: TranslationValues) => string
): string =>
  oreoKeys
    .map((v, i) => {
      switch (v) {
        case "o":
        case "of":
          return t("basic.o", { o: i === 0 ? "uppercase" : "other" });
        case "r":
          return t("basic.r", { r: i === 0 ? "uppercase" : "other" });
        case "-":
          return t("basic.and");
      }
    })
    .join("");
