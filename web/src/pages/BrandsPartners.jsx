import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import { Margin } from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { BrandGroups } from "../components/sections/BrandWall.jsx";
import { BRAND_GROUPS, BUSINESSES, GOLFCARTS_SERVICES, PARTNERS } from "../content/site.js";

// Real Golfcarts.ph work shown under its section: delivery, a customer
// fleet and the service team.
const GOLFCARTS_GALLERY = [
  ["/images/sjk/fleet-delivery.jpg", "New white golf carts in protective wrap, ready for delivery", "Fleet delivery"],
  ["/images/sjk/fleet-course.jpg", "Black Club Car golf carts lined up beside a tropical course", "Customer fleet"],
  ["/images/sjk/service-team.jpg", "Golfcarts.ph technicians working on a golf cart", "Service and parts"]
];

// Brief §22 — one section per business with the brands it represents.
export default function BrandsPartners() {
  return (
    <>
      <PageHeader
        eyebrow="Brands and partners"
        title="Trusted brands. Local support."
        lead="International brands represented through our operating businesses, supported locally with service, parts and customer care."
      />

      {BUSINESSES.map((b, i) => {
        const group = BRAND_GROUPS.find((g) => g.business === b.name);
        // Only link out when the business's own website is known; otherwise
        // the visitor is already on its section.
        const ownSite = b.url ? { label: `Visit ${b.name}`, href: b.url } : null;
        return (
          <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className={`px-6 py-20 lg:py-28 ${i % 2 ? "bg-nav" : "bg-surface"}`}>
            <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <img src={b.logo} alt={`${b.name} logo`} loading="lazy" className="h-20 w-auto object-contain object-left" />
                <h2 id={`${b.id}-title`} className="wide mt-6 font-sans text-[32px] font-semibold tracking-[-0.015em] text-ink lg:text-[44px]">{b.name}</h2>
                <p className="font-sans text-[17px] font-semibold text-control">{b.tagline}</p>
                <p className="mt-5 max-w-[48ch] text-ink/80">{b.body}</p>
                {b.id === "golf-carts-ph" && (
                  <ul className="mt-6 space-y-2 border-t border-ink/15 pt-5 font-sans text-[16px] text-ink">
                    {GOLFCARTS_SERVICES.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span className="mt-[9px] h-2 w-2 shrink-0 bg-info" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {ownSite && <PillLinks primary={ownSite} className="mt-8" />}
              </div>
              <img src={b.img} alt={b.alt} loading="lazy" style={{ objectPosition: b.imgPosition }} className="aspect-[3/2] w-full rounded-[3px] object-cover lg:col-span-7" />
            </div>
            {b.id === "golf-carts-ph" && (
              <ul className="mx-auto mt-14 grid max-w-[1240px] gap-3 sm:grid-cols-3">
                {GOLFCARTS_GALLERY.map(([src, alt, label]) => (
                  <li key={src}>
                    <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover" />
                    <p className="wide mt-3 font-sans text-[17px] font-semibold text-ink">{label}</p>
                  </li>
                ))}
              </ul>
            )}
            {group && (
              <div className="mx-auto mt-16 max-w-[1240px] border-t-2 border-ink pt-8">
                <BrandGroups groups={[{ ...group, group: `Brands represented through ${b.name}` }]} />
              </div>
            )}
          </section>
        );
      })}

      <Margin id="partners" title="Customers and partners" lead="Golf courses, resorts and logistics partners we work alongside." className="bg-surface">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <div className="flex h-24 items-center justify-center border-b border-ink/15 pb-4">
                <img src={p.src} alt="" loading="lazy" className="max-h-16 w-full object-contain" />
              </div>
              <p className="mt-3 font-sans text-[15px] font-semibold leading-snug text-ink">{p.name}</p>
              <p className="text-[15px] text-ink/75">{p.cat}</p>
            </li>
          ))}
        </ul>
      </Margin>

      <FinalCta />
    </>
  );
}
