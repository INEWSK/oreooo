import NextIntlProvider from "@/lib/NextIntlRegistry";
import { cn } from "@/lib/utils";
import { DEFAULT_META } from "@/shared/constants";
import "@/shared/styles/globals.scss";
import dayjs from "dayjs";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

const seto = localFont({
  src: "../../shared/fonts/Seto.woff",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = DEFAULT_META;

// Can be imported from a shared config
const locales = ["en", "zh-hant", "ja"];

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
  if (!locales.includes(lang)) notFound();

  let message;

  try {
    message = (await import(`../../../messages/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  const now = dayjs().toDate();

  return (
    <html lang={lang}>
      <body className={cn("antialiased", seto.className)}>
        <NextIntlProvider
          messages={message}
          locale={lang}
          timeZone="Asia/Shanghai"
          now={now}
        >
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}
