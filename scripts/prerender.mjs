import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const wurzel = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const indexPfad = resolve(wurzel, 'dist/index.html')
const serverPfad = resolve(wurzel, 'dist-ssr/entry-server.js')

if (!existsSync(serverPfad)) {
  console.error('✗ dist-ssr/entry-server.js fehlt — lief "vite build --ssr" durch?')
  process.exit(1)
}

const { render } = await import(pathToFileURL(serverPfad).href)
const vorlage = readFileSync(indexPfad, 'utf8')
const ziel = '<div id="root"></div>'

if (!vorlage.includes(ziel)) {
  console.error('✗ In dist/index.html wurde <div id="root"></div> nicht gefunden.')
  process.exit(1)
}

// Seiten, die als eigenes Dokument entstehen sollen.
const SEITEN = [
  {
    schluessel: 'start',
    datei: 'dist/index.html',
    mindestzeichen: 5000,
  },
  {
    schluessel: 'datenschutz',
    datei: 'dist/datenschutz/index.html',
    titel: 'Datenschutz — Julian Stengele',
    beschreibung:
      'Wie diese Seite mit Daten umgeht: keine Cookies, kein Tracking, keine eingebundenen Inhalte von Dritten.',
    canonical: 'https://julian.stengele-home.de/datenschutz/',
    mindestzeichen: 2000,
  },
  {
    schluessel: '404',
    datei: 'dist/404.html',
    titel: 'Seite nicht gefunden — Julian Stengele',
    beschreibung: 'Diese Adresse gibt es auf julian.stengele-home.de nicht.',
    indexieren: false,
    mindestzeichen: 300,
  },
]

let fehler = 0

for (const seite of SEITEN) {
  const inhalt = render(seite.schluessel)

  if (!inhalt || inhalt.length < seite.mindestzeichen) {
    console.error(
      `✗ ${seite.schluessel}: nur ${inhalt?.length ?? 0} Zeichen, erwartet mindestens ${seite.mindestzeichen}`,
    )
    fehler += 1
    continue
  }

  let dokument = vorlage.replace(ziel, `<div id="root" data-seite="${seite.schluessel}">${inhalt}</div>`)

  if (seite.titel) {
    dokument = dokument
      .replace(/<title>.*?<\/title>/s, `<title>${seite.titel}</title>`)
      .replace(
        /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
        `$1${seite.titel}$2`,
      )
  }

  if (seite.beschreibung) {
    dokument = dokument.replace(
      /(<meta\s*\n?\s*name="description"\s*\n?\s*content=")[^"]*(")/s,
      `$1${seite.beschreibung}$2`,
    )
  }

  if (seite.canonical) {
    dokument = dokument.replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${seite.canonical}$2`,
    )
  }

  // Eine Fehlerseite gehört nicht in den Suchindex.
  if (seite.indexieren === false) {
    dokument = dokument.replace(
      /(<meta name="robots" content=")[^"]*(")/,
      '$1noindex, follow$2',
    )
  }

  const pfad = resolve(wurzel, seite.datei)
  mkdirSync(dirname(pfad), { recursive: true })
  writeFileSync(pfad, dokument, 'utf8')

  const text = inhalt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const ueberschriften = (inhalt.match(/<h[1-6][\s>]/g) || []).length
  console.log(`✓ ${seite.datei.padEnd(28)} ${String(text.length).padStart(5)} Zeichen Text, ${ueberschriften} Überschriften`)
}

// Der SSR-Build wird nur zum Erzeugen des HTML gebraucht und gehört nicht
// in das ausgelieferte Verzeichnis.
rmSync(resolve(wurzel, 'dist-ssr'), { recursive: true, force: true })

if (fehler > 0) process.exit(1)
