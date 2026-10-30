import Photo from "../ui/Photo.jsx";
import { Margin } from "../home/SectionTitle.jsx";
import { GIVING_BACK } from "../../content/site.js";

// Brief §15 — real activities only; hidden until entries exist.
export default function GivingBack() {
  if (GIVING_BACK.length === 0) return null;
  return (
    <Margin eyebrow="Giving Back" title="Beyond Business" className="bg-surface">
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {GIVING_BACK.map((g) => (
          <article key={g.title} className="group">
            {g.img && <Photo src={g.img} className="cut aspect-[4/3] w-full" />}
            <h3 className="wide mt-5 font-sans text-[22px] font-extrabold text-ink">{g.title}</h3>
            <p className="mt-2 text-[16px] text-ink/80">{g.body}</p>
          </article>
        ))}
      </div>
    </Margin>
  );
}
