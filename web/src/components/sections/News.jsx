import Reveal from "../ui/Reveal.jsx";
import PillLinks from "../home/PillLinks.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { NEWS } from "../../content/site.js";

const formatDate = (iso) => new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

export const newestFirst = (items) => [...items].sort((a, b) => b.date.localeCompare(a.date));

export function NewsCard({ item: n, delay = 0 }) {
  return (
    <Reveal delay={delay} as="article" className="flex flex-col overflow-hidden rounded-[22px] bg-surface">
      {n.img && <img src={n.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />}
      <div className="p-6">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-control">{n.category}</p>
        <h3 className="mt-1 font-sans text-[21px] font-semibold leading-snug text-ink">{n.title}</h3>
        <p className="mt-1 text-[13px] text-ink/70">
          <time dateTime={n.date}>{formatDate(n.date)}</time>
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{n.summary}</p>
      </div>
    </Reveal>
  );
}

// Brief §16 — three latest stories; hidden until news is entered.
export default function LatestNews() {
  if (NEWS.length === 0) return null;
  return (
    <section className="bg-nav px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionTitle eyebrow="Latest News" title="What's Happening at SJK" center className="mb-12" />
        <div className="grid gap-4 md:grid-cols-3">
          {newestFirst(NEWS).slice(0, 3).map((n, i) => (
            <NewsCard key={n.title} item={n} delay={i * 80} />
          ))}
        </div>
        <PillLinks primary={{ label: "View All News", href: "/news" }} className="mt-10" />
      </div>
    </section>
  );
}
