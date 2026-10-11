import Link from "next/link";
import { site } from "../lib/site";

export default function Hero() {
  const details = [
    ...site.heroDetails,
    ...site.skillGroups.map(({ label, items }) => ({ label, value: items.join(" · ") })),
  ];
  return (
    <section>
      <div className="mx-auto flex min-h-[60svh] max-w-5xl flex-col justify-center px-5 py-16">
        <h1 className="hero-stage hero-stage-1 font-display max-w-3xl text-6xl leading-[1.02] text-paper text-balance md:text-8xl">
          {site.name}
        </h1>
        <div className="hero-stage hero-stage-2 mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-silver">
          <Link href="/portfolio" className="text-link">
            See the work <span className="link-arrow">→</span>
          </Link>
          <Link href="/contact" className="text-link">
            Get in touch <span className="link-arrow">→</span>
          </Link>
        </div>
        {/* Native <details>: works on touch and keyboard with no client JS */}
        <details className="hero-details hero-stage hero-stage-3 mt-10 max-w-2xl">
          <summary className="hero-details-summary inline-flex cursor-pointer list-none items-center gap-3 font-mono text-xs uppercase tracking-wider text-accent marker:hidden sm:tracking-widest [&::-webkit-details-marker]:hidden">
            <span className="hero-details-label">{site.role}</span>
            <span aria-hidden className="hero-details-toggle grid h-5 w-5 place-items-center border border-line text-sm leading-none text-silver">
              <span className="hero-details-plus">+</span>
            </span>
          </summary>
          <dl className="hero-details-body mt-5 space-y-2 border-l border-line pl-4 text-sm">
            {details.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 sm:grid-cols-[12.5rem_1fr]">
                <dt className="font-mono text-xs uppercase leading-5 tracking-wide text-muted sm:tracking-widest">{label}</dt>
                <dd className="space-y-1 text-silver">
                  {[].concat(value).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </section>
  );
}
