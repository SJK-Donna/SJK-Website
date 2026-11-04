import { useEffect, useRef, useState } from "react";
import SectionTitle from "../home/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";
import { REELS } from "../../content/site.js";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// "In the Field": short vertical clips from courses and events, shown as
// reels. The brief asks for video of equipment in real environments but
// warns against too many moving elements, so only one clip plays at a
// time: each plays once, then hands over to the next, while the others
// rest on their poster frame. Playback runs only while the section is on
// screen. Pointing at or pressing a reel plays it; its button pauses
// everything. Under reduced motion nothing starts by itself.
export default function Reels() {
  const section = useRef(null);
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(prefersReducedMotion);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new window.IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (REELS.length === 0) return null;
  const next = () => setActive((i) => (i + 1) % REELS.length);

  return (
    <section ref={section} aria-labelledby="reels-title" className="overflow-hidden bg-nav py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6">
        <SectionTitle
          id="reels-title"
          eyebrow="In the Field"
          title="See Us at Work"
          lead="Equipment and mobility solutions working in real environments, on the course and at industry events."
        />
      </div>
      {/* Phones: a swipeable row. Large screens: four staggered columns. */}
      <ul className="mx-auto mt-12 flex max-w-[1320px] snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 lg:grid lg:grid-cols-4 lg:items-start lg:gap-6 lg:overflow-visible">
        {REELS.map((r, i) => (
          <Reveal as="li" key={r.src} delay={i * 90} className={`w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto ${i % 2 ? "lg:mt-12" : ""}`}>
            <Reel
              reel={r}
              isActive={i === active}
              playing={i === active && onScreen && !stopped}
              onEnded={next}
              onPick={() => {
                setActive(i);
                setStopped(false);
              }}
              onStop={() => setStopped(true)}
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Reel({ reel, isActive, playing, onEnded, onPick, onStop }) {
  const video = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  // A reel that loses its turn starts from the beginning next time.
  useEffect(() => {
    if (!isActive && video.current) video.current.currentTime = 0;
  }, [isActive]);

  return (
    <figure
      onMouseEnter={() => !isActive && onPick()}
      className={`cut group relative aspect-[9/16] overflow-hidden bg-control transition-[filter,opacity] duration-500 ${isActive ? "" : "opacity-80 saturate-[.6]"}`}
    >
      <video
        ref={video}
        src={reel.src}
        poster={reel.poster}
        muted
        playsInline
        preload="none"
        aria-label={reel.alt}
        onEnded={onEnded}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isActive ? "scale-[1.03]" : ""}`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-control/90 via-control/40 to-transparent px-5 pb-5 pt-24 text-white">
        <p className="eyebrow flex items-center gap-2 text-[10px] text-info">
          <span className="flag h-2.5 w-2.5" aria-hidden="true" />
          {reel.tag}
        </p>
        <figcaption className="wide mt-2 font-sans text-[18px] font-extrabold leading-tight">{reel.title}</figcaption>
      </div>
      {/* Amber bar along the bottom marks the reel that has the turn. */}
      <span className={`absolute inset-x-0 bottom-0 h-1 origin-left bg-info transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`} aria-hidden="true" />
      <button
        type="button"
        onClick={playing ? onStop : onPick}
        aria-label={`${playing ? "Pause" : "Play"} video: ${reel.title}`}
        className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-control/70 text-white transition-colors hover:bg-info hover:text-control"
      >
        {playing ? (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M4 2h3v12H4zM9 2h3v12H9z" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M4 2l10 6-10 6z" /></svg>
        )}
      </button>
    </figure>
  );
}
