import Reveal from "../ui/Reveal.jsx";
import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { BUSINESSES } from "../../content/site.js";

// Where a business's button goes: its own website when known, otherwise its
// section on the Brands & Partners page.
export const businessHref = (b) => b.url || `/brands-partners#${b.id}`;

// Brief §9 — two major visual panels, one per operating business.
export default function Businesses() {
  return (
    <section id="businesses" className="bg-nav px-3 py-16 lg:py-20">
      <SectionTitle eyebrow="Our Businesses" title="Two businesses. One standard of support." center className="mb-10 px-3" />
      <div className="grid gap-3 md:grid-cols-2">
        {BUSINESSES.map((b, i) => (
          <Reveal key={b.id} delay={i * 120} as="article" className="flex flex-col overflow-hidden rounded-[22px] bg-surface">
            <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center lg:px-12">
              <img src={b.logo} alt={`${b.name} logo`} loading="lazy" className="h-20 w-auto object-contain lg:h-24" />
              <h3 className="mt-5 font-sans text-[28px] font-semibold tracking-[-0.01em] text-ink lg:text-[32px]">{b.name}</h3>
              <p className="text-[19px] font-semibold text-control">{b.tagline}</p>
              <p className="mt-3 max-w-[48ch] text-[17px] leading-relaxed text-ink/80">{b.body}</p>
              <PillLinks primary={{ label: b.cta, href: businessHref(b) }} className="mt-6" />
            </div>
            <img src={b.img} alt={b.alt} loading="lazy" className="mt-auto aspect-[16/10] w-full object-cover" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
