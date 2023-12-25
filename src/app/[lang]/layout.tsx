import NextIntlProvider from "@/lib/NextIntlRegistry";
import { cn } from "@/lib/utils";
import { DEFAULT_META, LOCALES } from "@/shared/constants";
import "@/shared/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import dayjs from "dayjs";

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
  // Validate that the incoming `locale` parameter is valid
  if (!LOCALES.includes(lang)) notFound();

  let message;

  try {
    message = (await import(`../../../messages/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  const now = dayjs().toDate();

  return (
    <html lang={lang}>
      <body className={cn("antialiased", naikai.className)}>
        <NextIntlProvider
          messages={message}
          locale={lang}
          timeZone="Asia/Shanghai"
          now={now}
        >
          {children}
        </NextIntlProvider>
        <Analytics />
      </body>
    </html>
  );
}
