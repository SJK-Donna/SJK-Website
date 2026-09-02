import { useEffect, useState } from "react";
import SectionHead from "./ui/SectionHead.jsx";
import PartnersCanvas from "../three/PartnersCanvas.jsx";

const PARTNERS = [
  { src: "/images/partners/8.png", name: "Manila Golf", cat: "Golf Club" },
  { src: "/images/partners/1.png", name: "Amanpulo", cat: "Luxury Resort" },
  { src: "/images/partners/6.png", name: "Forest Hills Golf & Country Club", cat: "Golf & Country Club" },
  { src: "/images/partners/2.png", name: "FedEx", cat: "Logistics Partner" },
  { src: "/images/partners/4.png", name: "Anvaya Cove Golf & Sports Club", cat: "Golf & Sports Club" },
  { src: "/images/partners/3.png", name: "The Farm at San Benito", cat: "Wellness Resort" },
  { src: "/images/partners/5.png", name: "Valley Golf", cat: "Golf Course" },
  { src: "/images/partners/7.png", name: "Mimosa Plus Golf Course", cat: "Golf Course" }
].map((p) => ({ ...p, href: "#quote" }));

// The real WebGL showcase only makes sense where hover/mouse interaction
// and the extra GPU cost are worthwhile — a wide, non-touch-primary
// viewport. Everywhere else (including reduced motion, since the canvas
// still isn't the point there) a plain accessible card grid takes over:
// per the mobile Three.js guidance, simplify rather than force a worse
// experience.
function canUseScene() {
  return (
    window.matchMedia("(min-width:1024px)").matches &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function OurPartners() {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const sync = () => setShowScene(canUseScene());
    sync();
    const queries = [
      window.matchMedia("(min-width:1024px)"),
      window.matchMedia("(hover:hover) and (pointer:fine)"),
      window.matchMedia("(prefers-reduced-motion: reduce)")
    ];
    queries.forEach((q) => q.addEventListener("change", sync));
    return () => queries.forEach((q) => q.removeEventListener("change", sync));
  }, []);

  return (
    <section id="partners" className="bg-ink px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <SectionHead
          eyebrow="Our Partners"
          title="Stronger Together."
          lead="We work alongside trusted golf courses, resorts, and logistics partners to deliver quality equipment, solutions, and service on every project."
          dark
        />

        {showScene ? (
          <>
            <div className="relative h-[560px] w-full overflow-hidden rounded-3xl">
              <PartnersCanvas partners={PARTNERS} onNavigate={(href) => (window.location.hash = href)} />
            </div>
            {/* Real, focusable links for keyboard/screen-reader users — the
                canvas above is a decorative enhancement, not the only way
                to reach a partner. */}
            <ul className="sr-only">
              {PARTNERS.map((p) => (
                <li key={p.name}>
                  <a href={p.href}>{p.name} — {p.cat}</a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-raised transition-transform hover:-translate-y-1"
              >
                <img src={p.src} alt={p.name} loading="lazy" className="h-16 w-full object-contain" />
                <span className="text-center font-display text-xs font-bold text-ink">{p.name}</span>
                <span className="text-center font-mono text-[10px] uppercase tracking-wide text-gold-deep">{p.cat}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
