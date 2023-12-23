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
