import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import MagneticButton from "../components/MagneticButton";
import ParticleField from "../components/ParticleField";
import SectionHeader from "../components/SectionHeader";
import { stats } from "../data/content";
import logo from "../assets/himatif-logo-placeholder.png";
import { useJoinHIMATIFModal } from "../contexts/JoinHIMATIFContext";

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const titleY = useTransform(scrollY, [0, 500], [0, 60]);
  const { openModal } = useJoinHIMATIFModal();

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="cinematic-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black to-brand-maroon/20" />
        <div className="absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-darkRed/35 blur-[120px]" />
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <ParticleField />
        <div className="section-shell relative z-10 grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-brand-gray">
              TECH • LEADERSHIP • INNOVATION
            </p>
            <motion.h1
              style={{ y: titleY }}
              className="text-gradient-strong text-5xl font-extrabold leading-tight md:text-7xl xl:text-8xl"
            >
              Building
              <br />
              Future IT Leaders
            </motion.h1>
            <p className="mt-6 max-w-xl text-brand-gray">
              Himpunan Mahasiswa Teknik Informatika STMIK AMIKBANDUNG
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about">
                <MagneticButton>Explore Us</MagneticButton>
              </Link>
              <MagneticButton
                type="button"
                className="bg-brand-darkRed/20"
                onClick={openModal}
              >
                Join Now
              </MagneticButton>
            </div>
          </div>
          <motion.div
            style={{ y }}
            className="relative mx-auto h-72 w-72 md:h-96 md:w-96"
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass flex h-full w-full items-center justify-center rounded-[34px] shadow-glow"
            >
              <div className="text-center">
                <img
                  src={logo}
                  alt="HIMATIF Logo"
                  className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                />
                <p className="text-2xl font-bold">HIMATIF</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-2 -z-10 rounded-[34px] border border-brand-darkRed/60"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-shell">
          <div className="section-divider mb-14" />
          <SectionHeader eyebrow="Impact" title="Growing with consistency" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-7 text-center hover:border-brand-darkRed/60"
              >
                <p className="text-4xl font-extrabold text-gradient">
                  {item.value}
                </p>
                <p className="mt-2 text-brand-gray">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
