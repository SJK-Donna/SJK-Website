import { useEffect, useRef, useState } from "react";
import SectionTitle from "../home/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";
import { REELS } from "../../content/site.js";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// "In the Field": short vertical clips from courses, workshops and events,
// shown as reels. Each plays silently while it is on screen and stops when
// it leaves; nothing downloads until a clip comes near the viewport. Every
// clip has a pause button, and under reduced motion none starts by itself.
export default function Reels() {
  if (REELS.length === 0) return null;
  return (
    <section aria-labelledby="reels-title" className="overflow-hidden bg-nav py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6">
        <SectionTitle
          id="reels-title"
          eyebrow="In the Field"
          title="See Us at Work"
          lead="On the fairway, on the cart path and at industry events across the Philippines."
        />
      </div>
      {/* Phones: a swipeable row. Large screens: four staggered columns. */}
      <ul className="mx-auto mt-12 flex max-w-[1320px] snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:items-start lg:overflow-visible">
        {REELS.map((r, i) => (
          <Reveal as="li" key={r.src} delay={i * 90} className={`w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto ${i % 2 ? "lg:mt-12" : ""}`}>
            <Reel reel={r} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Reel({ reel }) {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  // Set once the visitor presses pause, so scrolling back doesn't restart it.
  const userPaused = useRef(prefersReducedMotion());

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = video.current;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  return (
    <figure className="cut group relative aspect-[9/16] overflow-hidden bg-control">
      <video
        ref={video}
        src={reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={reel.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-control/90 via-control/40 to-transparent px-5 pb-5 pt-24 text-white">
        <p className="eyebrow flex items-center gap-2 text-[10px] text-info">
          <span className="flag h-2.5 w-2.5" aria-hidden="true" />
          {reel.tag}
        </p>
        <figcaption className="wide mt-2 font-sans text-[20px] font-extrabold leading-tight">{reel.title}</figcaption>
      </div>
      <button
        type="button"
        onClick={toggle}
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
