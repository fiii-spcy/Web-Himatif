import {
  Code2,
  Handshake,
  Palette,
  Trophy,
  Users,
} from "lucide-react";

export const navItems = [
  "Home",
  "About",
  "Divisions",
  "Programs",
  "Events",
  "Organization",
  "Contact",
];

export const stats = [
  { value: "500+", label: "Members" },
  { value: "20+", label: "Programs" },
  { value: "10+", label: "Years" },
  { value: "100+", label: "Achievements" },
];

export const divisionData = [
  {
    title: "PSDM",
    desc: "Pengembangan sumber daya mahasiswa untuk membentuk karakter dan kepemimpinan.",
    icon: Users,
  },
  {
    title: "RISTEK",
    desc: "Riset dan teknologi untuk mendorong inovasi, pembelajaran, dan kompetensi teknis.",
    icon: Code2,
  },
  {
    title: "MEDFOR",
    desc: "Media informasi organisasi yang fokus pada publikasi, dokumentasi, dan branding digital.",
    icon: Palette,
  },
  {
    title: "MINAT DAN BAKAT",
    desc: "Fasilitasi potensi mahasiswa dalam bidang akademik maupun non-akademik.",
    icon: Trophy,
  },
  {
    title: "HUBSOS",
    desc: "Hubungan sosial dan eksternal untuk memperkuat kolaborasi dengan civitas dan masyarakat.",
    icon: Handshake,
  },
];

export const programs = [
  "Seminar Technology",
  "Coding Bootcamp",
  "Hackathon",
  "Community Service",
  "Competition",
  "Workshop",
];

export const events = [
  { title: "AI Seminar 2026", type: "Seminar", size: "tall" },
  { title: "Frontend Sprint", type: "Workshop", size: "wide" },
  { title: "Competitive Coding", type: "Competition", size: "normal" },
  { title: "Social Tech Care", type: "Social", size: "normal" },
  { title: "Cloud Seminar", type: "Seminar", size: "normal" },
  { title: "Design Workshop", type: "Workshop", size: "tall" },
  { title: "Game Jam", type: "Competition", size: "wide" },
  { title: "Community Visit", type: "Social", size: "normal" },
];
