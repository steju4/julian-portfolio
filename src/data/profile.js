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
  location: 'Friedrichshafen / Meßkirch, Deutschland',
  email: 'julian.stengele@gmail.com',
  course: 'TIK24',
  university: 'DHBW Friedrichshafen',
  focus: 'Künstliche Intelligenz',
  partner: 'Geberit',
  partnerOrt: 'Pfullendorf',
  abteilung: 'Web Applications',
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
  {
    id: 'mail',
    label: 'E-Mail',
    handle: 'julian.stengele@gmail.com',
    url: 'mailto:julian.stengele@gmail.com',
  },
]

export const about = {
  headline: 'Zwischen Vorlesung, Praxisphase und dem Serverschrank zu Hause',
  paragraphs: [
    `Ich studiere Informatik im dualen Modell an der DHBW Friedrichshafen — Kurs TIK24, mit
     Schwerpunkt auf Künstlicher Intelligenz. Meine Praxisphasen verbringe ich bei Geberit in
     Pfullendorf in der Abteilung Web Applications. Das duale Prinzip heißt für mich: Was in
     der Theoriephase an der Tafel steht, muss drei Monate später im Betrieb tatsächlich
     funktionieren. Diese Rückkopplung prägt, wie ich Software baue.`,

    `Am liebsten arbeite ich an Projekten, die einen echten Adressaten haben. Die Webseite der
     Fuchszunft Menningen wird von einem ganzen Verein genutzt, BetterDualis ist aus dem
     alltäglichen Ärger über ein nicht bedienbares Notenportal entstanden. Aus einem konkreten
     Problem eine saubere, benutzbare Lösung zu machen, finde ich deutlich spannender als
     Technik um ihrer selbst willen.`,

    `Auf der KI-Seite reizt mich vor allem, hinter die Abstraktion zu schauen. Im Praxisprojekt
     Lernverfahren habe ich ein Convolutional Neural Network nicht nur mit Keras trainiert,
     sondern zusätzlich komplett in NumPy nachgebaut — inklusive eigener Backpropagation. In
     meiner Projektarbeit ging es dann um die andere Richtung: nicht das Modell selbst, sondern
     die Frage, wie KI-Werkzeuge einen Entwicklungsprozess wirklich verändern.`,

    `Parallel dazu läuft bei mir zu Hause ein kleiner Server, auf dem ich betreibe, was ich
     baue — von Passwortmanager über Monitoring bis zu dieser Seite hier. Genau dieser Teil,
     Infrastruktur und Systemintegration, ist die Richtung, in die ich nach dem Studium gehen
     möchte.`,
  ],

  // Kurzer, persönlicher Block unter den Absätzen
  interessen: {
    titel: 'Abseits vom Code',
    punkte: [
      {
        titel: 'Wetterbeobachtung',
        text: 'Ich vergleiche täglich mehrere Wettermodelle — ECMWF, GFS, ICON und KNMI — und schaue mir an, wo sie auseinanderlaufen und warum.',
      },
      {
        titel: 'Tenorhorn & Vorstand',
        text: 'Ich spiele in der Musikkapelle Menningen und bin dort Beisitzer im Vorstand. Aktuell organisieren wir das Schuppenfest mit.',
      },
      {
        titel: 'Gravel statt Motor',
        text: 'Nach längerer E-Bike-Phase gerade bewusst zurück aufs Gravelbike — inklusive Auswertung der eigenen Trainingsdaten.',
      },
      {
        titel: 'Elektronik aufbereiten',
        text: 'Gebrauchte Technik günstig kaufen, instand setzen und weitergeben. Gutes Training im Umgang mit fremder Hardware.',
      },
    ],
  },
}

