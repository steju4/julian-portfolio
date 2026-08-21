import { about, facts } from '../data/profile'
import { Section, SectionHeading, Reveal } from './Primitives'

export default function About() {
  return (
    <Section id="ueber-mich">
      <SectionHeading index="03" kicker="Über mich" title={about.headline} />

      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-base leading-[1.75] text-mist-400 sm:text-[1.0625rem]">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="grid grid-cols-2 gap-3 lg:sticky lg:top-28">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-ink-700 bg-ink-850/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-ink-600"
              >
                <div className="bg-linear-135 from-beam-300 to-pulse-300 bg-clip-text font-mono text-2xl font-bold text-transparent sm:text-3xl">
                  {f.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-mist-500">{f.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Persönlicher Abschluss */}
      <div className="mt-16 border-t border-ink-800 pt-12">
        <Reveal>
          <h3 className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            {about.interessen.titel}
          </h3>
        </Reveal>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.interessen.punkte.map((punkt, i) => (
            <Reveal key={punkt.titel} delay={i * 70}>
              <div className="border-l border-ink-700 pl-4">
                <h4 className="text-[0.9375rem] font-semibold text-mist-100">{punkt.titel}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-400">{punkt.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
