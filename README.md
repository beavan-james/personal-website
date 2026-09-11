# Personal Website

Portfolio-first personal site built with Next.js + React + Tailwind CSS v4, with subtle climbing-inspired theming (topo textures, holds, rope accents).

Palette: `#1a281f` Evergreen, `#635255` Taupe Grey, `#ce7b91` Old Rose, `#c0e8f9` Pale Sky, `#b8d3d1` Light Blue.
Display font: Agraham (via CDNFonts, free for personal use) + Inter body + JetBrains Mono labels.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize (placeholders to replace)

- `lib/site.js` — name, role, projects, experience, quick facts
- `lib/posts.js` — blog posts (swap for MDX later)
- `components/*.js` — sections
- `app/globals.css` — theme tokens (`@theme`)

## Build

```bash
npm run build
npm start
```

## Deploy

Vercel recommended for Next.js. `npm run build` is static-safe (all routes prerendered).
