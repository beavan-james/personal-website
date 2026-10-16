import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { fieldNotes } from "../../../lib/site";
import { formatNoteDate } from "../../../lib/fieldNotes";

export const dynamicParams = false;

export function generateStaticParams() {
  return fieldNotes.reading.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = fieldNotes.reading.find((n) => n.slug === slug);
  return {
    title: `${note.title} | Field Notes | James Beavan`,
    description: note.summary,
  };
}

export default async function NotePage({ params }) {
  const { slug } = await params;
  const note = fieldNotes.reading.find((n) => n.slug === slug);
  if (!note) notFound();

  return (
    <main className="flex-1 bg-ink/80 py-16">
      <div className="mx-auto max-w-5xl px-5">
        <Link href="/field-notes" className="text-link text-sm text-silver">
          <span className="link-arrow link-arrow-left">←</span> Field Notes
        </Link>

        <header className="mt-8 max-w-3xl border-b border-line pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-dim">
            {note.type} <span className="text-line">/</span> {formatNoteDate(note.date)}
          </p>
          <ViewTransition name={`note-${note.slug}`} share="morph" default="none">
            <h1 className="font-display font-soft mt-3 text-4xl leading-tight text-paper md:text-6xl">
              {note.title}
            </h1>
          </ViewTransition>
          <p className="mt-4 text-silver">
            {note.author}
            {note.source && <span className="text-muted"> · {note.source}</span>}
          </p>
          {note.url && (
            <a
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-4 inline-block text-sm text-silver"
            >
              Read the original <span className="link-arrow link-arrow-out">↗︎</span>
            </a>
          )}
        </header>

        <div className="mt-12 max-w-2xl space-y-12">
          {note.takeaways?.length > 0 && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                The short version
              </h2>
              <ol className="mt-5 space-y-4">
                {note.takeaways.map((t, i) => (
                  <li key={t} className="flex gap-4 text-lg leading-relaxed text-paper">
                    <span className="font-display font-soft w-6 shrink-0 text-2xl leading-7 text-accent">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {note.quote && (
            <blockquote className="reveal font-display font-soft text-2xl leading-snug text-paper md:text-3xl">
              <span className="highlight">&ldquo;{note.quote}&rdquo;</span>
            </blockquote>
          )}

          {note.sections?.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display font-soft text-3xl text-paper">{s.heading}</h2>
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
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
