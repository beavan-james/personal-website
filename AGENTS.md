<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md
# Project Context & Agent Rules

## Project Overview
- **Tech Stack:** Next.js 16 (App Router), React 19, JavaScript (jsconfig), Tailwind CSS v4. No other runtime dependencies.
- **Domain:** Portfolio-first personal website for James Beavan (Math + Data Science @ Georgia Tech, data engineering). Visual identity is a dark, forest-night palette sampled from a snow-leopard photo backdrop, with a gold accent.
- **Architecture:** App Router pages are thin composers over section components in `components/`. All site copy (name, blurbs, nav, skills, projects, experience, "Currently" card) lives in `lib/site.js`. Keep presentation in `components/`; keep content in `lib/`. Prefer small, focused components and server components by default.

## Design System
- **Palette (70 / 20 / 10):** tokens in `app/globals.css` (`@theme`). Use the Tailwind utilities (`bg-ink`, `text-silver`, `border-line`, …), not raw hex.
  - Surfaces: `ink` `#0d100c` (page), `coal` `#121612` (cards), `line` `#262c21` (borders/dividers)
  - Text: `paper` `#efebe1`, `silver` `#c6c3b4`, `muted` `#8f917f`
  - Accent: `accent` `#d8c38c`, `accent-dim` `#c4ae76` (leopard-eye gold; use sparingly)
  - The backdrop scrim in `globals.css` uses `ink` as literal `rgb(13 16 12 / …)`; keep it in sync if `ink` changes.
- **Surfaces:** cards are translucent `bg-coal/80` with `border border-line rounded-2xl` so the photo faintly shows through. Exception: tiles inside a `gap-px bg-line` grid (case-study pipeline) stay opaque `bg-coal`, or the line colour bleeds through.
- **Typography** (loaded via `next/font/google` in `app/layout.js`):
  - Fraunces, display (`--font-fraunces`, `opsz` + `SOFT` axes, upright only). Apply with `.font-display`.
  - Ubuntu, body (`--font-body`, 300–700, upright only).
  - Ubuntu Mono, labels/metadata (`font-mono`, usually `text-xs uppercase tracking-widest`).
  - Do not set a global `line-height` on `body`: unlayered CSS overrides Tailwind's `leading-*` utilities. Set leading per element.
- **Motifs / utilities** (all in `app/globals.css`; extend these before inventing new visual language):
  - `.site-backdrop` + `.site-rain`: fixed, mirrored snow-leopard photo (`public/snow-leopard.jpg`) at `brightness(0.8)`, a left/bottom scrim, and a rain canvas. `components/SiteBackdrop.js` drives `--backdrop-progress` (0 → 1 over the first viewport) to darken and blur it on scroll.
  - `.text-link`: text link with a gold underline that grows on hover.
  - `.link-arrow` (`-left`, `-down`, `-out`): arrows nudge on hover of `.text-link`, `.project-card`, or `.arrow-host`.
  - `.nav-bar` / `-active` / `-hover`: sliding gold underline in `Nav.js`.
  - `.project-card` + `.project-more`: hovering a portfolio card unfolds its metrics and pipeline preview (always open on touch).
  - `.glance-card`: the About "Currently" card's gold hover border.
  - `.hero-stage-1…4`: staged hero entrance.
  - `.reveal` / `.is-visible`: reveal on scroll, toggled by `components/Reveal.js` (IntersectionObserver).
  - React `<ViewTransition name="project-<slug>" share="morph">` morphs a portfolio card into its case-study header.
  - Respect `prefers-reduced-motion`: every motion utility has an override in the reduced-motion block. Add one for anything new.
- **Layout:** `max-w-5xl px-5` content column; one composition per viewport; the name is the hero-level signal. Avoid generic card grids, purple gradients, and flat single-color heroes.

