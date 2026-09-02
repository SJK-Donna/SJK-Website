import Reveal from "./ui/Reveal.jsx";
import Button from "./ui/Button.jsx";

const PILLARS = [
  "Golf Carts & Fleet Solutions",
  "Course & Turf Equipment",
  "Construction Machinery",
  "Nationwide Service & Support"
];

export default function TeeOff() {
  return (
    <section id="tee-off" className="bg-warm-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="mb-3.5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-gold-deep">
            <span className="h-px w-6 bg-current opacity-70" />
            01 — Tee Off
          </span>
          <h2 className="mb-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-tight text-ink">Tee Off With Confidence.</h2>
          <p className="mb-7 max-w-[52ch] text-base leading-relaxed text-ink/70">
            Powering Outdoor Excellence — dependable equipment and innovative solutions engineered to perform, from golf and turf care to construction, delivered across the Philippines.
          </p>
          <ul className="mb-8 space-y-3">
            {PILLARS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-semibold text-ink">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <Button as="a" href="#find-solution" variant="primary">
            Discover Our Solutions <span aria-hidden="true">→</span>
          </Button>
        </Reveal>

        <Reveal delay={120} className="overflow-hidden rounded-3xl shadow-raised">
          <img
            src="/images/carousel/slide-2.jpg"
            alt="Golf cart parked beneath trees on a fairway"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
