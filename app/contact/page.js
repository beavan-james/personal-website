import { site } from "../../lib/site";

export const metadata = {
  title: "Contact | James Beavan",
  description: `Contact ${site.name}, ${site.email}`,
};

export default function ContactPage() {
  return (
    <main className="bg-ink py-16">
      <div className="mx-auto max-w-5xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-dim">
          Contact
        </p>
        <h1 className="font-display mt-3 max-w-xl text-3xl leading-tight text-paper text-balance md:text-4xl">
          Let&apos;s talk about data work.
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-silver">
          Open to data engineering roles and collaboration. Email is fastest.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-block text-xl font-medium text-paper underline decoration-accent/80 decoration-2 underline-offset-8 hover:decoration-accent"
        >
          {site.email}
        </a>

        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-coal">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ink"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
                  {s.label}
                </span>
                <span className="mt-1 block text-sm text-silver">
                  {s.href.replace(/^https?:\/\//, "")}
                </span>
              </span>
              <span className="text-sm text-accent">→</span>
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
          {site.location}
        </p>
      </div>
    </main>
  );
}
