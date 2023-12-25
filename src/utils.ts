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

export const generateRandomOreoList = (): OreoKey[] => {
  const keys = ["o", "r", "-"];
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

import type { TranslationValues } from "next-intl";

export const translateOreoKeys = (
  oreoKeys: OreoKey[],
  t: (key: string, values?: TranslationValues) => string
): string =>
  oreoKeys
    .map((v, i) => {
      switch (v) {
        case "o":
        case "of":
          return t("basic.o", { o: i === 0 ? "upper" : "other" });
        case "r":
          return t("basic.r", { r: i === 0 ? "upper" : "other" });
        case "-":
          return t("basic.and");
      }
    })
    .join("");
