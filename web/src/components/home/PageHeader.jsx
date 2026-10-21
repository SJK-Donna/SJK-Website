// Opening band for inner pages: eyebrow, page title and a short lead.
export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <header className="bg-nav px-6 pb-14 pt-16 text-center lg:pb-20 lg:pt-24">
      {eyebrow && <p className="text-[17px] font-semibold text-control">{eyebrow}</p>}
      <h1 className="mx-auto mt-1 max-w-[18ch] font-sans text-[40px] font-semibold leading-[1.06] tracking-[-0.02em] text-ink lg:text-[64px]">{title}</h1>
      {lead && <p className="mx-auto mt-5 max-w-[58ch] text-[19px] leading-relaxed text-ink/80 lg:text-[21px]">{lead}</p>}
    </header>
  );
}
