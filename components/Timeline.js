import SectionHeading from "./SectionHeading";
import { experienceItems, site } from "../lib/site";

export default function Timeline() {
  return (
    <section className="border-t border-line py-16">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading title="School and work" blurb={site.experienceIntro} />
        <div className="divide-y divide-line border-y border-line">
          {experienceItems.map((e) => (
            <div key={e.title} className="reveal grid gap-2 py-8 md:grid-cols-[180px_1fr] md:gap-8">
              <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-accent-dim">
                {e.period}
                <span className="block normal-case tracking-normal text-muted">{e.place}</span>
              </p>
              <div>
                <h3 className="font-display text-xl leading-snug text-paper">
                  {e.title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-silver">
                  {e.detail}
                </p>
                {e.bullets?.length ? (
                  <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                    {e.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-8">
          <a
            href="/MyResume.pdf"
            download
            className="text-link text-sm font-medium text-silver"
          >
            Download resume ↓
          </a>
        </div>
      </div>
    </section>
  );
}
