import { about, facts } from '../data/profile'
import { Section, SectionHeading, Reveal } from './Primitives'

export default function About() {
  return (
    <Section id="ueber-mich">
      <SectionHeading index="02" kicker="Über mich" title={about.headline} />

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
    </Section>
  )
}
