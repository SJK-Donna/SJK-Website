import { useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import FilterTabs from "../components/home/FilterTabs.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";
import { NewsCard, newestFirst } from "../components/sections/News.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { ComingSoon } from "./ProjectsPage.jsx";
import { NEWS, NEWS_CATEGORIES } from "../content/site.js";

// Brief §24 — informative company news, filterable by category.
export default function NewsPage() {
  const [filter, setFilter] = useState("All");
  const shown = newestFirst(filter === "All" ? NEWS : NEWS.filter((n) => n.category === filter));

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="What's Happening at SJK"
        lead="Projects, demonstrations, training, partnerships and company milestones."
        img="/images/brands/campey.jpg"
        alt="Turf renovation machine working a sports pitch"
      />
      <section className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          {NEWS.length === 0 ? (
            <ComingSoon
              title="No Stories Published Yet"
              body="Updates on deliveries, demonstrations, training and new partnerships will appear here."
              cta={{ label: "Talk to Our Team", href: "/contact" }}
              topics={NEWS_CATEGORIES}
            />
          ) : (
            <>
              <FilterTabs label="Filter news by category" options={["All", ...NEWS_CATEGORIES]} value={filter} onChange={setFilter} />
              <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((n, i) => (
                  <Reveal key={n.title} delay={(i % 3) * 100}>
                    <NewsCard item={n} />
                  </Reveal>
                ))}
              </div>
              {shown.length === 0 && <p className="text-ink/75">No stories in this category yet.</p>}
            </>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
