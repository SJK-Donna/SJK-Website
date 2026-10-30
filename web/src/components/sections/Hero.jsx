import { useEffect, useState } from "react";
import PillLinks from "../home/PillLinks.jsx";
import { COMPANY, HERO_SLIDES } from "../../content/site.js";

const INTERVAL_MS = 6000;

// Brief §7, set full-screen: the photos cross-fade behind a navy wash with
// a slow push-in on each, the amber flag from the logo plants itself, and
// the headline arrives along the logo's diagonal. A caption names what is
// shown, and a pause control stops the rotation; under reduced motion it
// starts paused.
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [paused, index]);

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-control text-white">
      {/* Photos */}
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={i === index ? s.alt : ""}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            style={{ objectPosition: s.position }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              i === index ? `opacity-100 ${paused ? "" : "ken-burns"}` : "opacity-0"
            }`}
          />
        ))}
        {/* Navy wash: heavy on the left where the text sits, and along the
            bottom for the caption; the photo shows through on the right. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,28,44,.94)_0%,rgba(13,28,44,.78)_42%,rgba(13,28,44,.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-control/90 to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-6 pb-10 pt-16 lg:pt-20">
        <div className="relative">
          {/* The flag on the pin: amber triangle beside a navy-white "pole". */}
          <div className="mb-8 flex items-start gap-0" aria-hidden="true">
            <span className="block h-16 w-[5px] bg-white lg:h-20" />
            <span className="flag flag-plant block h-12 w-12 lg:h-14 lg:w-14" />
          </div>

          <p className="eyebrow rise text-white/80" style={{ animationDelay: "0.35s" }}>{COMPANY.name}</p>
          <h1
            id="hero-title"
            className="wide rise mt-5 max-w-[17ch] font-sans text-[40px] font-black leading-[0.98] tracking-[-0.03em] sm:text-[60px] lg:text-[84px]"
            style={{ animationDelay: "0.5s" }}
          >
            {COMPANY.headline}
          </h1>
          <p className="rise mt-8 max-w-[52ch] text-[18px] text-white/80 lg:text-[20px]" style={{ animationDelay: "0.7s" }}>
            {COMPANY.positioning}
          </p>
          <div className="rise" style={{ animationDelay: "0.85s" }}>
            <PillLinks
              onDark
              primary={{ label: "Explore Our Businesses", href: "/#businesses" }}
              secondary={{ label: "View Our Projects", href: "/projects" }}
              className="mt-10"
            />
          </div>
        </div>
      </div>

      {/* Caption, slide progress and pause control */}
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-5 font-sans text-[14px] text-white/80">
          <p aria-live="polite" className="flex items-center gap-3">
            <span className="wide font-bold text-info">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-white/40">/ {String(HERO_SLIDES.length).padStart(2, "0")}</span>
            <span className="ml-2">{HERO_SLIDES[index].caption}</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1}: ${s.caption}`}
                  aria-current={i === index}
                  className="group py-3"
                >
                  <span className="relative block h-[3px] w-8 overflow-hidden bg-white/25 group-hover:bg-white/50 lg:w-12">
                    {i < index && <span className="absolute inset-0 bg-info" />}
                    {i === index && (
                      <span
                        key={`${index}-${paused}`}
                        className={`absolute inset-0 bg-info ${paused ? "" : "progress-fill"}`}
                        style={{ animationDuration: `${INTERVAL_MS}ms` }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play hero images" : "Pause hero images"}
              className="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-info hover:text-info"
            >
              {paused ? (
                <svg viewBox="0 0 16 16" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
