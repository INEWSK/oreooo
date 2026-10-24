import { defaultLocale } from "@/lib/locales";

/**
 * Static entry for `output: "export"`.
 * Immediate location.replace so static hosts don't need server redirects.
 */
export default function HomePage() {
  const href = `/${defaultLocale}/`;

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
