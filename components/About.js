import SectionHeading from "./SectionHeading";
import { site } from "../lib/site";

export default function About() {
  return (
    <section className="border-t border-line bg-ink/80 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading title={site.about.title} blurb={site.about.blurb} tagline />
        <div className="reveal max-w-2xl leading-relaxed text-silver">
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
      </div>
    </section>
  );
}
