import PillLinks from "../home/PillLinks.jsx";
import { Margin } from "../home/SectionTitle.jsx";
import { INTRO } from "../../content/site.js";

// Brief §8 — who SJK is. The philosophy line is set as a pull quote: it is
// the sentence the brief most wants remembered.
export default function Intro() {
  return (
    <Margin title="More Than Equipment" className="bg-surface">
      <div className="grid gap-10 xl:grid-cols-[1fr_340px]">
        <div>
          <p className="max-w-[58ch] text-[21px] leading-[1.55] text-ink">{INTRO.body[0]}</p>
          <p className="mt-5 max-w-[58ch] text-ink/80">{INTRO.body[1]}</p>
          <blockquote className="wide mt-12 max-w-[24ch] border-l-[3px] border-info pl-6 font-sans text-[26px] font-semibold leading-[1.2] text-control lg:text-[30px]">
            {INTRO.philosophy}
          </blockquote>
          <PillLinks primary={{ label: "Our Story", href: "/who-we-are#story" }} className="mt-10" />
        </div>
        {INTRO.img && <img src={INTRO.img} alt={INTRO.alt} loading="lazy" className="h-auto w-full rounded-[3px] xl:mt-2" />}
      </div>
    </Margin>
  );
}
