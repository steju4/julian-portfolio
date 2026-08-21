// ---------------------------------------------------------------------------
//  Live-Daten von GitHub
//
//  Die Seite ist rein statisch — es gibt keinen Server, der Daten vorhalten
//  könnte. Die Zahlen kommen deshalb direkt aus der öffentlichen GitHub-API,
//  abgefragt aus dem Browser der Besucher.
//
//  Wichtig dabei: Ohne Zugangstoken erlaubt GitHub nur 60 Anfragen pro Stunde
//  und IP-Adresse. Ein Token darf in einer statischen Seite nicht liegen, weil
//  er für jeden lesbar wäre. Deshalb:
//    · Ergebnisse werden im localStorage zwischengespeichert (TTL unten),
//    · alle Komponenten teilen sich EINE Abfrage,
//    · bei Fehlern oder erschöpftem Kontingent bleibt die Seite bedienbar
//      und zeigt den zuletzt bekannten Stand.
// ---------------------------------------------------------------------------

const USER = 'steju4'
const API = 'https://api.github.com'

const CACHE_KEY = 'gh-stats-v1'
const CACHE_TTL = 30 * 60 * 1000 // 30 Minuten

/** Liest den zwischengespeicherten Stand, auch wenn er abgelaufen ist. */
function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.at !== 'number') return null
    return { data: parsed.data, at: parsed.at, frisch: Date.now() - parsed.at < CACHE_TTL }
  } catch {
    return null // privater Modus, gesperrter Speicher, kaputter Eintrag
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // Speichern ist nur eine Optimierung — ein Fehler darf nichts kaputt machen
  }
}

async function holen(pfad, signal) {
  const res = await fetch(`${API}${pfad}`, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (res.status === 403 || res.status === 429) {
    // GitHub gibt "x-ratelimit-remaining" per CORS frei, verlässlich lesbar ist
    // der Header aber nicht immer (Proxys, restriktive Netze). Ein 403 auf
    // diesen öffentlichen Endpunkten ist praktisch ausnahmslos das erschöpfte
    // Kontingent — nur ein ausdrücklich positiver Rest spricht dagegen.
    const rest = res.headers.get('x-ratelimit-remaining')
    throw new Error(rest && Number(rest) > 0 ? 'forbidden' : 'ratelimit')
  }
  if (!res.ok) throw new Error(`http-${res.status}`)

  return res.json()
}

/** Wandelt die Roh-Antworten in genau die Werte um, die die Seite anzeigt. */
function aufbereiten(profil, repos, events) {
  const eigene = repos.filter((r) => !r.fork && !r.archived)

  const sterne = eigene.reduce((s, r) => s + (r.stargazers_count || 0), 0)
  const forks = eigene.reduce((s, r) => s + (r.forks_count || 0), 0)

  // Sprachen nach Anzahl der Repositories
  const zaehler = new Map()
  for (const r of eigene) {
    if (!r.language) continue
    zaehler.set(r.language, (zaehler.get(r.language) || 0) + 1)
  }
  const gesamt = [...zaehler.values()].reduce((a, b) => a + b, 0)
  const sprachen = [...zaehler.entries()]
    .map(([name, anzahl]) => ({ name, anzahl, anteil: gesamt ? anzahl / gesamt : 0 }))
    .sort((a, b) => b.anzahl - a.anzahl)

  const zuletztAktualisiert = eigene
    .map((r) => r.pushed_at)
    .filter(Boolean)
    .sort()
    .at(-1)

  return {
    profil: {
      name: profil.name || profil.login,
      login: profil.login,
      avatar: profil.avatar_url,
      repos: profil.public_repos,
      followers: profil.followers,
      following: profil.following,
      seit: profil.created_at,
    },
    sterne,
    forks,
    sprachen,
    zuletztAktualisiert,
    aktivitaeten: eventsAufbereiten(events),
    topRepos: eigene
      .slice()
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        beschreibung: r.description,
        sprache: r.language,
        sterne: r.stargazers_count,
        aktualisiert: r.pushed_at,
      })),
  }
}

