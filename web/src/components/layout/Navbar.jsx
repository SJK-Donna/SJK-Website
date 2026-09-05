import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";

// Prefixed with "/" (not bare "#...") so these still resolve correctly
// from a different route like /3d-experience — a plain anchor tag to
// "/#fairway" does a full navigation back to Home and then jumps to the
// section, rather than just appending a meaningless hash to the current URL.
const NAV_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#fairway", label: "Golf Carts" },
  { href: "/#course-equipment", label: "Course Equipment" },
  { href: "/#course-care", label: "Services" },
  { href: "/#brands", label: "Brands" },
  { href: "/#partners", label: "Our Partners" },
  { href: "/#our-company", label: "Our Company" },
  { href: "/#contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 px-4 py-4 transition-all duration-300 sm:px-8 ${
        scrolled ? "bg-ink/85 shadow-raised-dark backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
        <a href="/#hero" aria-label="SJK Guahan — Home" className="shrink-0">
          <img src="/images/sjk-logo-nav.png" alt="SJK Guahan" width={140} height={68} className="h-9 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,.25)]" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-1 font-display text-[13.5px] font-semibold text-white/90 transition-opacity hover:opacity-100 hover:text-white"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/3d-experience"
              className="group relative flex items-center gap-1.5 py-1 font-display text-[13.5px] font-semibold text-gold transition-opacity hover:opacity-80"
            >
              3D Showcase
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3.5">
          <Button as="a" href="/#quote" variant="primary" className="hidden px-5 py-2.5 text-xs sm:inline-flex">
            Request a Quote
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/10 shadow-raised-dark lg:hidden"
          >
            <span className={`block h-0.5 w-[18px] rounded bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-[18px] rounded bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-[18px] rounded bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div
        id="nav-mobile"
        className={`isolate overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "mt-4 max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Fully opaque (not the usual translucent glass look) — a
            semi-transparent background here can misrender over the Hero's
            WebGL canvas on some renderers, so this stays solid for
            guaranteed legibility. */}
        <ul className="flex flex-col gap-1 rounded-2xl bg-ink p-4 shadow-raised-dark">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-display text-sm font-semibold text-white/90 hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/3d-experience"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-display text-sm font-semibold text-gold hover:bg-white/5"
            >
              3D Showcase
            </Link>
          </li>
          <li className="pt-2">
            <Button as="a" href="/#quote" variant="primary" className="w-full" onClick={() => setMenuOpen(false)}>
              Request a Quote
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
