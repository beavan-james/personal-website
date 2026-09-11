import { site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-mist/15 bg-evergreen-deep">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 md:flex-row md:items-center">
        <p className="font-mono text-xs uppercase tracking-widest text-mist">
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-4">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-sm text-sky hover:text-rose"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
