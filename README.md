# Personal Website

Live: https://portfolio.stockidence.com/

Minimal dark personal site built with Next.js + React + Tailwind CSS v4. Multi-page layout (About, Portfolio, Experience, Contact) with a black/silver/lime palette.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize (placeholders to replace)

- `lib/site.js` — name, role, projects, experience, facts
- `components/*.js` — sections
- `app/globals.css` — theme tokens (`@theme`)

## Build

```bash
npm run build
npm start
```

## Deploy

Static export (`output: "export"`) served by Caddy in Docker with auto-TLS:

```bash
docker build -t personal-site .
docker run -d --restart unless-stopped --name personal-site \
  -p 80:80 -p 443:443 -e DOMAIN=portfolio.stockidence.com personal-site
```

## Updating the live site

On the server:

```bash
cd personal-website
git pull
docker build -t personal-site .
docker rm -f personal-site
docker run -d --restart unless-stopped --name personal-site \
  -p 80:80 -p 443:443 -e DOMAIN=portfolio.stockidence.com personal-site
```
