import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { GithubIcon } from './icons'
import { projects } from '../data/profile'
import { Section, SectionHeading, Reveal, Chip } from './Primitives'

function StatusBadge({ status }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-beam-400/30 bg-beam-500/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-beam-300">
        <span className="size-1.5 rounded-full bg-beam-400" />
        Live
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full border border-ink-700 bg-ink-800/60 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-mist-500">
      Studium
    </span>
  )
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)
  const primary = project.links.find((l) => l.primary)
  const code = project.links.find((l) => l.url.includes('github.com'))
  const panelId = `projekt-details-${project.id}`

  return (
    <Reveal delay={(index % 2) * 90}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-850/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink-600 hover:shadow-2xl hover:shadow-ink-950/60">
        {/* Akzentlinie oben */}
        <span
          className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-beam-400/60 to-transparent transition-opacity duration-300 ${
            project.status === 'live' ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
          }`}
        />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist-500">
                  {project.kind}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-snug text-mist-100 sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <span className="shrink-0 font-mono text-[11px] text-mist-500">{project.year}</span>
          </div>

          <p className="text-sm leading-relaxed text-mist-400">{project.summary}</p>

          {/* Aufklappbare Details */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mist-500 transition-colors hover:text-beam-300"
          >
            {open ? 'Weniger' : 'Details'}
            <ChevronDown
              size={13}
              className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            id={panelId}
            className={`grid transition-all duration-400 ease-out ${
              open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <ul className="space-y-2.5 border-l border-ink-700 pl-4">
                {project.details.map((d, i) => (
                  <li key={i} className="text-sm leading-relaxed text-mist-400">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologien */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-ink-800 pt-5">
            {primary && (
              <a
                href={primary.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-beam-300 transition-colors hover:text-beam-400"
              >
                {primary.label}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}

            {code && code !== primary && (
              <a
                href={code.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-mist-500 transition-colors hover:text-mist-200"
              >
                <GithubIcon size={15} />
                Quellcode
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projekte">
      <SectionHeading
        index="01"
        kicker="Projekte"
        title="Was ich gebaut habe"
        lead="Von Webseiten, die täglich im Einsatz sind, bis zu neuronalen Netzen, die ich einmal komplett von Hand nachprogrammiert habe. Zuerst das, was live läuft."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 text-center">
          <a
            href="https://github.com/steju4"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850/50 px-6 py-3.5 text-sm font-semibold text-mist-300 backdrop-blur-sm transition-all duration-200 hover:border-ink-600 hover:text-mist-100"
          >
            <GithubIcon size={16} />
            Alle Repositories auf GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
