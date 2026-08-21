import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { person, socials } from '../data/profile'
import { SocialIcon } from './icons'
import Monogram from './Monogram'
import GithubPuls from './GithubPuls'

export default function Hero() {
  const links = socials.filter((s) => s.url)

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center px-6 pb-20 pt-32 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col-reverse items-start gap-14 md:flex-row md:items-center md:justify-between md:gap-16">
          {/* Text */}
          <div className="max-w-2xl">
            <GithubPuls />

            <h1 className="text-[2.75rem] leading-[1.05] font-extrabold sm:text-6xl lg:text-7xl">
              <span className="block text-mist-100">Hallo, ich bin</span>
              <span className="text-gradient mt-1 block">Julian.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-400 sm:text-xl">
              {person.role} an der{' '}
              <span className="font-medium text-mist-100">{person.university}</span>.{' '}
              {person.tagline}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs tracking-wide text-mist-500">
              <span className="inline-flex items-center gap-2">
                <MapPin size={13} className="shrink-0 text-beam-400" />
                {person.location}
              </span>
              <span aria-hidden="true" className="hidden text-ink-600 sm:inline">
                ·
              </span>
              <span>Kurs {person.course}</span>
            </p>

            {/* Aktionen */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projekte"
                className="group inline-flex items-center gap-2 rounded-xl bg-linear-135 from-beam-400 to-pulse-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-beam-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-beam-500/30 hover:brightness-110"
              >
                Projekte ansehen
                <ArrowDown
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>

              <a
                href="#kontakt"
                className="group inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850/50 px-6 py-3.5 text-sm font-semibold text-mist-200 backdrop-blur-sm transition-all duration-200 hover:border-ink-600 hover:bg-ink-800/70 hover:text-mist-100"
              >
                Kontakt aufnehmen
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Social-Links */}
            <div className="mt-10 flex items-center gap-2">
              {links.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel={s.url.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={s.label}
                  title={s.handle || s.label}
                  className="grid size-11 place-items-center rounded-xl border border-ink-700 bg-ink-850/50 text-mist-400 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-beam-400/50 hover:text-beam-300"
                >
                  <SocialIcon id={s.id} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Monogramm */}
          <div className="md:pr-6">
            <Monogram />
          </div>
        </div>

        {/* Scroll-Hinweis */}
        <a
          href="#projekte"
          className="animate-cue mt-20 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist-500 transition-colors hover:text-mist-300 md:inline-flex"
          aria-hidden="true"
          tabIndex={-1}
        >
          <ArrowDown size={13} />
          scrollen
        </a>
      </div>
    </section>
  )
}
