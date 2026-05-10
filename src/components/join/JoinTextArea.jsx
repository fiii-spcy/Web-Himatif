export default function JoinTextArea({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
  error,
  required = false,
  rows = 4,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white/90">
        {label}
        {required ? <span className="ml-1 text-brand-darkRed">*</span> : null}
      </label>
      <textarea
        value={value}
        rows={rows}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full resize-none rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors ${
          error ? "border-red-400/50" : "border-white/10 focus:border-brand-darkRed/60"
        }`}
      />
      {error ? (
        <p className="mt-2 text-xs leading-relaxed text-red-300">{error}</p>
      ) : null}
    </div>
  );
}

