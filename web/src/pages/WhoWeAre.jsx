import PageHeader from "../components/home/PageHeader.jsx";
import { Margin } from "../components/home/SectionTitle.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import StoryTimeline from "../components/sections/StoryTimeline.jsx";
import { BUSINESSES, COMPANY, CORE_MESSAGES, PRINCIPLES, TEAM, WHO_WE_ARE } from "../content/site.js";

// The three areas the company works across, one photo each.
const AREAS = [
  ["/images/brands/golf-cart-course.jpg", "Electric golf cart on a golf course at dawn", "Mobility"],
  ["/images/brands/jacobsen-bunker.jpg", "Fairway mower maintaining a golf course beside sand bunkers", "Turf and grounds"],
  ["/images/carousel/slide-4.jpg", "Compact excavator digging on a property site", "Compact equipment"]
];

// Brief §19–21: history, mission, vision, philosophy, story and people.
export default function WhoWeAre() {
  return (
    <>
      <PageHeader eyebrow="Who we are" title="An equipment, mobility and solutions company." lead={WHO_WE_ARE[0]} />

      <ul className="mx-auto grid max-w-[1240px] gap-3 px-6 pt-6 sm:grid-cols-3">
        {AREAS.map(([src, alt, label]) => (
          <li key={src}>
            <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover" />
            <p className="wide mt-3 font-sans text-[18px] font-semibold text-ink">{label}</p>
          </li>
        ))}
      </ul>

      <Margin title="Since 2017" className="bg-surface">
        {WHO_WE_ARE.slice(1).map((p, i) => (
          <p key={i} className={`max-w-[58ch] ${i ? "mt-5 text-ink/80" : "text-[21px] leading-[1.55] text-ink"}`}>{p}</p>
        ))}
      </Margin>

      <section id="mission" className="bg-nav px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px] space-y-16">
          {[
            ["Our mission", COMPANY.mission],
            ["Our vision", COMPANY.vision]
          ].map(([label, text]) => (
            <div key={label} className="grid gap-4 lg:grid-cols-12">
              <h2 className="font-sans text-[18px] font-semibold text-control lg:col-span-3 lg:pt-3">{label}</h2>
              <p className="wide max-w-[30ch] font-sans text-[28px] font-semibold leading-[1.15] tracking-[-0.015em] text-ink lg:col-span-9 lg:text-[40px]">{text}</p>
            </div>
          ))}
          <div className="grid gap-8 border-t-2 border-ink pt-10 md:grid-cols-3 lg:ml-[25%]">
            <div>
              <h3 className="wide font-sans text-[20px] font-semibold text-ink">SJK Guahan</h3>
              <p className="mt-2 text-[16px] text-ink/80">Shape the future of outdoor mobility and landscape management in Southeast Asia.</p>
            </div>
            {BUSINESSES.map((b) => (
              <div key={b.id}>
                <h3 className="wide font-sans text-[20px] font-semibold text-ink">{b.name}</h3>
                <p className="mt-2 text-[16px] text-ink/80">{b.vision}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Margin
        id="philosophy"
        title="Our company philosophy"
        lead="How we work with customers, colleagues and partners."
        img="/images/sjk/technical-training.jpg"
        alt="SJK team members in a technical training session in the meeting room"
        className="bg-surface"
      >
        <dl>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="grid gap-3 border-t border-ink/20 py-7 first:border-t-2 first:border-ink md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8">
              <dt>
                <span className="wide block font-sans text-[22px] font-semibold leading-tight text-ink">{p.title}</span>
                {p.subtitle && <span className="mt-1 block font-sans text-[15px] font-semibold text-control">{p.subtitle}</span>}
              </dt>
              <dd className="max-w-[56ch] text-ink/80">{p.body}</dd>
            </div>
          ))}
        </dl>
      </Margin>

      <Margin
        id="story"
        title="Our story"
        img="/images/sjk/turf-equipment-assembly.jpg"
        alt="SJK technicians assembling new turf equipment in the workshop"
        className="bg-nav"
      >
        <StoryTimeline />
      </Margin>

      <Margin
        title="What we stand for"
        img="/images/sjk/battery-service.jpg"
        alt="Technician servicing the battery pack of a golf cart"
        className="bg-surface"
      >
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {CORE_MESSAGES.map((m) => (
            <div key={m.title} className="border-t-2 border-ink pt-4">
              <dt className="wide font-sans text-[22px] font-semibold text-ink">{m.title}</dt>
              <dd className="mt-2 max-w-[44ch] text-ink/80">{m.body}</dd>
            </div>
          ))}
        </dl>
      </Margin>

      <Margin id="people" title="The team behind the business" className="bg-nav">
        {TEAM.intro.map((p, i) => (
          <p key={i} className={`max-w-[58ch] ${i ? "mt-5 text-ink/80" : "text-[21px] leading-[1.55] text-ink"}`}>{p}</p>
        ))}
        {TEAM.img && <img src={TEAM.img} alt={TEAM.alt} loading="lazy" className="mt-10 h-auto w-full rounded-[3px]" />}
        {TEAM.members.length > 0 && (
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {TEAM.members.map((m) => (
              <li key={m.name}>
                {m.photo && <img src={m.photo} alt={m.name} loading="lazy" className="aspect-[4/5] w-full rounded-[3px] object-cover" />}
                <p className="wide mt-3 font-sans text-[19px] font-semibold text-ink">{m.name}</p>
                <p className="text-[16px] text-ink/80">{m.position}</p>
              </li>
            ))}
          </ul>
        )}
      </Margin>

      <FinalCta />
    </>
  );
}
