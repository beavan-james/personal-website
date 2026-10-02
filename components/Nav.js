"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "../lib/site";

const isActiveLink = (pathname, href) =>
  pathname === href || (href !== "/" && pathname?.startsWith(href));

// Position an underline bar beneath a nav link's text (links have px-4)
function placeBar(bar, link) {
  if (!bar) return;
  if (!link) {
    bar.style.opacity = "0";
    return;
  }
  // When hidden, jump into place instead of sliding in from the edge
  const hidden = bar.style.opacity !== "1";
  if (hidden) bar.style.transition = "opacity 0.2s ease";
  bar.style.transform = `translateX(${link.offsetLeft + 16}px)`;
  bar.style.width = `${link.offsetWidth - 32}px`;
  if (hidden) {
    bar.getBoundingClientRect();
    bar.style.transition = "";
  }
  bar.style.opacity = "1";
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const linkRefs = useRef({});
  const activeBar = useRef(null);
  const hoverBar = useRef(null);

  const activeHref = navLinks.find((l) => isActiveLink(pathname, l.href))?.href;

  const placeActive = useCallback(() => {
    placeBar(activeBar.current, linkRefs.current[activeHref]);
  }, [activeHref]);

  // Glide the gold underline to the current page (first placement is instant)
  useLayoutEffect(placeActive, [placeActive]);

  // Re-measure once web fonts swap in and on resize
  useEffect(() => {
    document.fonts?.ready.then(placeActive);
    window.addEventListener("resize", placeActive);
    return () => window.removeEventListener("resize", placeActive);
  }, [placeActive]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/75 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="leading-tight">
          <span className="font-display block text-lg text-paper">
            {site.name}
          </span>
          <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
            {site.location}
          </span>
        </Link>

        <div
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => placeBar(hoverBar.current, null)}
        >
          {navLinks.map((l) => {
            const isActive = l.href === activeHref;
            return (
              <Link
                key={l.href + l.label}
                href={l.href}
                ref={(el) => {
                  linkRefs.current[l.href] = el;
                }}
                onMouseEnter={(e) => placeBar(hoverBar.current, e.currentTarget)}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2 text-sm transition-colors ${
                  isActive ? "text-paper" : "text-silver hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <span ref={hoverBar} aria-hidden="true" className="nav-bar nav-bar-hover" />
          <span ref={activeBar} aria-hidden="true" className="nav-bar nav-bar-active" />
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
            const isActive = l.href === activeHref;
            return (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 border-b border-line py-3 text-sm last:border-0 ${
                  isActive ? "text-paper" : "text-silver"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px w-4 bg-accent transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                />
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
