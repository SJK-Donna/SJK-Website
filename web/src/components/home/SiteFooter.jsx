import { Link } from "react-router-dom";
import { BUSINESSES, COMPANY, LOCATIONS } from "../../content/site.js";
import { LogoOnDark } from "../ui/Brand.jsx";

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
      ["Golfcarts.ph", "/brands-partners#golf-carts-ph"],
      ["Groundmasters.ph", "/brands-partners#ground-masters"],
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

const heading = "eyebrow mb-4 whitespace-nowrap text-[11px] text-info max-sm:whitespace-normal";

// Navy footer: the logo and positioning line, link columns, operating
// locations, then a legal line.
export default function SiteFooter() {
  return (
    <footer className="bg-control font-sans text-[15px] leading-relaxed text-white/70">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-16 lg:pt-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoOnDark width={140} height={68} className="h-14 w-auto" />
            <p className="mt-6 max-w-[46ch]">{COMPANY.positioning}</p>
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-info"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
              Follow us on Facebook
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-8 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className={heading}>{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to} className="transition-colors hover:text-white">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className={heading}>Locations</h3>
              <ul className="space-y-3">
                {LOCATIONS.map((l) => (
                  <li key={l.id}>
                    <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-info">
                      {l.name}
                      <span className="sr-only"> branch directions (opens Google Maps)</span>
                    </a>
                    <br />
                    {l.phones[0] ? <a href={`tel:${l.phones[0][1]}`} className="hover:text-white">{l.phones[0][0]}</a> : l.address.split(",").slice(-2).join(",").trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[14px] text-white/55 sm:flex-row sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} {COMPANY.name} All rights reserved.</p>
          <p>{BUSINESSES.map((b) => b.name).join(" and ")} are SJK Guahan businesses.</p>
        </div>
      </div>
    </footer>
  );
}
