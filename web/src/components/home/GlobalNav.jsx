import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV } from "../../content/site.js";
import { useScrolled } from "../../hooks/useScrollFx.js";
import { LogoOnDark } from "../ui/Brand.jsx";

// The brief's six destinations plus a permanent "Talk to Our Team" button,
// on a navy bar. The current page is marked with the logo's amber flag
// above the link, not just a colour change.
export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  // The bar firms up (fully opaque, with a shadow) once content slides under it.
  const scrolled = useScrolled();
  const linkClass = ({ isActive }) =>
    `relative font-sans text-[14px] font-semibold transition-colors ${isActive ? "text-white" : "text-white/70 hover:text-white"}`;

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-control shadow-[0_8px_24px_rgba(0,0,0,.35)]" : "bg-control/90"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-6">
        <Link to="/" aria-label="SJK Guahan home" className="shrink-0">
          <LogoOnDark width={140} height={68} className="h-9 w-auto" alt="" />
        </Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className={linkClass}>
                {({ isActive }) => (
                  <>
                    {isActive && <span className="flag absolute -top-3 left-0 h-2.5 w-2.5" aria-hidden="true" />}
                    {l.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="cut cut-sm wide hidden bg-info px-5 py-2.5 font-sans text-[14px] font-bold text-control transition-colors hover:bg-white sm:inline-block">
            Talk to Our Team
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className={`block h-[2px] w-6 bg-white transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <ul id="nav-mobile" className={`overflow-hidden bg-control px-6 transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[520px] pb-6" : "max-h-0"}`}>
        {NAV.map((l) => (
          <li key={l.to} className="border-b border-white/10 last:border-0">
            <NavLink
              to={l.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) => `wide flex items-center gap-3 py-4 font-sans text-[20px] font-bold ${isActive ? "text-info" : "text-white"}`}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
        <li className="pt-5 sm:hidden">
          <Link to="/contact" onClick={() => setOpen(false)} className="cut cut-sm wide block bg-info px-5 py-3.5 text-center font-sans text-[16px] font-bold text-control">
            Talk to Our Team
          </Link>
        </li>
      </ul>
    </nav>
  );
}
