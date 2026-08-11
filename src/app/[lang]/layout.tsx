import NextIntlProvider from "@/lib/NextIntlRegistry";
import { cn } from "@/lib/utils";
import { DEFAULT_META, LOCALES } from "@/shared/constants";
import "@/shared/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

const naikai = localFont({
  src: "../../shared/fonts/Naikai.woff2",
  display: "swap",
});

export const metadata: Metadata = DEFAULT_META;

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  if (!LOCALES.includes(lang as (typeof LOCALES)[number])) notFound();

  let message;

  try {
    message = (await import(`../../../messages/${lang}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={lang === "zh-hant" ? "zh-Hant" : lang}>
      <body className={cn("antialiased", naikai.className)}>
        <NextIntlProvider
          messages={message}
          locale={lang}
          timeZone="Asia/Shanghai"
          now={new Date()}
        >
          {children}
        </NextIntlProvider>
        <Analytics />
      </body>
    </html>
  );
}
