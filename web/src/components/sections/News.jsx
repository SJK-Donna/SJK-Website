import Photo from "../ui/Photo.jsx";
import PillLinks from "../home/PillLinks.jsx";
import { Margin } from "../home/SectionTitle.jsx";
import { NEWS } from "../../content/site.js";

const formatDate = (iso) => new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

export const newestFirst = (items) => [...items].sort((a, b) => b.date.localeCompare(a.date));

export function NewsCard({ item: n }) {
  return (
    <article className="group flex flex-col">
      {n.img && <Photo src={n.img} className="cut aspect-[16/10] w-full" />}
      <p className="eyebrow mt-5 text-[11px] text-ink/60">
        {n.category} · <time dateTime={n.date}>{formatDate(n.date)}</time>
      </p>
      <h3 className="wide mt-2 font-sans text-[22px] font-extrabold leading-snug text-ink">{n.title}</h3>
      <p className="mt-3 text-[16px] text-ink/80">{n.summary}</p>
    </article>
  );
}

// Brief §16 — three latest stories; hidden until news is entered.
export default function LatestNews() {
  if (NEWS.length === 0) return null;
  return (
    <Margin eyebrow="News" title="What's Happening at SJK" className="bg-nav">
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {newestFirst(NEWS).slice(0, 3).map((n) => (
          <NewsCard key={n.title} item={n} />
        ))}
      </div>
      <PillLinks primary={{ label: "View All News", href: "/news" }} className="mt-12" />
    </Margin>
  );
}
