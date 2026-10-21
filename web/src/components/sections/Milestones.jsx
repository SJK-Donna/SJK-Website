import Reveal from "../ui/Reveal.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { MILESTONES } from "../../content/site.js";

// Brief §11 — only verified statements; add figures in content/site.js.
export default function Milestones() {
  return (
    <section className="bg-surface px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionTitle eyebrow="Numbers & Milestones" title="Established. Nationwide. Supported locally." center className="mb-12" />
        <dl className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.value} delay={i * 80} className="bg-nav p-8">
              <dt className="font-sans text-[26px] font-semibold leading-tight tracking-[-0.01em] text-control lg:text-[30px]">{m.value}</dt>
              {m.label && <dd className="mt-1 text-[15px] font-semibold text-ink">{m.label}</dd>}
              <dd className="mt-2 text-[15px] leading-relaxed text-ink/80">{m.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
