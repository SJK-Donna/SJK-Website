// Category filter for list pages: a row of cut-corner chips, the current
// one filled in navy.
export default function FilterTabs({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="mb-12 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`cut cut-sm wide px-4 py-2.5 font-sans text-[14px] font-bold transition-colors ${
            value === o ? "bg-control text-white" : "bg-nav text-ink/75 hover:bg-ink/10 hover:text-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