const EVENT_TEXTE = {
  PushEvent: (e) => {
    // "size" ist die tatsächliche Anzahl; das mitgelieferte commits-Array
    // deckelt GitHub bei 20 Einträgen.
    const n = e.payload?.size ?? e.payload?.commits?.length ?? 0
    return n === 1 ? '1 Commit gepusht' : `${n} Commits gepusht`
  },
  CreateEvent: (e) =>
    e.payload?.ref_type === 'repository'
      ? 'Repository angelegt'
      : `${e.payload?.ref_type === 'branch' ? 'Branch' : 'Tag'} „${e.payload?.ref}" angelegt`,
  DeleteEvent: (e) => `${e.payload?.ref_type === 'branch' ? 'Branch' : 'Tag'} gelöscht`,
  PullRequestEvent: (e) =>
    e.payload?.action === 'closed' && e.payload?.pull_request?.merged
      ? 'Pull Request zusammengeführt'
      : `Pull Request ${e.payload?.action === 'opened' ? 'geöffnet' : 'aktualisiert'}`,
  IssuesEvent: (e) => `Issue ${e.payload?.action === 'opened' ? 'geöffnet' : 'aktualisiert'}`,
  IssueCommentEvent: () => 'Issue kommentiert',
  WatchEvent: () => 'Repository mit Stern markiert',
  ForkEvent: () => 'Repository geforkt',
  ReleaseEvent: () => 'Release veröffentlicht',
  PublicEvent: () => 'Repository öffentlich gemacht',
}

function eventsAufbereiten(events) {
  if (!Array.isArray(events)) return []

  return events
    .filter((e) => EVENT_TEXTE[e.type])
    .slice(0, 12)
    .map((e) => ({
      id: e.id,
      text: EVENT_TEXTE[e.type](e),
      repo: e.repo?.name?.replace(`${USER}/`, '') ?? '',
      repoUrl: e.repo?.name ? `https://github.com/${e.repo.name}` : null,
      nachricht: e.payload?.commits?.at(-1)?.message?.split('\n')[0] ?? null,
      zeit: e.created_at,
    }))
}

// --- Eine gemeinsame Abfrage für alle Komponenten -------------------------

let laufend = null

export async function ladeGithub({ erzwingen = false } = {}) {
  const cache = readCache()
  if (!erzwingen && cache?.frisch) return { ...cache.data, ausCache: true, stand: cache.at }

  if (laufend) return laufend

  laufend = (async () => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)

    try {
      // events darf fehlschlagen, ohne dass der Rest verloren geht
      const [profil, repos, events] = await Promise.all([
        holen(`/users/${USER}`, controller.signal),
        holen(`/users/${USER}/repos?per_page=100&sort=pushed`, controller.signal),
        holen(`/users/${USER}/events/public?per_page=100`, controller.signal).catch(() => []),
      ])

      const daten = aufbereiten(profil, repos, events)
      writeCache(daten)
      return { ...daten, ausCache: false, stand: Date.now() }
    } finally {
      clearTimeout(timeout)
      laufend = null
    }
  })()

  return laufend
}

/** Letzter bekannter Stand, auch wenn abgelaufen — für den Fehlerfall. */
export function letzterStand() {
  const cache = readCache()
  return cache ? { ...cache.data, ausCache: true, stand: cache.at } : null
}

// --- Zeitangaben ----------------------------------------------------------

export function relativeZeit(iso) {
  if (!iso) return null

  const diff = Date.now() - new Date(iso).getTime()
  if (Number.isNaN(diff)) return null

  const min = Math.floor(diff / 60000)
  if (min < 1) return 'gerade eben'
  if (min < 60) return `vor ${min} Minute${min === 1 ? '' : 'n'}`

  const std = Math.round(min / 60)
  if (std < 24) return `vor ${std} Stunde${std === 1 ? '' : 'n'}`

  const tage = Math.round(std / 24)
  if (tage < 31) return `vor ${tage} Tag${tage === 1 ? '' : 'en'}`

  const monate = Math.round(tage / 30.44)
  if (monate < 12) return `vor ${monate} Monat${monate === 1 ? '' : 'en'}`

  const jahre = Math.floor(monate / 12)
  return `vor ${jahre} Jahr${jahre === 1 ? '' : 'en'}`
}

export const GITHUB_USER = USER
