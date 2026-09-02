import Reveal from "./ui/Reveal.jsx";
import SectionHead from "./ui/SectionHead.jsx";

const BRANDS = [
  { word: "Golf Carts PH", body: "Premium Club Car golf carts and utility vehicles for courses, resorts, and communities across the Philippines.", chips: ["Golf Carts", "Utility Vehicles"], img: "/images/brands/golf-carts-ph.jpg", alt: "Golf Carts PH branded Club Car golf carts on a misty golf course", href: "#fairway" },
  { word: "Jacobsen", body: "Precision turf care technology trusted on courses that demand tournament-ready results.", chips: ["Mowing", "Turf Care"], img: "/images/brands/jacobsen-bunker.jpg", alt: "Jacobsen branded fairway mower beside a bunker", href: "#course-equipment", reverse: true },
  { word: "Wacker Neuson", body: "Durable construction and compaction equipment built for demanding job sites.", chips: ["Construction", "Compaction", "Utility"], img: "/images/brands/wacker-neuson-mountain.jpg", alt: "Wacker Neuson branded excavator working on mountainous terrain", href: "#course-equipment" },
  { word: "Smithco", body: "Bunker rakes, sprayers, and course maintenance equipment engineered for consistent, dependable performance.", chips: ["Bunker Rakes", "Sprayers"], img: "/images/brands/smithco-bunker-rake.jpg", alt: "Smithco branded bunker rake being operated on a sand trap", href: "#course-equipment", reverse: true },
  { word: "Campey", body: "Turf renovation and aeration equipment built to keep playing surfaces in premium condition.", chips: ["Turf Renovation", "Aeration"], img: "/images/brands/campey.jpg", alt: "Campey Turf Care Systems branded machine on a sports pitch", href: "#course-equipment" }
];

export default function Brands() {
  return (
    <section id="brands" className="bg-ink px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <SectionHead eyebrow="Our Brands" title="Trusted Brands. Proven Performance." dark />

        <div className="space-y-16">
          {BRANDS.map((b) => (
            <Reveal
              key={b.word}
              className={`grid items-center gap-10 lg:grid-cols-2 ${b.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl shadow-raised-dark">
                <img src={b.img} alt={b.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div>
                <span className="mb-3 block font-display text-2xl font-bold text-white">{b.word}</span>
                <p className="mb-4 max-w-[48ch] text-white/75">{b.body}</p>
                <ul className="mb-5 flex flex-wrap gap-2">
                  {b.chips.map((c) => (
                    <li key={c} className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-white/70">
                      {c}
                    </li>
                  ))}
                </ul>
                <a href={b.href} className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-gold hover:opacity-80">
                  Explore <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
