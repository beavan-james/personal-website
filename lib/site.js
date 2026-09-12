export const site = {
  name: "James Beavan",
  role: "Mathematics · Data Science @ Georgia Tech",
  location: "Atlanta, GA",
  blurb:
    "Junior at Georgia Tech specializing in data engineering and infrastructure, with applied ML experience building predictive and ranking models. I architect pipelines, design schemas, and ship backend APIs with Python, SQL, Dagster, and cloud.",
  email: "beavan@gatech.edu",
  socials: [
    { label: "GitHub", href: "https://github.com/beavan-james" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jamesbeavan" },
  ],
  skills: [
    "Python",
    "SQL",
    "Dagster",
    "DuckDB",
    "AWS",
    "PostgreSQL",
    "Docker",
    "Pandas",
    "XGBoost",
  ],
  heroTags: "Python · SQL · Dagster · DuckDB",
  heroHeadline: {
    lead: "I build",
    accent: "data infrastructure.",
  },
  about: {
    title: "Mathematics and Data Science",
    blurb:
      "Georgia Tech junior focused on data engineering, pipelines, and ranking models — from internships to side projects.",
    paragraphs: [
      "Hi I'm James, I'm a Junior at Georgia Tech studying Mathematics with a Data Science concentration. Outside of school I enjoy rock climbing and being outdoors.",
      "I'm primarily focused on Data Engineering and Infrastructure, however I also have experience with applied machine learning and building predictive/ranking models. I'm skilled in architecting data pipelines, designing database schemas, and building backend APIs using Python, SQL, Dagster, and cloud infrastructure.",
    ],
  },
  projectsIntro:
    "Selected builds — pipelines, APIs, and ranking systems from internships and personal work.",
  experienceIntro:
    "Internships and school so far — manufacturing analytics, nonprofit data platforms, and applied ML tooling.",
};

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export const projects = [
  {
    title: "Stockidence",
    category: "Data Platform",
    description:
      "On-demand stock-confidence platform on Dagster and DuckDB. Incrementally ingests prices, fundamentals, and news sentiment from 4 APIs with per-endpoint staleness TTLs. DuckDB medallion architecture feeds an XGBoost LambdaMART ranking model (rank IC +0.163; top-quintile excess +2.99 pp/qtr). Deployed on Oracle Cloud Ampere A1.",
    tags: ["Dagster", "DuckDB", "XGBoost", "OCI"],
    status: "In progress",
    href: "https://github.com/beavan-james/Stockidence",
  },
  {
    title: "Nonprofit Analytics Pipeline",
    category: "Data Infrastructure",
    description:
      "Automated Dagster + DuckDB + Docker pipeline on AWS EC2 for the Lindaben Foundation. Ingests CSVs via a Dash frontend, incremental loads with timestamp deduplication, and seven aggregation tables for analytics — processing 180K records.",
    tags: ["Dagster", "DuckDB", "Docker", "AWS", "Dash"],
    status: "Completed",
  },
  {
    title: "Lindaben Platform APIs",
    category: "Backend",
    description:
      "Built and documented 30+ REST APIs for users, schools, vendors, deliveries, and orders — filtering, pagination, sorting, plus role-based access for admins, accounting, vendors, schools, and operations.",
    tags: ["Python", "REST", "RBAC"],
    status: "Completed",
  },
  {
    title: "Procurement Tracker",
    category: "Hackathon",
    description:
      "Won the Northrop Grumman CIDO Intern Hackathon with an app to track and filter international procurement data for orders over $3M.",
    tags: ["Python", "Analytics"],
    status: "Completed",
  },
  {
    title: "Docs Generation Chatbot",
    category: "Applied ML",
    description:
      "Two-stage documentation chatbot with langchain-openai, dynamic file routing, and context filtering — tuned prompts and token allocation to cut context pollution for a manufacturing analytics pipeline.",
    tags: ["LangChain", "OpenAI", "Python"],
    status: "Completed",
  },
  {
    title: "This Portfolio Site",
    category: "Personal Site",
    description:
      "Next.js + Tailwind portfolio with a climbing-inspired design system. Content driven from a single site config.",
    tags: ["Next.js", "Tailwind"],
    status: "Completed",
  },
];

export const experienceItems = [
  {
    period: "Jun 2026 — Aug 2026",
    title: "Data Insights Intern — Northrop Grumman",
    place: "Falls Church, VA",
    detail:
      "Automated docs generation for a manufacturing analytics pipeline, fixed conflicting dashboard aggregations, sped up a core Tableau dashboard ~25%, won the CIDO Intern Hackathon, and built a two-stage LangChain documentation chatbot.",
    bullets: [
      "Developed Python scripts to automate documentation generation for the manufacturing analytics pipeline",
      "Resolved conflicting aggregation logic across dashboard views, aligning metric definitions",
      "Optimized a core Tableau dashboard (~25% performance improvement)",
      "Won CIDO Intern Hackathon — international procurement tracker for $3M+ orders",
      "Built a two-stage langchain-openai docs chatbot with dynamic routing and context filtering",
    ],
  },
  {
    period: "May 2025 — May 2026",
    title: "Software & Data Intern — Lindaben Foundation",
    place: "Columbia, MD",
    detail:
      "Shipped REST APIs with RBAC, cleaned 300+ Excel entry errors, built a GPT-4 Excel→JSON migration tool, and deployed a Dagster/DuckDB/Docker pipeline on AWS processing 180K records.",
    bullets: [
      "Analyzed Excel time logs with Python/Pandas/Openpyxl — caught 300+ errors and improved entry accuracy ~90%",
      "Built 30+ REST APIs with filtering, pagination, sorting, and role-based access control",
      "Developed a GPT-4-assisted migration tool for legacy Excel deliveries into relational JSON",
      "Deployed Dagster + DuckDB + Docker on AWS EC2 — incremental CSV loads and seven aggregation tables (180K records)",
    ],
  },
  {
    period: "Sep 2024 — Jan 2025",
    title: "Data Science Intern — Intechgambit",
    place: "Falls Church, VA",
    detail:
      "Stress-tested a Biopython NCBI gene-sequence tool (stable to ~40K entries) and benchmarked ChatGPT, Gemini, and Copilot across 50+ prompts for accuracy and runtime.",
    bullets: [
      "Tested and optimized a Python/Biopython NCBI gene-sequence retrieval tool (limit ~40,000 entries)",
      "Evaluated ChatGPT, Gemini, and Copilot across 50+ prompts for accuracy and runtime",
    ],
  },
  {
    period: "Jul 2025 — May 2028",
    title: "B.S. Mathematics, Data Science Concentration",
    place: "Georgia Institute of Technology · Atlanta, GA",
    detail:
      "GPA 3.6/4.0. Coursework: Statistics and Probability, Object-Oriented Programming, Discrete Mathematics, Mathematics of Data Science, Data Structures & Algorithms.",
    bullets: [
      "GPA: 3.6/4.0",
      "Relevant coursework: Statistics & Probability, OOP, Discrete Math, Mathematics of Data Science, DSA",
    ],
  },
];

export const quickFacts = [
  { label: "School", value: "Georgia Tech" },
  { label: "Focus", value: "Data Engineering" },
  { label: "Degree", value: "Math / DS '28" },
  { label: "GPA", value: "3.6 / 4.0" },
];

export const glanceFacts = [
  { label: "School", value: "Georgia Tech" },
  { label: "Focus", value: "Data Eng" },
  { label: "Stack", value: "Python · SQL" },
  { label: "Now", value: "Stockidence" },
];
