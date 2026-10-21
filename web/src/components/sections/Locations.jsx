import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal.jsx";
import SectionTitle from "../home/SectionTitle.jsx";
import { LOCATIONS } from "../../content/site.js";
import { MAP_POINTS, MAP_SIZE, PH_PATH } from "../../content/phMap.js";

// Label placement per marker — Clark, Manila and Laguna sit within ~25px of
// each other on this map, so Clark and Manila label to the left (stacked)
// and Laguna to the right.
const LABEL = {
  clark: { dx: -12, dy: 4, anchor: "end" },
  manila: { dx: -12, dy: 6, anchor: "end" },
  santaRosa: { dx: 12, dy: 10, anchor: "start" },
  cebu: { dx: 12, dy: 5, anchor: "start" }
};

const linkClass = "text-control underline-offset-2 hover:underline";

// Brief §17 — a clean Philippine map with markers, plus each branch's
// address, numbers and a Google Maps directions link.
export default function Locations() {
  return (
    <section id="locations" className="bg-surface px-6 py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1080px] items-start gap-12 md:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionTitle eyebrow="Our Locations" title="Supporting Customers Across the Philippines" />
          <ol className="mt-8 space-y-7">
            {LOCATIONS.map((l, i) => (
              <Reveal as="li" key={l.id} delay={i * 80} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-control text-[14px] font-semibold text-white">{i + 1}</span>
                <div className="text-[15px] leading-relaxed text-ink/80">
                  <h3 className="font-sans text-[19px] font-semibold text-ink">{l.name}</h3>
                  {l.role && <p className="font-semibold text-control">{l.role}</p>}
                  <address className="mt-1 not-italic">{l.address}</address>
                  {l.phones.length > 0 ? (
                    <ul className="mt-1">
                      {l.phones.map(([shown, dial]) => (
                        <li key={dial}>
                          <a href={`tel:${dial}`} className={linkClass}>{shown}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1">
                      <Link to="/contact#form" className={linkClass}>Contact us</Link>
                    </p>
                  )}
                  <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-block font-semibold ${linkClass}`}>
                    Get directions <span aria-hidden="true">↗</span>
                    <span className="sr-only"> to the {l.name} branch (opens Google Maps)</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120} className="mx-auto w-full max-w-[420px] rounded-[22px] bg-nav p-6 md:sticky md:top-20">
          <svg
            viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
            role="img"
            aria-label={`Map of the Philippines showing SJK branches in ${LOCATIONS.map((l) => l.name).join(", ")}`}
            className="h-auto w-full"
          >
            <path d={PH_PATH} fill="#97a379" fillOpacity="0.55" stroke="#4b5938" strokeOpacity="0.45" strokeWidth="0.8" strokeLinejoin="round" />
            {LOCATIONS.map((l, i) => {
              const p = MAP_POINTS[l.point];
              const lab = LABEL[l.point];
              return (
                <g key={l.id}>
                  <circle cx={p.x} cy={p.y} r="11" fill="#4b5938" fillOpacity="0.18" />
                  <circle cx={p.x} cy={p.y} r="5.5" fill="#4b5938" stroke="#fff" strokeWidth="2" />
                  <text x={p.x + lab.dx} y={p.y + lab.dy} textAnchor={lab.anchor} fontSize="15" fontWeight="600" fill="#1f2420" style={{ paintOrder: "stroke" }} stroke="#f0f2ec" strokeWidth="4">
                    {i + 1}. {l.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
