import Link from "next/link";
import { ViewTransition } from "react";
import SectionHeading from "./SectionHeading";
import { projects, site } from "../lib/site";

export default function Projects() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading title="Work" blurb={site.projectsIntro} />
        <div className="space-y-6">
          {projects.map((p) => (
            <ViewTransition key={p.slug} name={`project-${p.slug}`} share="morph" default="none">
              <Link
                href={`/portfolio/${p.slug}`}
                className="project-card reveal block rounded-2xl border border-line bg-coal/80 p-6 transition-colors hover:border-accent/50 md:p-8"
              >
                <p className="text-sm text-accent-dim">{p.category}</p>
                <h3 className="font-display mt-2 text-3xl leading-tight text-paper md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-silver">{p.description}</p>

                <div className="project-more">
                  <div>
                    <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <dd className="font-display text-3xl text-paper">{m.value}</dd>
                          <dt className="mt-1 text-xs text-muted">{m.label}</dt>
                        </div>
                      ))}
                    </dl>
                    <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-silver">
                      {p.pipeline.map((s, i) => (
                        <li key={s.step} className="flex items-center gap-3">
                          {i > 0 && <span className="text-accent-dim">→</span>}
                          {s.step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-xs text-muted">{p.tags.join(" · ")}</p>
                  <span className="text-sm font-medium text-accent">Read the case study <span className="link-arrow">→</span></span>
                </div>
              </Link>
            </ViewTransition>
          ))}
        </div>
      </div>
    </section>
  );
}
