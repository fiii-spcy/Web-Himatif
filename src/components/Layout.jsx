import CursorGlow from "./CursorGlow";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NoiseOverlay from "./NoiseOverlay";
import ScrollProgress from "./ScrollProgress";
import { JoinHIMATIFProvider } from "../contexts/JoinHIMATIFContext";

export default function Layout({ children }) {
  return (
    <JoinHIMATIFProvider>
      <div className="relative min-h-screen bg-brand-black text-brand-white">
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(155,17,30,0.18),transparent_45%)]" />
        <ScrollProgress />
        <CursorGlow />
        <NoiseOverlay />
        <Navbar />
        <main className="relative z-10 pt-20">{children}</main>
        <Footer />
      </div>
    </JoinHIMATIFProvider>
  );
}
