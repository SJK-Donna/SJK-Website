import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import Photo from "../ui/Photo.jsx";
import Reveal from "../ui/Reveal.jsx";
import { businessHref } from "./Businesses.jsx";
import { BUSINESSES, FLEET_GUIDE } from "../../content/site.js";

// Golfcarts.ph spotlight: practical buyer guidance from its own customer
// series. Numbered because it is read as a checklist of questions; the
// photo stays in view beside the list on wide screens.
export default function FleetGuide() {
  const golfcarts = BUSINESSES.find((b) => b.id === "golf-carts-ph");
  return (
    <section aria-labelledby="fleet-guide-title" className="bg-nav px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionTitle id="fleet-guide-title" eyebrow="From Golfcarts.ph" title={FLEET_GUIDE.title} lead={FLEET_GUIDE.intro} />
            <Photo src={FLEET_GUIDE.img} alt={FLEET_GUIDE.alt} className="cut mt-10 aspect-[4/3] w-full" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <ol>
            {FLEET_GUIDE.questions.map((item, i) => (
              <Reveal as="li" key={item.q} delay={60} className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-ink/15 py-8 first:border-t-0 first:pt-0 lg:grid-cols-[5rem_1fr]">
                <span className="wider font-sans text-[34px] font-black leading-none text-ink/15 lg:text-[48px]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="wide font-sans text-[21px] font-extrabold leading-snug text-ink lg:text-[24px]">
                    <span className="sr-only">{i + 1}. </span>
                    {item.q}
                  </h3>
                  <p className="mt-3 max-w-[58ch] text-ink/75">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          {golfcarts && (
            <PillLinks
              primary={{ label: "Plan Your Fleet with Golfcarts.ph", href: businessHref(golfcarts) }}
              secondary={{ label: "Talk to Our Team", href: "/contact" }}
              className="mt-6 border-t border-ink/15 pt-10"
            />
          )}
        </div>
      </div>
    </section>
  );
}
