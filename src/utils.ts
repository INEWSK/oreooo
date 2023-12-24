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

export const translateOreoKeys = (
  oreoKeys: OreoKey[],
  t: (key: string) => string
): string =>
  oreoKeys.map((v) => (v === "-" ? t("basic.and") : t(`basic.${v}`))).join("");
