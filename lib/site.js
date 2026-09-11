export const site = {
  name: "Alex Carter",
  role: "CS Student · Climber",
  location: "Boulder, CO",
  blurb:
    "I climb rocks and stack code. This site is my basecamp — projects as routes, experience as expeditions.",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
};

export const navLinks = [
  { label: "Basecamp", href: "/#top", grade: "V0" },
  { label: "Profile", href: "/#profile", grade: "V1" },
  { label: "Routes", href: "/#routes", grade: "V4" },
  { label: "Expeditions", href: "/#expeditions", grade: "V6" },
  { label: "Field Notes", href: "/blog", grade: "V2" },
  { label: "Belay", href: "/#contact", grade: "V0" },
];

export const projects = [
  {
    title: "SendTrain — Climbing Log App",
    grade: "V6 · Project",
    description:
      "Log sends, track grades, visualize progress. React + SQLite. Placeholder — swap with your real project.",
    tags: ["React", "SQLite", "Recharts"],
    status: "Sent",
  },
  {
    title: "TopoMaps Parser",
    grade: "V4 · Flash",
    description:
      "Parse GPX route data into printable crag topos. Placeholder project card.",
    tags: ["Python", "Leaflet"],
    status: "Sent",
  },
  {
    title: "Belay Buddy Finder",
    grade: "V5 · Attempt",
    description:
      "Match climbers by schedule + grade. Placeholder — describe stack and outcome.",
    tags: ["Next.js", "Postgres"],
    status: "Projecting",
  },
  {
    title: "CS Course Visualizer",
    grade: "V3 · Flash",
    description:
      "DAG of prereqs for your major. Placeholder for a school project.",
    tags: ["D3", "Next.js"],
    status: "Sent",
  },
  {
    title: "Weather Window Checker",
    grade: "V2 · Warm-up",
    description:
      "Check crag weather windows via Open-Meteo. Placeholder weekend hack.",
    tags: ["API", "Tailwind"],
    status: "Sent",
  },
  {
    title: "Portfolio Basecamp (this site)",
    grade: "V1 · Warm-up",
    description:
      "Next.js + Tailwind, climbing-inspired design system. You're looking at it.",
    tags: ["Next.js", "Agraham"],
    status: "Sent",
  },
];

export const expeditions = [
  {
    period: "2025 — Present",
    title: "B.S. Computer Science",
    place: "University Placeholder",
    detail:
      "Data structures, systems, web dev. Placeholder — add GPA, clubs, climbing club.",
  },
  {
    period: "Summer 2025",
    title: "Software Intern — Placeholder Co.",
    place: "Denver, CO",
    detail:
      "Shipped placeholder feature, learned code review beta. Swap with real experience.",
  },
  {
    period: "2024 — Present",
    title: "Climbing — Sport & Bouldering",
    place: "Front Range crags + gym",
    detail:
      "Projecting 5.11 / V5. Belay-certified, leave-no-trace. Placeholder log.",
  },
];

export const climberStats = [
  { label: "Style", value: "Sport / Boulder" },
  { label: "Project", value: "5.11a · V5" },
  { label: "Home Crag", value: "Clear Creek" },
  { label: "Belay", value: "ATC + GriGri" },
];
