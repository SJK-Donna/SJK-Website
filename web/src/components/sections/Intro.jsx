import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import Photo from "../ui/Photo.jsx";
import Reveal from "../ui/Reveal.jsx";
import { INTRO } from "../../content/site.js";

// Brief §8 — who SJK is. Text on the left, a cut-corner photo on the right;
// the philosophy line is the pull quote because it is the sentence the
// brief most wants remembered.
export default function Intro() {
  return (
    <section className="bg-surface px-6 py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionTitle eyebrow="Who We Are" title="More Than Equipment" />
          <Reveal delay={100}>
            <p className="mt-8 max-w-[58ch] text-[20px] leading-[1.55] text-ink">{INTRO.body[0]}</p>
            <p className="mt-5 max-w-[58ch] text-ink/75">{INTRO.body[1]}</p>
          </Reveal>
          <Reveal delay={200}>
            <blockquote className="relative mt-12 max-w-[26ch] pl-10 font-sans text-[24px] font-extrabold leading-[1.2] text-control lg:text-[28px]">
              <span className="flag absolute left-0 top-1 h-6 w-6" aria-hidden="true" />
              <span className="wide">{INTRO.philosophy}</span>
            </blockquote>
            <PillLinks primary={{ label: "Our Story", href: "/who-we-are#story" }} className="mt-10" />
          </Reveal>
        </div>
        {INTRO.img && (
          <Reveal delay={150} className="relative lg:col-span-6">
            <Photo src={INTRO.img} alt={INTRO.alt} className="cut cut-lg aspect-[4/5] w-full lg:aspect-[5/6]" />
            {/* Amber flag tucked into the top-left corner of the photo. */}
            <span className="flag absolute z-10 -left-3 -top-3 h-16 w-16 lg:-left-5 lg:-top-5 lg:h-24 lg:w-24" aria-hidden="true" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
