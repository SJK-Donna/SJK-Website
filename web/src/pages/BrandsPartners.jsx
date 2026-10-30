import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import SectionTitle from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { BrandGroups } from "../components/sections/BrandWall.jsx";
import { Eyebrow } from "../components/ui/Brand.jsx";
import Photo from "../components/ui/Photo.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { BRAND_GROUPS, BUSINESSES, GOLFCARTS_SERVICES, PARTNERS } from "../content/site.js";

// Real Golfcarts.ph work shown under its section: delivery, a customer
// fleet and the service team.
const GOLFCARTS_GALLERY = [
  ["/images/sjk/fleet-delivery.jpg", "New white golf carts in protective wrap, ready for delivery", "Fleet Delivery"],
  ["/images/sjk/fleet-course.jpg", "Black Club Car golf carts lined up beside a tropical course", "Customer Fleet"],
  ["/images/sjk/service-team.jpg", "Golfcarts.ph technicians working on a golf cart", "Service & Parts"]
];

// Brief §22 — one section per business with the brands it represents,
// alternating white and light grey, photo and text swapping sides.
export default function BrandsPartners() {
  return (
    <>
      <PageHeader
        eyebrow="Brands & Partners"
        title="Trusted Brands. Local Support."
        lead="International brands represented through our operating businesses, supported locally with service, parts and customer care."
        img="/images/brands/smithco-bunker-rake.jpg"
        alt="Operator raking a golf course bunker with a Smithco bunker rake"
        position="30% 50%"
      />

      {BUSINESSES.map((b, i) => {
        const group = BRAND_GROUPS.find((g) => g.business === b.name);
        // Only link out when the business's own website is known; otherwise
        // the visitor is already on its section.
        const ownSite = b.url ? { label: `Visit ${b.name}`, href: b.url } : null;
        const flip = i % 2 === 1;
        return (
          <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className={`px-6 py-20 lg:py-28 ${flip ? "bg-nav" : "bg-surface"}`}>
            <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                <div className="cut cut-sm inline-block bg-white p-4 shadow-[0_8px_24px_rgba(13,28,44,.08)]">
                  <img src={b.logo} alt={`${b.name} logo`} loading="lazy" className="h-16 w-auto object-contain lg:h-20" />
                </div>
                <Eyebrow className="mt-8">{b.tagline}</Eyebrow>
                <h2 id={`${b.id}-title`} className="wide mt-4 font-sans text-[34px] font-black tracking-[-0.02em] text-ink lg:text-[52px]">{b.name}</h2>
                <p className="mt-5 max-w-[48ch] text-ink/75">{b.body}</p>
                {b.id === "golf-carts-ph" && (
                  <ul className="mt-7 space-y-3 border-t border-ink/15 pt-6 font-sans text-[16px] font-medium text-ink">
                    {GOLFCARTS_SERVICES.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span className="flag mt-[5px] h-3 w-3 shrink-0" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {ownSite && <PillLinks primary={ownSite} className="mt-9" />}
              </Reveal>
              <Photo src={b.img} alt={b.alt} position={b.imgPosition} className={`cut cut-lg aspect-[4/3] w-full lg:col-span-7 ${flip ? "lg:order-1" : ""}`} />
            </div>

            {b.id === "golf-carts-ph" && (
              <ul className="mx-auto mt-16 grid max-w-[1320px] gap-4 sm:grid-cols-3">
                {GOLFCARTS_GALLERY.map(([src, alt, label]) => (
                  <li key={src} className="group">
                    <Photo src={src} alt={alt} className="cut aspect-[4/3] w-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-control/80 via-transparent to-transparent" />
                      <p className="wide absolute bottom-0 left-0 p-5 font-sans text-[18px] font-extrabold text-white">{label}</p>
                    </Photo>
                  </li>
                ))}
              </ul>
            )}

            {group && (
              <Reveal className="mx-auto mt-16 max-w-[1320px] border-t-4 border-info pt-10">
                <BrandGroups groups={group.categories ?? [{ ...group, group: `Brands represented through ${b.name}` }]} />
              </Reveal>
            )}
          </section>
        );
      })}

      {/* Customers and partners: logos in grey that come into colour on hover. */}
      <section id="partners" className="bg-surface px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionTitle eyebrow="Customers & Partners" title="In good company." lead="Golf courses, resorts and logistics partners we work alongside." />
          <ul className="mt-14 grid grid-cols-2 border-l border-t border-ink/10 sm:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <Reveal as="li" key={p.name} delay={(i % 4) * 80} className="group border-b border-r border-ink/10 p-6 transition-colors hover:bg-nav lg:p-8">
                <div className="flex h-24 items-center justify-center">
                  <img src={p.src} alt="" loading="lazy" className="logo-mono max-h-20 w-full object-contain" />
                </div>
                <p className="mt-5 font-sans text-[15px] font-bold leading-snug text-ink">{p.name}</p>
                <p className="text-[14px] text-ink/60">{p.cat}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
