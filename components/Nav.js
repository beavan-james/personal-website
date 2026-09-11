"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "../lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-1 z-50 border-b border-mist/20 bg-evergreen/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-rose bg-evergreen-deep font-mono text-sm text-rose">
            ◈
          </span>
          <span className="leading-tight">
            <span className="font-display block text-lg text-cream">
              {site.name}
            </span>
            <span className="block font-mono text-[11px] uppercase tracking-widest text-mist">
              {site.location}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="group rounded-full px-3 py-2 text-sm text-sky/90 hover:bg-mist/15 hover:text-cream"
            >
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-rose align-middle opacity-80 group-hover:scale-125" />
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className="rounded-full border border-mist/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-sky md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-mist/15 bg-evergreen px-5 py-3 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-mist/10 py-3 text-sky last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
