import Link from "next/link";
import { glanceFacts, site } from "../lib/site";

export default function Hero() {
  return (
    <section id="top" className="topo-bg grain relative overflow-hidden bg-evergreen">
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.2fr_0.8fr] md:pt-24">
        <div>
          <p className="hero-stage hero-stage-1 inline-flex items-center gap-2 rounded-full border border-mist/30 bg-evergreen-deep/70 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-sky">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
            {site.location} · Open to internships
          </p>
          <h1 className="hero-stage hero-stage-2 font-display mt-6 text-3xl leading-[1.35] text-cream text-balance md:text-4xl">
            Hi, I&apos;m {site.name.split(" ")[0]}.
            <br />
            <span className="text-sky">{site.heroHeadline.lead}</span>{" "}
            <span className="italic text-rose">{site.heroHeadline.accent}</span>
          </h1>
          <p className="hero-stage hero-stage-3 mt-6 max-w-xl text-base leading-relaxed text-mist">
            {site.blurb}
          </p>
          <div className="hero-stage hero-stage-4 mt-8 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="rounded-full bg-rose px-6 py-3 font-semibold text-evergreen transition-colors hover:bg-rose-deep hover:text-cream"
            >
              View Projects ↓
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-sky/50 px-6 py-3 font-semibold text-sky transition-colors hover:border-sky hover:bg-sky hover:text-evergreen"
            >
              Get in Touch
            </Link>
          </div>
          <p className="hero-stage hero-stage-5 mt-6 font-mono text-xs uppercase tracking-widest text-mist/70">
            {site.role} · {site.heroTags}
          </p>
        </div>

        {/* At-a-glance card */}
        <aside className="hero-stage hero-stage-6">
          <div className="accent-hover rounded-3xl border border-mist/25 bg-evergreen-deep/80 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-rose">
                At a glance
              </p>
              <span className="rounded-full bg-mist/20 px-3 py-1 font-mono text-xs text-sky">
                {site.location}
              </span>
            </div>
            <p className="font-display mt-4 text-xl leading-[1.35] text-cream">{site.name}</p>
            <p className="mt-1 text-sm text-mist">{site.role}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {glanceFacts.map(({ label, value }) => (
                <div key={label} className="rounded-2xl bg-mist/10 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-mist/70">
                    {label}
                  </p>
                  <p className="mt-1 font-semibold text-cream">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
