import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Braces,
  Layers3,
  Mail,
  Search,
  UserRound,
  Workflow,
  X,
} from 'lucide-react'
import { GithubIcon } from './icons'

const BEFEHLE = [
  { label: 'Projekte', detail: 'Gebautes und laufende Projekte', href: '#projekte', icon: Braces },
  { label: 'GitHub', detail: 'Aktivität und Repositories', href: '#github', icon: GithubIcon },
  { label: 'Über mich', detail: 'Studium und Arbeitsweise', href: '#ueber-mich', icon: UserRound },
  { label: 'Stack', detail: 'Technologien und Werkzeuge', href: '#stack', icon: Layers3 },
  { label: 'Werdegang', detail: 'Stationen und Erfahrungen', href: '#werdegang', icon: Workflow },
  { label: 'Kontakt', detail: 'E-Mail und Profile', href: '#kontakt', icon: Mail },
  {
    label: 'GitHub-Profil öffnen',
    detail: 'github.com/steju4',
    href: 'https://github.com/steju4',
    icon: ArrowUpRight,
    external: true,
  },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [aktiv, setAktiv] = useState(0)
  const inputRef = useRef(null)
  const dialogRef = useRef(null)
  const vorherigerFokusRef = useRef(null)

  const treffer = useMemo(() => {
    const suche = query.trim().toLocaleLowerCase('de')
    if (!suche) return BEFEHLE
    return BEFEHLE.filter((befehl) =>
      `${befehl.label} ${befehl.detail}`.toLocaleLowerCase('de').includes(suche),
    )
  }, [query])

  useEffect(() => {
    const oeffnen = () => setOpen(true)
    const tastatur = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((wert) => !wert)
      }
    }

    window.addEventListener('command-palette:open', oeffnen)
    window.addEventListener('keydown', tastatur)
    return () => {
      window.removeEventListener('command-palette:open', oeffnen)
      window.removeEventListener('keydown', tastatur)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const vorherigerOverflow = document.body.style.overflow
    vorherigerFokusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    setQuery('')
    setAktiv(0)
    requestAnimationFrame(() => inputRef.current?.focus())

    return () => {
      document.body.style.overflow = vorherigerOverflow
      vorherigerFokusRef.current?.focus()
    }
  }, [open])

  const schliessen = () => setOpen(false)

  const tasteBehandeln = (event) => {
    if (event.key === 'Escape') {
      schliessen()
      return
    }

    if (event.key === 'Tab') {
      const elemente = dialogRef.current?.querySelectorAll('a[href], button, input')
      if (!elemente?.length) return

      const erstes = elemente[0]
      const letztes = elemente[elemente.length - 1]
      if (event.shiftKey && document.activeElement === erstes) {
        event.preventDefault()
        letztes.focus()
      } else if (!event.shiftKey && document.activeElement === letztes) {
        event.preventDefault()
        erstes.focus()
      }
      return
    }

    if (!treffer.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setAktiv((wert) => (wert + 1) % treffer.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setAktiv((wert) => (wert - 1 + treffer.length) % treffer.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      document.getElementById(`command-${aktiv}`)?.click()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-ink-950/75 px-4 pt-[16vh] backdrop-blur-md"
      onMouseDown={(event) => event.target === event.currentTarget && schliessen()}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        onKeyDown={tasteBehandeln}
        className="command-palette w-full max-w-xl overflow-hidden rounded-2xl border border-ink-600 bg-ink-900/95 shadow-2xl shadow-black/60"
      >
        <h2 id="command-title" className="sr-only">Schnellnavigation</h2>

        <div className="flex items-center gap-3 border-b border-ink-700 px-4">
          <Search size={18} className="shrink-0 text-beam-300" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setAktiv(0)
            }}
            placeholder="Bereich oder Aktion suchen …"
            aria-label="Schnellnavigation durchsuchen"
            className="min-w-0 flex-1 bg-transparent py-4 text-sm text-mist-100 outline-none placeholder:text-mist-500"
          />
          <button
            type="button"
            onClick={schliessen}
            aria-label="Schnellnavigation schließen"
            className="grid size-8 place-items-center rounded-lg text-mist-500 transition-colors hover:bg-ink-800 hover:text-mist-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {treffer.length ? (
            treffer.map((befehl, index) => {
              const Icon = befehl.icon
              return (
                <a
                  id={`command-${index}`}
                  key={befehl.href}
                  href={befehl.href}
                  target={befehl.external ? '_blank' : undefined}
                  rel={befehl.external ? 'noreferrer noopener' : undefined}
                  onClick={schliessen}
                  onMouseEnter={() => setAktiv(index)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                    aktiv === index ? 'bg-ink-800 text-mist-100' : 'text-mist-300 hover:bg-ink-850'
                  }`}
                >
                  <span className={`grid size-9 shrink-0 place-items-center rounded-lg border ${
                    aktiv === index
                      ? 'border-beam-400/35 bg-beam-500/10 text-beam-300'
                      : 'border-ink-700 bg-ink-850 text-mist-500'
                  }`}>
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{befehl.label}</span>
                    <span className="block truncate text-xs text-mist-500">{befehl.detail}</span>
                  </span>
                  {befehl.external ? <ArrowUpRight size={14} className="text-mist-500" /> : null}
                </a>
              )
            })
          ) : (
            <p className="px-4 py-8 text-center text-sm text-mist-500">Kein passender Bereich gefunden.</p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-ink-700 px-4 py-2.5 font-mono text-[10px] text-mist-500">
          <span>↑ ↓ auswählen · Enter öffnen</span>
          <span>Esc schließen</span>
        </div>
      </section>
    </div>
  )
}
