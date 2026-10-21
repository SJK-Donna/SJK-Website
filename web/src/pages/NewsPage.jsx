import { useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import PillLinks from "../components/home/PillLinks.jsx";
import { NewsCard, newestFirst } from "../components/sections/News.jsx";
import { NEWS, NEWS_CATEGORIES } from "../content/site.js";

// Brief §24 — informative company news, filterable by category.
export default function NewsPage() {
  const [filter, setFilter] = useState("All");
  const shown = newestFirst(filter === "All" ? NEWS : NEWS.filter((n) => n.category === filter));

  return (
    <>
      <PageHeader eyebrow="News" title="What's Happening at SJK" lead="Projects, demonstrations, training, partnerships and company milestones." />
      <section className="bg-surface px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          {NEWS.length === 0 ? (
            <div className="mx-auto max-w-[620px] rounded-[22px] bg-nav px-8 py-14 text-center">
              <h2 className="font-sans text-[24px] font-semibold text-ink">Stories are coming soon.</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/80">Check back for updates on deliveries, demonstrations, training and new partnerships.</p>
              <PillLinks primary={{ label: "Talk to Our Team", href: "/contact" }} className="mt-6" />
            </div>
          ) : (
            <>
              <div role="group" aria-label="Filter news by category" className="mb-10 flex flex-wrap justify-center gap-2">
                {["All", ...NEWS_CATEGORIES].map((c) => (
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {shown.map((n, i) => (
                  <NewsCard key={n.title} item={n} delay={i * 60} />
                ))}
              </div>
              {shown.length === 0 && <p className="text-center text-[17px] text-ink/80">No stories in this category yet.</p>}
            </>
          )}
        </div>
      </section>
    </>
  );
}
