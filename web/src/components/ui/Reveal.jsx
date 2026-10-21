// Formerly a scroll-triggered fade-and-slide-up. Sections now render still —
// the hero's load sequence is the site's only ambient motion — so this is a
// plain wrapper that keeps the existing call sites' API (`as`, `className`).
// `delay` is accepted and ignored for the same reason.
// eslint-disable-next-line no-unused-vars
export default function Reveal({ as: Tag = "div", className = "", delay, children, ...props }) {
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}
