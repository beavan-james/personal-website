import Link from "next/link";
import { site } from "../lib/site";

export default function Contact() {
  return (
    <section className="border-t border-line bg-ink py-16">
      <div className="mx-auto max-w-5xl px-5">
        <p className="reveal font-mono text-xs uppercase tracking-[0.2em] text-accent-dim">
          Contact
        </p>
        <h2 className="reveal font-display mt-3 max-w-xl text-2xl leading-snug text-paper text-balance md:text-3xl">
          Let&apos;s talk about data work
        </h2>
        <p className="reveal mt-3 max-w-xl text-base leading-relaxed text-silver">
          Open to data engineering internships and collaboration. Email is fastest.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="reveal mt-6 inline-block text-lg font-medium text-paper underline decoration-accent/80 decoration-2 underline-offset-8 hover:decoration-accent"
        >
          {site.email}
        </a>

        <div className="reveal mt-8 flex flex-wrap items-center gap-3">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-silver transition-colors hover:border-silver hover:text-paper"
            >
              {s.label} →
            </a>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            Contact page
          </Link>
        </div>
      </div>
    </section>
  );
}
