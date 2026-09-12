import SectionHeading from "./SectionHeading";
import { quickFacts, site } from "../lib/site";

export default function About() {
  return (
    <section id="about" className="bg-evergreen-deep py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="About"
          title={site.about.title}
          blurb={site.about.blurb}
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal rounded-3xl border border-mist/15 bg-evergreen p-7 leading-relaxed text-mist">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 first:mt-0">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-2">
              {site.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-sky/15 px-3 py-1.5 font-mono text-xs text-sky"
                >
                  {s}
                </span>
              ))}
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
                <p className="font-display mt-3 text-base leading-[1.35] break-words text-evergreen">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
