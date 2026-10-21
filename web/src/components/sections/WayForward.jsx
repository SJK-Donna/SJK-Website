import Reveal from "../ui/Reveal.jsx";
import { WAY_FORWARD } from "../../content/site.js";

// Brief §10 — SJK does more than distribute machinery.
export default function WayForward() {
  return (
    <section className="bg-control px-6 py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-[17px] font-semibold text-nav">Innovation &amp; Support</p>
          <h2 className="mt-1 font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.015em] text-white lg:text-[48px]">{WAY_FORWARD.title}</h2>
          {WAY_FORWARD.body.map((p, i) => (
            <p key={i} className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-white/90 lg:text-[19px]">{p}</p>
          ))}
          <p className="mt-8 text-[19px] text-white/90">{WAY_FORWARD.closing[0]}</p>
          <p className="mt-1 font-sans text-[24px] font-semibold leading-snug text-white lg:text-[28px]">{WAY_FORWARD.closing[1]}</p>
        </Reveal>
        <Reveal delay={120} className="overflow-hidden rounded-[22px]">
          <img src={WAY_FORWARD.img} alt={WAY_FORWARD.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  );
}
