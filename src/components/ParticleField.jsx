import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 23) % 100}%`,
  delay: (i % 6) * 0.35,
  size: (i % 3) + 2,
}));

export default function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0.15, y: 0 }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: p.delay }}
          className="absolute rounded-full bg-white/45"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}
