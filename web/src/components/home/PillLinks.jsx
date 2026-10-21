import { Link } from "react-router-dom";

// Internal routes ("/projects", "/#businesses") go through the router;
// absolute URLs open the operating brand's own site in a new tab.
function Pill({ href, className, children }) {
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

// The pair of pill buttons used throughout: a filled primary action and an
// outlined secondary one. `onDark` swaps to light pills for olive panels,
// where the olive primary would disappear.
export default function PillLinks({ primary, secondary, onDark = false, center = true, className = "" }) {
  const filled = onDark ? "bg-nav text-control hover:bg-white" : "bg-control text-white hover:bg-forest-deep";
  const outlined = onDark ? "border-white text-white hover:bg-white/10" : "border-control text-control hover:bg-control/5";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""} ${className}`}>
      {primary && (
        <Pill href={primary.href} className={`rounded-full px-[22px] py-[10px] text-[15px] transition-colors ${filled}`}>
          {primary.label}
        </Pill>
      )}
      {secondary && (
        <Pill href={secondary.href} className={`rounded-full border px-[21px] py-[9px] text-[15px] transition-colors ${outlined}`}>
          {secondary.label}
        </Pill>
      )}
    </div>
  );
}
