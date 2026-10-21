import Reveal from "../ui/Reveal.jsx";

// Eyebrow + large headline + optional lead, used to open every section.
export default function SectionTitle({ eyebrow, title, lead, center = false, onDark = false, as: H = "h2", className = "" }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-[760px] ${className}`}>
      {eyebrow && <p className={`text-[17px] font-semibold ${onDark ? "text-nav" : "text-control"}`}>{eyebrow}</p>}
      <H className={`mt-1 font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.015em] lg:text-[48px] ${onDark ? "text-white" : "text-ink"}`}>{title}</H>
      {lead && <p className={`mt-4 text-[19px] leading-relaxed lg:text-[21px] ${center ? "mx-auto" : ""} max-w-[60ch] ${onDark ? "text-white/90" : "text-ink/80"}`}>{lead}</p>}
    </Reveal>
  );
}
