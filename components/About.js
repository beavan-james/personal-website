import SectionHeading from "./SectionHeading";
import { currently, site } from "../lib/site";

export default function About() {
  return (
    <section className="border-t border-line bg-ink/80 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading title={site.about.title} blurb={site.about.blurb} tagline />
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal max-w-xl leading-relaxed text-silver">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 first:mt-0">
                {paragraph}
              </p>
            ))}
            <dl className="mt-8 space-y-2 text-sm">
              {site.skillGroups.map(({ label, items }) => (
                <div key={label} className="grid grid-cols-[6rem_1fr] gap-4">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-paper">{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal glance-card h-fit rounded-2xl border border-line bg-coal/80 px-5 py-5">
            <p className="font-display text-xl text-accent">Currently</p>
            <dl className="mt-3 divide-y divide-line">
              {currently.map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="text-right text-sm font-medium text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
