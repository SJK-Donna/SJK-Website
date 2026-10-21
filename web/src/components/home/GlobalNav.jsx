import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV } from "../../content/site.js";
import { useScrolled } from "../../hooks/useScrollFx.js";

// The brief's six destinations plus a permanent "Talk to our team" button.
// The current page is marked with an underline, not just a weight change.
export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  // A soft shadow appears once content starts sliding under the bar.
  const scrolled = useScrolled();
  const linkClass = ({ isActive }) =>
    `font-sans text-[14px] font-medium underline-offset-[6px] transition-colors ${
      isActive ? "font-semibold text-ink underline decoration-info decoration-[3px]" : "text-ink/75 hover:text-ink"
    }`;

  return (
    <nav aria-label="Primary" className={`sticky top-0 z-50 border-b bg-nav/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "border-ink/10 shadow-[0_6px_20px_rgba(13,28,44,.10)]" : "border-ink/10"}`}>
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-6 px-6">
        <Link to="/" aria-label="SJK Guahan home" className="shrink-0">
          <img src="/images/sjk-logo-nav.png" alt="SJK Guahan" width={140} height={68} className="h-8 w-auto" />
        </Link>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="wide hidden rounded-[5px] bg-control px-4 py-2 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep sm:inline-block">
            Talk to our team
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className={`block h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <ul id="nav-mobile" className={`overflow-hidden bg-nav px-6 transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[480px] pb-5" : "max-h-0"}`}>
        {NAV.map((l) => (
          <li key={l.to} className="border-b border-ink/10 last:border-0">
            <NavLink to={l.to} end onClick={() => setOpen(false)} className="wide block py-3.5 font-sans text-[20px] font-semibold text-ink">
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
