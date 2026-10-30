import PillLinks from "../home/PillLinks.jsx";
import Reveal from "../ui/Reveal.jsx";

// Brief §18 — close each page with one simple invitation, on navy with a
// large flag, in a lighter navy, running off the right edge.
export default function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-control px-6 py-24 text-white lg:py-32">
      <span className="flag absolute -right-24 top-0 -z-10 h-[420px] w-[420px] !bg-forest-deep lg:right-0 lg:h-[560px] lg:w-[560px]" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-white/80">
            <span className="flag h-3 w-3" aria-hidden="true" />
            Talk to Our Team
          </p>
          <h2 id="final-cta-title" className="wide mt-6 font-sans text-[40px] font-black leading-[0.98] tracking-[-0.03em] lg:text-[72px]">
            Let's Build the Right Solution.
          </h2>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5">
          <p className="max-w-[48ch] text-white/75">
            Whether you are managing a golf course, resort, property, landscape, mobility fleet or major outdoor operation, our team can help identify the right equipment and support strategy.
          </p>
          <PillLinks onDark primary={{ label: "Talk to Our Team", href: "/contact" }} secondary={{ label: "Contact Us", href: "/contact#form" }} className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}
