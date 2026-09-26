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
4. [Suchmaschinen und Crawler](#suchmaschinen-und-crawler)
5. [Live-Daten von GitHub](#live-daten-von-github)
6. [Projektstruktur](#projektstruktur)
7. [Entscheidungen im Detail](#entscheidungen-im-detail)

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

Schriften und statische Inhalte kommen vollständig vom eigenen Server. Es gibt
keine Google Fonts, kein CDN und kein Analytics. Die einzige externe Verbindung
ist der Abruf öffentlicher Profildaten von der GitHub-API. Das hält die Seite
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

Die zentralen Inhalte der Startseite stehen in
[`src/data/profile.js`](src/data/profile.js). Projekte, Profilangaben und die
meisten Texte lassen sich dort ändern, ohne Komponenten-Code anzufassen.

| Konstante     | Inhalt                                                    |
| ------------- | --------------------------------------------------------- |
| `person`      | Name, Rolle und Studienort                                 |
| `socials`     | Profil-Links (GitHub, LinkedIn, Instagram, E-Mail)         |
| `about`       | Überschrift und Absätze im Abschnitt „Über mich"           |
| `facts`       | Die vier Kennzahlen-Kacheln                                |
| `projects`    | Projektliste — **Reihenfolge = Anzeigereihenfolge**        |
| `skillGroups` | Technologie-Gruppen                                        |
| `timeline`    | Stationen im Werdegang                                     |
| `contact`     | Text im Kontaktbereich                                     |


## Suchmaschinen und Crawler

Eine React-Anwendung liefert normalerweise ein leeres HTML-Dokument aus und
baut den Inhalt erst im Browser auf. Suchmaschinen können JavaScript zwar
ausführen, fertiges HTML ist für Indexierung, Link-Vorschauen und einfache
Crawler aber zuverlässiger.

Deshalb wird die Seite **beim Bauen einmal zu fertigem HTML gerendert**:

```
npm run build
  ├─ vite build                          Client-Bundle
  ├─ vite build --ssr src/entry-server.jsx   dieselbe App für Node
  └─ node scripts/prerender.mjs          rendert zu HTML, schreibt es in dist/index.html
```

Das Ergebnis: rund **7.700 Zeichen Text und 21 Überschriften** stehen direkt
im ausgelieferten Dokument. Im Browser übernimmt React dieses HTML per
`hydrateRoot`, statt alles zu verwerfen.

Die `robots.txt` erlaubt normale Suchmaschinen und Suchassistenten. Crawler,
die Inhalte ausschließlich zum Trainieren von Modellen sammeln, sind dort
explizit gesperrt. In der `sitemap.xml` steht nur die Startseite; der
Datenschutzhinweis bleibt erreichbar, trägt aber `noindex`.

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
- **`robots.txt`** erlaubt Suchmaschinen und Suchassistenten den Zugriff.
  Crawler, die Inhalte für das Training von Modellen sammeln, sind gesperrt.
- **Vorschaubild als PNG** (`og-image.png`, 1200 × 630). Bewusst nicht als
  SVG: Google, LinkedIn und WhatsApp zeigen SVG-Vorschaubilder nicht an.
- **`<noscript>`-Regel**, die die Einblend-Animation abschaltet — sonst wäre
  der vorgerenderte Inhalt ohne JavaScript zwar vorhanden, aber unsichtbar.

---

## Datenschutzhinweis

Der Text unter [`src/pages/Datenschutz.jsx`](src/pages/Datenschutz.jsx)
beschreibt genau das, was die Seite technisch tut.

Ein Impressum ist bewusst nicht enthalten.

---

## Die E-Mail-Adresse

Die Adresse steht **nirgends im Quelltext** — weder im HTML noch im gebauten
JavaScript. In [`src/mail.js`](src/mail.js) liegt sie verfremdet; zusammen-
gesetzt wird sie erst, wenn jemand im Kontaktbereich eine kurze Rechenaufgabe
gelöst hat.

Ein Adresssammler, der den Quelltext nach dem Muster `name@domain.tld`
durchsucht, findet hier nichts.

## Live-Daten von GitHub

Der Abschnitt „GitHub" auf der Seite zeigt echte Zahlen, keine gepflegte
Liste: öffentliche Repositories, Sterne, Forks, Follower, die Verteilung der
Sprachen, die zuletzt bearbeiteten Repositories und die letzte öffentliche
Aktivität. Auch der Hinweis oben im Einstiegsbereich („Zuletzt aktiv auf
GitHub · vor …") stammt aus derselben Abfrage.

Die Daten holt der Browser der Besucher direkt von `api.github.com`. Die
gesamte Logik liegt in [`src/github.js`](src/github.js).

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

## Projektstruktur

```
.
├── DEPLOYMENT.md            kurze Befehlsfolge für das Deployment
├── Dockerfile               zweistufiger Build: Node -> nginx:alpine
├── docker-compose.yml       Betrieb auf dem Homeserver
├── nginx.conf               Auslieferung, Caching, Kompression
├── security-headers.conf    Sicherheits-Header (bewusst separat, siehe unten)
├── index.html               HTML-Grundgerüst, Meta-Angaben, JSON-LD
├── scripts/
│   └── prerender.mjs        rendert die Seite beim Bauen zu HTML
├── public/
│   ├── favicon.svg          Monogramm als Favicon
│   ├── apple-touch-icon.png Icon für iPhone und iPad (180x180)
│   ├── og-image.png         Vorschaubild für Link-Vorschauen (1200x630)
│   ├── og-image.svg         Quelle des Vorschaubilds
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx             Einstiegspunkt im Browser (createRoot/hydrateRoot)
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
        ├── Monogram.jsx     interaktiver Systemkern im Einstiegsbereich
        ├── CommandPalette.jsx  Schnellnavigation über Strg + K
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

---

## Lizenz

Der technische Quellcode dieser Website (einschließlich Komponenten, Styles und
Konfiguration) steht unter der [MIT-Lizenz](LICENSE).

Die MIT-Lizenz gilt nicht für persönliche Angaben, redaktionelle Texte und
Projektbeschreibungen – auch wenn sie in Quelldateien wie `src/data/profile.js`
oder `index.html` stehen. Ebenfalls ausgenommen sind das Monogramm und die
eigenen Grafiken in `public/`, insbesondere `favicon.svg`,
`apple-touch-icon.png`, `og-image.svg` und `og-image.png`. Für diese Texte und
Gestaltungselemente bleiben alle Rechte vorbehalten. Eingebundene Bibliotheken,
Schriften und fremde Markenzeichen unterliegen ihren jeweiligen Rechten und
Lizenzen.
