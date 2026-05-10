import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { programs } from "../data/content";

export default function Programs() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Programs"
          title="Strategic yearly execution"
          subtitle="High-impact learning and community programs designed for practical growth."
        />
        <div className="mx-auto max-w-4xl space-y-5">
          {programs.map((program, i) => (
            <motion.div
              key={program}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass relative rounded-2xl p-6"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-brand-darkRed" />
              <p className="text-xs tracking-[0.25em] text-brand-gray">PROGRAM 0{i + 1}</p>
              <h3 className="mt-2 text-2xl font-bold">{program}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
