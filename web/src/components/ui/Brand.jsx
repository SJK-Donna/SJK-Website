// Shared pieces of the SJK visual language, taken from the logo.

// Colour filter for the SJK logo on dark backgrounds. The artwork is navy
// and amber on transparent; this turns the navy white and leaves the amber
// as it is, so no second logo file is needed. Rendered once, in Layout.
export function BrandDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <filter id="sjk-on-dark" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="1 0.98" />
          <feFuncG type="table" tableValues="1 1 1 0.95 0.9 0.85 0.8 0.7 0.6 0.5 0.4" />
          <feFuncB type="table" tableValues="0 1 1 1 1 1 1 1 1 1 1" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

export function LogoOnDark({ className = "", ...props }) {
  return <img src="/images/sjk-logo-nav.png" alt="SJK Guahan" style={{ filter: "url(#sjk-on-dark)" }} className={className} {...props} />;
}

// Section label: a small amber flag and tracked capitals.
export function Eyebrow({ children, onDark = false, className = "" }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${onDark ? "text-white/80" : "text-ink/70"} ${className}`}>
      <span className="flag h-3 w-3 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

// Diagonal edge between two sections: `from` is the section above, `to`
// the one below. The edge rises left to right, like the logo's diagonal.
export function Slant({ from, to, flip = false }) {
  return (
    <div aria-hidden="true" className="h-[clamp(28px,5vw,72px)] w-full" style={{ background: to }}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block h-full w-full">
        <polygon points={flip ? "0,0 100,0 100,10" : "0,0 100,0 0,10"} fill={from} />
      </svg>
    </div>
  );
}

export const NAVY = "#0d1c2c";
export const NAVY_2 = "#1b3048";
export const MIST = "#eef1f5";
export const WHITE = "#ffffff";
