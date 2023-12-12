import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "zh-cn", "zh-tw"];

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

export default function LocaleLayout({
  children,
  params: { lang },
}: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(lang)) notFound();

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
