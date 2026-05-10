import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function JoinSuccess({ registrationNumber, onDone }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 shadow-glow"
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-300" />
      </motion.div>

      <h3 className="mt-6 text-2xl font-extrabold text-white/95">
        Registration submitted successfully
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-gray">
        Your registration number:
      </p>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
        <p className="text-lg font-extrabold tracking-wide text-gradient">
          {registrationNumber}
        </p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="btn-magnetic mt-8 bg-brand-darkRed/20"
      >
        Done
      </button>
    </div>
  );
}

