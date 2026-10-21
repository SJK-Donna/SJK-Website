import PillLinks from "../home/PillLinks.jsx";
import { businessHref } from "./Businesses.jsx";
import { BUSINESSES, FLEET_GUIDE } from "../../content/site.js";

// Golfcarts.ph spotlight: practical buyer guidance from its own customer
// series. Numbered because it is read as a checklist of questions.
export default function FleetGuide() {
  const golfcarts = BUSINESSES.find((b) => b.id === "golf-carts-ph");
  return (
    <section aria-labelledby="fleet-guide-title" className="bg-surface px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-sans text-[15px] font-semibold text-ink/70">From Golfcarts.ph</p>
          <h2 id="fleet-guide-title" className="wide mt-2 font-sans text-[30px] font-semibold leading-[1.08] tracking-[-0.01em] text-ink lg:text-[40px]">
            {FLEET_GUIDE.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-ink/80">{FLEET_GUIDE.intro}</p>
          <img src={FLEET_GUIDE.img} alt={FLEET_GUIDE.alt} loading="lazy" className="mt-10 h-auto w-full rounded-[3px]" />
        </div>
        <div className="lg:col-span-7 lg:pt-2">
          <ol>
            {FLEET_GUIDE.questions.map((item, i) => (
              <li key={item.q} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/20 py-7 first:border-t-2 first:border-ink">
                <span className="wide font-sans text-[22px] font-semibold leading-tight text-ink">
                  <span className="border-b-[3px] border-info">{i + 1}</span>
                </span>
                <div>
                  <h3 className="wide font-sans text-[21px] font-semibold leading-snug text-ink">{item.q}</h3>
                  <p className="mt-2 max-w-[58ch] text-ink/80">{item.a}</p>
                </div>
              </li>
            ))}
          </ol>
          {golfcarts && (
            <PillLinks
              primary={{ label: "Plan Your Fleet with Golfcarts.ph", href: businessHref(golfcarts) }}
              secondary={{ label: "Talk to Our Team", href: "/contact" }}
              className="mt-10"
            />
          )}
        </div>
      </div>
    </section>
  );
}
