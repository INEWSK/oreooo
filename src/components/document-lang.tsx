"use client";

import { htmlLang, isLocale } from "@/lib/locales";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/** Keep <html lang> in sync with the active locale route. */
export default function DocumentLang() {
  const params = useParams();
  const locale = params.locale;

  useEffect(() => {
    if (typeof locale === "string" && isLocale(locale)) {
      document.documentElement.lang = htmlLang[locale];
    }
  }, [locale]);

  return null;
}
