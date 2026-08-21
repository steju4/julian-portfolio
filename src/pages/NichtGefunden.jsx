import { ArrowLeft, Compass } from 'lucide-react'
import Backdrop from '../components/Backdrop'
import { person } from '../data/profile'

const ZIELE = [
  { href: '/#projekte', label: 'Projekte' },
  { href: '/#github', label: 'GitHub' },
  { href: '/#ueber-mich', label: 'Über mich' },
  { href: '/#kontakt', label: 'Kontakt' },
]

export default function NichtGefunden() {
  return (
    <>
      <Backdrop />

      <main className="flex min-h-svh items-center px-6 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-xl text-center">
          <span className="mb-8 inline-grid size-14 place-items-center rounded-2xl border border-ink-700 bg-ink-850/60 text-beam-300 backdrop-blur-sm">
            <Compass size={22} />
          </span>

          <p className="font-mono text-sm tracking-[0.3em] text-beam-400">404</p>

          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl">
            Diese Seite gibt es nicht
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-mist-400">
            Vermutlich ein alter Link oder ein Tippfehler in der Adresse. Von hier aus
            kommst du überall hin:
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {ZIELE.map((z) => (
              <a
                key={z.href}
                href={z.href}
                className="rounded-xl border border-ink-700 bg-ink-850/50 px-5 py-3 text-sm font-medium text-mist-300 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-beam-400/40 hover:text-mist-100"
              >
                {z.label}
              </a>
            ))}
          </div>

          <a
            href="/"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-135 from-beam-400 to-pulse-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-beam-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-beam-500/30 hover:brightness-110"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Zur Startseite von {person.name}
          </a>
        </div>
      </main>
    </>
  )
}
