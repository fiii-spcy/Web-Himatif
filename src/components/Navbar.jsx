import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import { navItems } from "../data/content";
import logo from "../assets/himatif-logo-placeholder.png";
import { useJoinHIMATIFModal } from "../contexts/JoinHIMATIFContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openModal } = useJoinHIMATIFModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="HIMATIF Logo"
            className="h-10 w-10 rounded-full object-cover shadow-glow"
          />
          <span className="font-bold tracking-[0.16em]">HIMATIF</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-white" : "text-brand-gray hover:text-white"}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            type="button"
            onClick={openModal}
            className="text-sm uppercase tracking-[0.15em]"
          >
            Join HIMATIF
          </MagneticButton>
        </div>

        <button onClick={() => setOpen((s) => !s)} className="lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden border-t border-white/10 bg-brand-secondaryBlack/95 lg:hidden"
      >
        <div className="section-shell py-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-sm text-brand-gray hover:text-white"
              >
                {item}
              </NavLink>
            ))}
            <MagneticButton
              type="button"
              onClick={() => {
                setOpen(false);
                openModal();
              }}
              className="mt-2 text-sm uppercase tracking-[0.15em]"
            >
              Join HIMATIF
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
