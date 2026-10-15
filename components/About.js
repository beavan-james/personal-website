import SectionHeading from "./SectionHeading";
import { site } from "../lib/site";

export default function About() {
  return (
    <section className="glint-rule border-t border-line bg-ink/80 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading title={site.about.title} />
        <div className="reveal max-w-2xl leading-relaxed text-silver">
          {site.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
