import { useRef } from "react";
import { useScrollProgress } from "../../hooks/useScrollFx.js";
import { Margin } from "../home/SectionTitle.jsx";
import Photo from "../ui/Photo.jsx";
import { TIMELINE } from "../../content/site.js";

// Our Story. As the reader scrolls, an amber line grows down the track and
// each milestone's marker turns into the amber flag once the line reaches
// it — the company's progress, drawn as you read it. Beside it (on large
// screens) a photo frame changes with each milestone reached, so the
// growth is seen as well as read; on phones each milestone carries its own
// photo instead.
export default function OurStory() {
  const [listRef, progress] = useScrollProgress();
  const itemRefs = useRef([]);
  const height = listRef.current?.offsetHeight ?? 0;
  const reached = progress * height;
  const isActive = (i) => {
    const el = itemRefs.current[i];
    return el ? el.offsetTop + 18 <= reached : false;
  };
  // The latest milestone reached; the first one before the line starts.
  const current = Math.max(0, TIMELINE.reduce((last, _, i) => (isActive(i) ? i : last), -1));

  const goTo = (i) => itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <Margin
      id="story"
      eyebrow="Our Story"
      title="From one business to a growing group"
      className="bg-nav"
      media={<StoryFrame current={current} onPick={goTo} />}
    >
      <ol ref={listRef} className="relative pl-10">
        <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-ink/10" aria-hidden="true" />
        <span className="absolute left-0 top-0 w-[3px] bg-info" style={{ height: `${progress * 100}%` }} aria-hidden="true" />
        {TIMELINE.map((t, i) => {
          const active = isActive(i);
          return (
            <li key={t.when} ref={(node) => (itemRefs.current[i] = node)} className="relative pb-12 last:pb-0">
              <span
                className={`absolute -left-[49px] top-2.5 h-5 w-5 transition-all duration-500 ${active ? "flag" : "bg-nav ring-[3px] ring-inset ring-ink/20"}`}
                aria-hidden="true"
              />
              <p className={`wide font-sans text-[24px] font-black transition-colors duration-500 lg:text-[30px] ${active ? "text-ink" : "text-ink/35"}`}>{t.when}</p>
              <p className="mt-1 max-w-[52ch] text-ink/75">{t.what}</p>
              {t.img && (
                <figure className="mt-5 lg:hidden">
                  <Photo src={t.img} className="cut cut-sm aspect-[16/10] w-full" />
                  <figcaption className="mt-2 text-[14px] text-ink/60">{t.caption}</figcaption>
                </figure>
              )}
            </li>
          );
        })}
      </ol>
    </Margin>
  );
}

// The sticky frame beside the timeline. Every milestone photo is stacked;
// the current one fades and settles in while an amber bar sweeps across
// along the logo's diagonal. The ticks below show progress and jump to a
// milestone when pressed.
function StoryFrame({ current, onPick }) {
  const t = TIMELINE[current];
  return (
    <figure className="mt-10 hidden lg:block">
      <div className="cut relative aspect-[4/3] w-full overflow-hidden bg-control">
        {TIMELINE.map((m, i) => (
          <img
            key={m.when}
            src={m.img}
            alt=""
            loading="lazy"
            className={`story-img absolute inset-0 h-full w-full object-cover ${i === current ? "is-current" : ""}`}
          />
        ))}
        <span key={current} className="story-wipe" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-control/90 via-control/50 to-transparent px-5 pb-4 pt-14 text-white">
          <p key={current} className="rise flex items-center gap-2.5">
            <span className="flag h-3.5 w-3.5" aria-hidden="true" />
            <span className="wide font-sans text-[18px] font-black">{t.when}</span>
          </p>
        </div>
        <span className="eyebrow absolute right-4 top-4 bg-control/70 px-2 py-1 text-[10px] text-white" aria-hidden="true">
          {String(current + 1).padStart(2, "0")} / {String(TIMELINE.length).padStart(2, "0")}
        </span>
      </div>
      <figcaption className="mt-3 min-h-[3em] text-[14px] text-ink/65" aria-live="polite">{t.caption}</figcaption>
      <div className="mt-3 flex gap-1.5">
        {TIMELINE.map((m, i) => (
          <button
            key={m.when}
            type="button"
            onClick={() => onPick(i)}
            aria-label={`Go to ${m.when}`}
            aria-current={i === current ? "step" : undefined}
            className="group flex-1 py-2"
          >
            <span className={`block h-[3px] transition-colors duration-500 ${i <= current ? "bg-info" : "bg-ink/15 group-hover:bg-ink/35"}`} />
          </button>
        ))}
      </div>
    </figure>
  );
}
