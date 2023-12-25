import { Metadata } from "next";

export const LOCALES = ["en", "zh-hant", "ja"];

export const DEFAULT_META: Metadata = {
  title: "OREOOO",
  icons: [
    {
      url: "assets/icons/favicon.ico",
      rel: "icon",
    },
    {
      url: "assets/icons/apple-touch-icon.png",
      rel: "apple-touch-icon",
    },
  ],
};
