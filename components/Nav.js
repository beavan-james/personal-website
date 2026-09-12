"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "../lib/site";

function sectionIdFromHref(href) {
  return href.startsWith("/#") ? href.slice(2) : null;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return undefined;
    }

    const ids = navLinks.map((l) => sectionIdFromHref(l.href)).filter(Boolean);

    const onScroll = () => {
      const offset = 120;
      let current = ids[0] ?? "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      // Contact is short and sits at the very bottom — the viewport can hit
      // the page bottom before its top crosses the offset, so force the last
      // section active when near the bottom.
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearBottom && ids.length) {
        const lastId = ids[ids.length - 1];
        if (document.getElementById(lastId)) current = lastId;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header className="sticky top-1 z-50 border-b border-mist/20 bg-evergreen/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-rose bg-evergreen-deep font-mono text-sm text-rose">
            ◈
          </span>
          <span className="leading-tight">
            <span className="font-display block text-base text-cream">
              {site.name}
            </span>
            <span className="block font-mono text-[11px] uppercase tracking-widest text-mist">
              {site.location}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const id = sectionIdFromHref(l.href);
            const isRouteActive = pathname === l.href;
            const isActive = (id != null && active === id) || isRouteActive;
            return (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={`group rounded-full px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "nav-link-active bg-mist/15 text-cream"
                    : "text-sky/90 hover:bg-mist/15 hover:text-cream"
                }`}
              >
                <span className="nav-hold mr-1.5 inline-block h-2 w-2 rounded-full bg-rose align-middle opacity-80 group-hover:scale-125" />
                {l.label}
              </Link>
            );
          })}
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
          {navLinks.map((l) => {
            const id = sectionIdFromHref(l.href);
            const isRouteActive = pathname === l.href;
            const isActive = (id != null && active === id) || isRouteActive;
            return (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-mist/10 py-3 last:border-0 ${
                  isActive ? "nav-link-active text-cream" : "text-sky"
                }`}
              >
                <span className="nav-hold mr-2 inline-block h-2 w-2 rounded-full bg-rose align-middle" />
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
