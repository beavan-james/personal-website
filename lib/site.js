export const site = {
  name: "James Beavan",
  role: "Math + Data Science @ Georgia Tech",
  location: "Atlanta, GA",
  blurb:
    "Junior at Georgia Tech studying Mathematics. Applying statistical theory to solve complex data problems and build reliable data pipelines and infrastructure.",
  email: "beavan@gatech.edu",
  socials: [
    { label: "GitHub", href: "https://github.com/beavan-james" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jamesbeavan" },
  ],
  // Grouped tool list shown under the About text
  skillGroups: [
    { label: "Languages", items: ["Python", "SQL", "Java"] },
    { label: "Data", items: ["Dagster", "DuckDB", "Databricks", "Pandas", "Sklearn"] },
    { label: "Infra", items: ["AWS", "OCI", "Docker"] },
  ],
  heroTags: "AWS · Dagster · Python · DuckDB",
  about: {
    title: "About Me",
    blurb: "",
    paragraphs: [
      "Hi, I'm James, a junior at Georgia Tech studying Mathematics with a Data Science concentration. I was born and raised in Laurel, Maryland. Outside of school I enjoy rock climbing and being outdoors.",
      "My primary focus is Data Engineering and Infrastructure, however I'm also interested in applied machine learning. I have experience with architecting data pipelines, designing database schemas, and building backend APIs using Python, SQL, Dagster, and cloud infrastructure.",
    ],
  },
  projectsIntro: "Various side projects that I've been working on recently.",
  experienceIntro: "Where I've worked and what I shipped.",
};

export const navLinks = [
  { label: "About", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

// Each project gets a card on /portfolio (hover previews `metrics` and
// `pipeline`) and a case-study page at /portfolio/<slug>.
export const projects = [
  {
    slug: "stockidence",
    title: "Stockidence",
    category: "Data Platform, Applied ML",
    description:
      "On-demand stock-confidence platform on Dagster and DuckDB. Incrementally ingests prices, fundamentals, and news sentiment from 4 APIs with per-endpoint staleness TTLs. DuckDB medallion architecture feeds an XGBoost LambdaMART ranking model (rank IC +0.163; top-quintile excess +2.99 pp/qtr). Deployed on Oracle Cloud Ampere A1.",
    tags: ["Dagster", "DuckDB", "XGBoost", "OCI"],
    repo: "https://github.com/beavan-james/Stockidence",
    metrics: [
      { value: "+0.163", label: "Rank IC" },
      { value: "+2.99 pp", label: "Top-quintile excess / qtr" },
      { value: "4", label: "Source APIs" },
    ],
    pipeline: [
      { step: "Ingest", detail: "Prices, fundamentals, news sentiment with per-endpoint staleness TTLs" },
      { step: "Model", detail: "Bronze → silver → gold medallion layers in DuckDB" },
      { step: "Rank", detail: "XGBoost LambdaMART scores each ticker" },
      { step: "Serve", detail: "Dagster on Oracle Cloud Ampere A1" },
    ],
    // Long-form case-study sections, rendered in order on the project page.
    // Add more { heading, body } entries (e.g. "Decisions", "What I'd change").
    sections: [
      {
        heading: "Overview",
        body: "On-demand stock-confidence platform on Dagster and DuckDB. Incrementally ingests prices, fundamentals, and news sentiment from 4 APIs with per-endpoint staleness TTLs.",
      },
      {
        heading: "Model",
        body: "A DuckDB medallion architecture feeds an XGBoost LambdaMART ranking model, reaching a rank IC of +0.163 and a top-quintile excess return of +2.99 pp per quarter.",
      },
      {
        heading: "Deployment",
        body: "Runs on Oracle Cloud Ampere A1, orchestrated by Dagster.",
      },
    ],
  },
];

export const experienceItems = [
  {
    period: "Jun 2026 to Aug 2026",
    title: "Data Insights Intern at Northrop Grumman",
    place: "Falls Church, VA",
    detail:
      "Manufacturing Analytics Team, Chief Information & Digital Office (CIDO)",
    bullets: [
      "Developed Python scripts to automate documentation generation for the manufacturing analytics pipeline",
      "Resolved conflicting aggregation logic across dashboard views, aligning metric definitions",
      "Optimized a core Tableau dashboard (~25% performance improvement)",
      "Won CIDO Intern Hackathon with an international procurement tracker for $3M+ orders",
      "Built a two-stage langchain-openai docs chatbot with dynamic routing and context filtering",
    ],
  },
  {
    period: "May 2025 to May 2026",
    title: "Software & Data Intern at Lindaben Foundation",
    place: "Columbia, MD",
    detail:
      "Focused on data ingestion and analytics",
    bullets: [
      "Analyzed Excel time logs with Python/Pandas/Openpyxl, catching 300+ errors and improving entry accuracy by about 90%",
      "Built 30+ REST APIs with filtering, pagination, sorting, and role-based access control",
      "Developed a GPT-4-assisted migration tool for legacy Excel deliveries into relational JSON",
      "Deployed Dagster + DuckDB + Docker on AWS EC2, with incremental CSV loads and seven aggregation tables (180K records)",
    ],
  },
  {
    period: "Sep 2024 to Jan 2025",
    title: "Data Science Intern at Intechgambit",
    place: "Falls Church, VA",
    detail:
      "Assisted with development of a gene-sequence retrieval tool",
    bullets: [
      "Tested and optimized a Python/Biopython NCBI gene-sequence retrieval tool (limit ~40,000 entries)",
      "Evaluated ChatGPT, Gemini, and Copilot across 50+ prompts for accuracy and runtime",
    ],
  },
  {
    period: "Jul 2025 to May 2028",
    title: "Georgia Institute of Technology",
    place: "Atlanta, GA",
    detail:
      "B.S. Mathematics, Data Science Concentration",
    bullets: [
      "GPA: 3.6/4.0",
      "Relevant coursework: Data Structures & Algorithms, Object-Oriented Programming, Mathematics of Data Science, Statistics & Probability, Discrete Math",
    ],
  },
];

// "Currently" card next to the About text. Ideas to add:
// { label: "Climbing", value: "..." }, { label: "Reading", value: "..." }
export const currently = [
  { label: "Building", value: "Stockidence" },
  { label: "Studying", value: "Math @ Georgia Tech '28" },
  { label: "Based in", value: "Atlanta, GA" },
];
