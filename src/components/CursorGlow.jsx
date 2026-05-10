import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xSpring = useSpring(x, { damping: 28, stiffness: 220 });
  const ySpring = useSpring(y, { damping: 28, stiffness: 220 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 100);
      y.set(e.clientY - 100);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ x: xSpring, y: ySpring }}
      className="pointer-events-none fixed z-[60] h-[200px] w-[200px] rounded-full bg-brand-darkRed/20 blur-3xl"
    />
  );
}
