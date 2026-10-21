import Reveal from "../ui/Reveal.jsx";
import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { BRAND_GROUPS } from "../../content/site.js";

// Brief §14 — logo + name only, grouped by business. Brand logo files
// aren't in the project yet, so each tile shows the brand name as a
// wordmark; drop logos in and render an <img> here when they arrive.
export function BrandGroups({ groups = BRAND_GROUPS }) {
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div key={g.group}>
          <h3 className="mb-4 text-center text-[14px] font-semibold uppercase tracking-[0.08em] text-ink/70">{g.group}</h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {g.brands.map((b, i) => (
              <Reveal as="li" key={b} delay={i * 40} className="flex h-20 w-[150px] items-center justify-center rounded-[16px] bg-surface px-4 text-center sm:w-[170px]">
                <span className="font-sans text-[17px] font-semibold tracking-[-0.01em] text-ink">{b}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function BrandWall() {
  return (
    <section className="bg-nav px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionTitle eyebrow="Brands & Partners" title="Trusted Brands. Local Support." center className="mb-12" />
        <BrandGroups />
        <PillLinks primary={{ label: "View Our Brands & Partners", href: "/brands-partners" }} className="mt-12" />
      </div>
    </section>
  );
}
