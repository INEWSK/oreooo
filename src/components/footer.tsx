import Link from "next/link";

const locales: {
  [key: string]: string;
} = {
  "zh-hant": "中",
  en: "En",
  ja: "日",
};

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="lang-list">
        {Object.keys(locales).map((locale) => (
          <li key={locale} className="lang">
            <Link href={`/${locale}`}>{locales[locale]}</Link>
          </li>
        ))}
      </ul>
      <div className="meta">
        <a href="https://inewsk.me" target="_blank">
          Kurokawa Yuji
        </a>
        <a href="https://github.com/INEWSK" target="_blank">
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
