import SectionTitle from "../home/SectionTitle.jsx";
import CountUp from "../home/CountUp.jsx";
import Reveal from "../ui/Reveal.jsx";
import { BRAND_GROUPS, BUSINESSES, LOCATIONS, MILESTONES, PENDING_FIGURES } from "../../content/site.js";

const FOUNDED = 2017;

// Figures derived from content the site already holds, so they stay true
// as brands or branches are added.
const VERIFIED = [
  { value: new Date().getFullYear() - FOUNDED, suffix: "", label: "Years serving the Philippine market", detail: `Since ${FOUNDED}` },
  { value: BRAND_GROUPS.reduce((n, g) => n + g.brands.length, 0), suffix: "", label: "International brands represented" },
  { value: LOCATIONS.length, suffix: "", label: "Branches nationwide", detail: LOCATIONS.map((l) => l.name).join(", ") },
  { value: BUSINESSES.length, suffix: "", label: "Operating businesses", detail: BUSINESSES.map((b) => b.name).join(" and ") }
];

// Verified additional figures always show; samples only in local dev.
const EXTRA = PENDING_FIGURES.flatMap((f) =>
  f.value != null ? [{ ...f, isSample: false }] : import.meta.env.DEV ? [{ ...f, value: f.sample, isSample: true }] : []
);

// Brief §11 — "a clean visual or animated numbers section": big amber
// counters on navy that count up once on entry, above the brief's four
// milestone statements.
export default function Milestones() {
  return (
    <section id="milestones" className="bg-forest-deep px-6 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <SectionTitle eyebrow="Numbers & Milestones" title="Built over years, proven in the field." onDark />

        <dl className="mt-14 grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
          {[...VERIFIED, ...EXTRA].map((s, i) => (
            <Reveal key={s.label} delay={(i % 4) * 100} className={`border-b border-white/15 py-8 pr-6 ${i % 4 ? "lg:border-l lg:pl-8" : ""} ${i % 2 ? "border-l pl-6 lg:pl-8" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value} suffix={s.suffix} className="wider block font-sans text-[52px] font-black leading-none tracking-[-0.03em] text-info lg:text-[72px]" />
              </dd>
              <dd className="mt-4 font-sans text-[16px] font-bold leading-snug text-white" aria-hidden="true">{s.label}</dd>
              {s.detail && <dd className="mt-1 text-[15px] text-white/60">{s.detail}</dd>}
              {s.isSample && (
                <dd className="mt-2 inline-block bg-info px-2 py-0.5 font-sans text-[12px] font-semibold text-ink">Sample: verify before launch</dd>
              )}
            </Reveal>
          ))}
        </dl>

        <dl className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.value} delay={i * 100}>
              <span className="flag mb-4 block h-4 w-4" aria-hidden="true" />
              <dt className="wide font-sans text-[20px] font-extrabold leading-tight tracking-[-0.01em] text-white lg:text-[22px]">{m.value}</dt>
              <dd className="mt-2 max-w-[34ch] text-[15px] text-white/65">{m.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
