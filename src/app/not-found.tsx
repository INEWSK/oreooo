import { defaultLocale } from "@/lib/locales";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app">
      <div className="main">
        <div className="card">
          <p className="brand">OREOOO</p>
          <h1 className="title">404</h1>
          <p>Page not found.</p>
          <Link className="btn" href={`/${defaultLocale}/`}>
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
