export const posts = [
  {
    slug: "stockidence-ranking-notes",
    title: "Notes from Building Stockidence",
    date: "2026-08-20",
    tag: "Data",
    excerpt:
      "Medallion tables, staleness TTLs, and walk-forward validation for a learning-to-rank stock model.",
    body: [
      "Stockidence is an on-demand stock-confidence platform built on Dagster and DuckDB. Prices, fundamentals, and news sentiment come in from four external APIs, each gated by its own staleness TTL so refreshes stay intentional instead of constantly hammering providers.",
      "The DuckDB layout follows a medallion pattern: staging cleans and normalizes, marts compute technical indicators, and those features feed an XGBoost LambdaMART (rank:ndcg) model trained over quarterly cohorts with walk-forward validation.",
      "Early results: rank IC around +0.163 and top-quintile excess near +2.99 percentage points per quarter. The stack runs on Oracle Cloud Ampere A1 with cron-pull deploys. Still iterating on feature freshness and ranking stability.",
    ],
  },
  {
    slug: "dagster-pipeline-180k-records",
    title: "Shipping a Dagster Pipeline for 180K Records",
    date: "2026-07-11",
    tag: "Infrastructure",
    excerpt:
      "Incremental loads, timestamp deduplication, and seven aggregation tables on AWS EC2.",
    body: [
      "At the Lindaben Foundation I built and deployed an automated data pipeline with Dagster, DuckDB, and Docker on AWS EC2. A Dash frontend accepts CSV uploads; the pipeline performs incremental loads with timestamp-based deduplication.",
      "Downstream, seven aggregation tables power an analytics dashboard. The system processes about 180K records — small enough to stay simple, large enough that bad dedupe or full reloads hurt.",
      "Takeaway: orchestration + a local OLAP engine + containerized deploys is a strong default when you need reliable batch analytics without standing up a heavyweight warehouse on day one.",
    ],
  },
  {
    slug: "aligning-dashboard-metrics",
    title: "When Two Dashboards Disagree",
    date: "2026-06-02",
    tag: "Analytics",
    excerpt:
      "Fixing conflicting aggregation logic so manufacturing metrics mean the same thing everywhere.",
    body: [
      "During my Northrop Grumman internship, two dashboard views disagreed on the same manufacturing metrics. The bug wasn't the chart library — it was conflicting aggregation logic and mismatched metric definitions.",
      "Aligning those definitions removed the reporting discrepancies and made the Tableau work trustworthy again. Separately, optimizing the core dashboard improved performance by about 25%.",
      "Lesson I keep relearning: data products fail socially before they fail technically. If stakeholders can't trust the number, the pipeline might as well be down.",
    ],
  },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
