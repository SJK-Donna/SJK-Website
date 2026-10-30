import { Eyebrow } from "../ui/Brand.jsx";
import Photo from "../ui/Photo.jsx";
import Reveal from "../ui/Reveal.jsx";

// Section heading in the brief's own words, set wide and heavy like the
// SJK letterforms, with an optional tracked-caps label and short lead.
export default function SectionTitle({ eyebrow, title, lead, onDark = false, as: H = "h2", id, className = "" }) {
  return (
    <Reveal className={className}>
      {eyebrow && <Eyebrow onDark={onDark} className="mb-5">{eyebrow}</Eyebrow>}
      <H id={id} className={`wide font-sans text-[32px] font-extrabold leading-[1.02] tracking-[-0.02em] lg:text-[48px] ${onDark ? "text-white" : "text-ink"}`}>{title}</H>
      {lead && <p className={`mt-5 max-w-[42ch] text-[18px] ${onDark ? "text-white/75" : "text-ink/75"}`}>{lead}</p>}
    </Reveal>
  );
}

// The site's main layout device: heading in a narrow left column, content
// to the right. `img` adds a supporting photo under the heading, with the
// logo's diagonal corner cut; it stays in view beside long content.
export function Margin({ id, eyebrow, title, lead, img, alt = "", onDark = false, className = "", children }) {
  return (
    <section id={id} className={`px-6 py-20 lg:py-28 ${onDark ? "text-white" : ""} ${className}`}>
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionTitle eyebrow={eyebrow} title={title} lead={lead} onDark={onDark} />
            {img && <Photo src={img} alt={alt} className="cut mt-10 aspect-[4/3] w-full" />}
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
