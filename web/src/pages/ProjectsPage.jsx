import { useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import FilterTabs from "../components/home/FilterTabs.jsx";
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
      <PageHeader
        eyebrow="Projects"
        title="Solutions in Action"
        lead="Equipment and mobility solutions working in real customer environments across the Philippines."
        img="/images/carousel/slide-4.jpg"
        alt="Compact excavator digging on a property site"
      />

      <section className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          {PROJECTS.length === 0 ? (
            <div className="max-w-[56ch]">
              <h2 className="wide font-sans text-[28px] font-semibold text-ink">Case Studies Are Being Prepared</h2>
              <p className="mt-3 text-ink/80">
                We're documenting our work across golf, resorts, property development, mobility and grounds management. Ask our team for references that match your requirement.
              </p>
              <PillLinks primary={{ label: "Ask for References", href: "/contact" }} className="mt-8" />
            </div>
          ) : (
            <>
              <FilterTabs label="Filter projects by category" options={["All", ...PROJECT_CATEGORIES]} value={filter} onChange={setFilter} />
              <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p) => (
                  <div key={p.client}>
                    <ProjectCard project={p} />
                    <dl className="mt-4 space-y-3 border-t border-ink/15 pt-4 text-[16px] text-ink/80">
                      {[["The Requirement", p.requirement], ["Our Solution", p.solution], ["The Result", p.result]].map(
                        ([k, v]) =>
                          v && (
                            <div key={k}>
                              <dt className="font-sans text-[15px] font-semibold text-ink">{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          )
                      )}
                      {p.brands?.length > 0 && (
                        <div>
                          <dt className="font-sans text-[15px] font-semibold text-ink">Products / Brands Involved</dt>
                          <dd>{p.brands.join(", ")}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
              {shown.length === 0 && <p className="text-ink/80">No projects in this category yet.</p>}
            </>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
