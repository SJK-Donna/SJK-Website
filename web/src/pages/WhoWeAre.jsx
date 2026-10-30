import PageHeader from "../components/home/PageHeader.jsx";
import SectionTitle, { Margin } from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import StoryTimeline from "../components/sections/StoryTimeline.jsx";
import Photo from "../components/ui/Photo.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { BUSINESSES, COMPANY, CORE_MESSAGES, PRINCIPLES, TEAM, WHO_WE_ARE } from "../content/site.js";

// The three areas the company works across, one photo each.
const AREAS = [
  ["/images/brands/golf-cart-course.jpg", "Electric golf cart on a golf course at dawn", "Mobility"],
  ["/images/brands/jacobsen-bunker.jpg", "Fairway mower maintaining a golf course beside sand bunkers", "Turf & Grounds"],
  ["/images/carousel/slide-4.jpg", "Compact excavator digging on a property site", "Compact Equipment"]
];

// Brief §19–21: history, mission, vision, philosophy, story and people.
export default function WhoWeAre() {
  return (
    <>
      <PageHeader
        eyebrow="Who We Are"
        title="An Equipment, Mobility and Solutions Company."
        lead={WHO_WE_ARE[0]}
        img="/images/sjk/fleet-course.jpg"
        alt="Fleet of black Club Car golf carts lined up beside a tropical course"
      />

      {/* Since 2017, with the three areas of work as tall photo panels. */}
      <section className="bg-surface px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionTitle eyebrow="Our History" title="Since 2017" className="lg:col-span-4" />
            <Reveal delay={100} className="lg:col-span-8">
              {WHO_WE_ARE.slice(1).map((p, i) => (
                <p key={i} className={`max-w-[58ch] ${i ? "mt-5 text-ink/75" : "text-[21px] leading-[1.55] text-ink"}`}>{p}</p>
              ))}
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-4 sm:grid-cols-3">
            {AREAS.map(([src, alt, label], i) => (
              <li key={src} className="group">
                <Photo src={src} alt={alt} className="cut aspect-[3/4] w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-control/85 via-control/10 to-transparent" />
                  <p className="absolute bottom-0 left-0 p-6 text-white">
                    <span className="eyebrow block text-[11px] text-info">{String(i + 1).padStart(2, "0")}</span>
                    <span className="wide mt-2 block font-sans text-[24px] font-extrabold">{label}</span>
                  </p>
                </Photo>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission and vision on navy, set large. */}
      <section id="mission" className="relative isolate overflow-hidden bg-control px-6 py-20 text-white lg:py-28">
        <span className="flag absolute -left-32 bottom-0 -z-10 h-[420px] w-[420px] -scale-y-100 !bg-forest-deep" aria-hidden="true" />
        <div className="mx-auto max-w-[1320px] space-y-16">
          {[
            ["Our Mission", COMPANY.mission],
            ["Our Vision", COMPANY.vision]
          ].map(([label, text]) => (
            <Reveal key={label} className="grid gap-4 lg:grid-cols-12">
              <h2 className="eyebrow flex items-center gap-3 self-start text-white/80 lg:col-span-3 lg:pt-4">
                <span className="flag h-3 w-3" aria-hidden="true" />
                {label}
              </h2>
              <p className="wide max-w-[30ch] font-sans text-[28px] font-extrabold leading-[1.12] tracking-[-0.015em] lg:col-span-9 lg:text-[42px]">{text}</p>
            </Reveal>
          ))}
          <div className="grid gap-8 border-t border-white/15 pt-10 md:grid-cols-3 lg:ml-[25%]">
            {[
              { name: "SJK Guahan", vision: "Shape the future of outdoor mobility and landscape management in Southeast Asia." },
              ...BUSINESSES
            ].map((b, i) => (
              <Reveal key={b.name} delay={i * 100}>
                <h3 className="wide font-sans text-[20px] font-extrabold text-info">{b.name}</h3>
                <p className="mt-2 text-[16px] text-white/70">{b.vision}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Margin
        id="philosophy"
        eyebrow="How We Work"
        title="Our Company Philosophy"
        lead="How we work with customers, colleagues and partners."
        img="/images/sjk/technical-training.jpg"
        alt="SJK team members in a technical training session in the meeting room"
        className="bg-surface"
      >
        <dl>
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} className="grid gap-3 border-t border-ink/15 py-8 first:border-t-0 first:pt-0 md:grid-cols-[4rem_minmax(0,14rem)_1fr] md:gap-6">
              <span className="wider font-sans text-[34px] font-black leading-none text-ink/15" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <dt>
                <span className="wide block font-sans text-[22px] font-extrabold leading-tight text-ink">{p.title}</span>
                {p.subtitle && <span className="eyebrow mt-2 block text-[11px] text-ink/60">{p.subtitle}</span>}
              </dt>
              <dd className="max-w-[56ch] text-ink/75">{p.body}</dd>
            </Reveal>
          ))}
        </dl>
      </Margin>

      <Margin
        id="story"
        eyebrow="Our Story"
        title="From one business to a growing group"
        img="/images/sjk/turf-equipment-assembly.jpg"
        alt="SJK technicians assembling new turf equipment in the workshop"
        className="bg-nav"
      >
        <StoryTimeline />
      </Margin>

      {/* What we stand for: five cards on navy-2. */}
      <section className="bg-forest-deep px-6 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionTitle eyebrow="Our Values" title="What We Stand For" onDark />
          <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CORE_MESSAGES.map((m, i) => (
              <Reveal key={m.title} delay={i * 80} className="cut flex flex-col bg-control p-7 transition-colors hover:bg-[#13273b]">
                <span className="flag mb-8 h-6 w-6" aria-hidden="true" />
                <dt className="wide font-sans text-[20px] font-extrabold leading-tight">{m.title}</dt>
                <dd className="mt-3 text-[15px] text-white/70">{m.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* The team: full-width photo with the intro beside it. */}
      <section id="people" className="bg-surface px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="Our People" title="The Team Behind the Business" />
            <Reveal delay={100}>
              {TEAM.intro.map((p, i) => (
                <p key={i} className={`max-w-[50ch] ${i ? "mt-5 text-ink/75" : "mt-8 text-[20px] leading-[1.55] text-ink"}`}>{p}</p>
              ))}
            </Reveal>
          </div>
          {TEAM.img && <Photo src={TEAM.img} alt={TEAM.alt} className="cut cut-lg aspect-[4/3] w-full lg:col-span-7" />}
        </div>
        {TEAM.members.length > 0 && (
          <ul className="mx-auto mt-16 grid max-w-[1320px] gap-x-6 gap-y-10 sm:grid-cols-3">
            {TEAM.members.map((m) => (
              <li key={m.name} className="group">
                {m.photo && <Photo src={m.photo} alt={m.name} parallax={false} className="cut aspect-[4/5] w-full" />}
                <p className="wide mt-4 font-sans text-[19px] font-extrabold text-ink">{m.name}</p>
                <p className="text-[16px] text-ink/75">{m.position}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <FinalCta />
    </>
  );
}
