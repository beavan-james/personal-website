import { site } from "../lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="topo-bg grain relative bg-evergreen-deep py-15"
    >
      <div className="relative mx-auto max-w-5xl px-5">
        <div className="reveal mb-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
            ⌁ Contact
          </p>
          <h2 className="font-display mt-2 text-xl leading-[1.35] text-cream text-balance md:text-2xl">
            Let&apos;s connect
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
            Fastest way to reach me is email, open to data engineering roles
            and collaboration.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <a
            href={`mailto:${site.email}`}
            className="reveal lift-hover flex flex-col rounded-2xl border border-mist/15 bg-evergreen p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-rose">
              Email
            </p>
            <p className="mt-1.5 text-sm font-medium break-all leading-tight text-cream">
              {site.email}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-sky">
              Send email →
            </p>
          </a>

          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal lift-hover flex flex-col rounded-2xl border border-mist/15 bg-evergreen p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-rose">
                {s.label}
              </p>
              <p className="mt-1.5 text-sm leading-tight break-all text-mist">
                {s.href.replace(/^https?:\/\//, "")}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-sky">
                Open →
              </p>
            </a>
          ))}
        </div>

        <div className="reveal mt-4 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-rose px-5 py-2 text-sm font-semibold text-evergreen transition-colors hover:bg-rose-deep"
          >
            Email me
          </a>
          <p className="font-mono text-xs uppercase tracking-widest text-mist/60">
            {site.location} · replies in 1 to 2 days
          </p>
        </div>
      </div>
    </section>
  );
}
