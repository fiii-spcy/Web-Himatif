import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";

export default function ToastViewport({ toasts, onRemove }) {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[200] flex w-[320px] flex-col gap-2">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon =
            toast.type === "success"
              ? CheckCircle2
              : toast.type === "error"
                ? AlertCircle
                : Info;
          const tone =
            toast.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/10"
              : toast.type === "error"
                ? "border-red-400/30 bg-red-500/10"
                : "border-white/15 bg-white/5";
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className={`pointer-events-auto overflow-hidden rounded-2xl border ${tone} p-4 shadow-glow`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={
                    toast.type === "success"
                      ? "h-5 w-5 text-emerald-300"
                      : toast.type === "error"
                        ? "h-5 w-5 text-red-300"
                        : "h-5 w-5 text-brand-darkRed"
                  }
                />
                <div className="min-w-0 flex-1">
                  {toast.title ? (
                    <p className="text-sm font-semibold text-white/95">
                      {toast.title}
                    </p>
                  ) : null}
                  {toast.message ? (
                    <p className="mt-1 text-sm leading-relaxed text-brand-gray">
                      {toast.message}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove?.(toast.id)}
                  className="text-brand-gray/80 transition-colors hover:text-white"
                  aria-label="Dismiss toast"
                >
                  ×
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

