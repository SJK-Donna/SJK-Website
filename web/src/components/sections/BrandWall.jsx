import { Link } from "react-router-dom";
import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { BRAND_GROUPS, BRAND_LOGOS } from "../../content/site.js";

// One brand's logo, sized to sit evenly beside the others. Falls back to the
// name in type for a brand without a logo file.
export function BrandLogo({ name }) {
  const src = BRAND_LOGOS[name];
  if (!src) return <span className="wide font-sans text-[18px] font-black tracking-[-0.01em] text-ink lg:text-[22px]">{name}</span>;
  return <img src={src} alt={`${name} logo`} loading="lazy" className="max-h-14 w-full max-w-[170px] object-contain lg:max-h-16" />;
}

// Brief §14 — "a clean logo wall", grouped as the brief groups it: each
// business opens with a navy label tile, followed by one tile per brand it
// represents. A closing "Other approved partners" tile (the brief's own
// last entry) links to the full page; it is two cells wide so that, with
// ten single tiles before it, every row is full at 2, 3 and 4 columns.
const BUSINESS_LABEL = { "Golfcarts.ph": "Golf & Mobility", "Groundmasters.ph": "Course Care, Grounds & Equipment" };

function LogoWall() {
  return (
    <ul className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-4">
      {BRAND_GROUPS.flatMap((g) => [
        <li key={g.business} className="flex min-h-[120px] flex-col justify-end bg-control p-4 text-white sm:p-5 lg:min-h-[150px] lg:p-6">
          <span className="flag mb-auto h-4 w-4" aria-hidden="true" />
          <span className="eyebrow mt-6 text-[10px] text-info">{BUSINESS_LABEL[g.business] ?? g.group}</span>
          <span className="mt-1 font-sans text-[15px] font-extrabold sm:text-[18px] lg:text-[18px]">{g.business}</span>
        </li>,
        ...g.brands.map((b) => (
          <li key={b} className="group relative flex min-h-[120px] items-center justify-center bg-surface p-5 text-center transition-colors hover:bg-nav lg:min-h-[150px]">
            <span className="flag absolute left-0 top-0 h-3 w-3 scale-0 transition-transform duration-300 group-hover:scale-100" aria-hidden="true" />
            <BrandLogo name={b} />
          </li>
        ))
      ])}
      <li className="col-span-2 bg-nav">
        <Link to="/brands-partners" className="group flex h-full min-h-[120px] flex-col justify-end p-4 transition-colors hover:bg-info sm:p-5 lg:min-h-[150px] lg:p-6">
          <span className="eyebrow text-[10px] text-ink/60">And more</span>
          <span className="mt-1 font-sans text-[15px] font-extrabold text-ink sm:text-[18px]">
            Other approved partners <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default function BrandWall() {
  return (
    <section aria-labelledby="brands-title" className="bg-surface px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionTitle id="brands-title" eyebrow="Brands & Partners" title="Trusted Brands. Local Support." className="lg:col-span-8" />
          <PillLinks primary={{ label: "View Our Brands & Partners", href: "/brands-partners" }} className="lg:col-span-4 lg:justify-end" />
        </div>
        <LogoWall />
      </div>
    </section>
  );
}
