// Section heading in the brief's own words, sentence case, with an optional
// short lead. Left-aligned; sits in the narrow left column of <Margin>.
export default function SectionTitle({ title, lead, onDark = false, as: H = "h2", className = "" }) {
  return (
    <div className={className}>
      <H className={`wide font-sans text-[30px] font-semibold leading-[1.08] tracking-[-0.01em] lg:text-[40px] ${onDark ? "text-white" : "text-ink"}`}>{title}</H>
      {lead && <p className={`mt-4 max-w-[38ch] text-[18px] ${onDark ? "text-white/90" : "text-ink/80"}`}>{lead}</p>}
    </div>
  );
}

// The site's main layout device: heading in a narrow left column, content
// to the right — like notes beside a course map. `img` adds a supporting
// photo under the heading, shown at its own proportions.
export function Margin({ id, title, lead, img, alt = "", onDark = false, className = "", children }) {
  return (
    <section id={id} className={`px-6 py-20 lg:py-28 ${className}`}>
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionTitle title={title} lead={lead} onDark={onDark} />
          {img && <img src={img} alt={alt} loading="lazy" className="mt-8 h-auto w-full rounded-[3px]" />}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