export const facts = [
  { value: 'TIK24', label: 'Kurs an der DHBW Friedrichshafen' },
  { value: 'KI', label: 'Studienschwerpunkt' },
  { value: '8', label: 'Dienste auf dem eigenen Homeserver' },
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
      'Ein HP ProDesk 400 G2 Mini unter Ubuntu, auf dem alle Dienste per Docker Compose laufen — mein eigenes kleines Rechenzentrum und der Ort, an dem diese Seite gehostet wird.',
    details: [
      'Acht Dienste im Dauerbetrieb: Vaultwarden als Passwortmanager, Nginx Proxy Manager, ein Homepage-Dashboard, Uptime Kuma für Monitoring, Portainer, Beszel für Systemmetriken, Stirling-PDF sowie ein selbst geschriebener Termin-Watcher, der eine Arztpraxis auf frei werdende Termine überwacht.',
      'Von außen erreichbar über einen Cloudflare Tunnel — nötig, weil mein Anschluss über DS-Lite läuft und gar keine öffentliche IPv4-Adresse hat. Der Tunnel baut die Verbindung von innen nach außen auf, es muss kein Port geöffnet werden.',
      'Automatisierte tägliche Benachrichtigung über anstehende Updates per Discord-Webhook und ein eigenes Backup-Skript für die Passwortdatenbank.',
      'Als Nächstes geplant: Frigate als Videoüberwachung mit KI-gestützter Objekterkennung sowie ein eigener MCP-Server zur Steuerung der Container.',
    ],
    tech: ['Docker Compose', 'Ubuntu', 'Nginx Proxy Manager', 'Cloudflare Tunnel', 'Uptime Kuma', 'Bash'],
    links: [],
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
    id: 'projektarbeit-ki',
    title: 'KI-gestützte Frontend-Entwicklung',
    kind: 'Projektarbeit im Studium',
    status: 'praxis',
    year: '2026',
    summary:
      'Studienarbeit zu der Frage, wie KI-Assistenten einen Entwicklungsprozess tatsächlich verändern — untersucht am Beispiel einer CMS-Migration im Praxisbetrieb.',
    details: [
      'Kern der Arbeit ist ein mehrstufiger Agenten-Workflow in der Entwicklungsumgebung: ein Orchestrator, der die Aufgabe zerlegt, und fünf Fach-Agenten mit jeweils eigenen Instruktionen und Prompt-Bausteinen.',
      'Erprobt wurde der Workflow nicht an Spielbeispielen, sondern an zwei realen Oberflächenkomponenten aus einer laufenden Migration.',
      'Dazu eine dokumentierte Auswertung nach selbst aufgestellten Qualitätskriterien — mit Stärken, Schwächen, Grenzen und der Frage, was sich davon auf andere Projekte übertragen lässt.',
      'Umfang rund 80 Seiten.',
    ],
    tech: ['GitHub Copilot', 'Agenten-Workflows', 'Prompt Engineering', 'VS Code', 'Magnolia CMS'],
    links: [],
  },
  {
    id: 'esp32-display',
    title: 'Server-Status-Display',
    kind: 'Embedded / IoT',
    status: 'eigen',
    year: '2026',
    summary:
      'Ein ESP32 mit LCD-Display, das die Livewerte meines Homeservers anzeigt — damit der Zustand der Maschine sichtbar ist, ohne erst ein Dashboard zu öffnen.',
    details: [
      'Entwickelt mit PlatformIO: Der Mikrocontroller holt sich die Metriken über das Netz und schreibt sie auf ein LCD1602.',
      'Als Nächstes ein ESP32-S3 mit OV5640-Kameramodul, geflasht und getestet — Grundlage für eigene Versuche mit Bilderkennung auf dem Gerät selbst.',
    ],
    tech: ['ESP32', 'C++', 'PlatformIO', 'LCD1602'],
    links: [],
  },
  {
    id: 'lernverfahren',
    title: 'Praxisprojekt Lernverfahren',
    kind: 'Machine Learning',
    status: 'studium',
    year: '2026',
    summary:
      'Praxisprojekt zur Vorlesung „Grundlagen maschineller Lernverfahren“ — Bilderkennung auf CIFAR-10 aus drei bewusst unterschiedlichen Blickwinkeln.',
    details: [
      'Ein Convolutional Neural Network mit Keras trainiert, um Autos von Nicht-Autos zu unterscheiden.',
      'Dasselbe CNN anschließend vollständig in NumPy nachgebaut — inklusive selbst geschriebener Backpropagation, ohne Framework.',
      'Zum Vergleich MobileNetV2 als vortrainiertes Modell geladen und per Fine-Tuning auf die Aufgabe angepasst.',
      'Fünfköpfiges Team aus dem Kurs TIK24, Training auf GPU-Laufzeiten.',
    ],
    tech: ['Python', 'TensorFlow / Keras', 'NumPy', 'Jupyter', 'CIFAR-10'],
    links: [{ label: 'Quellcode', url: 'https://github.com/steju4/lernverfahren', primary: true }],
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
      'Anwendung zur Verwaltung von Pflanzen und Standorten — mein bislang breitester Technologie-Sprung von TypeScript im Frontend zu Java im Backend.',
    details: [
      'Cross-Platform-Frontend mit Ionic, dadurch aus einer Codebasis heraus als Web- und Mobile-App lauffähig.',
      'Backend als Spring-Boot-Dienst auf Java 21, gebaut über den mitgelieferten Gradle-Wrapper.',
      'Sauber dokumentiertes Setup, damit das Projekt auf fremden Rechnern reproduzierbar startet.',
    ],
    tech: ['TypeScript', 'Ionic', 'Java 21', 'Spring Boot', 'Gradle'],
    links: [{ label: 'Quellcode', url: 'https://github.com/steju4/PlantApp', primary: true }],
  },
  {
    id: 'work-at-sig',
    title: 'Praktikumsaufgaben für Schüler:innen',
    kind: 'Didaktik & Python',
    status: 'praxis',
    year: '2025',
    summary:
      'Für Schulpraktikant:innen zwischen 14 und 17 Jahren konzipierte Aufgaben, die einen ersten echten Kontakt mit Programmierung und Hardware herstellen.',
    details: [
      'Eine elfteilige Python-Serie am Raspberry Pi, die Schritt für Schritt zur Ansteuerung eines LCD-Displays führt — jede Datei ein kleiner, abgeschlossener Lernschritt.',
      'Ergänzend ein Memory-Spiel zum Auseinandernehmen eines Laptops: Karten, auf denen Bauteile ihrer Funktion zugeordnet werden.',
      'Die eigentliche Herausforderung war weniger der Code als die Frage, wie viel Erklärung nötig ist, damit jemand ohne Vorwissen selbst weiterkommt.',
    ],
    tech: ['Python', 'Raspberry Pi', 'Didaktik'],
    links: [],
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
      'Hardwarenahe Umsetzung in C mit bewusstem Blick auf Speicherverwaltung und Zeigerarithmetik.',
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
    details: [
      'Von der konzeptionellen Modellierung über die Normalisierung bis zu konkreten Abfragen.',
    ],
    tech: ['SQL', 'Datenmodellierung'],
    links: [
      { label: 'Quellcode', url: 'https://github.com/steju4/filmverwaltung-db', primary: true },
    ],
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
      'Schriften sind lokal gebündelt, es werden keinerlei Ressourcen von Dritten geladen und kein Tracking eingesetzt.',
      'Entstanden in Zusammenarbeit mit Claude Code.',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Docker', 'nginx', 'Cloudflare Tunnel'],
    links: [
      { label: 'Quellcode', url: 'https://github.com/steju4/julian-portfolio', primary: true },
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
    id: 'ki',
    title: 'KI & Data Science',
    icon: 'brain',
    items: [
      'TensorFlow / Keras',
      'NumPy',
      'Pandas',
      'Jupyter',
      'CNNs',
      'Transfer Learning',
      'KI-Entwicklungsworkflows',
    ],
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
    text: 'Studium im dreimonatigen Wechsel zwischen Theorie- und Praxisphasen, mit Schwerpunkt auf Künstlicher Intelligenz. Inhalte von Programmierung in C und Java über Software Engineering und Datenbanken bis zu maschinellen Lernverfahren. Abschluss vorgesehen für 2027.',
    current: true,
  },
  {
    period: 'seit 2024',
    title: 'Praxisphasen als dualer Student',
    org: 'Geberit, Pfullendorf — Abteilung Web Applications',
    text: 'Mitarbeit an der Webplattform des Unternehmens, unter anderem im Umfeld einer CMS-Migration. Daraus ist auch meine Projektarbeit zu KI-gestützten Entwicklungsworkflows entstanden.',
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
    text: 'Aufbau und Betrieb einer eigenen kleinen Serverumgebung mit Docker Compose, Reverse Proxy, Monitoring und automatisierten Backups — erreichbar über einen Cloudflare Tunnel. Der Ort, an dem ich Infrastruktur wirklich lerne.',
  },
  {
    period: 'laufend',
    title: 'Ehrenamt im Verein',
    org: 'Musikkapelle Menningen e.V.',
    text: 'Tenorhorn im Musikverein und Beisitzer im Vorstand. Mitorganisation des Schuppenfests — Vereinsarbeit ist Projektarbeit mit anderen Mitteln.',
  },
]

export const contact = {
  headline: 'Lass uns reden',
  text: `Ob eine Idee für ein gemeinsames Projekt, eine Vereinswebseite oder einfach eine Frage
         zu einem meiner Projekte — ich freue mich über Nachrichten. Am schnellsten erreichst du
         mich per E-Mail.`,
}
