import { useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import FilterTabs from "../components/home/FilterTabs.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { ProjectCard } from "../components/sections/Projects.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { PROJECT_CATEGORIES, PROJECTS } from "../content/site.js";

// Shown while no projects are published: a short note and a way to ask for
// references, over the industries the case studies will cover.
export function ComingSoon({ title, body, cta, topics }) {
  return (
    <Reveal className="cut cut-lg relative overflow-hidden bg-nav p-8 lg:p-14">
      <span className="flag absolute -right-10 -top-10 h-48 w-48 !bg-white" aria-hidden="true" />
      <div className="relative max-w-[56ch]">
        <p className="eyebrow flex items-center gap-3 text-ink/70">
          <span className="flag h-3 w-3" aria-hidden="true" />
          Coming Soon
        </p>
        <h2 className="wide mt-5 font-sans text-[30px] font-black leading-[1.05] text-ink lg:text-[40px]">{title}</h2>
        <p className="mt-4 text-ink/75">{body}</p>
        <PillLinks primary={cta} className="mt-8" />
      </div>
      {topics && (
        <ul className="relative mt-10 flex flex-wrap gap-2 border-t border-ink/15 pt-8">
          {topics.map((t) => (
            <li key={t} className="cut cut-sm bg-white px-3 py-1.5 font-sans text-[13px] font-semibold text-ink/80">{t}</li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

// Brief §23 — filterable project list. Each project carries the
// Requirement / Solution / Result / Brands format from the brief.
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Solutions in Action"
        lead="Equipment and mobility solutions working in real customer environments across the Philippines."
        img="/images/carousel/slide-4.jpg"
        alt="Compact excavator digging on a property site"
      />

      <section className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          {PROJECTS.length === 0 ? (
            <ComingSoon
              title="Case Studies Are Being Prepared"
              body="We're documenting our work across golf, resorts, property development, mobility and grounds management. Ask our team for references that match your requirement."
              cta={{ label: "Ask for References", href: "/contact" }}
              topics={PROJECT_CATEGORIES}
            />
          ) : (
            <>
              <FilterTabs label="Filter projects by category" options={["All", ...PROJECT_CATEGORIES]} value={filter} onChange={setFilter} />
              <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p, i) => (
                  <Reveal key={p.client} delay={(i % 3) * 100}>
                    <ProjectCard project={p} />
                    <dl className="mt-4 space-y-3 border-t border-ink/15 pt-4 text-[16px] text-ink/75">
                      {[["The Requirement", p.requirement], ["Our Solution", p.solution], ["The Result", p.result]].map(
                        ([k, v]) =>
                          v && (
                            <div key={k}>
                              <dt className="font-sans text-[15px] font-bold text-ink">{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          )
                      )}
                      {p.brands?.length > 0 && (
                        <div>
                          <dt className="font-sans text-[15px] font-bold text-ink">Products / Brands Involved</dt>
                          <dd>{p.brands.join(", ")}</dd>
                        </div>
                      )}
                    </dl>
                  </Reveal>
                ))}
              </div>
              {shown.length === 0 && <p className="text-ink/75">No projects in this category yet.</p>}
            </>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
