import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;
const format = (n) => n.toLocaleString("en-PH");

// Counts from 0 to `value` once, when it first comes into view, easing out
// so it settles rather than stops. Visibility is checked on scroll (and on
// mount) instead of with IntersectionObserver, and the count runs on a timer
// rather than animation frames, so it also completes for renderers that do
// not paint. Reduced motion shows the final number straight away.
export default function CountUp({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let timer = 0;
    const start = () => {
      const t0 = window.performance.now();
      timer = window.setInterval(() => {
        const t = Math.min(1, (window.performance.now() - t0) / DURATION_MS);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t >= 1) window.clearInterval(timer);
      }, 16);
    };
    const check = () => {
      const el = ref.current;
      if (!el || el.getBoundingClientRect().top > window.innerHeight * 0.9) return;
      window.removeEventListener("scroll", check);
      start();
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.clearInterval(timer);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final figure, not every intermediate step. */}
      <span aria-hidden="true">
        {format(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
