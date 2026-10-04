# Personal Website

Live: https://portfolio.stockidence.com/

Portfolio site built with Next.js 16, React 19 and Tailwind CSS v4, exported as static HTML.

## Develop

```bash
npm install
npm run dev
```

Site content (bio, skills, projects, experience) lives in `lib/site.js`; theme tokens in `app/globals.css`.

## Deploy

Served by Caddy in Docker on Oracle Cloud. Pushes to `main` go live automatically via `scripts/auto-deploy.sh` (cron, every 5 minutes); see the script header for setup.
