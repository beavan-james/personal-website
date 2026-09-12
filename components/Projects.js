import SectionHeading from "./SectionHeading";
import { projects, site } from "../lib/site";

export default function Projects() {
  return (
    <section className="border-t border-line bg-ink py-16">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          kicker="Portfolio"
          title="Selected work"
          blurb={site.projectsIntro}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => {
            const Card = p.href ? "a" : "article";
            const cardProps = p.href
              ? {
                  href: p.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Card
                key={p.title}
                {...cardProps}
                className="reveal lift-hover flex flex-col rounded-2xl border border-line bg-coal p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent-dim">
                    {p.category}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                      p.status === "Completed"
                        ? "border-line text-muted"
                        : "border-accent/60 text-accent"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl leading-snug text-paper">
                  {p.title}
                  {p.href ? <span className="ml-1 text-base text-muted">↗</span> : null}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
