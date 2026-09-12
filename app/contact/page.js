import Link from "next/link";
import { site } from "../../lib/site";

export const metadata = {
  title: "Contact | James Beavan",
  description: `Contact ${site.name}, ${site.email}`,
};

export default function ContactPage() {
  return (
    <main className="topo-bg bg-evergreen py-16">
      <div className="mx-auto max-w-3xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
          ⌁ Contact
        </p>
        <h1 className="font-display mt-3 text-2xl leading-[1.35] text-cream text-balance md:text-3xl">
          Let&apos;s connect
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-mist">
          The fastest way to reach me is email. I&apos;m open to data
          engineering roles, collaboration, and climbing recommendations around
          Atlanta.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${site.email}`}
            className="lift-hover rounded-3xl border border-mist/15 bg-evergreen-deep p-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-rose">
              Email
            </p>
            <p className="mt-2 font-medium text-cream">{site.email}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-sky">
              Send email →
            </p>
          </a>

          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lift-hover rounded-3xl border border-mist/15 bg-evergreen-deep p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-rose">
                {s.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {s.href.replace(/^https?:\/\//, "")}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-sky">
                Open {s.label} →
              </p>
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-rose px-6 py-3 text-sm font-semibold text-evergreen transition-colors hover:bg-rose-deep"
          >
            Email me
          </a>
          <Link
            href="/#top"
            className="rounded-full border border-sky/50 px-6 py-3 text-sm font-semibold text-sky transition-colors hover:border-sky hover:bg-sky hover:text-evergreen"
          >
            Back home
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-mist/70">
          {site.location} · Response within a day or two
        </p>
      </div>
    </main>
  );
}
