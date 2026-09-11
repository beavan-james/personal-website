import Link from "next/link";
import { site } from "../lib/site";

export default function Hero() {
  return (
    <section id="top" className="topo-bg grain relative overflow-hidden bg-evergreen">
      {/* sky glow */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.2fr_0.8fr] md:pt-24">
        <div className="reveal is-visible">
          <p className="inline-flex items-center gap-2 rounded-full border border-mist/30 bg-evergreen-deep/70 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-sky">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
            Basecamp · {site.location}
          </p>
          <h1 className="font-display mt-6 text-5xl leading-[1.02] text-cream md:text-7xl">
            Climb hard,
            <br />
            <span className="text-sky">ship</span>{" "}
            <span className="italic text-rose">software.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            {site.blurb} I&apos;m {site.name} — {site.role}. Placeholder hero:
            swap this with your major, year, and what you&apos;re projecting
            right now, on rock and in code.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#routes"
              className="hold-hover rounded-full bg-rose px-6 py-3 font-semibold text-evergreen"
            >
              View Routes ↓
            </Link>
            <Link
              href="/#contact"
              className="hold-hover rounded-full border border-sky/50 px-6 py-3 font-semibold text-sky hover:bg-sky hover:text-evergreen"
            >
              Find a Belay Partner
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mist/70">
            Currently projecting — 5.11a · V5 · Next.js
          </p>
        </div>

        {/* Climber profile card */}
        <aside className="reveal is-visible">
          <div className="hold-hover rounded-3xl border border-mist/25 bg-evergreen-deep/80 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-rose">
                Climber Profile
              </p>
              <span className="rounded-full bg-mist/20 px-3 py-1 font-mono text-xs text-sky">
                V5
              </span>
            </div>
            <p className="font-display mt-4 text-3xl text-cream">{site.name}</p>
            <p className="mt-1 text-sm text-mist">{site.role}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Style", "Sport / Boulder"],
                ["Project", "5.11a"],
                ["Home Crag", "Clear Creek"],
                ["Gym", "3x / week"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-mist/10 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-mist/70">
                    {k}
                  </p>
                  <p className="mt-1 font-semibold text-cream">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              {["#1a281f", "#635255", "#ce7b91", "#c0e8f9", "#b8d3d1"].map(
                (c) => (
                  <span
                    key={c}
                    title={c}
                    className="h-6 w-6 rounded-full border border-white/20"
                    style={{ background: c }}
                  />
                )
              )}
              <span className="ml-2 font-mono text-[11px] text-mist/60">
                palette
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
