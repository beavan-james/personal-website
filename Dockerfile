# syntax=docker/dockerfile:1

# 1. Build the static site
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 2. Serve the static export with Caddy (auto-TLS when DOMAIN is a real hostname)
FROM caddy:2-alpine AS runner
COPY --from=builder /app/out /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80 443
