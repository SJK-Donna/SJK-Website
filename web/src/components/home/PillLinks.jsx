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

// One solid button for the main action, and a plain underlined text link
// for the secondary one. `onDark` inverts both for the navy band (amber button, white link).
export default function PillLinks({ primary, secondary, onDark = false, center = false, className = "" }) {
  const solid = onDark ? "bg-info text-control hover:bg-white" : "bg-control text-white hover:bg-forest-deep";
  const text = onDark ? "text-white decoration-white/50 hover:decoration-white" : "text-control decoration-control/40 hover:decoration-control";
  return (
    <div className={`flex flex-wrap items-center gap-x-7 gap-y-3 font-sans ${center ? "justify-center" : ""} ${className}`}>
      {primary && (
        <Action href={primary.href} className={`wide rounded-[5px] px-5 py-3 text-[15px] font-semibold transition-colors ${solid}`}>
          {primary.label}
        </Action>
      )}
      {secondary && (
        <Action href={secondary.href} className={`wide text-[15px] font-semibold underline decoration-2 underline-offset-[6px] transition-colors ${text}`}>
          {secondary.label}
        </Action>
      )}
    </div>
  );
}
