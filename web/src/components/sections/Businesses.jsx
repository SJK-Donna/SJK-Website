import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import Photo from "../ui/Photo.jsx";
import Reveal from "../ui/Reveal.jsx";
import { BUSINESSES } from "../../content/site.js";

// Where a business's button goes: its own website when known, otherwise its
// section on the Brands & Partners page.
export const businessHref = (b) => b.url || `/brands-partners#${b.id}`;

// Brief §9 — "one of the cleanest and strongest sections": on navy, two
// large cut-corner photo panels, each business introduced under its own
// logo on a white tag (the logos are full colour and need a light ground).
export default function Businesses() {
  return (
    <section id="businesses" aria-labelledby="businesses-title" className="bg-control px-6 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <SectionTitle id="businesses-title" eyebrow="Our Businesses" title="Two businesses. One standard of support." onDark />
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {BUSINESSES.map((b, i) => (
            <Reveal as="article" key={b.id} delay={i * 150} className="group">
              <Photo src={b.img} alt={b.alt} position={b.imgPosition} className="cut cut-lg aspect-[4/3] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-control/70 via-transparent to-transparent" />
                <div className="cut cut-sm absolute bottom-0 left-0 bg-white p-3 lg:p-4">
                  <img src={b.logo} alt="" loading="lazy" className="h-14 w-20 object-contain lg:h-16 lg:w-24" />
                </div>
              </Photo>
              <p className="eyebrow mt-8 text-[12px] text-info">{b.tagline}</p>
              <h3 className="wide mt-3 font-sans text-[28px] font-extrabold tracking-[-0.01em] lg:text-[34px]">{b.name}</h3>
              <p className="mt-4 max-w-[52ch] text-white/75">{b.body}</p>
              <PillLinks onDark primary={{ label: b.cta, href: businessHref(b) }} className="mt-8" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
