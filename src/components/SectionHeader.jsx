import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.32em] text-brand-gray">{eyebrow}</p>
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-3xl text-brand-gray">{subtitle}</p>}
    </motion.div>
  );
}
