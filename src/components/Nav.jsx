import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useActiveSection, useScrolled } from '../hooks'
import { person } from '../data/profile'

const LINKS = [
  { id: 'projekte', label: 'Projekte' },
  { id: 'github', label: 'GitHub' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'stack', label: 'Stack' },
  { id: 'werdegang', label: 'Werdegang' },
  { id: 'kontakt', label: 'Kontakt' },
]

const IDS = LINKS.map((l) => l.id)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24)
  const active = useActiveSection(IDS)

  // Scrollen sperren, solange das mobile Menü offen ist
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Menü mit Escape schließen
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#projekte"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-beam-400 focus:px-4 focus:py-2 focus:font-medium focus:text-ink-950"
      >
        Zum Inhalt springen
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 sm:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Zum Seitenanfang"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-linear-135 from-beam-400 to-pulse-500 font-mono text-xs font-bold text-ink-950">
              {person.initials}
            </span>
            <span className="hidden font-semibold tracking-tight text-mist-100 sm:block">
              {person.name}
            </span>
          </a>

          {/* Desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    active === link.id
                      ? 'text-mist-100'
                      : 'text-mist-500 hover:text-mist-300'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-linear-to-r from-beam-400 to-pulse-400" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-ink-700 text-mist-300 transition-colors hover:border-ink-600 hover:text-mist-100 md:hidden"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobiles Menü */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-2 px-8">
          {LINKS.map((link, i) => (
            <li key={link.id} className="w-full max-w-xs">
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 55}ms` : '0ms' }}
                className={`block rounded-xl px-5 py-4 text-center text-lg font-medium transition-all duration-300 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${
                  active === link.id
                    ? 'bg-ink-800/70 text-mist-100'
                    : 'text-mist-400 hover:bg-ink-850/70 hover:text-mist-100'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
