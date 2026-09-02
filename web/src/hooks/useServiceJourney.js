import { useEffect, useRef, useState } from "react";

/**
 * Drives the Course Care scroll-perspective journey: (stages + 1) extra
 * scroll segments — a leading "intro" segment with nothing active, then
 * one per stage — mapped from scroll position while pinned (desktop/
 * tablet, motion allowed), or a plain per-block IntersectionObserver
 * reveal in normal document flow otherwise (mobile, or reduced motion
 * at any width). See CourseCare.css for the layout switch itself.
 */
export default function useServiceJourney(total) {
  const rootRef = useRef(null);
  const mediaRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = intro, no stage reached yet
  const [revealed, setRevealed] = useState(() => new Array(total).fill(false));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pinnedQuery = window.matchMedia("(min-width:700px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scrollDriven = pinnedQuery.matches && !reduceMotion;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!scrollDriven) return;
        const rect = root.getBoundingClientRect();
        const scrollable = root.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        const segment = Math.min(total, Math.floor(progress * (total + 1)));
        setActiveIndex(segment - 1);
      });
    }

    function syncMode() {
      scrollDriven = pinnedQuery.matches && !reduceMotion;
      if (!scrollDriven) setActiveIndex(-1);
    }

    syncMode();
    pinnedQuery.addEventListener("change", syncMode);
    window.addEventListener("scroll", onScroll, { passive: true });

    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const i = mediaRefs.current.indexOf(entry.target);
              if (i !== -1) {
                setRevealed((prev) => (prev[i] ? prev : prev.map((v, idx) => (idx === i ? true : v))));
                io.unobserve(entry.target);
              }
            }
          });
        },
        { threshold: 0.3 }
      );
      mediaRefs.current.forEach((el) => el && io.observe(el));
    } else {
      setRevealed(new Array(total).fill(true));
    }

    return () => {
      pinnedQuery.removeEventListener("change", syncMode);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [total]);

  function goToStep(i) {
    const root = rootRef.current;
    const pinnedQuery = window.matchMedia("(min-width:700px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pinnedQuery.matches && !reduceMotion && root) {
      const rect = root.getBoundingClientRect();
      const scrollable = root.offsetHeight - window.innerHeight;
      if (scrollable > 0) {
        const segment = scrollable / (total + 1);
        const targetY = window.scrollY + rect.top + segment * (i + 1) + 1;
        window.scrollTo({ top: targetY, behavior: reduceMotion ? "instant" : "smooth" });
      }
    } else {
      mediaRefs.current[i]?.closest("[data-stage]")?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "center" });
    }
  }

  return { rootRef, mediaRefs, activeIndex, revealed, goToStep };
}
