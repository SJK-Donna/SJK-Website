import Reveal from "./ui/Reveal.jsx";
import SectionHead from "./ui/SectionHead.jsx";

// Each card's accent is sampled from that brand's own logo so the ad reads
// as theirs, while the layout itself stays in the site palette.
const BRANDS = [
  {
    name: "GolfCarts.PH",
    logo: "/images/brands/golfcarts-ph-logo.png",
    accent: "#86ab42",
    tagline: "Your Ride, On And Off The Course.",
    body: "Premium Club Car golf carts and utility vehicles for golf courses, resorts, and communities across the Philippines — with fleet options sized to your property.",
    chips: ["Golf Carts", "Utility Vehicles", "Fleet Solutions"],
    cta: "Explore Golf Carts",
    href: "#fairway"
  },
  {
    name: "GroundMasters.PH",
    logo: "/images/brands/groundmasters-ph-logo.png",
    accent: "#03784f",
    tagline: "Grounds Care, Mastered.",
    body: "Turf and grounds maintenance solutions that keep fairways, greens, and outdoor spaces healthy, consistent, and ready for play.",
    chips: ["Turf Care", "Grounds Maintenance", "Course Upkeep"],
    cta: "Explore Grounds Care",
    href: "#course-care"
  }
];

export default function BrandIntro() {
  return (
    <section id="introducing" className="bg-warm-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <SectionHead
          eyebrow="Introducing"
          title="Two Brands. One Standard Of Care."
          lead="Meet GolfCarts.PH and GroundMasters.PH — dedicated brands for moving players and caring for the grounds they play on."
          center
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {BRANDS.map((b, i) => (
            <Reveal
              key={b.name}
              delay={i * 120}
              as="article"
              className="flex flex-col overflow-hidden rounded-3xl bg-surface shadow-raised transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="h-1.5" style={{ backgroundColor: b.accent }} />
              <div className="flex h-56 items-center justify-center border-b border-ink/10 bg-surface px-10 py-8">
                <img src={b.logo} alt={`${b.name} logo`} loading="lazy" className="max-h-full w-auto max-w-[280px] object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <span className="mb-3 inline-flex w-fit rounded-full bg-info px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
                  Now Introducing
                </span>
                <h3 className="mb-3 font-display text-2xl font-bold text-ink">{b.tagline}</h3>
                <p className="mb-6 max-w-[52ch] leading-relaxed text-ink/75">{b.body}</p>
                <ul className="mb-8 flex flex-wrap gap-2">
                  {b.chips.map((c) => (
                    <li key={c} className="rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink/80">
                      {c}
                    </li>
                  ))}
                </ul>
                <a
                  href={b.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-control px-6 py-3 font-display text-xs font-bold uppercase tracking-wide text-white shadow-raised transition-transform hover:-translate-y-0.5"
                >
                  {b.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
