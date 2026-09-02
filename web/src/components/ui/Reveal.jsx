import useReveal from "../../hooks/useReveal.js";

export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
