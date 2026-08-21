import { skillGroups } from '../data/profile'
import { SkillIcon } from './icons'
import { Section, SectionHeading, Reveal } from './Primitives'

export default function Skills() {
  return (
    <Section id="stack">
      <SectionHeading
        index="03"
        kicker="Stack"
        title="Womit ich arbeite"
        lead="Technologien, die ich in Studium, Praxisphasen und eigenen Projekten tatsächlich eingesetzt habe — nicht nur einmal ausprobiert."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={(i % 2) * 90}>
            <div className="group h-full rounded-2xl border border-ink-700 bg-ink-850/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-600 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-ink-700 bg-ink-800/70 text-beam-300 transition-colors duration-300 group-hover:border-beam-400/40">
                  <SkillIcon id={group.icon} size={18} />
                </span>
                <h3 className="text-lg font-bold text-mist-100">{group.title}</h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-ink-700 bg-ink-800/50 px-3 py-1.5 font-mono text-xs text-mist-400 transition-colors duration-200 hover:border-ink-600 hover:text-mist-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
