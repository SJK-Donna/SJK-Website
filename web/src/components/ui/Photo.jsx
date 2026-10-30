import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A photo that feels alive without being busy:
//  • Reveal — the first time it scrolls into view, a navy panel with an
//    amber leading edge sweeps off it along the logo's diagonal while the
//    photo settles from a slight zoom.
//  • Parallax — while on screen the photo drifts a little against its frame
//    as the page scrolls, giving depth.
//  • Hover — inside a `group` (e.g. a card link) it pushes in slowly.
// Everything is skipped under reduced motion. `className` styles the frame
// (size, aspect ratio, `cut` corners); `position` is the object-position.
export default function Photo({ src, alt = "", position, className = "", imgClassName = "", parallax = true, eager = false, children }) {
  const frame = useRef(null);
  const layer = useRef(null);
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = frame.current;
    if (!el || prefersReducedMotion()) return;

    const io = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    if (!parallax) return () => io.disconnect();

    // Shift the photo layer by up to ±6% of the frame height depending on
    // where the frame sits in the viewport. Written straight to a CSS
    // variable so scrolling never re-renders React.
    let frameId = 0;
    const measure = () => {
      frameId = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const t = (r.top + r.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + r.height / 2);
      layer.current?.style.setProperty("--py", `${(-t * 6).toFixed(2)}%`);
    };
    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [parallax]);

  return (
    <div ref={frame} className={`photo relative overflow-hidden bg-control ${inView ? "is-in" : ""} ${className}`}>
      <div ref={layer} className={`photo-layer absolute inset-x-0 ${parallax ? "-inset-y-[8%]" : "inset-y-0"}`}>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          style={{ objectPosition: position }}
          className={`photo-img h-full w-full object-cover ${imgClassName}`}
        />
      </div>
      {children}
      <span className="photo-curtain" aria-hidden="true" />
    </div>
  );
}
