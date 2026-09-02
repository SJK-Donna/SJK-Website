import { useEffect, useRef } from "react";

/**
 * Owns the HeroScene's lifecycle: created on mount, disposed on unmount
 * (or React 18 StrictMode's mount→unmount→remount in dev) so no renderer,
 * geometry, or listener survives past this component.
 *
 * `three` is loaded via dynamic import so it ships as its own chunk —
 * the headline, copy, and CTAs render immediately from the main bundle
 * without waiting on it.
 */
export default function HeroCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene;
    let cancelled = false;

    import("./HeroScene.js").then(({ default: HeroScene }) => {
      if (cancelled) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scene = new HeroScene(canvasRef.current, { reducedMotion });
    });

    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className}`} />;
}
