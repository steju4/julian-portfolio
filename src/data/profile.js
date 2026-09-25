// ---------------------------------------------------------------------------
//  Zentrale Inhaltsdatei
//  Alle Texte, Projekte und Links der Seite stehen hier. Die Komponenten lesen
//  nur aus dieser Datei — für Inhaltsänderungen muss kein Komponenten-Code
//  angefasst werden.
// ---------------------------------------------------------------------------

export const person = {
  name: 'Julian Stengele',
  initials: 'JS',
  role: 'Dualer Informatik-Student',
  tagline:
    'Zwischen Softwareentwicklung und Künstlicher Intelligenz — ich baue Dinge, die Menschen wirklich weiterbringen.',
  location: 'Meßkirch, Deutschland',
  course: 'TIK24',
  university: 'DHBW Friedrichshafen',
  focus: 'Künstliche Intelligenz',
}

// ---------------------------------------------------------------------------
//  Social-Links
//
//  Einträge mit leerem "url" blendet die Seite automatisch aus — so entstehen
//  keine toten Links, wenn mal ein Profil wegfällt.
// ---------------------------------------------------------------------------
export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@steju4',
    url: 'https://github.com/steju4',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Julian Stengele',
    url: 'https://de.linkedin.com/in/julian-stengele-385640327',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@jsteng05',
    url: 'https://www.instagram.com/jsteng05/',
  },
]

export const about = {
  headline: 'Zwischen Vorlesung, Praxisphase und dem Serverschrank zu Hause',
  paragraphs: [
    `Ich studiere Informatik im dualen Modell an der DHBW Friedrichshafen — Kurs TIK24, mit
     Schwerpunkt auf Künstlicher Intelligenz. Das duale Prinzip heißt: Was in der
     Theoriephase an der Tafel steht, muss in der Praxisphase angewendet werden.
     Diese Rückkopplung prägt, wie und was ich baue.`,

    `Am liebsten arbeite ich an Projekten, die einen echten Adressaten haben. Die Webseite der
     Fuchszunft Menningen wird von einem ganzen Verein genutzt, BetterDualis ist aus dem
     Ärger über ein veraltetes Notenportal entstanden. Aus einem konkreten
     Problem eine saubere, benutzbare Lösung zu machen, ist für mich die schönste Form von Softwareentwicklung.`,

    `Parallel dazu läuft bei mir zu Hause ein kleiner Server, auf dem ich betreibe, was ich
     baue — von Passwortmanager über Monitoring bis zu dieser Seite hier.`,
  ],

}

export const facts = [
  { value: 'TIK24', label: 'Kurs an der DHBW Friedrichshafen' },
  { value: 'KI', label: 'Studienschwerpunkt' },
  { value: '8+', label: 'Dienste auf dem eigenen Homeserver' },
  { value: '4', label: 'Projekte öffentlich im Einsatz' },
]

