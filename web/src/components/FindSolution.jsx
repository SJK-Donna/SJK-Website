import { useState } from "react";
import SectionHead from "./ui/SectionHead.jsx";
import Reveal from "./ui/Reveal.jsx";

const SOLUTIONS = [
  { eyebrow: "Move Players", title: "Golf Carts", sub: "→ Golf Carts", description: "Premium passenger and utility golf carts for courses, resorts, and communities.", img: "/images/carousel/slide-1.jpg", alt: "Row of golf carts on a golf course", ctaHref: "#fairway" },
  { eyebrow: "Maintain Turf", title: "Turf Equipment", sub: "→ Turf Equipment", description: "Precision mowing and turf care technology for tournament-ready results.", img: "/images/carousel/slide-3.jpg", alt: "Fairway mower cutting turf", ctaHref: "#course-equipment" },
  { eyebrow: "Maintain The Course", title: "Utility & Maintenance Equipment", sub: "→ Utility / Maintenance Equipment", description: "Dependable utility vehicles and maintenance equipment to keep every corner of your course in shape.", img: "/images/carousel/slide-2.jpg", alt: "Utility golf cart on course grounds", ctaHref: "#course-equipment" },
  { eyebrow: "Build Or Improve", title: "Construction Equipment", sub: "→ Construction Equipment", description: "Powerful, dependable machines built to conquer every job — from tight sites to heavy terrain.", img: "/images/carousel/slide-4.jpg", alt: "Mini excavator at a construction site", ctaHref: "#course-equipment" },
  { eyebrow: "Service Equipment", title: "Service & Support", sub: "→ Service & Support", description: "Preventive maintenance, repair, parts, and after-sales support to keep your equipment running.", img: "/images/carousel/slide-3.jpg", alt: "Technician operating turf equipment", ctaHref: "#course-care" }
];

export default function FindSolution() {
  const [active, setActive] = useState(0);
  const s = SOLUTIONS[active];

  return (
    <section id="find-solution" className="bg-warm-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <SectionHead eyebrow="Find Your Solution" title="What Does Your Course Need?" />

        <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="tablist" aria-label="What does your course need?">
          {SOLUTIONS.map((opt, i) => (
            <button
              key={opt.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex flex-col gap-1.5 rounded-2xl border-[1.5px] bg-white px-5 py-5 text-left shadow-raised transition-all hover:-translate-y-0.5 ${
                i === active ? "border-forest shadow-[0_14px_30px_rgba(13,21,18,.14)]" : "border-ink/10"
              }`}
            >
              <span className="font-display text-sm font-bold text-ink">{opt.eyebrow}</span>
              <span className={`font-mono text-xs ${i === active ? "font-semibold text-forest" : "text-ink/55"}`}>{opt.sub}</span>
            </button>
          ))}
        </Reveal>

        <div key={active} className="mt-8 grid animate-[fadeIn_.35s_ease] overflow-hidden rounded-[20px] bg-forest-deep text-white shadow-raised-dark lg:grid-cols-2">
          <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img src={s.img} alt={s.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-gold">{s.eyebrow}</span>
            <h3 className="font-display text-2xl font-bold">{s.title}</h3>
            <p className="max-w-[42ch] text-white/80">{s.description}</p>
            <a
              href={s.ctaHref}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 font-display text-xs font-bold uppercase tracking-wide text-ink shadow-raised transition-transform hover:-translate-y-0.5"
            >
              Explore <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
