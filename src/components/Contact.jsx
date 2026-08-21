import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { contact, person, socials } from '../data/profile'
import { SocialIcon } from './icons'
import { Section, SectionHeading, Reveal } from './Primitives'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const links = socials.filter((s) => s.url && s.id !== 'mail')

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Zwischenablage nicht verfügbar — der mailto-Link bleibt als Weg bestehen
    }
  }

  return (
    <Section id="kontakt">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-850/60 p-8 backdrop-blur-sm sm:p-12 md:p-16">
          {/* Akzentschein */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-full bg-beam-500/12 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 size-72 rounded-full bg-pulse-500/12 blur-[100px]"
          />

          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs font-medium tracking-[0.2em] text-beam-400">
                06
              </span>
              <span className="h-px w-10 bg-linear-to-r from-beam-400/60 to-transparent" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
                Kontakt
              </span>
            </div>

            <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
              {contact.headline}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist-400 sm:text-lg">
              {contact.text}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${person.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-linear-135 from-beam-400 to-pulse-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-beam-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-beam-500/30 hover:brightness-110"
              >
                E-Mail schreiben
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <button
                type="button"
                onClick={copyMail}
                className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800/50 px-5 py-3.5 font-mono text-xs text-mist-400 transition-all duration-200 hover:border-ink-600 hover:text-mist-100"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-beam-400" />
                    kopiert
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    {person.email}
                  </>
                )}
              </button>
            </div>

            {links.length > 0 && (
              <div className="mt-10 border-t border-ink-800 pt-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
                  Auch hier zu finden
                </p>
                <div className="flex flex-wrap gap-3">
                  {links.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2.5 rounded-xl border border-ink-700 bg-ink-800/50 px-4 py-3 text-sm font-medium text-mist-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-beam-400/40 hover:text-mist-100"
                    >
                      <SocialIcon id={s.id} size={16} className="text-mist-500 transition-colors group-hover:text-beam-300" />
                      {s.label}
                      {s.handle && (
                        <span className="font-mono text-[11px] text-mist-500">{s.handle}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
