import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV } from "../../content/site.js";

// Slim translucent bar with the six main destinations from the brief and a
// permanent "Talk to Our Team" button on the right.
export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `text-[12.5px] transition-colors ${isActive ? "font-semibold text-ink" : "text-ink/80 hover:text-ink"}`;

  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 bg-nav/90 font-sans backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="SJK Guahan — Home" className="shrink-0">
          <img src="/images/sjk-logo-nav.png" alt="SJK Guahan" width={140} height={68} className="h-7 w-auto" />
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden rounded-full bg-control px-3.5 py-1 text-[12.5px] text-white transition-colors hover:bg-forest-deep sm:inline-block">
            Talk to Our Team
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={`block h-px w-4 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <ul id="nav-mobile" className={`overflow-hidden bg-nav px-6 transition-[max-height] duration-300 md:hidden ${open ? "max-h-[440px] pb-5" : "max-h-0"}`}>
        {NAV.map((l) => (
          <li key={l.to} className="border-b border-ink/10 last:border-0">
            <NavLink to={l.to} end onClick={() => setOpen(false)} className="block py-3 text-[17px] font-semibold text-ink">
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
