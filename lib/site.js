export const site = {
  name: "James Beavan",
  role: "Math + Data Science @ Georgia Tech",
  location: "Atlanta, GA",
  blurb:
    "Junior at Georgia Tech studying Mathematics. I enjoy building data pipelines and the models that sit on top of them. Most recently, I built a platform that ranks the S&P 500 every quarter.",
  email: "beavan@gatech.edu",
  socials: [
    { label: "GitHub", href: "https://github.com/beavan-james" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jamesbeavan" },
  ],
  // Grouped tool list shown under the About text
  skillGroups: [
    { label: "Languages", items: ["Python", "SQL", "Java", "Go"] },
    { label: "Data", items: ["Dagster", "DuckDB", "Databricks", "PostgreSQL", "Tableau", "Pandas", "Sklearn"] },
    { label: "Infra", items: ["AWS", "OCI", "Docker"] },
  ],
  heroTags: "AWS · Dagster · Python · DuckDB",
  about: {
    title: "About Me",
    blurb: "Math student, data engineer, climber",
    paragraphs: [
    "I've always enjoyed problem solving, which is why I chose to major in math. When it came time to pick a concentration I wanted something applied, and data science clicked immediately. The more I learned, the more I was drawn upstream into data engineering: the pipelines, schemas, and infrastructure that every analytics dashboard and data-heavy application depends on.",
    "Outside of school I'm usually climbing. I started when I got to college and haven't stopped. It's my outlet after a long day, but what keeps me coming back is the process: dissecting a route, thinking through how forces and body position work together, and grinding through trial and error until it goes. Otherwise you'll find me cooking, watching anime, or getting outside.",
    ],
  },
  projectsIntro: "What I've been building.",
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
      "A stock research platform that pulls market data from four free APIs on demand and ranks the S&P 500 with a quarterly machine-learning model. Built on Dagster and DuckDB, self-hosted on Oracle Cloud.",
    tags: ["Dagster", "DuckDB", "XGBoost", "FastAPI", "React", "OCI"],
    repo: "https://github.com/beavan-james/Stockidence",
    live: "https://stockidence.com",
    metrics: [
      { value: "+0.163", label: "Walk-forward rank IC (26 quarters)" },
      { value: "+4.57 pp", label: "Top 20 vs S&P 500, per quarter" },
      { value: "4", label: "Free-tier source APIs" },
    ],
    pipeline: [
      { step: "Ingest", detail: "Finnhub, Twelve Data, Alpha Vantage, FRED, each endpoint behind its own staleness TTL" },
      { step: "Model", detail: "DuckDB raw → staging → mart; technicals and stats derived in-pipeline, not fetched" },
      { step: "Rank", detail: "Quarterly XGBoost rank:ndcg over the S&P 500 with per-stock SHAP breakdowns" },
      { step: "Serve", detail: "FastAPI + React SPA, Docker Compose on one Oracle Ampere box" },
    ],
    // Long-form case-study sections, rendered in order on the project page.
    // `body` is a string or an array of paragraphs; `bullets` and `table`
    // ({ rows: [[label, value], ...] }) are optional.
    sections: [
      {
        heading: "The problem",
        body: [
          "Stockidence answers one question: \"I want to buy this stock, but I don't know if it's a good time and I don't have time to research it.\" Search any ticker and you get a fair-value anchor (a 50/50 blend of a discounted cash flow model and the company's own historical multiples) next to raw technical statistics like RSI, MACD, ATR, and Bollinger Bands. A separate Rankings page orders the S&P 500 by a machine-learned score, and a Market page collects movers, IPO and earnings calendars, macro indicators, commodities, and news sentiment.",
          "The modeling is the visible part, but most of the engineering went into the data underneath it. The goal was a pipeline that could serve any ticker on demand while living entirely on free-tier API limits.",
        ],
      },
      {
        heading: "On-demand ingestion",
        body: [
          "Because users can search any symbol, there's no fixed watchlist to batch-load overnight. Every request goes through a staleness gate keyed on (source, ticker, endpoint) with a watermark per combination, so a search reuses recently fetched data instead of burning rate limit. The policy is different for each data type, because a quote goes stale in a minute and an income statement goes stale in a quarter.",
        ],
        bullets: [
          "Quote: ~1 minute TTL, the hot path on every lookup",
          "Company profile and basic financials: 3 days",
          "EPS surprises and analyst recommendations: 30 days; peers: 60 days",
          "As-reported financials: no clock at all. The gate computes the latest period that should exist from SEC filing deadlines and only refetches if the warehouse is behind it",
          "Earnings call transcripts: immutable once published, fetched once per quarter",
        ],
      },
      {
        heading: "Cadence by design",
        body: [
          "Market-wide data runs on its own schedules, independent of user searches. The cadence is deliberately uneven, mostly to stay under Alpha Vantage's very small free-tier quota: news and sentiment pulls twice a day plus overnight, movers and calendars on weekdays, VIX and S&P 500 levels daily from FRED, and macro indicators, commodities, and the symbol listing monthly.",
          "Anything that can be computed is not fetched. MACD is a premium Alpha Vantage endpoint, so it's derived in the mart layer from EMA12 and EMA26. The same goes for every technical indicator (SMA, EMA, RSI, STOCH, ADX, CCI, OBV, ATR, BBANDS) and the rolling volatility and drawdown stats. They're Dagster assets downstream of the cleaned daily bars and refresh whenever new prices land, not on an API clock.",
        ],
      },
      {
        heading: "Warehouse",
        body: [
          "A single DuckDB file (about 1.4 GB) holds three layers. Raw lands provider responses as-is, staging unnests and types them, and mart holds the aggregates and snapshots the app reads. The UI never talks to a provider directly; it only reads the warehouse through the API.",
          "Two modeling problems took the most thought. First, as-reported financials arrive as raw XBRL tags that aren't standardized across companies, so the mart layer maps them to canonical metrics with alias and prefix matching plus coalesce fallbacks. Second, a single news article mentions several tickers and each ticker appears in many articles, so sentiment is stored at the article level with a junction table carrying per-ticker relevance and sentiment scores. That keeps a story that is bullish on one company and bearish on another from contaminating either.",
        ],
      },
      {
        heading: "Orchestration and serving",
        body: [
          "Dagster runs everything without sensors. When a user searches a ticker, FastAPI checks the mart snapshot. If it's less than a day old it's served immediately. If it's older, it's still served (flagged as refreshing) while the API launches a refresh_tickers job over Dagster's GraphQL endpoint, with a per-ticker cooldown so the frontend's polling can't queue duplicate runs. A brand-new ticker reports pending until its first snapshot lands.",
          "The service layer is plain Python over DuckDB, wrapped by a typed FastAPI REST surface with exactly one write path. The React + TypeScript frontend consumes it with TanStack Query.",
        ],
      },
      {
        heading: "The ranking model",
        body: [
          "The Rankings page is driven by an XGBoost model with a rank:ndcg objective on a quarterly grain. It doesn't predict prices or returns; it orders each quarter's cohort so the top of the list beats the bottom. I chose ranking over regression because the signal was strongest at the head of the list. Top-ranked names outperformed reliably, while pooled return predictions stayed noisy.",
          "Inputs are 13 raw point-in-time features with no engineering: trend and momentum (price vs SMA200, 3- and 12-month returns, distance from the 52-week high), risk (252-day volatility, max drawdown, ATR %), and balance-sheet quality (ROE, ROA, debt/equity, current ratio, cash and free cash flow to assets). I also tried a 40-feature engineered variant with volatility-scaled momentum, cross-sectional ranks, and market-relative momentum. It halved the rank IC and the top-10 excess return, so I kept the simpler set.",
          "The production fit is 15,874 rows across 377 tickers from 2012 to 2026. Each retrain also exports per-stock SHAP contributions, which sum exactly to the score, so every stock page can explain which inputs pushed it up or down the list.",
        ],
      },
      {
        heading: "Validation",
        body: "Walk-forward backtest: for every quarter from 2019 through 2025, the model trains only on history before the cutoff and is graded on that quarter's realized returns. That's 26 out-of-sample quarters and 7,661 test rows, with point-in-time features and no lookahead. Data from 2012 to 2018 isn't discarded; it trains every fold and warms up the year-plus trailing features.",
        table: {
          rows: [
            ["Rank IC, pooled", "+0.163 (random = 0)"],
            ["Top-10 excess over universe", "+3.90 pp/qtr, positive 73% of quarters"],
            ["Top-25 excess over universe", "+5.08 pp/qtr (t = 2.39), positive 77%"],
            ["Top-quintile excess", "+2.99 pp/qtr (t = 2.22), positive 73%"],
            ["Precision@10", "14.6% (random 3.4%)"],
            ["Top 20 vs S&P 500", "+8.31% vs +3.74% per quarter, beats the index 62% of quarters"],
          ],
        },
      },
      {
        heading: "Honest limits",
        body: "The numbers are encouraging, but I try to be clear about what they don't show.",
        bullets: [
          "Only about four new observations a year. Regime shifts take quarters to detect, and 26 quarters is a small sample for t-stats near 2.",
          "The validation window (2019 to 2025) is bull-market only, with no sustained bear market. In 2021 the top 20 trailed the index, and in 2022 it roughly matched it.",
          "The model leans into momentum, so top cohorts can concentrate in high-beta growth names. It ranks; it doesn't manage risk.",
          "The same names recur across adjacent quarters, so the effective sample is smaller than 7,661 rows suggests.",
        ],
      },
      {
        heading: "Quarterly refresh",
        body: [
          "A quarterly Dagster job refreshes every ticker in the warehouse incrementally (failed fetches retry three times, then get recorded and skipped), rebuilds the training and scoring datasets, re-executes the production notebook to refit the model, and publishes the newest ranked cohort along with its SHAP contributions and the updated track record.",
          "The job is defensive about bad data. If fewer than half of a typical cohort has fresh prices, it fails loudly and leaves the current rankings in place instead of publishing a thin or stale list. Undersized cohorts are dropped from grading, and stale tickers and failed endpoints are logged so the cause shows up in Dagster.",
        ],
      },
      {
        heading: "Deployment",
        body: [
          "The whole stack (FastAPI, the Dagster webserver and daemon, and the SPA behind nginx with HTTPS via certbot) runs under Docker Compose on a single always-free Oracle Cloud Ampere A1 instance with 2 OCPUs and 12 GB of RAM. The warehouse is a mounted volume, so deploys can't overwrite it, and the Dagster UI is bound to localhost and reached over an SSH tunnel.",
          "SSH is open to one admin IP, which rules out push-to-deploy from GitHub Actions. Instead the box deploys itself: a lock-guarded cron script runs every five minutes, fast-forwards to the main branch, and rebuilds and health-checks only when the commit has actually changed.",
        ],
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
      "Developed Python scripts to automate documentation generation for 50+ SQL objects (stored procedures, views) across ~20 manufacturing sites",
      "Diagnosed and resolved conflicting aggregation logic across two dashboard views, aligning metric definitions and eliminating reporting discrepancies",
      "Optimized a core Tableau dashboard, cutting filter time by 25%",
      "Won CIDO Intern Hackathon with an app that tracks and filters international procurement data for $3M+ orders",
      "Built a two-stage documentation chatbot using LangChain and OpenAI with dynamic file routing and context filtering, optimizing prompts and token allocation to reduce irrelevant context",
    ],
  },
  {
    period: "May 2025 to May 2026",
    title: "Software & Data Intern at Lindaben Foundation",
    place: "Columbia, MD",
    detail: "Focused on data ingestion and analytics.",
    bullets: [
      "Built and deployed a Dagster + DuckDB + Docker pipeline on AWS EC2 processing 180K records, with incremental loads, timestamp-based deduplication, and seven aggregation tables powering an analytics dashboard",
      "Built and documented 30+ REST API endpoints with filtering, pagination, and sorting, plus role-based access control across five user roles",
      "Developed a GPT-4-assisted migration tool converting legacy Excel delivery files into relational JSON",
      "Analyzed Excel time logs with Python, Pandas, and Openpyxl, detecting 300+ data entry errors and visualizing them as heat maps",
    ],
  },
  {
    period: "Sep 2024 to Jan 2025",
    title: "Data Science Intern at Intechgambit",
    place: "Falls Church, VA",
    detail: "Supported development of a gene-sequence retrieval tool.",
    bullets: [
      "Stress-tested a Python/Biopython-based tool for retrieving gene sequences from NCBI, identifying its upper limit at 40,000 entries before failure",
      "Evaluated AI models (ChatGPT, Gemini, Copilot) by testing 50+ prompts; recorded accuracy and runtime metrics to compare performance across tasks",
    ],
  },
  {
    period: "Jul 2025 to May 2028",
    title: "Georgia Institute of Technology",
    place: "Atlanta, GA",
    detail: "B.S. Mathematics, Data Science Concentration",
    bullets: [
      "GPA: 3.6/4.0",
      "Relevant coursework: Data Structures & Algorithms, Object-Oriented Programming, Mathematics of Data Science, Statistics and Probability, Discrete Mathematics",
    ],
  },
];

// "Currently" card next to the About text. Ideas to add:
// { label: "Climbing", value: "..." }, { label: "Reading", value: "..." }
export const currently = [
  { label: "Building", value: "Cheapshot (Cost-aware model router)" },
  { label: "Studying", value: "Math @ Georgia Tech '28" },
  { label: "Based in", value: "Atlanta, GA" },
];
