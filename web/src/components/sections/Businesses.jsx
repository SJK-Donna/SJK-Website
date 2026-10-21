import PillLinks from "../home/PillLinks.jsx";
import { BUSINESSES } from "../../content/site.js";

// Where a business's button goes: its own website when known, otherwise its
// section on the Brands & Partners page.
export const businessHref = (b) => b.url || `/brands-partners#${b.id}`;

// Brief §9 — "one of the cleanest and strongest sections": two large photo
// panels, each business introduced under its own logo.
export default function Businesses() {
  return (
    <section id="businesses" aria-labelledby="businesses-title" className="bg-nav px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="businesses-title" className="wide font-sans text-[30px] font-semibold tracking-[-0.01em] text-ink lg:text-[40px]">
          Our Businesses
        </h2>
        <div className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2">
          {BUSINESSES.map((b) => (
            <article key={b.id}>
              <img src={b.img} alt={b.alt} loading="lazy" style={{ objectPosition: b.imgPosition }} className="aspect-[3/2] w-full rounded-[3px] object-cover" />
              <div className="mt-8 flex items-start gap-6">
                <img src={b.logo} alt="" loading="lazy" className="h-16 w-20 shrink-0 object-contain object-left lg:h-20 lg:w-24" />
                <div>
                  <h3 className="wide font-sans text-[26px] font-semibold text-ink lg:text-[30px]">{b.name}</h3>
                  <p className="font-sans text-[16px] font-semibold text-control">{b.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-[52ch] text-ink/80">{b.body}</p>
              <PillLinks primary={{ label: b.cta, href: businessHref(b) }} className="mt-7" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
