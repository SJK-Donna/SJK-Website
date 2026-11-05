import SectionTitle from "../home/SectionTitle.jsx";
import Photo from "../ui/Photo.jsx";
import Reveal from "../ui/Reveal.jsx";
import { AWARDS, AWARDS_PHOTOS } from "../../content/site.js";

// Awards & Recognition: the Club Car awards as a dated list beside the
// trophies, with the award-night and dealer-conference photos below in a
// fixed grid: two side by side with the conference photo full width on
// phones, three across from tablets up. The photos stay still (no parallax)
// so the section reads as a calm record. Third-party recognition backs up the
// brief's "trusted partner" message without exaggerated claims.
export default function Awards() {
  const stage = [
    ...AWARDS.filter((a) => a.photo).map((a) => ({ src: a.photo, alt: a.alt, caption: `${a.year} ${a.by} ${a.title}` })),
    AWARDS_PHOTOS.conference
  ];

  return (
    <section id="awards" aria-labelledby="awards-title" className="bg-surface px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle
            id="awards-title"
            eyebrow="Awards & Recognition"
            title="Recognised by Club Car."
            lead="Recognition from Club Car for performance, marketing and partnership, earned alongside dealers across Asia."
          />
          <ol className="mt-10 border-t border-ink/10">
            {AWARDS.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 90} className="flex gap-5 border-b border-ink/10 py-5">
                <span className="wide w-[4.5ch] shrink-0 font-sans text-[24px] font-black leading-none text-ink lg:text-[28px]">{a.year}</span>
                <span>
                  <span className="flex items-start gap-2.5 font-sans text-[17px] font-bold leading-snug text-ink">
                    <span className="flag mt-1.5 h-3 w-3 shrink-0" aria-hidden="true" />
                    {a.title}
                  </span>
                  <span className="mt-1 block pl-[22px] text-[15px] text-ink/60">{a.by}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <Photo src={AWARDS_PHOTOS.trophies.src} alt={AWARDS_PHOTOS.trophies.alt} position="50% 45%" parallax={false} className="cut cut-lg aspect-[4/3] w-full" />
          </Reveal>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-4">
            {stage.map((p, i) => (
              <Reveal as="li" key={p.src} delay={i * 90} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <figure>
                  <Photo src={p.src} alt={p.alt} parallax={false} className={`cut cut-sm w-full ${i === 2 ? "aspect-[16/9] sm:aspect-[4/3]" : "aspect-[4/3]"}`} />
                  <figcaption className="mt-2 text-[13px] leading-snug text-ink/65 sm:text-[14px]">{p.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
