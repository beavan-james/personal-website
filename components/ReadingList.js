import Link from "next/link";
import { ViewTransition } from "react";
import { formatNoteDate, sortedReading } from "../lib/fieldNotes";

export default function ReadingList() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {sortedReading().map((note) => (
        <article
          key={note.slug}
          className="reveal arrow-host grid gap-2 py-8 md:grid-cols-[9rem_1fr] md:gap-8"
        >
          <p className="font-mono text-xs uppercase leading-6 tracking-widest text-muted">
            {formatNoteDate(note.date)}
            <span className="block text-accent-dim">{note.type}</span>
          </p>
          <div>
            <ViewTransition name={`note-${note.slug}`} share="morph" default="none">
              <h3 className="font-display font-soft text-2xl leading-tight text-paper md:text-3xl">
                <Link href={`/field-notes/${note.slug}`} className="highlight-hover">
                  {note.title}
                </Link>
              </h3>
            </ViewTransition>
            <p className="mt-1 text-sm text-muted">
              {note.author}
              {note.source && ` · ${note.source}`}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-silver">{note.summary}</p>
            <Link
              href={`/field-notes/${note.slug}`}
              className="text-link mt-4 inline-block text-sm font-medium text-accent"
            >
              Read my notes <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
