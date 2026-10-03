import Link from "next/link";
import Hero from "../components/Hero";
import About from "../components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <section className="border-t border-line bg-coal/85 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl text-paper md:text-2xl">
            See what I&apos;ve built and where I&apos;ve worked.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-silver">
            <Link href="/portfolio" className="text-link">
              Work <span className="link-arrow">→</span>
            </Link>
            <Link href="/experience" className="text-link">
              Experience <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
