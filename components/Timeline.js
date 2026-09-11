import SectionHeading from "./SectionHeading";
import { expeditions } from "../lib/site";

export default function Timeline() {
  return (
    <section id="expeditions" className="bg-evergreen py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Pitch 3 · Expeditions"
          title="Multi-pitch career, one belay at a time"
          blurb="School + work + climbing. Placeholder timeline — add real dates and outcomes."
        />
        <div className="relative ml-2 border-l-2 border-dashed border-rose/50 pl-8 md:ml-6">
          {expeditions.map((e, i) => (
            <div key={e.title} className="reveal relative pb-10 last:pb-0">
              {/* belay station */}
              <span className="absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full border-2 border-rose bg-evergreen-deep text-sm text-rose">
                {i + 1}
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-sky">
                {e.period} · {e.place}
              </p>
              <h3 className="font-display mt-2 text-2xl text-cream md:text-3xl">
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
