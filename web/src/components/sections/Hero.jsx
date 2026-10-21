import PillLinks from "../home/PillLinks.jsx";
import { COMPANY, HERO_PANELS } from "../../content/site.js";

// The headline names what SJK does — move people, shape landscapes, improve
// the outdoors — and the three photos below answer it clause by clause.
// The panels rising in sequence is the site's one piece of ambient motion.
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-nav px-6 pb-6 pt-14 lg:pt-20">
      <div className="mx-auto max-w-[1240px]">
        <p className="font-sans text-[15px] font-semibold text-control">{COMPANY.name}</p>
        <h1
          id="hero-title"
          className="wide mt-4 max-w-[19ch] font-sans text-[42px] font-semibold leading-[0.98] tracking-[-0.025em] text-ink sm:text-[60px] lg:text-[84px]"
        >
          Solutions that move people, shape landscapes and improve the outdoors.
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[52ch] text-[19px] text-ink/80 lg:col-span-6 lg:text-[20px]">{COMPANY.positioning}</p>
          <PillLinks
            primary={{ label: "Explore our businesses", href: "/#businesses" }}
            secondary={{ label: "View our projects", href: "/projects" }}
            className="lg:col-span-6 lg:justify-end"
          />
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-3">
          {HERO_PANELS.map((p, i) => (
            <li key={p.caption} className="rise" style={{ animationDelay: `${150 + i * 140}ms` }}>
              <img
                src={p.src}
                alt={p.alt}
                loading="eager"
                style={{ objectPosition: p.position }}
                className="aspect-[3/2] w-full rounded-[3px] object-cover"
              />
              <p className="wide mt-4 font-sans text-[20px] font-semibold text-ink">{p.caption}</p>
              <p className="text-[16px] text-ink/75">{p.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
