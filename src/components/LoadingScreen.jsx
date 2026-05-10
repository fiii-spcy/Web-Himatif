import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.3, repeat: Infinity }}
          className="mx-auto mb-5 h-20 w-20 rounded-full border border-brand-darkRed/70 bg-brand-darkRed/15 blur-[1px]"
        />
        <p className="text-sm tracking-[0.4em] text-brand-gray">HIMATIF</p>
      </motion.div>
    </div>
  );
}
