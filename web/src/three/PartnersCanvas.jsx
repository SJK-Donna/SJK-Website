import { useEffect, useRef } from "react";

export default function PartnersCanvas({ partners, onNavigate, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene;
    let cancelled = false;

    import("./PartnersScene.js").then(({ default: PartnersScene }) => {
      if (cancelled) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scene = new PartnersScene(canvasRef.current, { partners, reducedMotion, onNavigate });
    });

    return () => {
      cancelled = true;
      scene?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className}`} />;
}
