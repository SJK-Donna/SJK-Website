import PillLinks from "../home/PillLinks.jsx";
import { Margin } from "../home/SectionTitle.jsx";
import { PROJECTS } from "../../content/site.js";

// Brief §12 project preview: client/location, industry, type, description.
export function ProjectCard({ project: p }) {
  return (
    <article className="flex flex-col">
      {p.img && <img src={p.img} alt={`${p.client}, ${p.type}`} loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover" />}
      <p className="mt-4 font-sans text-[15px] font-semibold text-control">{p.type}, {p.industry}</p>
      <h3 className="wide mt-1 font-sans text-[22px] font-semibold text-ink">{p.client}</h3>
      {p.location && <p className="text-[16px] text-ink/75">{p.location}</p>}
      <p className="mt-3 text-[16px] text-ink/80">{p.summary}</p>
    </article>
  );
}

// Homepage preview of 3–6 projects; hidden until real projects are entered.
export default function FeaturedProjects() {
  if (PROJECTS.length === 0) return null;
  const featured = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)].slice(0, 6);
  return (
    <Margin title="Our work in the field" className="bg-nav">
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.client} project={p} />
        ))}
      </div>
      <PillLinks primary={{ label: "View all projects", href: "/projects" }} className="mt-12" />
    </Margin>
  );
}
