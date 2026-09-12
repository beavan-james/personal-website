import SectionHeading from "./SectionHeading";
import { projects, site } from "../lib/site";

export default function Projects() {
  return (
    <section id="projects" className="topo-bg-light bg-sky py-20 text-evergreen">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          tone="light"
          kicker="Projects"
          title="Selected work"
          blurb={site.projectsIntro}
        />
        <div className="grid gap-5 md:grid-cols-3">
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
                className="reveal lift-hover flex flex-col rounded-3xl border border-evergreen/10 bg-cream p-6 shadow-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-evergreen px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-sky">
                    {p.category}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                      p.status === "Completed"
                        ? "bg-mist text-evergreen"
                        : "bg-rose text-evergreen"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg leading-[1.35]">
                  {p.title}
                  {p.href ? <span className="ml-1 text-base text-taupe">↗</span> : null}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-taupe">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-taupe/30 px-2.5 py-1 font-mono text-[11px] text-taupe"
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
