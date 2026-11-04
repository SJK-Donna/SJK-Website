import { useMemo, useState } from "react";
import PH_LOCATIONS from "../../content/phLocations.json";

// Province → cities and municipalities, from the PSA's Philippine Standard
// Geographic Code (psgc.gitlab.io). Metro Manila stands in for the NCR,
// which has no province.
const PROVINCES = Object.keys(PH_LOCATIONS);

// Provinces whose list contains this city, matched without regard to case.
function provincesWith(city) {
  const c = city.trim().toLowerCase();
  if (!c) return [];
  return PROVINCES.filter((p) => PH_LOCATIONS[p].some((x) => x.toLowerCase() === c));
}

// Exact list entry for typed text, so "makati city" is saved as "Makati City".
const canonical = (list, text) => list.find((x) => x.toLowerCase() === text.trim().toLowerCase()) ?? text;

// Province and City as type-to-search dropdowns. The City list narrows to
// the chosen province; picking a city first fills in its province when the
// name belongs to only one. Free text is still accepted for places not in
// the list. Submitted as `province` and `city`.
export default function LocationFields({ inputClass, labelClass }) {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const cities = useMemo(() => PH_LOCATIONS[canonical(PROVINCES, province)] ?? [], [province]);

  function onProvince(value) {
    setProvince(value);
    const p = canonical(PROVINCES, value);
    // A city from another province no longer fits.
    if (PH_LOCATIONS[p] && city && !PH_LOCATIONS[p].some((x) => x.toLowerCase() === city.trim().toLowerCase())) setCity("");
  }

  function onCity(value) {
    setCity(value);
    if (!province.trim()) {
      const matches = provincesWith(value);
      if (matches.length === 1) setProvince(matches[0]);
    }
  }

  return (
    <>
      <div>
        <label htmlFor="cProvince" className={labelClass}>Province</label>
        <input
          id="cProvince"
          name="province"
          list="ph-provinces"
          value={province}
          onChange={(e) => onProvince(e.target.value)}
          onBlur={() => setProvince((v) => canonical(PROVINCES, v))}
          maxLength={60}
          autoComplete="address-level1"
          placeholder="Type or choose a province"
          className={inputClass}
        />
        <datalist id="ph-provinces">
          {PROVINCES.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="cCity" className={labelClass}>City / Municipality</label>
        <input
          id="cCity"
          name="city"
          list="ph-cities"
          value={city}
          onChange={(e) => onCity(e.target.value)}
          onBlur={() => setCity((v) => canonical(cities.length ? cities : PROVINCES.flatMap((p) => PH_LOCATIONS[p]), v))}
          maxLength={60}
          autoComplete="address-level2"
          placeholder={cities.length ? `Cities in ${canonical(PROVINCES, province)}` : "Type or choose a city"}
          className={inputClass}
        />
        {/* Before a province is chosen, every city is offered with its
            province beside it, so same-named towns can be told apart. */}
        <datalist id="ph-cities">
          {cities.length
            ? cities.map((c) => <option key={c} value={c} />)
            : PROVINCES.flatMap((p) => PH_LOCATIONS[p].map((c) => <option key={`${p}/${c}`} value={c} label={p} />))}
        </datalist>
      </div>
    </>
  );
}
