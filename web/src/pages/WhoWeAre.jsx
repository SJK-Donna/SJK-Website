import Reveal from "../components/ui/Reveal.jsx";
import PageHeader from "../components/home/PageHeader.jsx";
import SectionTitle from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { BUSINESSES, COMPANY, CORE_MESSAGES, PRINCIPLES, TEAM, TIMELINE, WHO_WE_ARE } from "../content/site.js";

// Brief §19–21: history, mission, vision, philosophy, story and people.
export default function WhoWeAre() {
  return (
    <>
      <PageHeader eyebrow="Who We Are" title="An equipment, mobility and solutions company." lead={WHO_WE_ARE[0]} />

      <section className="bg-surface px-6 py-20 lg:py-24">
        <Reveal className="mx-auto max-w-[760px] space-y-5 text-[19px] leading-relaxed text-ink/80 lg:text-[21px]">
          {WHO_WE_ARE.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section id="mission" className="grid gap-3 bg-surface px-3 pb-3 md:grid-cols-2">
        {[
          ["Our Mission", COMPANY.mission, "bg-nav text-ink", "text-control"],
          ["Our Vision", COMPANY.vision, "bg-control text-white", "text-nav"]
        ].map(([label, text, tone, eyebrow]) => (
          <Reveal key={label} className={`rounded-[22px] px-8 py-14 lg:px-14 lg:py-20 ${tone}`}>
            <p className={`text-[17px] font-semibold ${eyebrow}`}>{label}</p>
            <p className="mt-3 font-sans text-[24px] font-semibold leading-snug tracking-[-0.01em] lg:text-[30px]">{text}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto grid max-w-[1080px] gap-6 md:grid-cols-3">
          <Reveal>
            <h2 className="font-sans text-[21px] font-semibold text-ink">SJK Guahan</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/80">Shape the future of outdoor mobility and landscape management in Southeast Asia.</p>
          </Reveal>
          {BUSINESSES.map((b, i) => (
            <Reveal key={b.id} delay={(i + 1) * 80}>
              <h2 className="font-sans text-[21px] font-semibold text-ink">{b.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{b.vision}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="philosophy" className="bg-nav px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionTitle eyebrow="Our Company Philosophy" title="Five principles. One way of working." lead="Our philosophy guides how we work with customers, colleagues and partners." center className="mb-12" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} as="article" className="rounded-[22px] bg-surface p-7">
                <p className="text-[13px] font-semibold text-control">0{i + 1}</p>
                <h3 className="mt-1 font-sans text-[22px] font-semibold text-ink">{p.title}</h3>
                {p.subtitle && <p className="text-[15px] font-semibold text-control">{p.subtitle}</p>}
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="bg-surface px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-[880px]">
          <SectionTitle eyebrow="Our Story" title="From 2017 to the road ahead." center className="mb-14" />
          <ol className="relative border-l-2 border-control/30 pl-8 sm:pl-10">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.when} delay={i * 60} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-[3px] border-surface bg-control sm:-left-[49px]" aria-hidden="true" />
                <p className="font-sans text-[24px] font-semibold text-control lg:text-[28px]">{t.when}</p>
                <p className="mt-1 max-w-[56ch] text-[17px] leading-relaxed text-ink/80 lg:text-[19px]">{t.what}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-nav px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionTitle eyebrow="What We Stand For" title="Five ideas behind everything we do." center className="mb-12" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CORE_MESSAGES.map((m, i) => (
              <Reveal key={m.title} delay={i * 60} className="rounded-[22px] bg-surface p-6">
                <h3 className="font-sans text-[19px] font-semibold text-ink">{m.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="people" className="bg-surface px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-[1080px]">
          <SectionTitle eyebrow="The People Behind SJK" title="The Team Behind the Business" lead={TEAM.intro.join(" ")} center />
          {TEAM.members.length > 0 && (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.members.map((m) => (
                <li key={m.name} className="text-center">
                  {m.photo && <img src={m.photo} alt={m.name} loading="lazy" className="mx-auto aspect-square w-full max-w-[240px] rounded-[22px] object-cover" />}
                  <p className="mt-4 font-sans text-[19px] font-semibold text-ink">{m.name}</p>
                  <p className="text-[15px] text-ink/80">{m.position}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
