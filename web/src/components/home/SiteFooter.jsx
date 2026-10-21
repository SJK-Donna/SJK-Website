import { Link } from "react-router-dom";
import { BUSINESSES, COMPANY, LOCATIONS } from "../../content/site.js";

const COLUMNS = [
  {
    title: "SJK Guahan",
    links: [
      ["Who We Are", "/who-we-are"],
      ["Our Story", "/who-we-are#story"],
      ["Our Philosophy", "/who-we-are#philosophy"],
      ["Contact Us", "/contact"]
    ]
  },
  {
    title: "Our Businesses",
    links: [
      ["Golf Carts PH", "/brands-partners#golf-carts-ph"],
      ["Ground Masters", "/brands-partners#ground-masters"],
      ["Brands & Partners", "/brands-partners"]
    ]
  },
  {
    title: "Explore",
    links: [
      ["Projects", "/projects"],
      ["News", "/news"],
      ["Our Locations", "/#locations"]
    ]
  }
];

// Small-print footer: link columns, operating locations, then a legal line.
export default function SiteFooter() {
  return (
    <footer className="bg-nav font-sans text-[12px] text-ink/75">
      <div className="mx-auto max-w-[1080px] px-6 py-10">
        <p className="border-b border-ink/15 pb-4 leading-relaxed">{COMPANY.positioning}</p>

        <div className="grid grid-cols-2 gap-8 py-6 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-2 font-sans text-[12px] font-semibold text-ink">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="hover:text-ink hover:underline">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-2 font-sans text-[12px] font-semibold text-ink">Locations</h3>
            <ul className="space-y-2">
              {LOCATIONS.map((l) => (
                <li key={l.id}>
                  <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:underline">
                    {l.name}
                    <span className="sr-only"> branch directions (opens Google Maps)</span>
                  </a>
                  <br />
                  {l.phones[0] ? <a href={`tel:${l.phones[0][1]}`} className="hover:text-ink hover:underline">{l.phones[0][0]}</a> : l.address.split(",").slice(-2).join(",").trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-ink/15 pt-4 sm:flex-row sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} {COMPANY.name} All rights reserved.</p>
          <p>
            {BUSINESSES.map((b, i) => (
              <span key={b.id}>
                {i > 0 && " · "}
                {b.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
