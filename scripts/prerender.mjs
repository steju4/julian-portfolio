import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
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
const inhalt = render()

if (!inhalt || inhalt.length < 500) {
  console.error(`✗ Prerendering lieferte nur ${inhalt?.length ?? 0} Zeichen — das kann nicht stimmen.`)
  process.exit(1)
}

const vorlage = readFileSync(indexPfad, 'utf8')
const ziel = '<div id="root"></div>'

if (!vorlage.includes(ziel)) {
  console.error('✗ In dist/index.html wurde <div id="root"></div> nicht gefunden.')
  process.exit(1)
}

writeFileSync(indexPfad, vorlage.replace(ziel, `<div id="root">${inhalt}</div>`), 'utf8')

// Der SSR-Build wird nur zum Erzeugen des HTML gebraucht und gehört nicht
// in das ausgelieferte Verzeichnis.
rmSync(resolve(wurzel, 'dist-ssr'), { recursive: true, force: true })

const textLaenge = inhalt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length
const ueberschriften = (inhalt.match(/<h[1-6][\s>]/g) || []).length

console.log(`✓ Prerendering: ${inhalt.length} Zeichen HTML, davon ${textLaenge} Zeichen Text, ${ueberschriften} Überschriften`)
