import Link from "next/link";
import { site } from "../lib/site";

export default function Hero() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-16 md:pt-24">
        <p className="hero-stage hero-stage-1 font-mono text-xs uppercase tracking-widest text-accent-dim">
          {site.location} · Data Engineer
        </p>
        <h1 className="hero-stage hero-stage-2 font-display mt-5 max-w-3xl text-4xl leading-[1.15] text-paper text-balance md:text-5xl">
          {site.name}
        </h1>
        <p className="hero-stage hero-stage-3 mt-5 max-w-xl text-base leading-relaxed text-silver">
          {site.blurb}
        </p>
        <div className="hero-stage hero-stage-4 mt-8 flex flex-wrap gap-3">
          <Link
            href="/portfolio"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            View portfolio
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-silver transition-colors hover:border-silver hover:text-paper"
          >
            Get in touch
          </Link>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
          {site.role} · {site.heroTags}
        </p>
      </div>
    </section>
  );
}
