import Reveal from "../ui/Reveal.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { GIVING_BACK } from "../../content/site.js";

// Brief §15 — real activities only; hidden until entries exist.
export default function GivingBack() {
  if (GIVING_BACK.length === 0) return null;
  return (
    <section className="bg-surface px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionTitle eyebrow="Giving Back & Responsibility" title="Beyond Business" center className="mb-12" />
        <div className="grid gap-4 md:grid-cols-3">
          {GIVING_BACK.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} as="article" className="overflow-hidden rounded-[22px] bg-nav">
              {g.img && <img src={g.img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />}
              <div className="p-6">
                <h3 className="font-sans text-[21px] font-semibold text-ink">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
