import { asset } from "@/lib/asset";
import type { Metadata } from "next";

export const DEFAULT_META: Metadata = {
  title: "OREOOO",
  description: "Build your Oreo stack and save it as an image.",
  icons: [
    {
      url: asset("/assets/icons/favicon.ico"),
      rel: "icon",
    },
    {
      url: asset("/assets/icons/apple-touch-icon.png"),
      rel: "apple-touch-icon",
    },
  ],
};
