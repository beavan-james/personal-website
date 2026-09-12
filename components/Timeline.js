import SectionHeading from "./SectionHeading";
import { experienceItems, site } from "../lib/site";

export default function Timeline() {
  return (
    <section id="experience" className="bg-evergreen py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Experience"
          title="School and work so far"
          blurb={site.experienceIntro}
        />
        <div className="relative ml-2 pl-8 md:ml-6">
          <div className="timeline-track reveal" aria-hidden />
          {experienceItems.map((e, i) => (
            <div key={e.title} className="reveal relative pb-10 last:pb-0">
              <span
                className="timeline-hold absolute -left-[48px] top-0 grid h-8 w-8 place-items-center rounded-full border-2 border-rose bg-evergreen-deep font-mono text-xs text-rose"
                style={{ transitionDelay: `${120 + i * 90}ms` }}
              >
                {i + 1}
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-sky">
                {e.period} · {e.place}
              </p>
              <h3 className="font-display mt-3 text-lg leading-[1.35] text-cream md:text-xl">
                {e.title}
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-mist">
                {e.detail}
              </p>
              {e.bullets?.length ? (
                <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-mist/90">
                  {e.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
