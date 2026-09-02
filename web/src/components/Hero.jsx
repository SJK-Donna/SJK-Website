import HeroCanvas from "../three/HeroCanvas.jsx";
import Button from "./ui/Button.jsx";

export default function Hero() {
  return (
    <section id="hero" aria-label="Introduction" className="relative flex min-h-screen w-full items-center overflow-hidden bg-ink">
      {/* Base gradient sits under the canvas so the scene never renders on a flat black. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,#173e2e_0%,#0f2a20_45%,#0d1512_100%)]" />
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      {/* Legibility scrim so headline/CTAs stay readable over the 3D scene. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-28 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-gold">
            <span className="h-px w-6 bg-current opacity-70" />
            SJK Guahan
          </span>
          <h1 className="mb-6 text-[clamp(34px,5.6vw,64px)] font-semibold leading-[1.08] text-white">
            Powering Every Round. Maintaining Every Course.
          </h1>
          <p className="mb-9 max-w-[52ch] text-base leading-relaxed text-white/80 sm:text-lg">
            Golf carts, course equipment, turf solutions, and professional golf services — all in one place.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button as="a" href="#find-solution" variant="primary">
              Explore Solutions <span aria-hidden="true">→</span>
            </Button>
            <Button as="a" href="#course-care" variant="outline">
              Our Services
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#tee-off"
        aria-label="Scroll to learn more"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/85 transition-opacity hover:opacity-100"
      >
        <span className="flex h-8 w-6 justify-center rounded-full border border-white/60 pt-1.5">
          <span className="h-1.5 w-0.5 animate-bounce rounded-full bg-gold motion-reduce:animate-none" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em]">Scroll</span>
      </a>
    </section>
  );
}
