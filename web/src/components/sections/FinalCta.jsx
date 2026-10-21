import PillLinks from "../home/PillLinks.jsx";

// Brief §18 — close each page with one simple invitation.
export default function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-surface px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-8 border-t-2 border-ink pt-12 lg:grid-cols-12">
        <h2 id="final-cta-title" className="wide font-sans text-[34px] font-semibold leading-[1.02] tracking-[-0.02em] text-ink lg:col-span-6 lg:text-[56px]">
          Let's build the right solution.
        </h2>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="max-w-[48ch] text-ink/80">
            Whether you are managing a golf course, resort, property, landscape, mobility fleet or major outdoor operation, our team can help identify the right equipment and support strategy.
          </p>
          <PillLinks primary={{ label: "Talk to our team", href: "/contact" }} secondary={{ label: "See our locations", href: "/contact#locations" }} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
