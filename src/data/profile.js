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
  tagline: 'Ich baue Software, die Menschen wirklich benutzen.',
  location: 'Friedrichshafen / Meßkirch, Deutschland',
  email: 'julian.stengele@gmail.com',
  course: 'TIK24',
  university: 'DHBW Friedrichshafen',
  focus: 'Künstliche Intelligenz',
}

// ---------------------------------------------------------------------------
//  Social-Links
//
//  ▸ TODO: Bei "linkedin" und "instagram" jeweils die vollständige URL
//    eintragen. Einträge mit leerem "url" werden auf der Seite automatisch
//    ausgeblendet — es entstehen also keine toten Links.
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
    url: '', // z. B. 'https://www.linkedin.com/in/julian-stengele/'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '',
    url: '', // z. B. 'https://www.instagram.com/dein.handle/'
  },
  {
    id: 'mail',
    label: 'E-Mail',
    handle: 'julian.stengele@gmail.com',
    url: 'mailto:julian.stengele@gmail.com',
  },
]

export const about = {
  headline: 'Zwischen Vorlesung, Praxisphase und eigenen Projekten',
  paragraphs: [
    `Ich studiere Informatik im dualen Modell an der DHBW Friedrichshafen — Kurs TIK24, mit
     Schwerpunkt auf Künstlicher Intelligenz. Das duale Prinzip heißt für mich: Was in der
     Theoriephase an der Tafel steht, muss drei Monate später im Betrieb tatsächlich
     funktionieren. Diese Rückkopplung prägt, wie ich Software baue.`,

    `Am liebsten arbeite ich an Projekten, die einen echten Adressaten haben. Die Webseite
     der Fuchszunft Menningen wird von einem ganzen Verein genutzt, BetterDualis ist aus
     dem alltäglichen Ärger über ein nicht bedienbares Notenportal entstanden. Aus einem
     konkreten Problem eine saubere, benutzbare Lösung zu machen, finde ich deutlich
     spannender als Technik um ihrer selbst willen.`,

    `Auf der KI-Seite reizt mich vor allem, hinter die Abstraktion zu schauen. Im
     Praxisprojekt Lernverfahren habe ich ein Convolutional Neural Network nicht nur mit
     Keras trainiert, sondern zusätzlich komplett in NumPy nachgebaut — inklusive eigener
     Backpropagation. Erst wenn ich weiß, was ein Framework mir abnimmt, kann ich
     einschätzen, wann ich ihm trauen darf.`,
  ],
}

export const facts = [
  { value: 'TIK24', label: 'Kurs an der DHBW Friedrichshafen' },
  { value: 'KI', label: 'Studienschwerpunkt' },
  { value: '3', label: 'Projekte live im Einsatz' },
  { value: '8+', label: 'Projekte aus Studium & Praxis' },
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
    items: ['TensorFlow / Keras', 'NumPy', 'Pandas', 'Jupyter', 'CNNs', 'Transfer Learning'],
  },
  {
    id: 'tooling',
    title: 'Werkzeuge & Betrieb',
    icon: 'wrench',
    items: ['Git & GitHub', 'Docker', 'Linux', 'Nginx', 'CMake', 'C', 'Vercel'],
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
    text: 'Studium im dreimonatigen Wechsel zwischen Theorie- und Praxisphasen, mit Schwerpunkt auf Künstlicher Intelligenz. Inhalte von Programmierung in C und Java über Software Engineering und Datenbanken bis zu maschinellen Lernverfahren.',
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
    title: 'Eigene Projekte & Homeserver',
    org: 'Selbstständig',
    text: 'Werkzeuge, die eigene Probleme lösen — etwa BetterDualis als mobiler Zugang zum Notenportal. Betrieb eigener Dienste auf einem Homeserver mit Docker, Nginx Proxy Manager und Cloudflare Tunnel.',
  },
]

export const contact = {
  headline: 'Lass uns reden',
  text: `Ob Praxisprojekt, Werkstudentenstelle, eine Vereinswebseite oder einfach eine Frage zu
         einem meiner Projekte — ich freue mich über Nachrichten. Am schnellsten erreichst du
         mich per E-Mail.`,
}
