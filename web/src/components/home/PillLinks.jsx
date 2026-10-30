import { Link } from "react-router-dom";

// Internal routes ("/projects", "/#businesses") go through the router;
// absolute URLs open the operating brand's own site in a new tab, marked ↗.
function Action({ href, className, children }) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children} <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

// One solid button for the main action, with the logo's diagonal corner
// cut, and a plain text link with an arrow for the secondary one.
// `onDark` switches the button to amber for navy sections.
export default function PillLinks({ primary, secondary, onDark = false, center = false, className = "" }) {
  const solid = onDark ? "bg-info text-control hover:bg-white" : "bg-control text-white hover:bg-forest-deep";
  const text = onDark ? "text-white hover:text-info" : "text-control hover:text-ink";
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-4 font-sans ${center ? "justify-center" : ""} ${className}`}>
      {primary && (
        <Action href={primary.href} className={`cut cut-sm wide inline-block px-6 py-3.5 text-[15px] font-bold transition-colors ${solid}`}>
          {primary.label}
        </Action>
      )}
      {secondary && (
        <Action href={secondary.href} className={`group wide inline-flex items-center gap-2 text-[15px] font-bold transition-colors ${text}`}>
          {secondary.label}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Action>
      )}
    </div>
  );
}
