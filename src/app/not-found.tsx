import Link from "next/link";

import { siteConfig } from "./site-config";

export default function NotFound() {
  return (
    <main
      className="section"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--offwhite)",
      }}
    >
      <div className="container" style={{ textAlign: "center", maxWidth: "42rem" }}>
        <div className="section-eyebrow" style={{ justifyContent: "center" }}>
          Страницата липсва
        </div>
        <h1 className="headline" style={{ marginBottom: "1rem" }}>
          Не открихме търсената страница
        </h1>
        <p className="lead" style={{ margin: "0 auto 2rem" }}>
          Върнете се към началната страница или се свържете директно с нас за безплатна консултация.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn btn-primary">
            Към началото
          </Link>
          <a href={siteConfig.phoneHref} className="btn btn-outline">
            📞 {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </main>
  );
}