// ---------------------------------------------------------------------------
//  Projekte  —  Reihenfolge = Anzeigereihenfolge (Live-Projekte zuerst)
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'fuchszunft',
    title: 'Fuchszunft Menningen e.V.',
    kind: 'Vereinswebseite',
    status: 'live',
    year: '2025 — heute',
    summary:
      'Offizielle Webseite der Grafschaft Fuchsbühl zu Menningen e.V. — Informationsplattform für Mitglieder und Fasnetsbegeisterte mit Terminen, Zunftfiguren und Vereinsgeschichte.',
    details: [
      'Dynamischer PDF-Export der Termine über jsPDF sowie Kalender-Export als .ics-Datei, damit Mitglieder Termine direkt übernehmen können.',
      'Branching-Modell mit dev-Branch und Vercel-Preview-Deployments — Änderungen werden getestet, bevor sie live gehen.',
      'Performance-Monitoring über Vercel Analytics und Speed Insights.',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'jsPDF', 'Vercel'],
    links: [
      { label: 'fuchszunft-menningen.de', url: 'https://fuchszunft-menningen.de', primary: true },
      { label: 'Quellcode', url: 'https://github.com/steju4/fuchszunft-menningen' },
    ],
  },
  {
    id: 'better-dualis',
    title: 'BetterDualis',
    kind: 'Web-App & Scraper',
    status: 'live',
    year: '2025',
    summary:
      'Mobil optimierte Oberfläche für das Prüfungsportal Dualis der DHBW. Das Original ist auf dem Smartphone praktisch nicht bedienbar — diese App liest die Daten aus und stellt sie app-ähnlich dar.',
    details: [
      'Flask-Backend agiert als Mittelsmann: Login-Weiterleitung an den offiziellen Dualis-Server, anschließend Scraping der Notenübersicht mit BeautifulSoup4.',
      'Datenschutz by Design — das Passwort wird niemals gespeichert, weder in einer Datenbank noch in Logs. Gehalten wird nur ein temporäres Session-Token im Arbeitsspeicher.',
      'Dashboard mit aktuellem GPA, Prüfungsliste pro Semester und Einsicht in Teilprüfungen, die in Dualis sonst in Popups versteckt sind.',
    ],
    tech: ['Python', 'Flask', 'BeautifulSoup4', 'Tailwind CSS'],
    links: [
      { label: 'Live-Demo', url: 'https://better-dualis.onrender.com/', primary: true },
      { label: 'Quellcode', url: 'https://github.com/steju4/Better-Dualis' },
    ],
  },
  {
    id: 'homeserver',
    title: 'Eigener Homeserver',
    kind: 'Infrastruktur & Betrieb',
    status: 'live',
    year: '2025 — heute',
    summary:
      'Ein HP ProDesk 400 G2 Mini unter Ubuntu, auf dem alle Dienste per Docker Compose laufen — unter anderem diese Seite.',
    details: [
      'Acht Dienste im Dauerbetrieb: Vaultwarden als Passwortmanager, Nginx Proxy Manager, ein Homepage-Dashboard, Uptime Kuma für Monitoring, Portainer, Beszel für Systemmetriken, Stirling-PDF und noch mehr.',
      'Von außen erreichbar über einen Cloudflare Tunnel — nötig, weil der private Anschluss über DS-Lite läuft und keine öffentliche IPv4-Adresse hat. Der Tunnel baut die Verbindung von innen nach außen auf, es muss kein Port geöffnet werden.',
      'Automatisierte tägliche Benachrichtigung über anstehende Updates per Discord-Webhook und ein eigenes Backup-Skript für die Passwortdatenbank.',
    ],
    tech: ['Docker Compose', 'Ubuntu', 'Nginx Proxy Manager', 'Cloudflare Tunnel', 'Uptime Kuma', 'Bash'],
    links: [],
  },
  {
    id: 'portfolio',
    title: 'Diese Webseite',
    kind: 'Meta-Projekt',
    status: 'live',
    year: '2026',
    summary:
      'Die Seite, auf der du gerade bist — statisch gebaut, in einen schlanken Container gepackt und auf dem eigenen Homeserver ausgeliefert.',
    details: [
      'React mit Vite und Tailwind, zweistufiges Docker-Image mit nginx als Laufzeit. Von außen erreichbar über Nginx Proxy Manager und Cloudflare Tunnel.',
      'Die GitHub-Zahlen weiter oben werden live aus der öffentlichen API geladen, nicht von Hand gepflegt.',
      'Schriften und statische Inhalte werden selbst gehostet. Nur die GitHub-Zahlen werden über die öffentliche GitHub-API geladen; Tracking wird nicht eingesetzt.',
      'Entstanden in Zusammenarbeit mit Claude Code.',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Docker', 'nginx', 'Cloudflare Tunnel'],
    links: [
      { label: 'Quellcode', url: 'https://github.com/steju4/julian-portfolio', primary: true },
    ],
  },
  {
    id: 'schuppenfest',
    title: 'Menninger Schuppenfest 2026',
    kind: 'Mobile-first Landingpage',
    status: 'live',
    year: '2026',
    summary:
      'Landingpage zum Schuppenfest der Musikkapelle Menningen e.V., gebaut für den Aufruf per QR-Code direkt vom gedruckten Flyer.',
    details: [
      'Informationsarchitektur folgt bewusst dem Gesamtflyer: das Fest über alle drei Tage im Hero, der Samstagabend als eigener, gestalterisch abgesetzter Block.',
      'Sämtliche Texte, Zeiten und Programmpunkte liegen in einer einzigen Datendatei — Programmänderungen erfordern keinen Eingriff in Komponenten-Code.',
      'Rein statisch, ohne Backend, mit Design-Tokens in CSS.',
    ],
    tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'Vercel'],
    links: [
      { label: 'Zur Seite', url: 'https://schuppenfest-website.vercel.app', primary: true },
      { label: 'Quellcode', url: 'https://github.com/steju4/schuppenfest-website' },
    ],
  },
  {
    id: 'feels-like',
    title: 'Feels Like Organic',
    kind: 'Full-Stack-Anwendung',
    status: 'studium',
    year: '2026',
    summary:
      'Trainingsverwaltung als Studienprojekt in Software Engineering — konsequent als klassische Drei-Schichten-Architektur aufgebaut.',
    details: [
      'Präsentationsschicht als React-Anwendung mit Vite, Logikschicht als Express-API, Persistenz über Sequelize auf SQLite.',
      'Teamprojekt mit definierten npm-Skripten für Setup, Seeding und Start der Anwendung.',
      'Eigene Test- und QA-Stufe sowie vorbereitete Seed-Accounts für reproduzierbare Abnahmen.',
    ],
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Sequelize', 'SQLite'],
    links: [{ label: 'Quellcode', url: 'https://github.com/steju4/feels-like', primary: true }],
  },
  {
    id: 'plantapp',
    title: 'PlantApp',
    kind: 'Mobile-App & Backend',
    status: 'studium',
    year: '2025',
    summary:
      'Anwendung zur Verwaltung von Pflanzen und Standorten, mit TypeScript im Frontend und Java im Backend. Umgesetzt im Rahmen eines Studienprojektes in "Web Engineering".',
    details: [
      'Cross-Platform-Frontend mit Ionic, dadurch aus einer Codebasis heraus als Web- und Mobile-App lauffähig.',
      'Backend als Spring-Boot-Dienst auf Java 21, gebaut über den mitgelieferten Gradle-Wrapper.',
      'Sauber dokumentiertes Setup, damit das Projekt auf fremden Rechnern reproduzierbar startet.',
    ],
    tech: ['TypeScript', 'Ionic', 'Java 21', 'Spring Boot', 'Gradle'],
    links: [{ label: 'Quellcode', url: 'https://github.com/steju4/PlantApp', primary: true }],
  },
  {
    id: 'morse',
    title: 'Morse Code Utility',
    kind: 'Kommandozeilen-Werkzeug',
    status: 'studium',
    year: '2025',
    summary:
      'Programm zur Codierung und Decodierung von Morsezeichen — Projektarbeit im Modul „Programmieren C/C++“.',
    details: [
      'Umsetzung in C.',
      'Plattformunabhängiger Build über CMake.',
    ],
    tech: ['C', 'CMake'],
    links: [{ label: 'Quellcode', url: 'https://github.com/steju4/c-projekt', primary: true }],
  },
  {
    id: 'filmverwaltung',
    title: 'Filmverwaltung',
    kind: 'Datenbankprojekt',
    status: 'studium',
    year: '2025',
    summary:
      'Studienprojekt zur Datenmodellierung: Entwurf und Umsetzung einer relationalen Datenbank zur Verwaltung von Filmen.',
    details: [],
    tech: ['SQL', 'Datenmodellierung'],
    links: [
      { label: 'Quellcode', url: 'https://github.com/steju4/filmverwaltung-db', primary: true },
    ],
  },
]

