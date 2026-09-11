import Link from "next/link";
import { getAllPosts, getPost } from "../../../lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post ? `${post.title} — Blog` : "Post not found",
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-display text-4xl text-cream">Not found (404)</h1>
        <Link href="/blog" className="mt-4 inline-block text-sky">
          ← Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-cream py-16 text-evergreen">
      <article className="mx-auto max-w-3xl px-5">
        <p className="font-mono text-xs uppercase tracking-widest text-rose-deep">
          {post.tag} · {post.date}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 border-l-4 border-rose bg-sky/40 p-4 italic text-taupe">
          {post.excerpt}
        </p>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-10 flex justify-between border-t border-taupe/20 pt-6">
          <Link href="/blog" className="text-sm text-taupe hover:text-rose-deep">
            ← All posts
          </Link>
          <Link href="/#top" className="text-sm text-taupe hover:text-rose-deep">
            Home ↑
          </Link>
        </div>
      </article>
    </main>
  );
}
