import SectionHeading from "./SectionHeading";
import { quickFacts } from "../lib/site";

export default function About() {
  return (
    <section id="about" className="bg-evergreen-deep py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="About"
          title="CS student who likes shipping things"
          blurb="Placeholder about — replace with your school, year, interests, and the kind of work you want to do next."
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal rounded-3xl border border-mist/15 bg-evergreen p-7 leading-relaxed text-mist">
            <p>
              Hey, I&apos;m a placeholder human. I study computer science and
              enjoy building web apps — from course projects to weekend hacks.
            </p>
            <p className="mt-4">
              Coursework so far: data structures and web dev, plus hackathons
              and helping out in intro CS. Outside of class I climb, which is
              good for problem-solving stamina if nothing else.
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
            {quickFacts.map((s) => (
              <div
                key={s.label}
                className="hold-hover rounded-3xl bg-mist p-5 text-evergreen"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-taupe">
                  {s.label}
                </p>
                <p className="font-display mt-3 text-lg leading-[1.3] break-words text-cream">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
