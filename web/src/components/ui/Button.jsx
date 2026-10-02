/**
 * Modern-skeuomorphic button: a raised surface at rest, a touch more
 * lift on hover, and a physically-pressed inset on click — driven by
 * box-shadow swaps rather than heavy bevels, so it stays premium and
 * corporate rather than looking like an old-school UI kit.
 */
const VARIANTS = {
  primary:
    "bg-control text-white shadow-raised hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(31,36,32,.24),inset_0_1px_0_rgba(255,255,255,.4)] active:translate-y-0 active:shadow-pressed",
  // Inverted control for olive backgrounds, where the olive primary would
  // disappear into the section behind it.
  light:
    "bg-nav text-control shadow-raised hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:shadow-pressed",
  outline:
    "bg-white/5 text-white border border-white/30 backdrop-blur-sm hover:bg-white/15 hover:border-white hover:-translate-y-0.5 active:translate-y-0 active:shadow-pressed-dark"
};

export default function Button({ as: Tag = "a", variant = "primary", className = "", children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide transition-all duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
