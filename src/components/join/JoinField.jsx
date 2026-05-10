export default function JoinField({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  error,
  required = false,
  inputMode,
  autoComplete,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white/90">
        {label}
        {required ? <span className="ml-1 text-brand-darkRed">*</span> : null}
      </label>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors ${
          error ? "border-red-400/50" : "border-white/10 focus:border-brand-darkRed/60"
        }`}
      />
      {error ? (
        <p className="mt-2 text-xs leading-relaxed text-red-300">{error}</p>
      ) : null}
    </div>
  );
}

