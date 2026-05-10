import { X } from "lucide-react";

export default function JoinFilePicker({
  label,
  required = false,
  accept,
  file,
  onFileChange,
  error,
  previewUrl,
  onClear,
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-white/90">
        {label}
        {required ? <span className="ml-1 text-brand-darkRed">*</span> : null}
      </p>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange?.(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer text-sm text-brand-gray file:mr-4 file:rounded-full file:border-0 file:bg-brand-darkRed/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white/90 hover:file:bg-brand-darkRed/30"
        />

        {previewUrl ? (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-28 w-28 rounded-2xl border border-white/10 object-cover"
            />
          </div>
        ) : null}

        {file ? (
          <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white/90">
                {file.name}
              </p>
              <p className="mt-1 text-xs text-brand-gray">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => onClear?.()}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-1 text-brand-gray transition-colors hover:border-white/20 hover:text-white"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

