import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const leaders = [
  "Chairman",
  "Vice Chairman",
  "Secretary",
  "Treasurer",
  "Division Heads",
];

export default function Organization() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Organization"
          title="A structured team for sustained execution"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {leaders.map((role, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-7 text-center shadow-glow"
            >
              <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-brand-darkRed bg-brand-darkRed/25" />
              <h3 className="text-2xl font-bold">{role}</h3>
              <p className="mt-2 text-brand-gray">Professional and collaborative leadership role.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
