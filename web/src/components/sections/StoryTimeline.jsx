import { useRef } from "react";
import { useScrollProgress } from "../../hooks/useScrollFx.js";
import { TIMELINE } from "../../content/site.js";

// Our Story. As the reader scrolls, an amber line grows down the track and
// each milestone's marker turns into the amber flag once the line reaches
// it — the company's progress, drawn as you read it.
export default function StoryTimeline() {
  const [listRef, progress] = useScrollProgress();
  const itemRefs = useRef([]);
  const height = listRef.current?.offsetHeight ?? 0;
  const reached = progress * height;

  return (
    <ol ref={listRef} className="relative pl-10">
      <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-ink/10" aria-hidden="true" />
      <span className="absolute left-0 top-0 w-[3px] bg-info" style={{ height: `${progress * 100}%` }} aria-hidden="true" />
      {TIMELINE.map((t, i) => {
        const el = itemRefs.current[i];
        const active = el ? el.offsetTop + 18 <= reached : false;
        return (
          <li key={t.when} ref={(node) => (itemRefs.current[i] = node)} className="relative pb-12 last:pb-0">
            <span
              className={`absolute -left-[49px] top-2.5 h-5 w-5 transition-all duration-500 ${active ? "flag" : "bg-nav ring-[3px] ring-inset ring-ink/20"}`}
              aria-hidden="true"
            />
            <p className={`wide font-sans text-[28px] font-black transition-colors duration-500 lg:text-[36px] ${active ? "text-ink" : "text-ink/35"}`}>{t.when}</p>
            <p className="mt-1 max-w-[52ch] text-ink/75">{t.what}</p>
          </li>
        );
      })}
    </ol>
  );
}
