export const posts = [
  {
    slug: "why-climbing-makes-me-a-better-debugger",
    title: "Why Climbing Makes Me a Better Debugger",
    date: "2026-08-20",
    tag: "Code / Climbing",
    excerpt:
      "Beta, patience, falling safely — the onsite mindset maps embarrassingly well to debugging.",
    body: [
      "Every hard route is a bug report. You read the beta (docs), try a sequence (hypothesis), fall (fail), rest, and try a smaller move.",
      "Placeholder post — replace with your real notes. Ideas: a route that taught you to break problems down, or how projecting mirrors iterative development.",
      "Keep posts short. One insight, one story, one takeaway.",
    ],
  },
  {
    slug: "what-i-learned-shipping-my-first-side-project",
    title: "What I Learned Shipping My First Side Project",
    date: "2026-07-11",
    tag: "Code",
    excerpt:
      "Scope like a warm-up, not an alpine objective. Placeholder notes on finishing.",
    body: [
      "Placeholder body. Talk about scoping, what you cut, what you'd do differently.",
      "Stack, timeline, demo link go here once the project is real.",
    ],
  },
  {
    slug: "crag-notes-clear-creek-beginner-circuits",
    title: "Crag Notes: Clear Creek Beginner Circuits",
    date: "2026-06-02",
    tag: "Climbing",
    excerpt:
      "Easy-access walls, shade timing, and warm-up traverses. Placeholder trip notes.",
    body: [
      "Placeholder trip notes. Add approach beta, best season, grades you ran laps on.",
      "Remember leave-no-trace and access notes for real posts.",
    ],
  },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
