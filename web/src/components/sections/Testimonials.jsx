import Photo from "../ui/Photo.jsx";
import { Margin } from "../home/SectionTitle.jsx";
import { TESTIMONIALS } from "../../content/site.js";

// Brief §13 — short quotes; hidden until real testimonials are entered.
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <Margin eyebrow="Testimonials" title="Customer Testimonials" className="bg-surface">
      <div className="space-y-14">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="grid gap-6 sm:grid-cols-[200px_1fr]">
            {t.img && <Photo src={t.img} parallax={false} className="cut cut-sm aspect-square w-full" />}
            <div>
              <blockquote className="wide font-sans text-[24px] font-extrabold leading-[1.25] text-ink lg:text-[28px]">“{t.quote}”</blockquote>
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
