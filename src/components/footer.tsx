"use client";

import { localeLabels, locales, type Locale } from "@/lib/locales";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Footer() {
  const params = useParams();
  const current = params.locale as string;

  return (
    <footer className="footer">
      <ul className="lang-list">
        {locales.map((locale: Locale) => (
          <li key={locale} className="lang" title={locale}>
            <Link
              href={`/${locale}`}
              aria-current={locale === current ? "page" : undefined}
              className={locale === current ? "is-active" : undefined}
            >
              {localeLabels[locale]}
            </Link>
          </li>
        ))}
      </ul>
      <div className="meta">
        <a
          href="https://inewsk.me"
          target="_blank"
          rel="noopener noreferrer"
          title="Blog"
        >
          Kurokawa Yuji
        </a>
        <a
          href="https://github.com/INEWSK"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
