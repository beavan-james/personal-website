import Link from "next/link";
import Hero from "../components/Hero";
import About from "../components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <section className="border-t border-line bg-coal/85 py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-3xl text-paper">
            See what I&apos;ve built and where I&apos;ve worked.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-silver">
            <Link href="/portfolio" className="text-link">
              Work →
            </Link>
            <Link href="/experience" className="text-link">
              Experience →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
