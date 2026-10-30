import { useInView } from "../../hooks/useScrollFx.js";

// Slides its content in along the logo's diagonal the first time it scrolls
// into view (styles in index.css). `delay` staggers items in a row.
// Under reduced motion useInView starts true, so content shows at once.
export default function Reveal({ as: Tag = "div", className = "", delay = 0, style, children, ...props }) {
  const [ref, inView] = useInView(0.12);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: inView && delay ? `${delay}ms` : undefined }}
      {...props}
    >
      {children}
    </Tag>
  );
}
