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
          ← All work
        </Link>

        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <header className="mt-8 rounded-2xl border border-line bg-coal/90 p-6 md:p-10">
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
              <p className="mt-4 text-lg leading-relaxed text-silver">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8 text-sm font-medium text-silver">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">
            Source on GitHub ↗︎
          </a>
          <p className="font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
        </div>
      </div>
    </main>
  );
}
