import { cn } from "@/lib/utils";
import { DEFAULT_META } from "@/shared/constants";
import "@/shared/styles/globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";

const naikai = localFont({
  src: "../shared/fonts/Naikai.woff2",
  display: "swap",
});

export const metadata: Metadata = DEFAULT_META;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={cn("antialiased", naikai.className)}>{children}</body>
    </html>
  );
}
