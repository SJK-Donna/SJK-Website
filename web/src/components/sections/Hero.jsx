import { useEffect, useState } from "react";
import PillLinks from "../home/PillLinks.jsx";
import { COMPANY, HERO_SLIDES } from "../../content/site.js";

const INTERVAL_MS = 4500;

// Brief §7: the brief's headline over large imagery that cross-fades every
// ~4.5 seconds (the brief asks for 3–5). A caption names what is shown, and
// a pause control stops the rotation; under reduced motion it starts paused.
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section aria-labelledby="hero-title" className="bg-nav px-6 pb-8 pt-14 lg:pt-20">
      <div className="mx-auto max-w-[1240px]">
        <p className="font-sans text-[15px] font-semibold text-control">{COMPANY.name}</p>
        <h1
          id="hero-title"
          className="wide mt-4 max-w-[19ch] font-sans text-[42px] font-semibold leading-[0.98] tracking-[-0.025em] text-ink sm:text-[60px] lg:text-[80px]"
        >
          {COMPANY.headline}
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[52ch] text-[19px] text-ink/80 lg:col-span-6 lg:text-[20px]">{COMPANY.positioning}</p>
          <PillLinks
            primary={{ label: "Explore Our Businesses", href: "/#businesses" }}
            secondary={{ label: "View Our Projects", href: "/projects" }}
            className="lg:col-span-6 lg:justify-end"
          />
        </div>

        <figure className="mt-12">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[3px] bg-ink/10 lg:aspect-[16/9]">
            {HERO_SLIDES.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={i === index ? s.alt : ""}
                aria-hidden={i !== index}
                loading={i === 0 ? "eager" : "lazy"}
                style={{ objectPosition: s.position }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-6 font-sans text-[15px] text-ink/80">
            <span aria-live="polite">{HERO_SLIDES[index].caption}</span>
            <span className="flex items-center gap-4">
              <span className="flex gap-1.5" aria-hidden="true">
                {HERO_SLIDES.map((s, i) => (
                  <span key={s.src} className={`h-[3px] w-6 transition-colors ${i === index ? "bg-info" : "bg-ink/20"}`} />
                ))}
              </span>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play hero images" : "Pause hero images"}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink"
              >
                {paused ? (
                  <svg viewBox="0 0 16 16" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
                )}
              </button>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
