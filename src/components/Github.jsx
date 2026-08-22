import { RefreshCw, Star, Code2, Users, FolderGit2, GitBranch, TriangleAlert } from 'lucide-react'
import { useGithub } from '../hooks'
import { relativeZeit, GITHUB_USER } from '../github'
import { GithubIcon } from './icons'
import { Section, SectionHeading, Reveal } from './Primitives'

function LetzteRepos({ repos }) {
  if (!repos?.length) return null

  return (
    <div className="mt-10">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
        Zuletzt aktualisierte Repositories
      </h3>

      <ul className="space-y-1">
        {repos.map((r) => (
          <li key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 -mx-3 transition-colors duration-200 hover:bg-ink-800/60"
            >
              {r.sprache ? (
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: farbe(r.sprache) }}
                  title={r.sprache}
                />
              ) : (
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full border border-ink-600" />
              )}

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-mist-300 transition-colors group-hover:text-beam-300">
                  {r.name}
                </span>
                {r.beschreibung && (
                  <span className="mt-0.5 block truncate text-xs text-mist-500" title={r.beschreibung}>
                    {r.beschreibung}
                  </span>
                )}
              </span>

              {r.sterne > 0 && (
                <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-mist-500">
                  <Star size={11} />
                  {r.sterne}
                </span>
              )}

              <span className="shrink-0 font-mono text-[11px] text-mist-500/80">
                {relativeZeit(r.aktualisiert)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Die vertrauten Sprachfarben von GitHub — sie sind sofort wiedererkennbar.
const SPRACHFARBEN = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  'Jupyter Notebook': '#da5b0b',
  Java: '#b07219',
  C: '#8f8f8f',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Vue: '#41b883',
  Go: '#00add8',
  Rust: '#dea584',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  PHP: '#4f5d95',
  Ruby: '#701516',
  SCSS: '#c6538c',
}

const farbe = (name) => SPRACHFARBEN[name] ?? '#6f7a92'

function Kachel({ icon: Icon, wert, label, laedt }) {
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-850/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-ink-600">
      <Icon size={16} className="mb-3 text-beam-400" />
      <div className="font-mono text-2xl font-bold text-mist-100 sm:text-3xl tabular-nums">
        {laedt ? <span className="inline-block h-7 w-12 animate-pulse rounded bg-ink-700" /> : wert}
      </div>
      <div className="mt-1.5 text-xs leading-snug text-mist-500">{label}</div>
    </div>
  )
}

function Sprachbalken({ sprachen }) {
  if (!sprachen?.length) return null

  return (
    <div>
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
        Sprachen nach Repositories
      </h3>

      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-ink-800">
        {sprachen.map((s) => (
          <div
            key={s.name}
            style={{ width: `${s.anteil * 100}%`, backgroundColor: farbe(s.name) }}
            className="h-full transition-all duration-700 ease-out first:rounded-l-full last:rounded-r-full"
            title={`${s.name}: ${s.anzahl}`}
          />
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
        {sprachen.map((s) => (
          <li key={s.name} className="flex items-center gap-2 text-sm text-mist-400">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: farbe(s.name) }}
            />
            {s.name}
            <span className="font-mono text-xs text-mist-500 tabular-nums">
              {Math.round(s.anteil * 100)} %
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Aktivitaet({ eintraege, laedt }) {
  if (laedt) {
    return (
      <ul className="space-y-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-ink-700" />
            <span className="h-4 flex-1 animate-pulse rounded bg-ink-800" style={{ maxWidth: `${80 - i * 8}%` }} />
          </li>
        ))}
      </ul>
    )
  }

  if (!eintraege?.length) {
    return (
      <p className="text-sm text-mist-500">
        GitHub liefert für die letzten Tage keine öffentliche Aktivität.
      </p>
    )
  }

  return (
    <ol className="space-y-4">
      {eintraege.slice(0, 6).map((e) => (
        <li key={e.id} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[7px] size-2 shrink-0 rounded-full bg-beam-400/70 ring-4 ring-beam-400/10"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-snug text-mist-300">
              {e.text}
              {e.repo && (
                <>
                  {' in '}
                  <a
                    href={e.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-beam-300 transition-colors hover:text-beam-400"
                  >
                    {e.repo}
                  </a>
                </>
              )}
            </p>

            {e.titel && (
              <p className="mt-1 truncate text-xs text-mist-400" title={e.titel}>
                {e.titel}
              </p>
            )}

            <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-mist-500">
              {e.branch && (
                <span
                  className="inline-flex max-w-[15rem] items-center gap-1 truncate rounded border border-ink-700 bg-ink-800/60 px-1.5 py-0.5 text-mist-400"
                  title={e.branch}
                >
                  <GitBranch size={10} className="shrink-0" />
                  {e.branch}
                </span>
              )}

              {e.kurzHash && (
                <a
                  href={e.commitUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-beam-300"
                  title="Commit auf GitHub ansehen"
                >
                  {e.kurzHash}
                </a>
              )}

              <span className="text-mist-500/80">{relativeZeit(e.zeit)}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Github() {
  const { status, daten, fehler, neuLaden } = useGithub()
  const laedt = status === 'laden'
  const aktualisiert = status === 'aktualisiert'

  return (
    <Section id="github">
      <SectionHeading
        index="02"
        kicker="GitHub"
        title="Woran ich gerade arbeite"
        lead="Diese Zahlen kommen direkt aus der öffentlichen GitHub-API — kein von Hand gepflegter Stand."
      />

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-850/50 backdrop-blur-sm">
          {/* Kopfzeile */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-800 px-6 py-5 sm:px-8">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3"
            >
              <span className="grid size-10 place-items-center rounded-xl border border-ink-700 bg-ink-800/70 text-mist-300 transition-colors group-hover:border-beam-400/40 group-hover:text-beam-300">
                <GithubIcon size={18} />
              </span>
              <span>
                <span className="block font-semibold text-mist-100">@{GITHUB_USER}</span>
                <span className="block font-mono text-[11px] text-mist-500">github.com</span>
              </span>
            </a>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-mist-500">
                <span className="relative flex size-1.5">
                  {!fehler && (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-beam-400 opacity-70" />
                  )}
                  <span
                    className={`relative inline-flex size-1.5 rounded-full ${
                      fehler ? 'bg-mist-500' : 'bg-beam-400'
                    }`}
                  />
                </span>
                {laedt ? 'lädt …' : daten?.stand ? `Stand ${relativeZeit(daten.stand)}` : 'live'}
              </span>

              <button
                type="button"
                onClick={neuLaden}
                disabled={laedt || aktualisiert}
                aria-label="Daten neu laden"
                className="grid size-9 place-items-center rounded-lg border border-ink-700 text-mist-500 transition-all hover:border-ink-600 hover:text-mist-200 disabled:opacity-40"
              >
                <RefreshCw size={14} className={aktualisiert || laedt ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Hinweis, wenn GitHub gerade nicht antwortet */}
            {fehler && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-ink-700 bg-ink-800/50 p-4">
                <TriangleAlert size={16} className="mt-0.5 shrink-0 text-mist-400" />
                <p className="text-sm leading-relaxed text-mist-400">
                  {fehler === 'ratelimit'
                    ? 'Das Anfragekontingent der GitHub-API ist für den Moment erschöpft — GitHub erlaubt ohne Anmeldung 60 Abrufe pro Stunde.'
                    : 'GitHub ist gerade nicht erreichbar.'}{' '}
                  {daten
                    ? 'Angezeigt wird der zuletzt geladene Stand.'
                    : 'Die Zahlen erscheinen, sobald der Abruf wieder klappt.'}
                </p>
              </div>
            )}

            {/* Kennzahlen */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Kachel icon={FolderGit2} laedt={laedt} label="Öffentliche Repositories" wert={daten?.profil?.repos ?? '—'} />
              <Kachel icon={Code2}      laedt={laedt} label="Sprachen im Einsatz"       wert={daten?.sprachen?.length ?? '—'} />
              <Kachel icon={Star}       laedt={laedt} label="Sterne insgesamt"          wert={daten?.sterne ?? '—'} />
              <Kachel icon={Users}      laedt={laedt} label="Follower"                  wert={daten?.profil?.followers ?? '—'} />
            </div>

            {/* Sprachen und Aktivität */}
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                {laedt ? (
                  <div className="h-2.5 w-full animate-pulse rounded-full bg-ink-800" />
                ) : (
                  <>
                    <Sprachbalken sprachen={daten?.sprachen} />
                    <LetzteRepos repos={daten?.topRepos} />
                  </>
                )}
              </div>

              <div>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
                  Letzte öffentliche Aktivität
                </h3>
                <Aktivitaet eintraege={daten?.aktivitaeten} laedt={laedt} />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
