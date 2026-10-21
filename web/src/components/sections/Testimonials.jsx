import Reveal from "../ui/Reveal.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { TESTIMONIALS } from "../../content/site.js";

// Brief §13 — short quotes; hidden until real testimonials are entered.
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="bg-surface px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionTitle eyebrow="Customer Testimonials" title="Long-term relationships." center className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} as="figure" className="flex flex-col overflow-hidden rounded-[22px] bg-nav">
              {t.img && <img src={t.img} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
              <div className="flex flex-1 flex-col p-7">
                <blockquote className="flex-1 font-sans text-[19px] font-semibold leading-snug text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-[14px] text-ink/80">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <br />
                  {t.role}
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
