"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "../lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="leading-tight">
          <span className="font-display block text-lg text-paper">
            {site.name}
          </span>
          <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
            {site.location}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-coal text-accent"
                    : "text-silver hover:bg-coal hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button
          className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-silver md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink px-5 py-2 md:hidden">
          {navLinks.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-line py-3 text-sm last:border-0 ${
                  isActive ? "text-accent" : "text-silver"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
