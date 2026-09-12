import Link from "next/link";
import Hero from "../components/Hero";
import About from "../components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <section className="border-t border-line bg-coal py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-dim">
              Next
            </p>
            <p className="font-display mt-2 text-2xl text-paper">
              See what I&apos;ve built and where I&apos;ve worked.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
            >
              Portfolio →
            </Link>
            <Link
              href="/experience"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-silver transition-colors hover:border-silver hover:text-paper"
            >
              Experience →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
