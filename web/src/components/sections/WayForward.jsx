import SectionTitle from "../home/SectionTitle.jsx";
import Photo from "../ui/Photo.jsx";
import Reveal from "../ui/Reveal.jsx";
import { WAY_FORWARD } from "../../content/site.js";

// Brief §10 — a full-bleed photo split: the image runs to the edge of the
// screen on the left, the text sits on navy on the right. The closing line
// gets the emphasis because it is the point of the section.
export default function WayForward() {
  return (
    <section aria-labelledby="way-forward-title" className="bg-control text-white">
      <div className="grid lg:grid-cols-2">
        <Photo src={WAY_FORWARD.img} alt={WAY_FORWARD.alt} className="min-h-[340px] lg:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-control/60 lg:to-control" />
        </Photo>
        <div className="px-6 py-20 lg:px-16 lg:py-28 xl:pr-[max(4rem,calc((100vw-1320px)/2+1.5rem))]">
          <SectionTitle id="way-forward-title" eyebrow="Looking Ahead" title={WAY_FORWARD.title} onDark />
          <Reveal delay={100}>
            {WAY_FORWARD.body.map((p, i) => (
              <p key={i} className={`max-w-[56ch] ${i ? "mt-5 text-white/70" : "mt-8 text-[20px] leading-[1.55] text-white/90"}`}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={200} className="mt-14 border-l-4 border-info pl-6">
            <p className="text-white/70">{WAY_FORWARD.closing[0]}</p>
            <p className="wide mt-2 max-w-[18ch] font-sans text-[32px] font-black leading-[1.02] tracking-[-0.02em] text-white lg:text-[44px]">
              {WAY_FORWARD.closing[1]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
