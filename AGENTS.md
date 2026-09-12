<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md
# Project Context & Agent Rules

## Project Overview
- **Tech Stack:** Next.js 16 (App Router), React 19, JavaScript (jsconfig), Tailwind CSS v4.
- **Domain:** Portfolio-first personal website with a subtle climbing-inspired design system (topo textures, holds, rope accents).
- **Architecture:** App Router pages compose section components. Site copy, nav, projects, and experience live in `lib/site.js`; blog posts in `lib/posts.js`. Keep presentation in `components/`; keep content and helpers in `lib/`. Prefer small, focused components.

## Design System
- **Palette:** `#1a281f` Evergreen, `#635255` Taupe Grey, `#ce7b91` Old Rose, `#c0e8f9` Pale Sky, `#b8d3d1` Light Blue / Mist, `#f6f1e8` Cream. Tokens live in `app/globals.css` (`@theme`).
- **Typography:** Agraham (display, CDNFonts), Inter (body), JetBrains Mono (labels). Use `.font-display` for display type; do not set global `line-height` on `body` (it overrides Tailwind `leading-*` and breaks Agraham).
- **Motifs:** `.topo-bg` / `.topo-bg-light`, `.grain`, `.rope-progress`, `.hold-hover`, `.reveal` / `.is-visible`. Prefer extending these over introducing a new visual language.
- **Layout:** One composition per viewport; brand/name is a hero-level signal. Avoid generic card grids, purple gradients, and flat single-color heroes.

## Setup & Build Commands
- **Install Dependencies:** `npm install`
- **Run Local Development:** `npm run dev`
- **Run Production Build:** `npm run build`
- **Start Production Server:** `npm start`
- **Lint:** `npm run lint`

## Code Style & Conventions
- **Language:** JavaScript with `jsconfig.json` path aliases as configured. Prefer clear named exports from `lib/`. Match existing file style (currently `.js` components).
- **Components:** Functional components with hooks. Keep section components in `components/`; pages in `app/` stay thin composers.
- **Content:** Edit placeholders in `lib/site.js` and `lib/posts.js` before inventing new data sources. Do not hardcode person-specific copy inside components when it belongs in `lib/`.
- **State Management:** No global client store yet. Prefer server components and local UI state (`useState` / effects) only where interaction requires it (e.g. reveal-on-scroll, mobile nav).

## Testing Guidelines
- **Command:** Not configured yet (`package.json` has no test script).
- **Requirement:** When tests are introduced, every new utility function or API route must have a corresponding `.test.js` (or `.test.ts`) file in the same directory.
- **Framework:** TBD — prefer Vitest + Testing Library when adding a test suite.

## Definition of Done & Constraints
- **Security:** Never commit or hardcode API keys. Use `process.env`. Validate any future API request bodies with Zod.
- **Git:** Use conventional commit formatting (e.g., `feat: add contact form`, `fix: resolve nav overlap`).
- **Scope:** Do not expand into e-commerce, Prisma, Zustand, or React Query unless explicitly requested. This repo is a personal portfolio site.
- **Next.js docs:** Before using unfamiliar Next.js APIs, check `node_modules/next/dist/docs/`.

## Key Paths
- `app/page.js` — home (Hero → About → Projects → Experience → Blog preview → Contact)
- `app/blog/` — blog index and `[slug]` post pages
- `components/` — UI sections and shared chrome (Nav, Footer, Reveal, etc.)
- `lib/site.js` — name, role, projects, experience, quick facts, nav
- `lib/posts.js` — blog post data (MDX migration later)
- `app/globals.css` — theme tokens and climbing motif utilities

## Agent behavior

### "Grill Me" skill
Relentless interviewing skill that stress-tests plans and designs through systematic questioning.

What it does:
Conducts deep-dive questioning across all aspects of a plan, walking through decision trees branch-by-branch until shared understanding is reached
Automatically explores the codebase to answer questions where code context is available, reducing redundant back-and-forth
Designed for design reviews, architecture validation, and pre-implementation planning where thorough vetting prevents downstream issues.
