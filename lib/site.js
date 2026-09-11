export const site = {
  name: "Alex Carter",
  role: "Computer Science Student",
  location: "Boulder, CO",
  blurb:
    "I'm a CS student who likes building small, useful web apps. Outside of school and code, I climb — you'll spot a few subtle nods to it here.",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const projects = [
  {
    title: "Habit Tracker Web App",
    category: "Web App",
    description:
      "Track habits with streaks and charts. React + SQLite. Placeholder — swap with your real project.",
    tags: ["React", "SQLite", "Recharts"],
    status: "Completed",
  },
  {
    title: "GPX Route Visualizer",
    category: "Data Viz",
    description:
      "Upload GPX files and render them on an interactive map. Placeholder project card.",
    tags: ["Python", "Leaflet"],
    status: "Completed",
  },
  {
    title: "Study Group Finder",
    category: "Full-Stack",
    description:
      "Match students by schedule and course. Placeholder — describe stack and outcome.",
    tags: ["Next.js", "Postgres"],
    status: "In progress",
  },
  {
    title: "CS Course Visualizer",
    category: "Course Project",
    description:
      "DAG of prereqs for your major. Placeholder for a school project.",
    tags: ["D3", "Next.js"],
    status: "Completed",
  },
  {
    title: "Weather Dashboard",
    category: "Weekend Hack",
    description:
      "Check forecast windows via Open-Meteo. Placeholder weekend hack.",
    tags: ["API", "Tailwind"],
    status: "Completed",
  },
  {
    title: "This Portfolio Site",
    category: "Personal Site",
    description:
      "Next.js + Tailwind with a subtle climbing-inspired design system. You're looking at it.",
    tags: ["Next.js", "Agraham"],
    status: "Completed",
  },
];

export const experienceItems = [
  {
    period: "2025 — Present",
    title: "B.S. Computer Science",
    place: "University Placeholder",
    detail:
      "Data structures, systems, web dev. Placeholder — add GPA, relevant coursework, and clubs.",
  },
  {
    period: "Summer 2025",
    title: "Software Intern — Placeholder Co.",
    place: "Denver, CO",
    detail:
      "Shipped a placeholder feature and learned code review. Swap with real experience.",
  },
  {
    period: "2024 — Present",
    title: "Teaching Assistant — Intro CS",
    place: "University Placeholder",
    detail:
      "Hold office hours and grade assignments. Placeholder — replace with real role.",
  },
];

export const quickFacts = [
  { label: "School", value: "B.S. CS '27" },
  { label: "Focus", value: "Web Dev" },
  { label: "Based in", value: "Boulder, CO" },
  { label: "Outside class", value: "Climbing" },
];
