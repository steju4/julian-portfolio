import { useReveal } from '../hooks'

/** Abschnitt mit Einblend-Animation und einheitlichem Abstand. */
export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

/** Kleine Überschrift mit Zähler, z. B. "01 — Über mich". */
export function SectionHeading({ index, kicker, title, lead }) {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mb-14 max-w-3xl`}>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-beam-400">
          {index}
        </span>
        <span className="h-px w-10 bg-linear-to-r from-beam-400/60 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
          {kicker}
        </span>
      </div>

      <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h2>

      {lead && (
        <p className="mt-5 text-base leading-relaxed text-mist-400 sm:text-lg">{lead}</p>
      )}
    </div>
  )
}

/** Wrapper, der seine Kinder beim Scrollen einblendet. */
export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

/** Technologie-Chip. */
export function Chip({ children }) {
  return (
    <span className="rounded-full border border-ink-700 bg-ink-800/60 px-3 py-1 font-mono text-[11px] tracking-wide text-mist-400 transition-colors duration-200 group-hover:border-ink-600 group-hover:text-mist-300">
      {children}
    </span>
  )
}
