import Reveal from "./Reveal.jsx";

export default function SectionHead({ eyebrow, title, lead, dark = false, center = false, className = "" }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} mb-12 max-w-2xl ${className}`}>
      <span className={`mb-3.5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] ${dark ? "text-gold" : "text-gold-deep"} ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-current opacity-70" />
        {eyebrow}
      </span>
      <h2 className={`mb-4 text-[clamp(28px,3.6vw,44px)] font-semibold leading-tight ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && <p className={`text-base leading-relaxed ${center ? "mx-auto" : ""} max-w-[56ch] ${dark ? "text-white/80" : "text-ink/70"}`}>{lead}</p>}
    </Reveal>
  );
}
