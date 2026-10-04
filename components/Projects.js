import Link from "next/link";
import { ViewTransition } from "react";
import SectionHeading from "./SectionHeading";
import { projects, site } from "../lib/site";

export default function Projects() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading title="Work" blurb={site.projectsIntro} />
        <div className="divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <article key={p.slug} className="reveal py-10">
              <p className="text-sm text-accent-dim">{p.category}</p>
              <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                <h3 className="font-display mt-2 text-3xl leading-tight text-paper md:text-4xl">
                  <Link href={`/portfolio/${p.slug}`} className="transition-colors hover:text-accent">
                    {p.title}
                  </Link>
                </h3>
              </ViewTransition>
              <p className="mt-3 max-w-2xl leading-relaxed text-silver">{p.description}</p>

              <dl className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-display text-3xl text-paper">{m.value}</dd>
                    <dt className="mt-1 text-xs text-muted">{m.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-silver">
                  <Link href={`/portfolio/${p.slug}`} className="text-link text-accent">
                    Read the case study <span className="link-arrow">→</span>
                  </Link>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-link">
                      Live site <span className="link-arrow link-arrow-out">↗︎</span>
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                    GitHub <span className="link-arrow link-arrow-out">↗︎</span>
                  </a>
                </div>
                <p className="font-mono text-xs text-muted">{p.tags.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
