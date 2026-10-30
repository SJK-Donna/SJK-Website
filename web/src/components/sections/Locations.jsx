import { Link } from "react-router-dom";
import SectionTitle from "../home/SectionTitle.jsx";
import { LOCATIONS } from "../../content/site.js";
import { MAP_POINTS, MAP_SIZE, PH_PATH } from "../../content/phMap.js";
import { useInView } from "../../hooks/useScrollFx.js";

// Label placement per marker — Clark, Manila and Laguna sit within ~25px of
// each other on this map, so Clark and Manila label to the left (stacked)
// and Laguna to the right.
const LABEL = {
  clark: { dx: -12, dy: 4, anchor: "end" },
  manila: { dx: -12, dy: 6, anchor: "end" },
  santaRosa: { dx: 12, dy: 10, anchor: "start" },
  cebu: { dx: 12, dy: 5, anchor: "start" }
};

const linkClass = "text-control underline decoration-control/40 underline-offset-4 hover:decoration-control";

// Brief §17 — a clean Philippine map with markers. The numbers are the map
// legend: each branch's number matches its marker.
export default function Locations() {
  // Branch markers drop in one by one, each with a single amber pulse,
  // the first time the map scrolls into view.
  const [mapRef, mapInView] = useInView(0.4);
  return (
    <section id="locations" aria-labelledby="locations-title" className="bg-nav px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionTitle id="locations-title" eyebrow="Our Locations" title="Supporting Customers Across the Philippines" />
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {LOCATIONS.map((l, i) => (
              <li key={l.id} className="border-t-4 border-info pt-5 text-[16px] leading-relaxed text-ink/80">
                <h3 className="wide font-sans text-[22px] font-extrabold text-ink">
                  <span className="mr-2 text-control">{i + 1}</span>
                  {l.name}
                </h3>
                {l.role && <p className="font-sans text-[15px] font-semibold text-control">{l.role}</p>}
                <address className="mt-2 not-italic">{l.address}</address>
                {l.phones.length > 0 ? (
                  <ul className="mt-2">
                    {l.phones.map(([shown, dial]) => (
                      <li key={dial}>
                        <a href={`tel:${dial}`} className={linkClass}>{shown}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2">
                    <Link to="/contact#form" className={linkClass}>Contact us</Link>
                  </p>
                )}
                <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block font-sans font-semibold ${linkClass}`}>
                  Get directions <span aria-hidden="true">↗</span>
                  <span className="sr-only"> to the {l.name} branch (opens Google Maps)</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div ref={mapRef} className="w-full max-w-[460px] justify-self-center lg:sticky lg:top-24 lg:col-span-5">
          <svg
            viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
            role="img"
            aria-label={`Map of the Philippines showing SJK branches in ${LOCATIONS.map((l) => l.name).join(", ")}`}
            className="h-auto w-full"
          >
            <path d={PH_PATH} fill="#c5cfdb" fillOpacity="0.7" stroke="#0d1c2c" strokeOpacity="0.3" strokeWidth="0.8" strokeLinejoin="round" />
            {LOCATIONS.map((l, i) => {
              const p = MAP_POINTS[l.point];
              const lab = LABEL[l.point];
              return (
                <g key={l.id} className={mapInView ? "map-pin" : "opacity-0"} style={{ animationDelay: `${200 + i * 220}ms` }}>
                  {mapInView && (
                    <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="#f9b200" strokeWidth="2" className="map-pulse" style={{ animationDelay: `${380 + i * 220}ms` }} />
                  )}
                  <circle cx={p.x} cy={p.y} r="6" fill="#0d1c2c" stroke="#f9b200" strokeWidth="2.5" />
                  <text x={p.x + lab.dx} y={p.y + lab.dy} textAnchor={lab.anchor} fontFamily="Archivo, sans-serif" fontSize="15" fontWeight="600" fill="#0d1c2c" style={{ paintOrder: "stroke" }} stroke="#eef1f5" strokeWidth="4">
                    {i + 1} {l.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
