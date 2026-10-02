import Link from "next/link";
import { site } from "../lib/site";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto flex min-h-[85svh] max-w-5xl flex-col justify-center px-5 py-16">
        <h1 className="hero-stage hero-stage-1 font-display max-w-3xl text-6xl leading-[1.02] text-paper text-balance md:text-8xl">
          {site.name}
        </h1>
        <p className="hero-stage hero-stage-2 mt-6 max-w-xl text-lg leading-relaxed text-silver">
          {site.blurb}
        </p>
        <div className="hero-stage hero-stage-3 mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-silver">
          <Link href="/portfolio" className="text-link">
            See the work →
          </Link>
          <Link href="/contact" className="text-link">
            Get in touch →
          </Link>
        </div>
        <p className="hero-stage hero-stage-4 mt-10 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">{site.role}</span> · {site.heroTags}
        </p>
      </div>
    </section>
  );
}
