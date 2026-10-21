// Category filter for list pages: a row of plain text options with the
// current one underlined in SJK amber.
export default function FilterTabs({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="mb-12 flex flex-wrap gap-x-7 gap-y-2 border-b border-ink/15 pb-3">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`font-sans text-[15px] font-semibold underline-offset-[10px] transition-colors ${
            value === o ? "text-ink underline decoration-info decoration-[3px]" : "text-ink/70 hover:text-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
