import { useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import FilterTabs from "../components/home/FilterTabs.jsx";
import { NewsCard, newestFirst } from "../components/sections/News.jsx";
import { NEWS, NEWS_CATEGORIES } from "../content/site.js";

// Brief §24 — informative company news, filterable by category.
export default function NewsPage() {
  const [filter, setFilter] = useState("All");
  const shown = newestFirst(filter === "All" ? NEWS : NEWS.filter((n) => n.category === filter));

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="What's happening at SJK"
        lead="Projects, demonstrations, training, partnerships and company milestones."
        img="/images/brands/campey.jpg"
        alt="Turf renovation machine working a sports pitch"
      />
      <section className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          {NEWS.length === 0 ? (
            <div className="max-w-[56ch]">
              <h2 className="wide font-sans text-[28px] font-semibold text-ink">No stories published yet</h2>
              <p className="mt-3 text-ink/80">Updates on deliveries, demonstrations, training and new partnerships will appear here.</p>
              <PillLinks primary={{ label: "Talk to our team", href: "/contact" }} className="mt-8" />
            </div>
          ) : (
            <>
              <FilterTabs label="Filter news by category" options={["All", ...NEWS_CATEGORIES]} value={filter} onChange={setFilter} />
              <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((n) => (
                  <NewsCard key={n.title} item={n} />
                ))}
              </div>
              {shown.length === 0 && <p className="text-ink/80">No stories in this category yet.</p>}
            </>
          )}
        </div>
      </section>
    </>
  );
}
