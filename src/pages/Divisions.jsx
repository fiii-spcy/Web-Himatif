import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { divisionData } from "../data/content";

export default function Divisions() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Divisions"
          title="Powered by specialized teams"
          subtitle="Every division plays a strategic role in building HIMATIF's ecosystem."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {divisionData.map((division, index) => {
            const Icon = division.icon;
            return (
              <motion.article
                key={division.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group glass rounded-2xl p-7 shadow-glow transition-colors hover:border-brand-darkRed/70"
              >
                <div className="mb-5 inline-flex rounded-xl border border-brand-darkRed/50 bg-brand-darkRed/20 p-3">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-bold">{division.title}</h3>
                <p className="mt-3 text-brand-gray">{division.desc}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-brand-darkRed/70 to-transparent" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
