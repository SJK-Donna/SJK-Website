// Opening of each inner page: the page name, a large left-aligned title and
// a short lead. A photo, when given, sits beside the title at its own
// proportions rather than being cropped into a wide strip.
export default function PageHeader({ eyebrow, title, lead, img, alt = "" }) {
  return (
    <header className="bg-nav">
      <div className={`mx-auto grid max-w-[1240px] gap-10 px-6 pb-14 pt-14 lg:pb-20 lg:pt-20 ${img ? "lg:grid-cols-12 lg:items-end" : ""}`}>
        <div className={img ? "lg:col-span-7" : ""}>
          {eyebrow && <p className="font-sans text-[15px] font-semibold text-control">{eyebrow}</p>}
          <h1 className="wide mt-3 max-w-[18ch] font-sans text-[40px] font-semibold leading-[1.0] tracking-[-0.02em] text-ink lg:text-[72px]">{title}</h1>
          {lead && <p className="mt-6 max-w-[56ch] text-[19px] text-ink/80 lg:text-[21px]">{lead}</p>}
        </div>
        {img && <img src={img} alt={alt} className="h-auto w-full rounded-[3px] lg:col-span-5" />}
      </div>
    </header>
  );
}
