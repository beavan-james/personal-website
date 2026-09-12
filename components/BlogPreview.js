import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { getAllPosts } from "../lib/posts";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <section id="blog" className="bg-mist py-20 text-evergreen">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 flex-1 [&>div]:mb-0">
            <SectionHeading
              tone="light"
              kicker="Blog"
              title="Notes on pipelines and models"
            />
          </div>
          <Link
            href="/blog"
            className="hold-hover mb-8 shrink-0 self-start rounded-full bg-evergreen px-5 py-2.5 text-sm font-semibold text-sky md:self-auto"
          >
            All posts →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="reveal hold-hover rounded-3xl bg-cream p-6 shadow"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-rose-deep">
                {p.tag} · {p.date}
              </p>
              <h3 className="font-display mt-3 text-base leading-[1.35]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">
                {p.excerpt}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-evergreen">
                Read post →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
