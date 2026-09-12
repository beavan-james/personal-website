import SectionHeading from "./SectionHeading";
import { experienceItems } from "../lib/site";

export default function Timeline() {
  return (
    <section id="experience" className="bg-evergreen py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Experience"
          title="School and work so far"
          blurb="Placeholder timeline — add real dates, roles, and outcomes."
        />
        <div className="relative ml-2 border-l-2 border-mist/25 pl-8 md:ml-6">
          {experienceItems.map((e, i) => (
            <div key={e.title} className="reveal relative pb-10 last:pb-0">
              <span className="absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full border-2 border-rose bg-evergreen-deep font-mono text-xs text-rose">
                {i + 1}
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-sky">
                {e.period} · {e.place}
              </p>
              <h3 className="font-display mt-3 text-xl leading-[1.3] text-cream md:text-2xl">
                {e.title}
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-mist">
                {e.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
