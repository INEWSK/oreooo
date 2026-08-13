import { Metadata } from "next";

export const LOCALES = ["en", "zh-hant", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-hant": "中",
  en: "En",
  ja: "日",
};

export const DEFAULT_META: Metadata = {
  title: "OREOOO",
  description: "Build your Oreo stack and save it as an image.",
  icons: [
    {
      url: "/assets/icons/favicon.ico",
      rel: "icon",
    },
    {
      url: "/assets/icons/apple-touch-icon.png",
      rel: "apple-touch-icon",
    },
  ],
};
