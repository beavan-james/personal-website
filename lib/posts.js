export const posts = [
  {
    slug: "how-i-debug-hard-problems",
    title: "How I Debug Hard Problems",
    date: "2026-08-20",
    tag: "Code",
    excerpt:
      "Break it down, test one thing at a time, and take breaks — lessons from side projects and school.",
    body: [
      "Placeholder post — replace with your real notes. One idea per post works well: what broke, what you tried, what finally worked.",
      "Mention the stack, the timeline, and what you'd do differently next time.",
      "Keep posts short. One insight, one story, one takeaway.",
    ],
  },
  {
    slug: "what-i-learned-shipping-my-first-side-project",
    title: "What I Learned Shipping My First Side Project",
    date: "2026-07-11",
    tag: "Code",
    excerpt:
      "Scope small, finish, then iterate. Placeholder notes on getting to done.",
    body: [
      "Placeholder body. Talk about scoping, what you cut, what you'd do differently.",
      "Stack, timeline, demo link go here once the project is real.",
    ],
  },
  {
    slug: "weekend-notes-trying-something-new-outside",
    title: "Weekend Notes: Trying Something New Outside",
    date: "2026-06-02",
    tag: "Life",
    excerpt:
      "A short placeholder post — hikes, climbing gym sessions, or anything off-screen.",
    body: [
      "Placeholder notes. One of your posts can be personal — it shows range beyond coursework.",
      "Add a photo and a line on what you enjoyed once it's real.",
    ],
  },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
