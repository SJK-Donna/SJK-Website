import PillLinks from "../home/PillLinks.jsx";
import { Margin } from "../home/SectionTitle.jsx";
import { BRAND_GROUPS } from "../../content/site.js";

// Brief §14 — logo and name only. Until the logo files arrive, the brand
// names are set as a typographic roster, grouped by the business that
// represents them.
export function BrandGroups({ groups = BRAND_GROUPS }) {
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g.group}>
          <h3 className="font-sans text-[16px] font-semibold text-control">{g.group}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
            {g.brands.map((b) => (
              <li key={b} className="wide font-sans text-[30px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink lg:text-[40px]">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function BrandWall() {
  return (
    <Margin title="Trusted brands. Local support." className="bg-nav">
      <BrandGroups />
      <PillLinks primary={{ label: "View our brands and partners", href: "/brands-partners" }} className="mt-14" />
    </Margin>
  );
}
