import { WAY_FORWARD } from "../../content/site.js";

// Brief §10 — the site's one navy band. The closing line gets the
// emphasis because it is the point of the section.
export default function WayForward() {
  return (
    <section aria-labelledby="way-forward-title" className="bg-control px-6 py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="way-forward-title" className="wide font-sans text-[30px] font-semibold tracking-[-0.01em] text-white lg:text-[40px]">
            {WAY_FORWARD.title}
          </h2>
          <img src={WAY_FORWARD.img} alt={WAY_FORWARD.alt} loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-[3px] object-cover" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {WAY_FORWARD.body.map((p, i) => (
            <p key={i} className={`max-w-[56ch] text-white/90 ${i ? "mt-5" : "text-[21px] leading-[1.55] text-white"}`}>{p}</p>
          ))}
          <p className="mt-14 text-white/90">{WAY_FORWARD.closing[0]}</p>
          <p className="wide mt-2 max-w-[18ch] font-sans text-[34px] font-semibold leading-[1.05] tracking-[-0.015em] text-white lg:text-[48px]">
            {WAY_FORWARD.closing[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
