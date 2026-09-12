import { site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-mist/15 bg-evergreen-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-mist/70">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-mist/50">
          {site.location} · Built with Next.js + Tailwind
        </p>
      </div>
    </footer>
  );
}
