import { useGithub } from '../hooks'
import { relativeZeit, GITHUB_USER } from '../github'
import { GithubIcon } from './icons'

/**
 * Kleiner Hinweis im Einstiegsbereich mit der letzten echten GitHub-Aktivität.
 *
 * Bewusst zurückhaltend: Solange nichts geladen ist oder GitHub nicht
 * antwortet, verschwindet der Hinweis vollständig, statt eine leere Hülse
 * oder eine unbelegte Aussage stehen zu lassen.
 */
export default function GithubPuls() {
  const { daten, fehler } = useGithub()

  const zeitpunkt = daten?.aktivitaeten?.[0]?.zeit ?? daten?.zuletztAktualisiert
  const wann = relativeZeit(zeitpunkt)

  if (fehler && !wann) return null

  if (!wann) {
    // Platzhalter mit identischer Höhe, damit die Überschrift beim
    // Nachladen nicht springt.
    return <div aria-hidden="true" className="mb-6 h-[30px]" />
  }

  return (
    <a
      href={`https://github.com/${GITHUB_USER}`}
      target="_blank"
      rel="noreferrer noopener"
      className="group mb-6 inline-flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-850/60 px-3.5 py-1.5 font-mono text-xs tracking-wide text-mist-400 backdrop-blur-sm transition-colors duration-200 hover:border-beam-400/40 hover:text-mist-200"
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-beam-400 opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-beam-400" />
      </span>

      <GithubIcon size={12} className="text-mist-500 transition-colors group-hover:text-beam-300" />
      Zuletzt aktiv auf GitHub · {wann}
    </a>
  )
}
