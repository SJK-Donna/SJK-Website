import { Margin } from "../home/SectionTitle.jsx";
import { TESTIMONIALS } from "../../content/site.js";

// Brief §13 — short quotes; hidden until real testimonials are entered.
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <Margin title="What our customers say" className="bg-surface">
      <div className="space-y-14">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="grid gap-6 sm:grid-cols-[200px_1fr]">
            {t.img && <img src={t.img} alt="" loading="lazy" className="aspect-square w-full rounded-[3px] object-cover" />}
            <div>
              <blockquote className="wide font-sans text-[24px] font-semibold leading-[1.25] text-ink lg:text-[28px]">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-[16px] text-ink/80">
                <span className="font-semibold text-ink">{t.name}</span>, {t.role}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </Margin>
  );
}
