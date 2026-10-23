export const site = {
  name: "James Beavan",
  role: "Data Engineering · Math @ Georgia Tech",
  location: "Atlanta, GA",
  email: "beavan@gatech.edu",
  socials: [
    { label: "GitHub", href: "https://github.com/beavan-james" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jamesbeavan" },
  ],
  // Expandable details under the hero's role line.
  // A value may be an array to put each item on its own line.
  heroDetails: [
    { label: "Building", value: "CR, a cost-aware model router for Claude Code" },
    {
      label: "Reading",
      value: [
        "Designing Data-Intensive Applications by Martin Kleppmann",
        "Efficient Estimation of Word Representations in Vector Space by Tomáš Mikolov et al.",
      ],
    },
    { label: "Learning", value: "Terraform · Soda" },
  ],
  about: {
    title: "About Me",
    paragraphs: [
      "I've always enjoyed problem solving, which is why I chose to major in math, though I spent just as much of high school doing graphic design. I was always told you don't get paid for knowing math; you get paid for how you apply it. So when it came time to pick my concentration, I knew I wanted something applied.",
      "As I've taken more higher-level math classes I've come to appreciate the subject more as the classes have transitioned from memorization to understanding. Problem solving is inherently non-linear in that often there is no one-line answer but instead a string of clues that you must uncover to solve the problem.",
      "Data science clicked because it mirrored this behavior. Problems typically don't have one right solution but instead various possible solutions with different tradeoffs that you'd need to weigh. The more I learned, the more I was drawn upstream into data engineering through the pipelines, schemas, and infrastructure that every analytics dashboard and data-heavy application depends on.",
      "Seeing how quickly AI is being adopted into the workforce has sparked my interest in machine learning and foundations of generative models. I've grown curious about not just what the black box does, but how it came to be. My long-term goal is to shift towards machine learning engineering since I enjoy building models and the data collection process behind them.",
      "Outside of school and work, I'm usually climbing. I started my first semester at Tech and it's become my third place. I really enjoy the process in climbing, breaking down a route and understanding the physics behind making moves easier.",
    ],
  },
  projectsIntro: "What I've been building.",
  experienceIntro: "Where I've worked and what I shipped.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

// Each project gets a card on /portfolio (hover previews `metrics` and
// `pipeline`) and a case-study page at /portfolio/<slug>. `repo` and `live`
// are optional (leave `repo` out while a repository is private); `video`
// ({ src, poster, caption }) plays under the case-study header. List projects
// most recent first.
export const projects = [
  {
    slug: "cr",
    title: "CR",
    category: "Applied ML, LLM Infrastructure",
    description:
      "A cost-aware router for Claude Code. A fine-tuned 0.4B decision model, self-hosted on Oracle Cloud, reads every turn and sends it to the cheapest Claude model (Haiku, Sonnet, or Opus) likely to answer it as well as Opus.",
    tags: ["Python", "Laya", "ModernBERT", "Claude Code", "Kaggle T4", "OCI"],
    repo: "https://github.com/beavan-james/CR",
    metrics: [
      { value: "9.2%", label: "Of the bill saved at 97.1% quality, on 205 held-out prompts" },
      { value: "91%", label: "Quality weighted by task size, since the misses are big tasks" },
      { value: "+5 pts", label: "Quality vs random routing at the same model mix (risk threshold)" },
    ],
    video: {
      src: "/projects/cr-demo.mp4",
      poster: "/projects/cr-demo-poster.jpg",
      caption: "How CR routes a turn, in a minute and a half. Made with Manim; the router outputs and benchmark numbers are real.",
    },
    pipeline: [
      { step: "Read", detail: "A fine-tuned Laya model answers two questions about the turn: how hard is it, and how long will a complete answer be" },
      { step: "Estimate", detail: "A small regression turns predicted answer length and prompt length into the turn's expected Opus cost" },
      { step: "Route", detail: "A risk threshold or a cost-aware score picks Haiku, Sonnet, or Opus for the quality target you set" },
      { step: "Run", detail: "Claude Code runs the turn headless on that model and resumes the same session, so context carries across switches" },
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "CR is Claude Code with a router in front. You run it in a project directory and it works like Claude Code: it reads and edits files and runs commands. The difference is that every turn first goes to a small self-hosted model that decides whether Haiku, Sonnet, or Opus should answer it. Haiku costs a fortieth of Opus per output token and Sonnet half, so every turn that doesn't need Opus saves money or, on a Pro/Max plan, usage limit.",
          "You don't pick a model; you pick a quality target, such as 95% of answers as good as Opus, and CR uses the routing setting that met it on a benchmark. Each turn prints which model it used, why, what it cost, and what Opus would have cost.",
        ],
      },
      {
        heading: "The router",
        body: [
          "The router is Laya, an open 0.4B-parameter ModernBERT encoder that answers typed questions with probabilities instead of generating text. It runs on CPU on an always-free Oracle Cloud Ampere A1 instance, bound to localhost and reached over an SSH tunnel, so a routing decision costs nothing but about 2.7 seconds.",
          "Out of the box it couldn't tell easy prompts from hard ones; zero-shot, its routing did no better than random. So I built training data from 1,500 prompts drawn from OpenAssistant, Dolly, and Arena-Hard. Opus acted as a teacher and estimated which model each prompt needed, recalibrated against real judge verdicts, and about 300 of the prompts were also answered by all three models and judged directly. Haiku answered nearly all 1,500 to supply answer-length labels: Haiku and Opus answer lengths correlate at 0.90, and Haiku is far cheaper to run. I fine-tuned on a Kaggle T4 with both questions at once.",
        ],
      },
      {
        heading: "Two routing rules",
        body: [
          "The first rule is a risk threshold: send the turn to the cheapest model whose estimated chance of falling short of Opus is below ε. One number trades quality for savings, and each router keeps a stored curve of what every ε achieved on the benchmark, so a quality target maps straight to a setting.",
          "That saves turns, but most of a bill sits in a few long answers; on the first benchmark the five most expensive prompts were 44% of the total cost. The second rule weighs dollars instead. A regression turns the predicted answer length into an expected Opus cost, and each model gets a score: what it would save on this turn, minus λ times its chance of falling short. Cheaper models get risked where answers are expensive, which is where the money is. It is also where they most often fall short, which the benchmark below measures.",
        ],
      },
      {
        heading: "Benchmark",
        body: [
          "Every benchmark prompt was answered once by all three models, and an Opus judge compared the Haiku and Sonnet answers with Opus's in both orders. If the two orders disagree it counts as a tie, and a win or tie counts as \"as good as Opus\". Everything is cached, so any routing policy can be replayed offline without new calls. Settings are chosen on a 155-prompt tune split and reported on a 205-prompt test split.",
          "Counting prompts hides where the losses land, so the table also weights each prompt by what it costs on Opus. The cost-aware rule saves by sending the biggest jobs to Haiku, and the bigger the job, the more often Haiku's answer loses to Opus's: 41% of the time on the cheapest quarter of prompts, 94% on the most expensive. At 93.7% quality it saves 28% of the bill, but 25 of those 28 points come from the 13 prompts judged worse, which together are a quarter of the work. The risk threshold's misses are mostly small prompts, so its weighted quality stays high, but it saves less.",
          "I quote the cost-aware rule at 97.1% quality: 9.2% of the bill saved, 91.1% weighted. A loss means the judge preferred Opus's answer, not that the cheaper answer was wrong.",
        ],
        table: {
          rows: [
            ["Cost-aware, 97.1% quality (91.1% weighted)", "9.2% of the bill saved"],
            ["Cost-aware, 95.6% quality (77.5% weighted)", "24.8% saved"],
            ["Cost-aware, 93.7% quality (74.5% weighted)", "28.0% saved"],
            ["Risk threshold, 95.6% quality (96.4% weighted)", "5.0% of the bill, 11.5% per prompt"],
            ["vs random routing at the same mix", "Risk threshold: +5 quality points. Cost-aware: about the same quality, 2.4× the savings"],
            ["Length signal", "Predicted length vs log Opus cost: r = 0.77 (prompt length alone: 0.25)"],
            ["Router cost", "$0 per call, self-hosted; about 2.7 s per turn"],
          ],
        },
      },
      {
        heading: "Running on a subscription",
        body: [
          "CR doesn't call the API. Each turn runs the official Claude Code CLI headless under your own Pro/Max login with the routed model, resuming the same session, so the conversation keeps its context when the model changes. API keys are stripped from its environment so it can't silently bill an API account, and it never reads the subscription's login token.",
          "Costs are reported in API-equivalent dollars, a proxy for how much of the usage limit each model uses. Claude Code reports a running total for a resumed session, so per-turn cost is the difference between totals. An early version of the cost line missed this and overstated later turns.",
        ],
        bullets: [
          "Thanks and sign-offs skip the router and go to Haiku, since they ask for no work. \"ok\" and \"go ahead\" are still routed, because after a plan they mean \"do it\".",
          "Short follow-ups such as \"yes, do it\" are routed together with the request they answer, so a one-line reply to a hard task doesn't drop to Haiku.",
          "If the router is unreachable, the turn goes to Opus and says so. An outage costs money, never quality.",
        ],
      },
      {
        heading: "Honest limits",
        body: "The benchmark shows the idea works; it doesn't settle every number.",
        bullets: [
          "Opus judges answers from its own family, which likely favors Opus, so savings probably err low rather than high.",
          "205 test prompts is enough to rank routing rules, not to pin exact percentages. At a 95% target, the tune split couldn't separate two settings that saved 9% and 25% on test, so CR keeps the safer one.",
          "In an agent session every turn re-sends the whole context, about 38K tokens even for a one-word reply, so turns cost about the same and the length signal helps less. The interactive CLI defaults to the risk threshold; the cost-aware rule is for long-answer work.",
          "Switching models loses the prompt cache, because the new model re-reads the full context. The router doesn't account for that yet.",
          "The difficulty signal is cautious: even \"What is the capital of France?\" gets only a 42% chance of simple, so at a 95% target easy turns go to Sonnet rather than Haiku.",
        ],
      },
    ],
  },
  {
    slug: "stockidence",
    title: "Stockidence",
    category: "Data Platform, Applied ML",
    description:
      "A platform that ranks the S&P 500 every quarter with a machine-learning model, fed by a Dagster and DuckDB pipeline over four free market-data APIs and self-hosted on Oracle Cloud.",
    tags: ["Dagster", "DuckDB", "XGBoost", "FastAPI", "React", "OCI"],
    repo: "https://github.com/beavan-james/Stockidence",
    live: "https://stockidence.com",
    metrics: [
      { value: "+0.142", label: "Walk-forward rank IC (26 quarters)" },
      { value: "+4.57 pp", label: "Top 20 vs S&P 500, per quarter" },
      { value: "4", label: "Free-tier source APIs" },
    ],
    pipeline: [
      { step: "Ingest", detail: "Scheduled market-data jobs plus a quarterly incremental refresh of every ticker, gated by per-endpoint watermarks" },
      { step: "Model", detail: "DuckDB raw → staging → mart; technicals and stats derived in-pipeline, not fetched" },
      { step: "Rank", detail: "Quarterly XGBoost rank:ndcg over the S&P 500 with per-stock SHAP breakdowns" },
      { step: "Serve", detail: "FastAPI + React SPA, Docker Compose on one Oracle Ampere box" },
    ],
    // Long-form case-study sections, rendered in order on the project page.
    // `body` is a string or an array of paragraphs; `bullets` and `table`
    // ({ rows: [[label, value], ...] }) are optional.
    sections: [
      {
        heading: "What it is",
        body: [
          "Stockidence ranks the stocks in the S&P 500 by how a model expects them to perform over the next quarter. The Rankings page shows the full ordered list, split into tiers. Each stock gets its own page with its rank, tier, sector rank, how far it moved since last quarter, and a breakdown of which inputs pushed it up or down. A Model page publishes the out-of-sample track record and what the model pays attention to, and a Market page collects movers, IPO and earnings calendars, macro indicators, commodities, and news sentiment.",
          "The model is the visible part, but most of the engineering is the data underneath it: a pipeline that keeps several hundred tickers' prices and fundamentals current on free-tier API limits, and a quarterly job that refreshes, rebuilds, retrains, and republishes without anyone touching it.",
        ],
      },
      {
        heading: "Ingestion",
        body: [
          "Data comes in two ways. Scheduled Dagster jobs keep market-wide data current on a deliberately uneven cadence, mostly to stay under Alpha Vantage's very small free-tier quota: news and sentiment twice a day plus overnight, movers and calendars on weekdays, VIX and S&P 500 levels daily from FRED, and macro indicators, commodities, and the symbol listing monthly.",
          "Per-ticker data (prices, financials, company profiles) is refreshed for the whole universe once a quarter, ahead of the retrain. Every fetch goes through a staleness gate keyed on (source, ticker, endpoint), with a watermark per combination, so each run pulls only what has actually gone stale:",
        ],
        bullets: [
          "Prices: continue from each ticker's own high watermark (Twelve Data, split-adjusted), never a full re-download",
          "As-reported financials: no clock at all. The gate works out the latest period that should exist from SEC filing deadlines and only refetches if the warehouse is behind it",
          "Profiles and other fundamentals: fixed TTLs ranging from days to months",
          "Failures: each fetch retries three times, then is recorded and skipped, so one bad symbol can't stall a multi-hour run",
        ],
      },
      {
        heading: "Warehouse",
        body: [
          "A single DuckDB file (about 1.4 GB) holds three layers. Raw lands provider responses as-is, staging unnests and types them, and mart holds the aggregates, model inputs, and published rankings. The website never talks to a provider directly; it only reads the warehouse through the API.",
          "Anything that can be computed is not fetched. MACD is a premium Alpha Vantage endpoint, so it's derived in the mart layer from EMA12 and EMA26. The same goes for every technical indicator (SMA, EMA, RSI, STOCH, ADX, CCI, AD, OBV, ATR, BBANDS) and the rolling volatility and drawdown stats, which are Dagster assets downstream of the cleaned daily bars.",
          "Two modeling problems took the most thought. As-reported financials arrive as raw XBRL tags that aren't standardized across companies, so the mart layer maps them to canonical metrics with alias and prefix matching plus coalesce fallbacks. And because one news article mentions several tickers and each ticker appears in many articles, sentiment is stored at the article level with a junction table carrying per-ticker relevance and sentiment scores, so a story that is bullish on one company and bearish on another doesn't contaminate either.",
        ],
      },
      {
        heading: "The ranking model",
        body: [
          "The model is XGBoost with a rank:ndcg objective on a quarterly grain. It doesn't predict prices or returns; it orders each quarter's cohort so the top of the list beats the bottom. I chose ranking over regression because the signal was strongest at the head of the list. Top-ranked names outperformed reliably, while pooled return predictions stayed noisy.",
          "Inputs are 13 raw point-in-time features taken from each quarter's end-of-quarter snapshot: trend and momentum (price vs SMA200, 3- and 12-month returns, distance from the 52-week high), risk (252-day volatility, max drawdown, ATR %), and balance-sheet quality (ROE, ROA, debt/equity, current ratio, cash and free cash flow to assets). I also tried a 40-feature engineered variant with volatility-scaled momentum, cross-sectional ranks, and market-relative momentum. It halved the rank IC and the top-10 excess return, so I kept the simpler set.",
          "The production fit is 15,916 rows across 380 tickers, with quarterly snapshots from 2012 through mid-2026. The ranking always scores the latest finished quarter. An early version scored whichever quarter had the newest prices, so a refresh a few days into a new quarter fed the model a few days of return as its \"3-month return\". Restricting the cohort to closed quarters fixed it.",
        ],
      },
      {
        heading: "Validation",
        body: "Walk-forward backtest: for every quarter from 2019 through 2025, the model trains only on history before the cutoff and is graded on that quarter's realized returns. That's 26 out-of-sample quarters and 7,691 test rows, with point-in-time features and no lookahead. Data from 2012 to 2018 isn't discarded; it trains every fold and warms up the year-plus trailing features.",
        table: {
          rows: [
            ["Rank IC, pooled", "+0.142 (random = 0)"],
            ["Top-10 excess over universe", "+4.25 pp/qtr (t = 1.51), positive 62% of quarters"],
            ["Top-25 excess over universe", "+4.13 pp/qtr (t = 1.91), positive 62%"],
            ["Top-quintile excess", "+2.62 pp/qtr (t = 1.82), positive 62%"],
            ["Precision@10", "14.6% (random 3.4%)"],
            ["Precision@25", "21.8% (random 8.5%)"],
            ["Top 20 vs S&P 500", "+8.31% vs +3.74% per quarter, beats the index 62% of quarters"],
          ],
        },
      },
      {
        heading: "Honest limits",
        body: "The numbers are encouraging, but I try to be clear about what they don't show.",
        bullets: [
          "Only about four new observations a year. Regime shifts take quarters to detect, and with 26 quarters none of the excess-return t-stats clear 2, so the edge is suggestive rather than statistically settled.",
          "The validation window (2019 to 2025) is bull-market only, with no sustained bear market. In 2021 the top 20 trailed the index by about 4 pp a quarter, and in 2022 it roughly matched it.",
          "The model leans into momentum, so top cohorts can concentrate in high-beta growth names. It ranks; it doesn't manage risk.",
          "The same names recur across adjacent quarters, so the effective sample is smaller than 7,691 rows suggests.",
        ],
      },
      {
        heading: "Quarterly refresh",
        body: [
          "At 03:00 UTC on the first day of each quarter, one Dagster job runs the whole chain: an incremental refresh of every ticker in the warehouse, a rebuild of the training and scoring datasets, a re-execution of the production notebook to refit the model, and publication of the new ranking along with its SHAP contributions, input weights, updated track record, and walk-forward ranking-quality metrics. Those metrics (rank IC, top-K lead, precision) used to exist only in the notebook's printed output, inside a container that every deploy recreates, so they were lost between retrains; each run now records them in the warehouse, which also makes runs comparable. A second job runs just the rebuild and retrain, for when the data is already fresh.",
          "The job is defensive about bad data. If fewer than half of a typical cohort has fresh prices, it fails loudly and leaves the current rankings live instead of publishing a thin or stale list. Undersized cohorts are dropped from grading, and stale tickers and failed endpoints are logged so the cause shows up in Dagster.",
          "Those guards caught a real bug. Landing prices for one ticker was bumping the watermark of every ticker in the table, so the staleness gate skipped nearly the whole universe: in production, 3 of 525 tickers got fresh prices. The fix scoped watermark updates to the rows actually landed and added a resync that rebuilds every ticker's watermark from the data itself.",
        ],
      },
      {
        heading: "Serving and explainability",
        body: [
          "A plain-Python service layer over DuckDB is wrapped by a typed, read-only FastAPI surface: the ranking list, per-stock ranking detail, a model overview, and the market data. The React + TypeScript frontend consumes it with TanStack Query.",
          "Every retrain exports per-stock SHAP contributions that sum exactly to the model's score. Each stock page uses them to show \"how the model got here\": every input's value next to the cohort median and how much it moved the score, with a plain-English verdict. The Model page shows cohort-wide input weights, the quarter-by-quarter track record, and the latest run's ranking-quality metrics, so the claims on the site can be checked against the evidence.",
        ],
      },
      {
        heading: "Deployment",
        body: [
          "The whole stack (FastAPI, the Dagster webserver and daemon, and the SPA behind nginx with HTTPS via certbot) runs under Docker Compose on a single always-free Oracle Cloud Ampere A1 instance with 2 OCPUs and 12 GB of RAM. The warehouse is a mounted volume, so deploys can't overwrite it, and the Dagster UI is bound to localhost and reached over an SSH tunnel.",
          "SSH is open to one admin IP, which rules out push-to-deploy from GitHub Actions. Instead the box deploys itself: a lock-guarded cron script runs every five minutes, fast-forwards to the main branch, and rebuilds and health-checks only when the commit has actually changed.",
        ],
      },
      {
        heading: "How it changed",
        body: "Stockidence started as an on-demand lookup tool: search any ticker, and the API launched a Dagster run to fetch and score it, showing a fair-value estimate and technical statistics. The ranking model became the most useful part of the project, so I rebuilt the site around it. The any-ticker search and fair-value pages are gone, and ingestion moved from per-request runs to scheduled jobs and the quarterly refresh. The staleness gates and watermarks built for the on-demand version carried over and now keep the bulk refresh incremental.",
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
