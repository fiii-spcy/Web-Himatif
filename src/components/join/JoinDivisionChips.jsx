const DIVISIONS = [
  "PSDM",
  "RISTEK",
  "HUMAS",
  "MEDKOM",
  "KEWIRAUSAHAAN",
  "SOSIAL",
];

export default function JoinDivisionChips({
  value,
  onChange,
  error,
  options = DIVISIONS,
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-white/90">
        Preferred Division
        {error ? <span className="ml-1 text-brand-darkRed">*</span> : null}
      </p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-brand-darkRed/60 bg-brand-darkRed/15 text-white"
                  : "border-white/10 bg-white/5 text-brand-gray hover:border-white/20 hover:text-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="mt-2 text-xs leading-relaxed text-red-300">{error}</p>
      ) : null}
    </div>
  );
}

