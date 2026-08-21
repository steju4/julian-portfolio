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
4. [Suchmaschinen und KI-Crawler](#suchmaschinen-und-ki-crawler)
5. [Live-Daten von GitHub](#live-daten-von-github)
6. [Mit Docker bauen und starten](#mit-docker-bauen-und-starten)
7. [Deployment auf dem Homeserver](#deployment-auf-dem-homeserver)
8. [Nginx Proxy Manager einrichten](#nginx-proxy-manager-einrichten)
9. [Cloudflare Tunnel einrichten](#cloudflare-tunnel-einrichten)
10. [Aktualisieren](#aktualisieren)
11. [Projektstruktur](#projektstruktur)
12. [Entscheidungen im Detail](#entscheidungen-im-detail)

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

## Suchmaschinen und KI-Crawler

Eine React-Anwendung liefert normalerweise ein leeres HTML-Dokument aus und
baut den Inhalt erst im Browser auf. Google kommt damit zurecht, weil es
JavaScript ausführt — **die meisten KI-Crawler tun das nicht**. GPTBot,
ClaudeBot, PerplexityBot und Konsorten lesen das rohe HTML. Sie hätten hier
eine vollständig leere Seite gesehen.

Deshalb wird die Seite **beim Bauen einmal zu fertigem HTML gerendert**:

```
npm run build
  ├─ vite build                          Client-Bundle
  ├─ vite build --ssr src/entry-server.jsx   dieselbe App für Node
  └─ node scripts/prerender.mjs          rendert zu HTML, schreibt es in dist/index.html
```

Das Ergebnis: rund **8.800 Zeichen Text und 22 Überschriften** stehen direkt
im ausgelieferten Dokument. Im Browser übernimmt React dieses HTML per
`hydrateRoot`, statt alles zu verwerfen.

Prüfen lässt sich das ohne Browser:

```bash
curl -s https://julian.stengele-home.de | grep -c "<h2"
# erwartet: eine Zahl > 0, nicht 0
```


### Mehr als eine Seite

Neben der Startseite entstehen beim Bauen zwei weitere Dokumente:

| Adresse | Datei | Zweck |
| --- | --- | --- |
| `/` | `dist/index.html` | Startseite |
| `/datenschutz/` | `dist/datenschutz/index.html` | Datenschutzhinweis |
| beliebig unbekannt | `dist/404.html` | Fehlerseite, ausgeliefert mit echtem Status 404 |

Welche Seite gemeint ist, steht als Attribut im HTML
(`<div id="root" data-seite="…">`) — bewusst nicht in `window.location`. Die
Fehlerseite wird unter beliebigen Adressen ausgeliefert; aus dem Pfad allein
ließe sie sich nicht erkennen, Server und Browser kämen zu unterschiedlichen
Ergebnissen und die Hydration bräche.

Unbekannte Adressen landen **nicht** auf der Startseite, sondern liefern einen
echten 404. Sonst würde jede Falschschreibung als gültige Seite gelten und im
Suchindex Dubletten erzeugen.

### Damit die Hydration zusammenpasst

Der erste Rendervorgang muss auf dem Server und im Browser **identisch**
ausfallen. Deshalb startet `useGithub` immer im Zustand „laden" und liest den
zwischengespeicherten Stand erst im Effekt — auf dem Server gibt es
`localStorage` schließlich gar nicht. Wird das geändert, meldet React
Hydration-Fehler in der Konsole.

### Weiteres

- **Strukturierte Daten** (`schema.org/Person` und `WebSite`) als JSON-LD im
  `<head>`, damit Suchmaschinen und KI-Crawler die Seite einordnen können,
  ohne den Fließtext interpretieren zu müssen.
- **`robots.txt`** listet die Crawler ausdrücklich auf — getrennt nach
  Suchmaschinen, KI-Suche und solchen, die auch für das Training sammeln.
  Wer Letzteres nicht will, ersetzt dort `Allow: /` durch `Disallow: /`.
- **Vorschaubild als PNG** (`og-image.png`, 1200 × 630). Bewusst nicht als
  SVG: Google, LinkedIn und WhatsApp zeigen SVG-Vorschaubilder nicht an.
- **`<noscript>`-Regel**, die die Einblend-Animation abschaltet — sonst wäre
  der vorgerenderte Inhalt ohne JavaScript zwar vorhanden, aber unsichtbar.

---

## Datenschutzhinweis

Der Text unter [`src/pages/Datenschutz.jsx`](src/pages/Datenschutz.jsx)
beschreibt genau das, was die Seite technisch tut: Server-Protokolle,
Auslieferung über Cloudflare, die GitHub-Abfrage aus dem Browser der Besucher
und den Zwischenspeicher im Browser.

> **Wichtig beim Weiterbauen:** Kommt eine Besucherstatistik, eine Schriftart
> von einem fremden Server oder eine weitere externe Schnittstelle dazu, muss
> dieser Text mitgeführt werden. Er ist kein Ersatz für eine Rechtsberatung.

Ein Impressum ist bewusst nicht enthalten. Ob eines nötig ist, hängt davon ab,
ob die Seite als rein privat gilt — das ist eine Einschätzung, die nur der
Betreiber treffen kann.

---

## Die E-Mail-Adresse

Die Adresse steht **nirgends im Quelltext** — weder im HTML noch im gebauten
JavaScript. In [`src/mail.js`](src/mail.js) liegt sie verfremdet; zusammen-
gesetzt wird sie erst, wenn jemand im Kontaktbereich eine kurze Rechenaufgabe
gelöst hat.

Ein Adresssammler, der den Quelltext nach dem Muster `name@domain.tld`
durchsucht, findet hier nichts:

```bash
grep -rE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" dist/
# erwartet: keine Ausgabe
```

**Ehrliche Einordnung:** Das ist kein kryptografischer Schutz. Wer einen
echten Browser automatisiert und die Aufgabe löst, kommt an die Adresse.
Gegen die übliche Sorte Massensammler, die nur HTML nach Mustern absucht,
wirkt es zuverlässig — und anders als ein eingebundenes Captcha eines
Drittanbieters kostet es weder eine Ausnahme in der Content-Security-Policy
noch Daten der Besucher.

Die Aufgabe ist als Text formuliert statt als Bild, damit sie mit Tastatur
und Screenreader bedienbar bleibt. Bei einer falschen Antwort erscheint eine
neue Aufgabe.

**Adresse ändern:** Die verfremdete Zeichenkette in `src/mail.js` neu
erzeugen —

```bash
node -e "const m='neue@adresse.de';console.log(Buffer.from([...m].map(c=>c.charCodeAt(0)^0x5c)).toString('base64'))"
```

## Live-Daten von GitHub

Der Abschnitt „GitHub" auf der Seite zeigt echte Zahlen, keine gepflegte
Liste: öffentliche Repositories, Sterne, Forks, Follower, die Verteilung der
Sprachen, die zuletzt bearbeiteten Repositories und die letzte öffentliche
Aktivität. Auch der Hinweis oben im Einstiegsbereich („Zuletzt aktiv auf
GitHub · vor …") stammt aus derselben Abfrage.

Die Daten holt der Browser der Besucher direkt von `api.github.com`. Die
gesamte Logik liegt in [`src/github.js`](src/github.js).

### Warum ohne Zugangstoken

Die Seite ist statisch. Ein Token in den Dateien wäre für jeden Besucher
lesbar — das ist keine Option. Deshalb laufen die Abfragen unangemeldet, und
das bringt zwei Einschränkungen mit sich:

| Einschränkung | Auswirkung |
| ------------- | ---------- |
| **60 Abrufe pro Stunde und IP** | Reicht im Normalfall locker. Wird das Kontingent doch erreicht, zeigt die Seite den zuletzt geladenen Stand plus einen erklärenden Hinweis. |
| **Kein Beitragsdiagramm** | Der bekannte grüne Kalender ist nur über die GraphQL-API zu bekommen, und die verlangt zwingend ein Token. Deshalb steht dort stattdessen die echte Aktivitätsliste. |
| **Nur öffentliche Daten** | Private Repositories tauchen weder in den Zahlen noch in der Aktivität auf. |

### Wie das Kontingent geschont wird

- Ergebnisse liegen 30 Minuten im `localStorage` des Besuchers.
- Alle Komponenten teilen sich **eine** Abfrage pro Seitenaufruf.
- Aktualisiert wird alle 5 Minuten, aber nur solange der Tab sichtbar ist.
- Schlägt der Abruf fehl, bleibt der letzte bekannte Stand stehen — die Seite
  wird nie leer.

Der Abruf ist zusätzlich in der Content-Security-Policy freigegeben; das ist
die einzige externe Verbindung, die die Seite herstellt:

```
connect-src 'self' https://api.github.com;
```

### Wenn du doch das Beitragsdiagramm willst

Dafür bräuchte es einen kleinen Dienst auf deinem Homeserver, der den Token
hält und die GraphQL-Antwort zwischenspeichert — etwa ein weiterer Container,
den der NPM unter `/api/github` an dieselbe Domain hängt. Dann entfielen auch
die 60 Abrufe pro Stunde, weil nur noch dein Server bei GitHub anfragt.
Sag Bescheid, falls das dazukommen soll.

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

> **Ausführliche Schritt-für-Schritt-Anleitung inklusive Fehlersuche:
> [`DEPLOYMENT.md`](DEPLOYMENT.md)** — das hier ist die Kurzfassung.

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
├── DEPLOYMENT.md            Schritt-für-Schritt-Anleitung zum Onlinestellen
├── Dockerfile               zweistufiger Build: Node -> nginx:alpine
├── docker-compose.yml       Betrieb auf dem Homeserver
├── nginx.conf               Auslieferung, Caching, Kompression
├── security-headers.conf    Sicherheits-Header (bewusst separat, siehe unten)
├── index.html               HTML-Grundgerüst, Meta-Angaben, JSON-LD
├── scripts/
│   └── prerender.mjs        rendert die Seite beim Bauen zu HTML
├── public/
│   ├── favicon.svg          Monogramm als Favicon
│   ├── og-image.png         Vorschaubild für Link-Vorschauen (1200x630)
│   ├── og-image.svg         Quelle des Vorschaubilds
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx             Einstiegspunkt im Browser (hydrateRoot)
    ├── entry-server.jsx     Einstiegspunkt für das Prerendering
    ├── mail.js              verfremdete Adresse und Sicherheitsabfrage
    ├── App.jsx              Verteiler auf Startseite, Datenschutz und 404
    ├── pages/
    │   ├── Datenschutz.jsx  Datenschutzhinweis
    │   ├── NichtGefunden.jsx  Fehlerseite
    │   ├── Unterseite.jsx   Gerüst für Unterseiten
    │   └── Textbausteine.jsx
    ├── index.css            Design-Tokens, Basisstile, Animationen
    ├── hooks.js             Einblenden beim Scrollen, aktiver Abschnitt, GitHub-Daten
    ├── github.js            Abruf, Zwischenspeicher und Aufbereitung der GitHub-Daten
    ├── data/
    │   └── profile.js       >>> sämtliche Inhalte <<<
    └── components/
        ├── Nav.jsx          Kopfzeile mit mobilem Menü
        ├── Hero.jsx         Einstiegsbereich
        ├── Monogram.jsx     Avatar mit rotierendem Ring
        ├── Backdrop.jsx     Hintergrund-Verläufe und Raster
        ├── Projects.jsx     Projektkarten mit Aufklapp-Details
        ├── Github.jsx       Live-Zahlen, Sprachen und Aktivität
        ├── GithubPuls.jsx   Aktivitätshinweis im Einstiegsbereich
        ├── About.jsx        Über mich und Kennzahlen
        ├── Skills.jsx       Technologie-Gruppen
        ├── Timeline.jsx     Werdegang
        ├── Contact.jsx      Kontaktbereich
        ├── MailFreischalten.jsx  gibt die Adresse nach der Abfrage frei
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

**GitHub-Daten kommen aus dem Browser, nicht vom Server.**
Eine statische Seite kann kein Geheimnis hüten, deshalb laufen die Abfragen
unangemeldet aus dem Browser der Besucher. Ein 403 der GitHub-API wird dabei
als erschöpftes Kontingent gewertet: Der Header `x-ratelimit-remaining` ist
über CORS nicht immer lesbar, und ein 403 auf diesen öffentlichen Endpunkten
hat praktisch keine andere Ursache.

**Kein HSTS aus dem Container.**
Der Container spricht ausschließlich HTTP. HSTS gehört an die Stelle, an der
TLS endet — also in den NPM oder zu Cloudflare.

---

## Lizenz

Der Quellcode steht unter der MIT-Lizenz, siehe [`LICENSE`](LICENSE).
Inhalte, Texte und das Monogramm sind davon ausgenommen.
