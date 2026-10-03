import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { projects } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: `${project.title} | James Beavan`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="flex-1 bg-ink/80 py-16">
      <div className="mx-auto max-w-5xl px-5">
        <Link href="/portfolio" className="text-link text-sm text-silver">
          <span className="link-arrow link-arrow-left">←</span> All work
        </Link>

        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <header className="mt-8 rounded-2xl border border-line bg-coal/80 p-6 md:p-10">
            <p className="text-sm text-accent-dim">{project.category}</p>
            <h1 className="font-display mt-2 text-5xl leading-tight text-paper md:text-6xl">
              {project.title}
            </h1>
            <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="font-display text-4xl text-paper">{m.value}</dd>
                  <dt className="mt-1 text-xs text-muted">{m.label}</dt>
                </div>
              ))}
            </dl>
          </header>
        </ViewTransition>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-paper">Pipeline</h2>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {project.pipeline.map((s, i) => (
              <li key={s.step} className="bg-coal p-5">
                <p className="font-mono text-xs text-accent-dim">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display mt-2 text-xl text-paper">{s.step}</p>
                <p className="mt-2 text-sm leading-relaxed text-silver">{s.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16 max-w-2xl space-y-12">
          {project.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-3xl text-paper">{s.heading}</h2>
              {[].concat(s.body).map((para) => (
                <p key={para.slice(0, 32)} className="mt-4 text-lg leading-relaxed text-silver">
                  {para}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-5 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-silver">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dim" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.table && (
                <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-coal/80">
                  {s.table.rows.map(([label, value]) => (
                    <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
                      <dt className="font-mono text-xs leading-6 text-muted">{label}</dt>
                      <dd className="text-paper">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8 text-sm font-medium text-silver">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">
            Source on GitHub <span className="link-arrow link-arrow-out">↗︎</span>
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-link">
              Live site <span className="link-arrow link-arrow-out">↗︎</span>
            </a>
          )}
          <p className="font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
        </div>
      </div>
    </main>
  );
}
