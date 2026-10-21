import { useEffect, useState } from "react";
import PillLinks from "../home/PillLinks.jsx";
import { COMPANY, HERO_IMAGES } from "../../content/site.js";

const INTERVAL_MS = 4500;

// Brief §7: imagery of the environments SJK works in, rotating every 3–5s.
// A plain cross-fade (no slider chrome), with a pause control because
// auto-advancing content needs one, and no motion at all when the visitor
// has asked for reduced motion.
export default function HeroRotator() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section aria-label="Introduction" className="bg-nav">
      <div className="mx-auto max-w-[980px] px-6 pb-10 pt-14 text-center lg:pt-20">
        <p className="text-[17px] font-semibold text-control">SJK Guahan Inc.</p>
        <h1 className="mt-2 font-sans text-[38px] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[64px]">
          {COMPANY.headline}
        </h1>
        <p className="mx-auto mt-5 max-w-[56ch] text-[19px] leading-relaxed text-ink/80 lg:text-[21px]">{COMPANY.positioning}</p>
        <PillLinks primary={{ label: "Explore Our Businesses", href: "/#businesses" }} secondary={{ label: "View Our Projects", href: "/projects" }} className="mt-8" />
      </div>

      <div className="relative h-[380px] overflow-hidden sm:h-[480px] lg:h-[600px]">
        {HERO_IMAGES.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={i === index ? img.alt : ""}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play background images" : "Pause background images"}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-nav/85 text-ink backdrop-blur transition-colors hover:bg-nav"
        >
          {paused ? (
            <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
          )}
        </button>
      </div>
    </section>
  );
}
