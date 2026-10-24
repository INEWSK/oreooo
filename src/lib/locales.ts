export const locales = ["en", "zh-hant", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "En",
  "zh-hant": "中",
  ja: "日",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  "zh-hant": "zh-Hant",
  ja: "ja",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
