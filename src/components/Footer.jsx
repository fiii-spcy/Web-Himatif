import { Link } from "react-router-dom";
import { navItems } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-brand-secondaryBlack/70 py-12">
      <div className="section-shell grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full border border-brand-darkRed bg-brand-darkRed/25" />
            <p className="font-bold">HIMATIF</p>
          </div>
          <p className="text-sm text-brand-gray">
            Himpunan Mahasiswa Teknik Informatika STMIK AMIKBANDUNG.
          </p>
        </div>
        <div>
          <p className="mb-3 font-bold">Quick Links</p>
          <ul className="space-y-2 text-sm text-brand-gray">
            {navItems.map((item) => (
              <li key={item}>
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-white">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold">Social</p>
          <ul className="space-y-2 text-sm text-brand-gray">
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Youtube</li>
            <li>Email</li>
          </ul>
        </div>
        <div className="text-sm text-brand-gray">
          <p className="mb-3 font-bold text-white">Identity</p>
          <p>TECH • LEADERSHIP • INNOVATION</p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-brand-gray">
        © 2026 HIMATIF STMIK AMIKBANDUNG
      </p>
    </footer>
  );
}
