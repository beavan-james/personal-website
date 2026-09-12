import SectionHeading from "./SectionHeading";
import { glanceFacts, site } from "../lib/site";

export default function About() {
  return (
    <section className="border-t border-line bg-ink py-16">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          kicker="About"
          title={site.about.title}
          blurb={site.about.blurb}
        />
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal max-w-xl leading-relaxed text-silver">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 first:mt-0">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-2">
              {site.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-silver"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <dl className="reveal h-fit divide-y divide-line rounded-2xl border border-line bg-coal">
            {glanceFacts.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-4 px-5 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {label}
                </dt>
                <dd className="text-right text-sm font-medium text-paper">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
