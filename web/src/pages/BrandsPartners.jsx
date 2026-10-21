import Reveal from "../components/ui/Reveal.jsx";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import SectionTitle from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { BrandGroups } from "../components/sections/BrandWall.jsx";
import { BRAND_GROUPS, BUSINESSES, PARTNERS } from "../content/site.js";

// Brief §22 — one panel per business with the brands it represents.
export default function BrandsPartners() {
  return (
    <>
      <PageHeader eyebrow="Brands & Partners" title="Trusted Brands. Local Support." lead="International brands represented through our operating businesses, supported locally with service, parts and customer care." />

      {BUSINESSES.map((b, i) => {
        const group = BRAND_GROUPS.find((g) => g.business === b.name);
        // Only link out when the business's own website is known; otherwise
        // the visitor is already on its section.
        const ownSite = b.url ? { label: `Visit ${b.url.replace(/^https?:\/\//, "")}`, href: b.url } : null;
        return (
          <section key={b.id} id={b.id} className={`px-6 py-20 lg:py-24 ${i % 2 ? "bg-nav" : "bg-surface"}`}>
            <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <img src={b.logo} alt={`${b.name} logo`} loading="lazy" className="h-20 w-auto object-contain" />
                <h2 className="mt-5 font-sans text-[32px] font-semibold tracking-[-0.015em] text-ink lg:text-[40px]">{b.name}</h2>
                <p className="text-[19px] font-semibold text-control">{b.tagline}</p>
                <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink/80 lg:text-[19px]">{b.body}</p>
                {ownSite && <PillLinks primary={ownSite} center={false} className="mt-6" />}
              </Reveal>
              <Reveal delay={120} className="overflow-hidden rounded-[22px]">
                <img src={b.img} alt={b.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </Reveal>
            </div>
            {group && (
              <div className="mx-auto mt-14 max-w-[1180px]">
                <BrandGroups groups={[{ ...group, group: `Brands represented through ${b.name}` }]} />
              </div>
            )}
          </section>
        );
      })}

      <section id="partners" className="bg-surface px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionTitle eyebrow="Customers & Partners" title="Stronger together." lead="Golf courses, resorts and logistics partners we work alongside." center className="mb-12" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 40} className="flex flex-col items-center gap-3 rounded-[18px] bg-nav px-4 py-6 text-center">
                <img src={p.src} alt={p.name} loading="lazy" className="h-14 w-full object-contain" />
                <span className="text-[13px] font-semibold text-ink">{p.name}</span>
                <span className="-mt-2 text-[12px] text-ink/75">{p.cat}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
