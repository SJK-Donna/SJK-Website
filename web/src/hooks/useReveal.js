import { useEffect, useRef, useState } from "react";

/**
 * Fade+slide-up once an element scrolls into view — the same subtle
 * "reveal" treatment used across the old site's .reveal class, ported
 * as a hook so any section can opt in. Skips straight to visible under
 * prefers-reduced-motion.
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}
