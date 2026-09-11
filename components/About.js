import SectionHeading from "./SectionHeading";
import { climberStats } from "../lib/site";

export default function About() {
  return (
    <section id="profile" className="bg-evergreen-deep py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Pitch 1 · Profile"
          title="Student by day, dirtbag (lite) by weekend"
          blurb="Placeholder about — replace with your school, major, year, languages, and how climbing shapes how you build."
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal rounded-3xl border border-mist/15 bg-evergreen p-7 leading-relaxed text-mist">
            <p>
              Hey, I&apos;m a placeholder human. I study computer science, I
              climb 3x a week, and I like shipping small tools that solve real
              crag problems — weather windows, logbooks, beta organization.
            </p>
            <p className="mt-4">
              Off the wall: coursework in data structures + web dev, hackathons,
              and TA-ing intro CS. On the wall: working crimpy sport routes and
              slippery gym slabs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["JavaScript", "Python", "React", "Next.js", "SQL", "Git"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full bg-sky/15 px-3 py-1.5 font-mono text-xs text-sky"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {climberStats.map((s) => (
              <div
                key={s.label}
                className="hold-hover rounded-3xl bg-mist p-5 text-evergreen"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-taupe">
                  {s.label}
                </p>
                <p className="font-display mt-2 text-2xl">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
