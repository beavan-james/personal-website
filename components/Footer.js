import { site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {site.location} ·{" "}
          <a href={`mailto:${site.email}`} className="text-accent-dim hover:text-accent">
            {site.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
