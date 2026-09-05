import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CartCanvas from "../three/CartCanvas.jsx";

const THEMES = [
  { name: "Fairway Gold", hex: 0xe8c563 },
  { name: "Deep Emerald", hex: 0x1fae6d },
  { name: "Ion Cyan", hex: 0x35e6e6 },
  { name: "Violet Warp", hex: 0x9d5cff },
  { name: "Signal Red", hex: 0xff4d5e }
];

export default function CartExperience() {
  const cartRef = useRef(null);
  const [active, setActive] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  function pickTheme(i) {
    setActive(i);
    cartRef.current?.setThemeColor(THEMES[i].hex);
  }

  function toggleAutoRotate() {
    const next = !autoRotate;
    setAutoRotate(next);
    cartRef.current?.setAutoRotate(next);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ink">
      <CartCanvas ref={cartRef} initialColor={THEMES[0].hex} />

      <Link
        to="/"
        className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-white shadow-raised-dark backdrop-blur-sm transition-transform hover:-translate-y-0.5"
      >
        ← SJK Guahan
      </Link>

      <div className="pointer-events-none absolute inset-x-0 top-16 z-10 flex flex-col items-center gap-1 px-16 text-center sm:top-5 sm:px-24">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">3D Showcase</span>
        <h1 className="font-display text-lg font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.6)] sm:text-2xl">
          Experience The Cart In Motion
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-4 px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-ink/70 p-3 shadow-raised-dark backdrop-blur-sm">
          {THEMES.map((theme, i) => (
            <button
              key={theme.name}
              type="button"
              aria-label={`Switch to ${theme.name}`}
              aria-pressed={i === active}
              onClick={() => pickTheme(i)}
              className={`h-10 w-10 rounded-full border-2 shadow-raised transition-transform hover:-translate-y-0.5 ${
                i === active ? "border-white scale-110" : "border-white/20"
              }`}
              style={{ backgroundColor: `#${theme.hex.toString(16).padStart(6, "0")}` }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wide text-white/70">{THEMES[active].name}</span>
          <button
            type="button"
            onClick={toggleAutoRotate}
            aria-pressed={autoRotate}
            className={`rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wide shadow-raised transition-all hover:-translate-y-0.5 ${
              autoRotate ? "bg-gold text-ink" : "bg-white/10 text-white"
            }`}
          >
            Auto-Rotate {autoRotate ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}
