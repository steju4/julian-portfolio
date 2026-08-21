import { timeline } from '../data/profile'
import { Section, SectionHeading, Reveal } from './Primitives'

export default function Timeline() {
  return (
    <Section id="werdegang">
      <SectionHeading index="05" kicker="Werdegang" title="Woher ich komme" />

      <div className="relative">
        {/* Vertikale Linie */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-linear-to-b from-beam-400/50 via-ink-700 to-transparent"
        />

        <ol className="space-y-10">
          {timeline.map((entry, i) => (
            <li key={i} className="relative pl-9">
              {/* Punkt */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border-2 ${
                  entry.current
                    ? 'border-beam-400 bg-ink-950'
                    : 'border-ink-600 bg-ink-900'
                }`}
              >
                {entry.current && (
                  <span className="size-[5px] rounded-full bg-beam-400" />
                )}
              </span>

              <Reveal delay={i * 90}>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-beam-400">
                    {entry.period}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-mist-100">{entry.title}</h3>

                  <p className="mt-1 text-sm font-medium text-mist-500">{entry.org}</p>

                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-mist-400">
                    {entry.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
