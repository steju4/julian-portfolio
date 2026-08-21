# julian.stengele-home.de

Persönliche Portfolio-Website von **Julian Stengele** — dualer Informatik-Student
an der DHBW Friedrichshafen (Kurs TIK24, Schwerpunkt Künstliche Intelligenz).

Single-Page-Site, rein statisch, ohne Backend und ohne Tracking. Gebaut als
React-Anwendung und ausgeliefert aus einem schlanken `nginx:alpine`-Container
auf dem eigenen Homeserver.

---

## Inhalt

1. [Tech-Stack](#tech-stack)
2. [Lokal entwickeln](#lokal-entwickeln)
3. [Inhalte pflegen](#inhalte-pflegen)
4. [Mit Docker bauen und starten](#mit-docker-bauen-und-starten)
5. [Deployment auf dem Homeserver](#deployment-auf-dem-homeserver)
6. [Nginx Proxy Manager einrichten](#nginx-proxy-manager-einrichten)
7. [Cloudflare Tunnel einrichten](#cloudflare-tunnel-einrichten)
8. [Aktualisieren](#aktualisieren)
9. [Projektstruktur](#projektstruktur)
10. [Entscheidungen im Detail](#entscheidungen-im-detail)

---

## Tech-Stack

| Bereich      | Technologie                                          |
| ------------ | ---------------------------------------------------- |
| Framework    | React 19                                             |
| Build-Tool   | Vite 8                                               |
| Styling      | Tailwind CSS 4 (Design-Tokens in `src/index.css`)    |
| Icons        | lucide-react, Marken-Icons als eigene SVGs           |
| Schriften    | Inter & JetBrains Mono, **lokal gebündelt**          |
| Auslieferung | nginx:alpine im Docker-Container                     |

Die Seite lädt **keine externen Ressourcen**. Keine Google Fonts, kein CDN,
kein Analytics — alles kommt vom eigenen Server. Das hält die Seite
datenschutzfreundlich und erlaubt eine strenge Content-Security-Policy.

---

## Lokal entwickeln

Voraussetzung: **Node.js 20 oder neuer**.

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Entwicklungsserver auf http://localhost:5173
npm run build    # Produktions-Build nach dist/
npm run preview  # den gebauten Stand lokal ansehen
```

---

## Inhalte pflegen

**Alle Texte, Projekte und Links stehen in
[`src/data/profile.js`](src/data/profile.js).** Die Komponenten lesen
ausschließlich aus dieser Datei — für inhaltliche Änderungen muss also kein
Komponenten-Code angefasst werden.

| Konstante     | Inhalt                                                    |
| ------------- | --------------------------------------------------------- |
| `person`      | Name, Rolle, Studienort, E-Mail                            |
| `socials`     | Profil-Links (GitHub, LinkedIn, Instagram, E-Mail)         |
| `about`       | Überschrift und Absätze im Abschnitt „Über mich"           |
| `facts`       | Die vier Kennzahlen-Kacheln                                |
| `projects`    | Projektliste — **Reihenfolge = Anzeigereihenfolge**        |
| `skillGroups` | Technologie-Gruppen                                        |
| `timeline`    | Stationen im Werdegang                                     |
| `contact`     | Text im Kontaktbereich                                     |

### Noch offen: LinkedIn und Instagram

In `socials` sind die Felder `url` für **LinkedIn** und **Instagram** aktuell
leer. Trag dort jeweils die vollständige URL ein:

```js
{ id: 'linkedin',  label: 'LinkedIn',  handle: 'Julian Stengele', url: 'https://www.linkedin.com/in/...' },
{ id: 'instagram', label: 'Instagram', handle: '@deinhandle',     url: 'https://www.instagram.com/...' },
```

Einträge mit leerem `url` werden automatisch ausgeblendet — es entstehen
also keine toten Links, solange die Werte fehlen.

### Ein Projekt ergänzen

Ein neues Objekt in `projects` einfügen. `status: 'live'` erzeugt das
türkise Live-Abzeichen, jeder andere Wert das graue „Studium"-Abzeichen.

```js
{
  id: 'kurzname',
  title: 'Titel des Projekts',
  kind: 'Web-App',              // Kategorie über dem Titel
  status: 'live',               // 'live' | 'studium'
  year: '2026',
  summary: 'Ein bis zwei Sätze, die im eingeklappten Zustand sichtbar sind.',
  details: ['Punkt eins.', 'Punkt zwei.'],   // erscheinen unter „Details"
  tech: ['React', 'Vite'],
  links: [{ label: 'Zur Seite', url: 'https://…', primary: true }],
}
```

---

## Mit Docker bauen und starten

Das `Dockerfile` ist zweistufig: Die erste Stufe baut die Seite mit Node, die
zweite enthält nur noch nginx und die fertigen statischen Dateien. Node und
`node_modules` landen **nicht** im Endergebnis — das Image bleibt bei rund
95 MB.

```bash
docker compose up -d --build
```

Danach ist die Seite auf dem Server unter `http://<server-ip>:8080` erreichbar.

Ohne Compose:

```bash
docker build -t julian-portfolio:latest .
docker run -d --name julian-portfolio -p 8080:80 --restart unless-stopped julian-portfolio:latest
```

Der Container bringt einen Health-Endpunkt mit:

```bash
curl http://localhost:8080/healthz     # -> ok
docker ps                              # Spalte STATUS zeigt "healthy"
```

---

## Deployment auf dem Homeserver

Auf dem Server (`julian@192.168.178.70`):

```bash
# Einmalig: Repository holen
cd ~/docker            # oder wo deine Compose-Projekte liegen
git clone https://github.com/steju4/julian-portfolio.git
cd julian-portfolio

# Bauen und starten
docker compose up -d --build

# Prüfen
docker compose ps
curl -I http://localhost:8080
```

### Anbindung an den Nginx Proxy Manager — zwei Wege

**Variante A — Port auf dem Host (Standard in der `docker-compose.yml`)**

Der Container veröffentlicht Port `8080`. Im NPM trägst du als Ziel die
Server-IP und Port `8080` ein. Funktioniert immer, auch wenn NPM außerhalb
von Docker läuft.

**Variante B — gemeinsames Docker-Netz (sauberer)**

Läuft der NPM selbst als Container, können beide dasselbe Netz nutzen. Dann
muss gar kein Port auf dem Host offen stehen.

```bash
# Namen des NPM-Netzes herausfinden
docker inspect <npm-container-name> -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}}{{end}}'
```

In der `docker-compose.yml` anschließend den `ports`-Block entfernen und die
auskommentierten `networks`-Blöcke aktivieren, den Netznamen eintragen. Im NPM
ist das Ziel dann der Containername `julian-portfolio` auf Port `80`.

---

## Nginx Proxy Manager einrichten

Im NPM unter **Hosts → Proxy Hosts → Add Proxy Host**:

**Reiter „Details"**

| Feld                    | Wert                                                    |
| ----------------------- | ------------------------------------------------------- |
| Domain Names            | `julian.stengele-home.de`                               |
| Scheme                  | `http`                                                  |
| Forward Hostname / IP   | `192.168.178.70` (Variante A) bzw. `julian-portfolio` (B) |
| Forward Port            | `8080` (Variante A) bzw. `80` (Variante B)              |
| Cache Assets            | aus — das Caching erledigt bereits nginx im Container    |
| Block Common Exploits   | an                                                       |
| Websockets Support      | aus (wird nicht gebraucht)                              |

**Reiter „SSL"**

| Feld                   | Wert                                    |
| ---------------------- | --------------------------------------- |
| SSL Certificate        | Let's Encrypt anfordern oder Cloudflare-Origin-Zertifikat |
| Force SSL              | an                                       |
| HTTP/2 Support         | an                                       |
| HSTS Enabled           | an                                       |

> **Hinweis:** HSTS wird bewusst **hier** gesetzt und nicht im Container.
> Der Container spricht nur HTTP — TLS endet bei Cloudflare bzw. im NPM.
> Ein HSTS-Header aus dem Container wäre wirkungslos bis schädlich.

Nutzt du den Cloudflare Tunnel (siehe unten), ist auch der Weg ohne
Let's-Encrypt-Zertifikat möglich: Cloudflare terminiert TLS nach außen, und
der Tunnel spricht intern per HTTP mit dem NPM.

---

## Cloudflare Tunnel einrichten

Diesen Teil musst du selbst vornehmen — hier die genauen Schritte.

### 1. DNS-Eintrag

Im Cloudflare-Dashboard unter **DNS** der Zone `stengele-home.de`:

Wird der Tunnel über das Dashboard (Zero Trust) konfiguriert, legt Cloudflare
den nötigen `CNAME` auf `<tunnel-id>.cfargotunnel.com` **automatisch** an.
Es ist also kein manueller A-Record auf deine Heim-IP nötig — und auch nicht
erwünscht, denn der Tunnel arbeitet ausgehend.

Der Eintrag muss auf **Proxied** (orange Wolke) stehen.

### 2. Route im Tunnel anlegen

**Zero Trust → Networks → Tunnels → deinen Tunnel wählen → Public Hostnames
→ Add a public hostname**

| Feld       | Wert                                        |
| ---------- | ------------------------------------------- |
| Subdomain  | `julian`                                    |
| Domain     | `stengele-home.de`                          |
| Path       | leer lassen                                 |
| Type       | `HTTP`                                      |
| URL        | `192.168.178.70:80` — die Adresse des NPM   |

Der Tunnel zeigt also auf den **Nginx Proxy Manager**, nicht direkt auf den
Portfolio-Container. Der NPM entscheidet dann anhand des Hostnamens, welchen
Dienst er ausliefert — genauso wie bei deinen anderen Diensten.

> Läuft `cloudflared` auf demselben Host wie der NPM, funktioniert
> `localhost:80` ebenfalls. Läuft `cloudflared` als Container, ist die
> Server-IP der zuverlässigere Weg.

### 3. Konfiguration per Datei (Alternative zum Dashboard)

Wenn du deinen Tunnel über `config.yml` verwaltest, statt über das Dashboard:

```yaml
tunnel: <tunnel-id>
credentials-file: /etc/cloudflared/<tunnel-id>.json

ingress:
  - hostname: julian.stengele-home.de
    service: http://192.168.178.70:80
  # weitere Dienste hier ergänzen
  - service: http_status:404
```

Danach neu laden:

```bash
sudo systemctl restart cloudflared
# oder, im Container:
docker restart cloudflared
```

Und den DNS-Eintrag einmalig anlegen:

```bash
cloudflared tunnel route dns <tunnel-name> julian.stengele-home.de
```

### 4. SSL-Modus in Cloudflare prüfen

Unter **SSL/TLS → Overview** sollte der Modus auf **Full** oder
**Full (strict)** stehen — nicht auf „Flexible". Bei „Flexible" kann es zu
Weiterleitungsschleifen kommen, sobald im NPM „Force SSL" aktiv ist.

Für die Kombination Tunnel + NPM ohne eigenes Zertifikat im NPM ist es am
einfachsten, im NPM **Force SSL auszuschalten** und die Verschlüsselung
komplett Cloudflare zu überlassen. Der Tunnel selbst ist bereits verschlüsselt.

### 5. Testen

```bash
curl -I https://julian.stengele-home.de
curl  https://julian.stengele-home.de/healthz     # -> ok
```

---

## Aktualisieren

```bash
cd ~/docker/julian-portfolio
git pull
docker compose up -d --build

# Alte, ungenutzte Images aufräumen
docker image prune -f
```

Da `index.html` mit `no-cache` ausgeliefert wird und alle Assets einen
Inhalts-Hash im Dateinamen tragen, sehen Besucher die neue Version sofort —
ohne dass jemand den Browser-Cache leeren muss.

Läuft die Seite hinter Cloudflare, kann zusätzlich ein **Purge Cache** im
Cloudflare-Dashboard sinnvoll sein, falls du dort Caching-Regeln aktiviert hast.

---

## Projektstruktur

```
.
├── Dockerfile               zweistufiger Build: Node -> nginx:alpine
├── docker-compose.yml       Betrieb auf dem Homeserver
├── nginx.conf               Auslieferung, Caching, Kompression
├── security-headers.conf    Sicherheits-Header (bewusst separat, siehe unten)
├── index.html               HTML-Grundgerüst inkl. Meta-Angaben
├── public/
│   ├── favicon.svg          Monogramm als Favicon
│   ├── og-image.svg         Vorschaubild für Link-Vorschauen
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx             Einstiegspunkt, bindet die Schriften ein
    ├── App.jsx              Reihenfolge der Abschnitte
    ├── index.css            Design-Tokens, Basisstile, Animationen
    ├── hooks.js             Einblenden beim Scrollen, aktiver Abschnitt
    ├── data/
    │   └── profile.js       >>> sämtliche Inhalte <<<
    └── components/
        ├── Nav.jsx          Kopfzeile mit mobilem Menü
        ├── Hero.jsx         Einstiegsbereich
        ├── Monogram.jsx     Avatar mit rotierendem Ring
        ├── Backdrop.jsx     Hintergrund-Verläufe und Raster
        ├── Projects.jsx     Projektkarten mit Aufklapp-Details
        ├── About.jsx        Über mich und Kennzahlen
        ├── Skills.jsx       Technologie-Gruppen
        ├── Timeline.jsx     Werdegang
        ├── Contact.jsx      Kontaktbereich
        ├── Footer.jsx
        ├── Primitives.jsx   wiederverwendete Bausteine
        └── icons.jsx        Icons inkl. eigener Marken-SVGs
```

---

## Entscheidungen im Detail

Ein paar Punkte, die beim späteren Anfassen der Konfiguration leicht Ärger
machen — deshalb hier festgehalten:

**Sicherheits-Header liegen in einer eigenen Datei.**
In nginx ersetzt ein `add_header` innerhalb eines `location`-Blocks *alle*
auf Server-Ebene gesetzten Header. Da mehrere `location`-Blöcke eigene
`Cache-Control`-Header setzen, würden die Sicherheits-Header dort still
verschwinden. `security-headers.conf` wird deshalb in jedem betroffenen Block
erneut eingebunden.

**`listen [::]:80` fehlt bewusst.**
In Docker ist IPv6 in Containern standardmäßig deaktiviert. nginx bricht dann
beim Start mit `Address family not supported by protocol` ab. Nach außen
spricht ohnehin Cloudflare bzw. der NPM — dort ist IPv6 verfügbar.

**Schriften werden nicht als data:-URI eingebettet.**
Vite bettet kleine Dateien standardmäßig direkt ins CSS ein. Das kollidiert
mit der strengen `font-src 'self'`-Regel der Content-Security-Policy. In
`vite.config.js` ist das Einbetten deshalb für Schriftdateien abgeschaltet.

**Schriften kommen nicht von Google.**
Inter und JetBrains Mono sind über `@fontsource-variable` lokal gebündelt.
Das spart den Umweg über einen Drittanbieter, vermeidet die bekannte
datenschutzrechtliche Grauzone beim Einbinden von Google Fonts und macht die
Seite unabhängig von der Erreichbarkeit fremder Server.

**Kein HSTS aus dem Container.**
Der Container spricht ausschließlich HTTP. HSTS gehört an die Stelle, an der
TLS endet — also in den NPM oder zu Cloudflare.

---

## Lizenz

Der Quellcode steht unter der MIT-Lizenz, siehe [`LICENSE`](LICENSE).
Inhalte, Texte und das Monogramm sind davon ausgenommen.
