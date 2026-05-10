import { motion } from "framer-motion";

export default function JoinStepper({ stepIndex = 0, steps = [] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => {
          const isActive = idx === stepIndex;
          const isDone = idx < stepIndex;
          return (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? "0 0 0 3px rgba(155,17,30,0.35)" : 0,
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                    isDone
                      ? "border-emerald-400/40 bg-emerald-500/15"
                      : isActive
                        ? "border-brand-darkRed/60 bg-brand-darkRed/15"
                        : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="text-sm font-bold text-white/90">{idx + 1}</span>
                </motion.div>
              </div>
              <p className="mt-2 text-[11px] text-brand-gray">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="relative h-px w-full bg-white/10">
          <motion.div
            className="absolute left-0 top-0 h-px bg-gradient-to-r from-brand-darkRed via-white/30 to-brand-darkRed/70"
            initial={false}
            animate={{
              width: `${(stepIndex / (steps.length - 1 || 1)) * 100}%`,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

