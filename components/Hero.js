import Link from "next/link";
import { site } from "../lib/site";

export default function Hero() {
  return (
    <section id="top" className="topo-bg grain relative overflow-hidden bg-evergreen">
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.2fr_0.8fr] md:pt-24">
        <div className="reveal is-visible">
          <p className="inline-flex items-center gap-2 rounded-full border border-mist/30 bg-evergreen-deep/70 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-sky">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
            {site.location} · Open to internships
          </p>
          <h1 className="font-display mt-6 text-4xl leading-[1.2] text-cream text-balance md:text-5xl">
            Hi, I&apos;m {site.name.split(" ")[0]}.
            <br />
            <span className="text-sky">I build</span>{" "}
            <span className="italic text-rose">web apps.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">
            {site.blurb} Placeholder hero — swap this with your year, focus
            areas, and what you&apos;re looking for next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="hold-hover rounded-full bg-rose px-6 py-3 font-semibold text-evergreen"
            >
              View Projects ↓
            </Link>
            <Link
              href="/#contact"
              className="hold-hover rounded-full border border-sky/50 px-6 py-3 font-semibold text-sky hover:bg-sky hover:text-evergreen"
            >
              Get in Touch
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mist/70">
            {site.role} · React · Next.js
          </p>
        </div>

        {/* At-a-glance card */}
        <aside className="reveal is-visible">
          <div className="hold-hover rounded-3xl border border-mist/25 bg-evergreen-deep/80 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-rose">
                At a glance
              </p>
              <span className="rounded-full bg-mist/20 px-3 py-1 font-mono text-xs text-sky">
                {site.location}
              </span>
            </div>
            <p className="font-display mt-4 text-2xl leading-[1.3] text-cream">{site.name}</p>
            <p className="mt-1 text-sm text-mist">{site.role}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {[
                ["School", "B.S. CS '27"],
                ["Focus", "Web Dev"],
                ["Stack", "React · Next.js"],
                ["Fun fact", "Climber"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-mist/10 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-mist/70">
                    {k}
                  </p>
                  <p className="mt-1 font-semibold text-cream">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
