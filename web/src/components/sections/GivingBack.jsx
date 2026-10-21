import { Margin } from "../home/SectionTitle.jsx";
import { GIVING_BACK } from "../../content/site.js";

// Brief §15 — real activities only; hidden until entries exist.
export default function GivingBack() {
  if (GIVING_BACK.length === 0) return null;
  return (
    <Margin title="Beyond Business" className="bg-surface">
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {GIVING_BACK.map((g) => (
          <article key={g.title}>
            {g.img && <img src={g.img} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover" />}
            <h3 className="wide mt-4 font-sans text-[22px] font-semibold text-ink">{g.title}</h3>
            <p className="mt-2 text-[16px] text-ink/80">{g.body}</p>
          </article>
        ))}
      </div>
    </Margin>
  );
}
