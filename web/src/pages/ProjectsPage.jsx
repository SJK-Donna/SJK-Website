import { useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { ProjectCard } from "../components/sections/Projects.jsx";
import { PROJECT_CATEGORIES, PROJECTS } from "../content/site.js";

// Brief §23 — filterable project list. Each project carries the
// Requirement / Solution / Result / Brands format from the brief.
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader eyebrow="Projects" title="Solutions in Action" lead="Equipment and mobility solutions working in real customer environments across the Philippines." />

      <section className="bg-surface px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          {PROJECTS.length === 0 ? (
            <div className="mx-auto max-w-[620px] rounded-[22px] bg-nav px-8 py-14 text-center">
              <h2 className="font-sans text-[24px] font-semibold text-ink">Project case studies are on the way.</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/80">
                We're documenting our work across golf, resorts, property development, mobility and grounds management. In the meantime, our team is happy to share relevant references for your requirement.
              </p>
              <PillLinks primary={{ label: "Talk to Our Team", href: "/contact" }} className="mt-6" />
            </div>
          ) : (
            <>
              <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap justify-center gap-2">
                {["All", ...PROJECT_CATEGORIES].map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={filter === c}
                    onClick={() => setFilter(c)}
                    className={`rounded-full px-4 py-2 text-[14px] transition-colors ${filter === c ? "bg-control text-white" : "bg-nav text-ink hover:bg-paper"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p, i) => (
                  <div key={p.client} className="flex flex-col">
                    <ProjectCard project={p} delay={i * 60} />
                    <dl className="mt-3 space-y-2 px-2 text-[14px] leading-relaxed text-ink/80">
                      {[["The Requirement", p.requirement], ["Our Solution", p.solution], ["The Result", p.result]].map(
                        ([k, v]) =>
                          v && (
                            <div key={k}>
                              <dt className="font-semibold text-ink">{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          )
                      )}
                      {p.brands?.length > 0 && (
                        <div>
                          <dt className="font-semibold text-ink">Products / Brands Involved</dt>
                          <dd>{p.brands.join(", ")}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
              {shown.length === 0 && <p className="text-center text-[17px] text-ink/80">No projects in this category yet.</p>}
            </>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