## Content Model (`lib/site.js`)
- `site`: name, role, blurb, email, socials, `skillGroups`, `heroTags`, `about { title, blurb, paragraphs }`, section intros.
- `navLinks`: About (`/`), Portfolio, Experience, Contact.
- `projects[]`: each renders a card on `/portfolio` and a statically generated case study at `/portfolio/<slug>`. Shape: `slug`, `title`, `category`, `description` (card copy; keep it short), `tags`, `repo`, optional `live`, `metrics` (3, shown in a 3-column grid), `pipeline` (4 steps, 4-column grid), and `sections[]` of `{ heading, body, bullets?, table? }`, where `body` is a string or array of paragraphs and `table` is `{ rows: [[label, value], ...] }`.
- `experienceItems[]`: `period`, `title`, `place`, `detail`, `bullets` (rendered by `Timeline.js`).
- `currently[]`: label/value rows for the About "Currently" card.
- `SectionHeading` takes `title`, `blurb`, and an optional `tagline` flag (gold blurb + short rule, used on About).

## Setup & Build Commands
- **Install Dependencies:** `npm install`
- **Run Local Development:** `npm run dev`
- **Run Production Build:** `npm run build`
- **Start Production Server:** `npm start`
- **Lint:** `npm run lint`

## Code Style & Conventions
- **Language:** JavaScript (`.js` components). `jsconfig.json` defines an `@/*` alias, but existing files use relative imports; match the file you're editing.
- **Components:** Functional components. Only `Nav`, `Reveal`, and `SiteBackdrop` are client components (`"use client"`); keep everything else on the server.
- **Content:** Do not hardcode person-specific copy inside components when it belongs in `lib/site.js`.
- **State Management:** No global client store. Local UI state (`useState` / effects) only where interaction requires it (mobile nav, reveal-on-scroll, backdrop).

## Testing Guidelines
- **Command:** Not configured yet (`package.json` has no test script). Verify with `npm run lint` and `npm run build`.
- **Requirement:** When tests are introduced, every new utility function or API route must have a corresponding `.test.js` (or `.test.ts`) file in the same directory.
- **Framework:** TBD. Prefer Vitest + Testing Library when adding a test suite.

## Definition of Done & Constraints
- **Security:** Never commit or hardcode API keys. Use `process.env`. Validate any future API request bodies with Zod.
- **Git:** Use conventional commit formatting (e.g., `feat: add contact form`, `fix: resolve nav overlap`).
- **Scope:** Do not expand into e-commerce, Prisma, Zustand, or React Query unless explicitly requested. This repo is a personal portfolio site.
- **Next.js docs:** Before using unfamiliar Next.js APIs, check `node_modules/next/dist/docs/`.

## Key Paths
- `app/layout.js`: fonts, metadata, and site chrome (`SiteBackdrop`, `Nav`, `Reveal`, `Footer`)
- `app/page.js`: home (Hero → About → "See what I've built" link band)
- `app/portfolio/page.js` and `app/portfolio/[slug]/page.js`: project list and case-study pages
- `app/experience/page.js`: timeline plus resume download (`public/MyResume.pdf`)
- `app/contact/page.js`: email and social links
- `components/`: sections (`Hero`, `About`, `Projects`, `Timeline`) and shared pieces (`Nav`, `Footer`, `SectionHeading`, `Reveal`, `SiteBackdrop`)
- `lib/site.js`: all site content
- `app/globals.css`: theme tokens and motif utilities
- Local-only and gitignored, not part of the site: `jellyfish/` and `components/JellyfishBackdrop.js` (retired hero experiment)

## Agent behavior

### "Grill Me" skill
Relentless interviewing skill that stress-tests plans and designs through systematic questioning.

What it does:
Conducts deep-dive questioning across all aspects of a plan, walking through decision trees branch-by-branch until shared understanding is reached
Automatically explores the codebase to answer questions where code context is available, reducing redundant back-and-forth
Designed for design reviews, architecture validation, and pre-implementation planning where thorough vetting prevents downstream issues.
