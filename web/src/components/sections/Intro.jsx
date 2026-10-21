import Reveal from "../ui/Reveal.jsx";
import PillLinks from "../home/PillLinks.jsx";
import { INTRO } from "../../content/site.js";

// Brief §8 — who SJK is, in two short paragraphs and one philosophy line.
export default function Intro() {
  return (
    <section className="bg-surface px-6 py-20 lg:py-28">
      <Reveal className="mx-auto max-w-[820px] text-center">
        <p className="text-[17px] font-semibold text-control">{INTRO.eyebrow}</p>
        {INTRO.body.map((p, i) => (
          <p key={i} className={`mx-auto max-w-[60ch] leading-relaxed text-ink/80 ${i === 0 ? "mt-4 text-[21px] text-ink lg:text-[24px]" : "mt-4 text-[19px]"}`}>
            {p}
          </p>
        ))}
        <p className="mx-auto mt-8 max-w-[34ch] font-sans text-[26px] font-semibold leading-snug tracking-[-0.01em] text-ink lg:text-[32px]">{INTRO.philosophy}</p>
        <PillLinks primary={{ label: "Our Story", href: "/who-we-are#story" }} className="mt-8" />
      </Reveal>
    </section>
  );
}
