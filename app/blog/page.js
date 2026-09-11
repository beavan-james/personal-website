import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export const metadata = {
  title: "Blog — Alex Carter",
  description: "Notes on school, code, and side projects.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="topo-bg bg-evergreen py-16">
      <div className="mx-auto max-w-4xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
          ⌁ Blog
        </p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-cream text-balance md:text-4xl">
          Notes worth keeping
        </h1>
        <p className="mt-3 text-base text-mist">
          Placeholder blog — replace with MDX later. Posts are static data in{" "}
          <code className="rounded bg-mist/15 px-1.5 py-0.5 font-mono text-sm text-sky">
            lib/posts.js
          </code>
          .
        </p>
        <div className="mt-10 space-y-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="hold-hover block rounded-3xl border border-mist/15 bg-evergreen-deep p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-rose">
                {p.tag} · {p.date}
              </p>
              <h2 className="font-display mt-2 text-xl leading-snug text-cream">
                {p.title}
              </h2>
              <p className="mt-2 text-mist">{p.excerpt}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/#top"
          className="mt-8 inline-block text-sm text-sky hover:text-rose"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
