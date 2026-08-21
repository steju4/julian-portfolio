import { ArrowUp } from 'lucide-react'
import { person, socials } from '../data/profile'
import { SocialIcon } from './icons'

export default function Footer() {
  const year = new Date().getFullYear()
  const links = socials.filter((s) => s.url)

  return (
    <footer className="border-t border-ink-800 px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs text-mist-500">
            © {year} {person.name}
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-mist-500/70">
            Gebaut mit React &amp; Tailwind · selbst gehostet auf dem eigenen Homeserver
          </p>
        </div>

        <div className="flex items-center gap-2">
          {links.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel={s.url.startsWith('http') ? 'noreferrer noopener' : undefined}
              aria-label={s.label}
              className="grid size-9 place-items-center rounded-lg text-mist-500 transition-colors hover:text-beam-300"
            >
              <SocialIcon id={s.id} size={16} />
            </a>
          ))}

          <a
            href="#top"
            aria-label="Zum Seitenanfang"
            className="ml-1 grid size-9 place-items-center rounded-lg border border-ink-700 text-mist-500 transition-all hover:-translate-y-0.5 hover:border-ink-600 hover:text-mist-200"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
