import { Margin } from "../home/SectionTitle.jsx";
import CountUp from "../home/CountUp.jsx";
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

// Brief §11 — "a clean visual or animated numbers section": counters that
// count up once on entry, above the brief's four milestone statements.
export default function Milestones() {
  return (
    <Margin
      id="milestones"
      title="Numbers & Milestones"
      img="/images/sjk/battery-service.jpg"
      alt="Golfcarts.ph technician servicing the battery pack of a golf cart"
      className="bg-surface"
    >
      <dl className="grid grid-cols-2 gap-x-10 gap-y-10 lg:grid-cols-4">
        {[...VERIFIED, ...EXTRA].map((s) => (
          <div key={s.label} className={`border-t-2 pt-5 ${s.isSample ? "border-dashed border-info" : "border-info"}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <CountUp value={s.value} suffix={s.suffix} className="wide block font-sans text-[44px] font-semibold leading-none tracking-[-0.03em] text-ink lg:text-[52px]" />
            </dd>
            <dd className="mt-3 font-sans text-[16px] font-semibold leading-snug text-ink" aria-hidden="true">{s.label}</dd>
            {s.detail && <dd className="mt-1 text-[15px] text-ink/75">{s.detail}</dd>}
            {s.isSample && (
              <dd className="mt-2 inline-block bg-info px-2 py-0.5 font-sans text-[12px] font-semibold text-ink">Sample: verify before launch</dd>
            )}
          </div>
        ))}
      </dl>

      <dl className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {MILESTONES.map((m) => (
          <div key={m.value} className="border-t-2 border-ink pt-5">
            <dt className="wide font-sans text-[22px] font-semibold leading-tight tracking-[-0.01em] text-ink lg:text-[26px]">{m.value}</dt>
            <dd className="mt-2 max-w-[40ch] text-ink/80">{m.detail}</dd>
          </div>
        ))}
      </dl>
    </Margin>
  );
}
