import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { BRAND_GROUPS } from "../../content/site.js";

// Brand names as a typographic roster, grouped by the business that
// represents them (used on Brands & Partners). Until the logo files
// arrive, names stand in for logos.
export function BrandGroups({ groups = BRAND_GROUPS }) {
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g.group}>
          <h3 className="eyebrow text-[12px] text-ink/60">{g.group}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
            {g.brands.map((b) => (
              <li key={b} className="wide font-sans text-[30px] font-extrabold leading-[1.25] tracking-[-0.015em] text-ink lg:text-[40px]">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Every brand in one row sliding sideways, amber flags between the names.
// The list is rendered twice for a seamless loop; the copy is hidden from
// screen readers, which read the first list once.
const ALL_BRANDS = BRAND_GROUPS.flatMap((g) => g.brands);

function BrandMarquee() {
  const Names = ({ hidden }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ALL_BRANDS.map((b) => (
        <li key={b} className="flex items-center whitespace-nowrap">
          <span className="wide px-8 font-sans text-[34px] font-black tracking-[-0.02em] text-ink lg:px-12 lg:text-[56px]">{b}</span>
          <span className="flag h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-ink/10 py-6 lg:py-9">
      <div className="marquee flex w-max">
        <Names />
        <Names hidden />
      </div>
    </div>
  );
}

// Brief §14 — logo and name only.
export default function BrandWall() {
  return (
    <section aria-labelledby="brands-title" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto mb-12 grid max-w-[1320px] gap-8 px-6 lg:grid-cols-12 lg:items-end">
        <SectionTitle id="brands-title" eyebrow="Brands & Partners" title="Trusted Brands. Local Support." className="lg:col-span-8" />
        <PillLinks primary={{ label: "View Our Brands & Partners", href: "/brands-partners" }} className="lg:col-span-4 lg:justify-end" />
      </div>
      <BrandMarquee />
    </section>
  );
}
