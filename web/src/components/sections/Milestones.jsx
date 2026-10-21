import { Margin } from "../home/SectionTitle.jsx";
import { MILESTONES } from "../../content/site.js";

// Brief §11 — verified statements only, set as a plain definition list.
// Add figures in content/site.js as they are confirmed.
export default function Milestones() {
  return (
    <Margin
      title="Numbers and milestones"
      img="/images/sjk/service-team.jpg"
      alt="Golfcarts.ph service technicians working on a golf cart steering assembly"
      className="bg-surface"
    >
      <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {MILESTONES.map((m) => (
          <div key={m.value} className="border-t-2 border-ink pt-5">
            <dt className="wide font-sans text-[26px] font-semibold leading-tight tracking-[-0.01em] text-ink lg:text-[30px]">{m.value}</dt>
            {m.label && <dd className="mt-1 font-sans font-semibold text-ink">{m.label}</dd>}
            <dd className="mt-2 max-w-[40ch] text-ink/80">{m.detail}</dd>
          </div>
        ))}
      </dl>
    </Margin>
  );
}
