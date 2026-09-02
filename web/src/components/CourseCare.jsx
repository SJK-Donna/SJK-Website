import "./CourseCare.css";
import useServiceJourney from "../hooks/useServiceJourney.js";

const STAGES = [
  { num: "01", name: "Consult", title: "Consult", img: "/images/course-care/consult.jpg", alt: "Consulting on course, fleet, or job site equipment needs", body: "We assess your course, fleet, or job site and recommend the right equipment mix for your operation." },
  { num: "02", name: "Supply", title: "Supply", img: "/images/course-care/supply.jpg", alt: "Sourcing trusted equipment brands for supply", body: "Access trusted, proven brands across golf carts, turf care, and construction equipment." },
  { num: "03", name: "Deliver", title: "Deliver", img: "/images/course-care/deliver.jpg", alt: "Coordinated delivery of equipment", body: "Delivery coordinated around your schedule, wherever your course or site is located." },
  { num: "04", name: "Install", title: "Install", img: "/images/course-care/install.jpg", alt: "Professional installation and commissioning of equipment", body: "Professional setup and commissioning so your equipment is ready to perform from day one." },
  { num: "05", name: "Maintain", title: "Maintain", img: "/images/course-care/maintain.jpg", alt: "Preventive maintenance program for equipment", body: "Preventive maintenance programs designed to keep your equipment running at its best." },
  { num: "06", name: "Support", title: "Support", img: "/images/course-care/support.jpg", alt: "Parts, repair, and after-sales support", body: "Parts, repair, and after-sales support whenever your operation needs it." }
];

export default function CourseCare() {
  const { rootRef, mediaRefs, activeIndex, revealed, goToStep } = useServiceJourney(STAGES.length);
  mediaRefs.current = [];

  return (
    <section id="course-care" className="bg-ink px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 max-w-2xl">
          <span className="mb-3.5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-gold">
            <span className="h-px w-6 bg-current opacity-70" />
            04 — Course Care
          </span>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-tight text-white">
            More Than Equipment.
            <br />
            We Keep Your Course Moving.
          </h2>
        </div>

        <div ref={rootRef} className="cc-journey">
          <div className="cc-inner">
            <div className="cc-rail">
              {STAGES.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => goToStep(i)}
                  className={`cc-step ${i === activeIndex ? "is-active" : ""}`}
                >
                  <span className="cc-num">{s.num}</span>
                  <span className="cc-name">{s.name}</span>
                </button>
              ))}
              <span className="cc-rail-fill" style={{ width: activeIndex < 0 ? "0%" : `${((activeIndex + 1) / STAGES.length) * 100}%` }} />
            </div>

            <div className="cc-story">
              {STAGES.map((s, i) => (
                <article key={s.num} data-stage={i} className={`cc-block ${i === activeIndex ? "is-active" : ""}`}>
                  <div
                    ref={(el) => (mediaRefs.current[i] = el)}
                    className={`cc-media ${revealed[i] ? "is-revealed" : ""}`}
                  >
                    <img src={s.img} alt={s.alt} loading="lazy" />
                  </div>
                  <div className="cc-copy">
                    <span className="cc-panel-num">{s.num}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
