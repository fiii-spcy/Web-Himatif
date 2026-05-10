import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { events } from "../data/content";

const filters = ["All", "Seminar", "Workshop", "Competition", "Social"];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = useMemo(
    () => (activeFilter === "All" ? events : events.filter((event) => event.type === activeFilter)),
    [activeFilter]
  );

  const sizeClasses = {
    normal: "h-56",
    tall: "h-80",
    wide: "h-56 md:col-span-2",
  };

  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeader eyebrow="Events" title="Moments that shape our culture" />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                activeFilter === filter
                  ? "border-brand-darkRed bg-brand-darkRed/20 text-white"
                  : "border-white/15 text-brand-gray hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid auto-rows-max gap-5 md:grid-cols-3">
          {filtered.map((event, i) => (
            <motion.div
              key={`${event.title}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${sizeClasses[event.size]} bg-gradient-to-br from-white/5 to-brand-darkRed/20`}
            >
              <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-8 p-6 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-gray">{event.type}</p>
                <p className="mt-2 text-xl font-bold">{event.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
