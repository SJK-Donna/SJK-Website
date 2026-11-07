import { Link } from "react-router-dom";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import SectionTitle from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { BrandLogo } from "../components/sections/BrandWall.jsx";
import { Eyebrow } from "../components/ui/Brand.jsx";
import Photo from "../components/ui/Photo.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { BRAND_GROUPS, BUSINESSES, GOLFCARTS_SERVICES, GOLFCARTS_SHOWCASE, GROUNDMASTERS_SHOWCASE, PARTNERS } from "../content/site.js";

// A row of still photos with a caption beneath each. Golfcarts.ph uses four
// (two by two on phones); Groundmasters.ph uses three, the last running full
// width on phones so no gap is left beside it.
function Showcase({ items, columns }) {
  return (
    <ul className={`mt-10 grid gap-x-3 gap-y-6 sm:gap-x-4 ${columns}`}>
      {items.map((p, i) => (
        <Reveal as="li" key={p.src} delay={i * 80} className={items.length % 2 && i === items.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
          <Photo src={p.src} alt={p.alt} position={p.position} parallax={false} className="cut cut-sm aspect-[4/3] w-full" />
          <p className="wide mt-3 font-sans text-[15px] font-extrabold leading-tight text-ink sm:text-[18px]">{p.title}</p>
          {p.body && <p className="mt-1 text-[14px] leading-snug text-ink/70 sm:text-[15px]">{p.body}</p>}
        </Reveal>
      ))}
    </ul>
  );
}

// Each brand's logo with the kind of equipment it covers, closing on the
// brief's "other approved partners" entry so the rows stay full.
function BrandLogoGrid({ categories }) {
  const brands = categories.flatMap((c) => c.brands.map((name) => ({ name, group: c.group })));
  return (
    <ul className="mt-6 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 lg:grid-cols-4">
      {brands.map((b) => (
        <li key={b.name} className="flex flex-col items-center bg-white p-4 text-center sm:p-6">
          <div className="flex h-24 w-full items-center justify-center">
            <BrandLogo name={b.name} />
          </div>
          <p className="mt-3 text-[13px] leading-snug text-ink/65 sm:text-[14px]">{b.group}</p>
        </li>
      ))}
      <li className="bg-control">
        <Link to="/contact" className="group flex h-full min-h-[150px] flex-col justify-end p-4 text-white transition-colors hover:bg-forest-deep sm:p-6">
          <span className="flag mb-auto h-4 w-4" aria-hidden="true" />
          <span className="eyebrow mt-4 text-[10px] text-info">And more</span>
          <span className="mt-1 font-sans text-[15px] font-extrabold sm:text-[18px]">
            Other approved partners <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </li>
    </ul>
  );
}

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
                <h2 id={`${b.id}-title`} className="wide mt-4 font-sans text-[24px] font-black tracking-[-0.02em] text-ink sm:text-[28px] lg:text-[34px] xl:text-[42px]">{b.name}</h2>
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
              <div className="mx-auto mt-16 max-w-[1320px] border-t-4 border-info pt-10">
                <Reveal className="grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                  <img src="/images/brands/logos/club-car.png" alt="Club Car logo" loading="lazy" className="h-14 w-auto justify-self-start lg:h-20" />
                  <div>
                    <h3 className="eyebrow text-[12px] leading-[1.6] text-ink/60">Brand represented through Golfcarts.ph</h3>
                    <p className="mt-2 max-w-[62ch] text-ink/75">
                      Club Car vehicles, supported locally by Golfcarts.ph. Recognized by Club Car Asia in 2024 for Best Marketing and Excellent Performance.{" "}
                      <Link to="/who-we-are#awards" className="font-semibold text-ink underline decoration-info decoration-2 underline-offset-4 hover:text-ink/70">See our awards</Link>
                    </p>
                  </div>
                </Reveal>
                <Showcase items={GOLFCARTS_SHOWCASE} columns="grid-cols-2 lg:grid-cols-4" />
              </div>
            )}

            {b.id === "ground-masters" && group && (
              <div className="mx-auto mt-16 max-w-[1320px] border-t-4 border-info pt-10">
                <Reveal>
                  <h3 className="eyebrow text-[12px] leading-[1.6] text-ink/60">Brands represented through Groundmasters.ph</h3>
                  <BrandLogoGrid categories={group.categories} />
                </Reveal>
                <Showcase items={GROUNDMASTERS_SHOWCASE} columns="grid-cols-2 sm:grid-cols-3" />
              </div>
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
