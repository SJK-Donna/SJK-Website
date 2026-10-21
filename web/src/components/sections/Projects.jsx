import Reveal from "../ui/Reveal.jsx";
import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { PROJECTS } from "../../content/site.js";

// Brief §12 project preview: client/location, industry, type, description.
export function ProjectCard({ project: p, delay = 0 }) {
  return (
    <Reveal delay={delay} as="article" className="flex flex-col overflow-hidden rounded-[22px] bg-surface">
      {p.img && <img src={p.img} alt={`${p.client} — ${p.type}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-control">{p.industry} · {p.type}</p>
        <h3 className="mt-1 font-sans text-[21px] font-semibold text-ink">{p.client}</h3>
        {p.location && <p className="text-[14px] text-ink/70">{p.location}</p>}
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{p.summary}</p>
      </div>
    </Reveal>
  );
}

// Homepage preview of 3–6 projects; hidden until real projects are entered.
export default function FeaturedProjects() {
  if (PROJECTS.length === 0) return null;
  const featured = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)].slice(0, 6);
  return (
    <section className="bg-nav px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionTitle eyebrow="Featured Projects" title="Our Work in the Field" center className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.client} project={p} delay={i * 80} />
          ))}
        </div>
        <PillLinks primary={{ label: "View All Projects", href: "/projects" }} className="mt-10" />
      </div>
    </section>
  );
}
