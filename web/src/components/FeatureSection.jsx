import Reveal from "./ui/Reveal.jsx";
import SectionHead from "./ui/SectionHead.jsx";

/**
 * Shared layout for Fairway and Course Equipment: eyebrow/heading/lead,
 * two feature cards with a 3D-ish hover tilt, category chips, an
 * optional "featured brands" line, and a CTA. Parametrized rather than
 * duplicated since both sections are structurally identical.
 */
export default function FeatureSection({ id, white, eyebrow, title, lead, cards, chips, featuredBrands, ctaLabel, ctaHref }) {
  return (
    <section id={id} className={`px-6 py-24 sm:px-10 lg:px-16 ${white ? "bg-surface" : "bg-warm-white"}`}>
      <div className="mx-auto max-w-[1320px]">
        <SectionHead eyebrow={eyebrow} title={title} lead={lead} />

        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a
                href={c.href}
                className="group relative block overflow-hidden rounded-2xl shadow-raised transition-transform duration-500 [perspective:1000px] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,.3)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08] group-hover:rotate-[0.5deg]"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-6">
                  <h3 className="mb-1.5 font-display text-xl font-bold text-white">{c.title}</h3>
                  <p className="mb-2 max-w-[34ch] text-sm text-white/80">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-gold">
                    Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-8 flex flex-wrap gap-2.5">
          {chips.map((c) => (
            <li key={c} className="list-none rounded-full bg-info px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink">
              {c}
            </li>
          ))}
        </Reveal>

        {featuredBrands && (
          <Reveal className={"mb-6 text-sm text-ink/75"}>
            {featuredBrands}
          </Reveal>
        )}

        <Reveal>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-control px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-control transition-all hover:-translate-y-0.5 hover:bg-control hover:text-white"
          >
            {ctaLabel} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
