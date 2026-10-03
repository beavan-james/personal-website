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

Static export (`output: "export"`) served by Caddy in Docker with auto-TLS.
First-time setup on the server:

```bash
git clone https://github.com/beavan-james/personal-website.git ~/personal-website
cd ~/personal-website
docker build -t personal-site .
docker run -d --restart unless-stopped --name personal-site \
  -p 80:80 -p 443:443 -e DOMAIN=portfolio.stockidence.com \
  -v caddy_data:/data -v caddy_config:/config personal-site
```

The `caddy_data` / `caddy_config` volumes keep TLS certificates across
container restarts. Without them every redeploy requests a new certificate,
and Let's Encrypt allows only 5 duplicate certificates per week.

## Updating the live site

Pushes to `main` deploy automatically: `scripts/auto-deploy.sh` runs from
cron every 5 minutes, fast-forwards to `origin/main` when it has moved,
builds the new image before stopping the old container, health-checks
`https://portfolio.stockidence.com/`, and rolls back to the previous image if
the check fails. Install it once on the server:

```bash
(crontab -l 2>/dev/null; echo "*/5 * * * * $HOME/personal-website/scripts/auto-deploy.sh >> $HOME/personal-website/auto-deploy.log 2>&1") | crontab -
```

Progress and failures are logged to `~/personal-website/auto-deploy.log`.
Running the script by hand deploys only if `origin/main` is ahead of the
server checkout, so skip a manual `git pull` beforehand.
