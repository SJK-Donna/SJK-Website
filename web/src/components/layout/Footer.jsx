export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img src="/images/sjk-logo-nav.png" alt="SJK Guahan" width={150} height={73} className="mb-5 h-10 w-auto" />
          <p className="mb-6 max-w-[38ch] text-sm leading-relaxed text-white/70">
            Powering Outdoor Excellence — dependable equipment and innovative solutions for golf, turf, and construction, delivered across the Philippines.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center rounded-full bg-gold px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wide text-ink shadow-raised transition-transform hover:-translate-y-0.5"
          >
            Request a Quote
          </a>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold text-white">Solutions</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><a href="#fairway" className="hover:text-gold">Golf Carts</a></li>
            <li><a href="#course-equipment" className="hover:text-gold">Course Equipment</a></li>
            <li><a href="#course-care" className="hover:text-gold">Services</a></li>
            <li><a href="#find-solution" className="hover:text-gold">Find Your Solution</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold text-white">Company</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><a href="#our-company" className="hover:text-gold">Our Company</a></li>
            <li><a href="#brands" className="hover:text-gold">Brands</a></li>
            <li><a href="#partners" className="hover:text-gold">Our Partners</a></li>
            <li><a href="#quote" className="hover:text-gold">Request a Quote</a></li>
          </ul>
        </div>

        <div id="contact">
          <h4 className="mb-4 font-display text-sm font-bold text-white">Contact</h4>
          <ul className="mb-5 space-y-3 text-sm text-white/70">
            <li>[Add office address]</li>
            <li><a href="tel:" className="hover:text-gold">[Add phone number]</a></li>
            <li><a href="mailto:" className="hover:text-gold">[Add email address]</a></li>
          </ul>
          <div className="flex gap-3" aria-label="Social media">
            {["Facebook", "Instagram", "LinkedIn"].map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[11px] font-bold shadow-raised-dark transition-colors hover:bg-gold hover:text-ink"
              >
                {label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 sm:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-3 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>&copy; 2026 SJK Guahan. All rights reserved.</p>
          <a href="#hero" className="hover:text-gold">Back to Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
