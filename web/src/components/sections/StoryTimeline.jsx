import { useRef } from "react";
import { useScrollProgress } from "../../hooks/useScrollFx.js";
import { TIMELINE } from "../../content/site.js";

// Our Story. As the reader scrolls, an amber line grows down the track and
// each milestone's dot fills in once the line reaches it — the company's
// progress, drawn as you read it.
export default function StoryTimeline() {
  const [listRef, progress] = useScrollProgress();
  const itemRefs = useRef([]);
  const height = listRef.current?.offsetHeight ?? 0;
  const reached = progress * height;

  return (
    <ol ref={listRef} className="relative pl-8">
      <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-ink/15" aria-hidden="true" />
      <span className="absolute left-0 top-0 w-[2px] bg-info" style={{ height: `${progress * 100}%` }} aria-hidden="true" />
      {TIMELINE.map((t, i) => {
        const el = itemRefs.current[i];
        const active = el ? el.offsetTop + 18 <= reached : false;
        return (
          <li key={t.when} ref={(node) => (itemRefs.current[i] = node)} className="relative pb-10 last:pb-0">
            <span
              className={`absolute -left-[39px] top-2.5 h-3.5 w-3.5 rounded-full border-[3px] transition-colors duration-300 ${
                active ? "border-nav bg-info" : "border-ink/25 bg-nav"
              }`}
              aria-hidden="true"
            />
            <p className="wide font-sans text-[26px] font-semibold text-ink lg:text-[30px]">{t.when}</p>
            <p className="mt-1 max-w-[52ch] text-ink/80">{t.what}</p>
          </li>
        );
      })}
    </ol>
  );
}
