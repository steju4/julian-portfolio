import { ArrowLeft } from 'lucide-react'
import Backdrop from '../components/Backdrop'
import Footer from '../components/Footer'
import { person } from '../data/profile'

/** Schlichtes Gerüst für alles, was nicht die Startseite ist. */
export default function Unterseite({ titel, kicker, children }) {
  return (
    <>
      <Backdrop />

      <header className="border-b border-ink-800/80">
        <div className="mx-auto flex h-18 max-w-3xl items-center px-6 sm:px-8">
          <a href="/" className="group flex items-center gap-2.5" aria-label="Zur Startseite">
            <span className="grid size-8 place-items-center rounded-lg bg-linear-135 from-beam-400 to-pulse-500 font-mono text-xs font-bold text-ink-950">
              {person.initials}
            </span>
            <span className="font-semibold tracking-tight text-mist-100">{person.name}</span>
          </a>
        </div>
      </header>

      <main className="px-6 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <a
            href="/"
            className="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-mist-500 transition-colors hover:text-beam-300"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Zurück zur Startseite
          </a>

          {kicker && (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-beam-400">
              {kicker}
            </p>
          )}

          <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl">{titel}</h1>

          <div className="mt-10 space-y-8">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  )
}
