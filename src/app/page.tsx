import { defaultLocale } from "@/lib/locales";

/**
 * Static entry for `output: "export"` / GitHub Pages.
 * Prefer an immediate location.replace so hosting doesn't need server redirects.
 */
export default function HomePage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const href = `${base}/${defaultLocale}/`;

  return (
    <main className="app">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(href)});`,
        }}
      />
      <div className="main">
        <div className="card">
          <p className="brand">OREOOO</p>
          <p>
            <a href={href}>Continue</a>
          </p>
        </div>
      </div>
    </main>
  );
}
