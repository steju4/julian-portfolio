# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
#  Stufe 1 — Build
#  Erzeugt den statischen Produktions-Build unter /app/dist
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Abhängigkeiten zuerst: Diese Schicht wird nur neu gebaut, wenn sich
# package.json oder package-lock.json ändern.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
#  Stufe 2 — Laufzeit
#  Nur noch nginx und die fertigen statischen Dateien (~50 MB Image).
#  Weder Node noch node_modules landen im finalen Image.
# ---------------------------------------------------------------------------
FROM nginx:alpine AS runtime

# Standardkonfiguration durch eigene ersetzen
RUN rm -f /etc/nginx/conf.d/default.conf && mkdir -p /etc/nginx/snippets
COPY nginx.conf             /etc/nginx/conf.d/default.conf
COPY security-headers.conf  /etc/nginx/snippets/security-headers.conf

COPY --from=build /app/dist /usr/share/nginx/html

# Zeitzone passend zum Standort setzen (für Logs)
ENV TZ=Europe/Berlin

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