// ---------------------------------------------------------------------------
//  Technologien
// ---------------------------------------------------------------------------
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'Ionic', 'HTML & CSS'],
  },
  {
    id: 'backend',
    title: 'Backend & Daten',
    icon: 'server',
    items: ['Node.js', 'Express', 'Python', 'Flask', 'Java', 'Spring Boot', 'SQL', 'Sequelize'],
  },
  {
    id: 'tooling',
    title: 'Werkzeuge & Betrieb',
    icon: 'wrench',
    items: [
      'Git & GitHub',
      'Docker & Compose',
      'Linux / Ubuntu',
      'Nginx & Reverse Proxy',
      'Cloudflare Tunnel',
      'ESP32 & PlatformIO',
      'Raspberry Pi',
      'Vercel',
    ],
  },
]

// ---------------------------------------------------------------------------
//  Werdegang
// ---------------------------------------------------------------------------
export const timeline = [
  {
    period: 'seit 2024',
    title: 'Duales Studium Informatik',
    org: 'DHBW Friedrichshafen — Kurs TIK24',
    text: 'Studium im Wechsel zwischen Theorie- und Praxisphasen, mit Schwerpunkt auf Künstlicher Intelligenz. Inhalte von Programmierung in C und Java über Software Engineering bis zu Datenbanken. Abschluss vorgesehen für 2027.',
    current: true,
  },
  {
    period: '2025 — heute',
    title: 'Webentwicklung für Vereine',
    org: 'Fuchszunft Menningen e.V. · Musikkapelle Menningen e.V.',
    text: 'Konzeption, Umsetzung und laufende Pflege von zwei öffentlichen Webseiten — von der Anforderungsaufnahme im Verein über das Design bis zum Deployment und Betrieb.',
  },
  {
    period: 'laufend',
    title: 'Eigener Homeserver',
    org: 'Selbstständig',
    text: 'Aufbau und Betrieb einer eigenen kleinen Serverumgebung mit Docker Compose, Reverse Proxy, Monitoring und automatisierten Backups — erreichbar über einen Cloudflare Tunnel.',
  },
  {
    period: 'laufend',
    title: 'Ehrenamt im Verein',
    org: 'Musikkapelle Menningen e.V.',
    text: 'Tenorhorn im Musikverein und Beisitzer im Vorstand. Mitorganisation des Schuppenfests.',
  },
]

export const contact = {
  headline: 'Lass uns reden',
  text: `Du hast eine Frage zu einem Projekt, möchtest dich austauschen oder hast eine Idee?
         Schreib mir gern per E-Mail.`,
}
