import { useId, useState } from 'react'
import { ArrowUpRight, Check, Copy, ShieldCheck } from 'lucide-react'
import { adresseAufloesen, aufgabeErzeugen } from '../mail'

/**
 * Gibt die E-Mail-Adresse erst nach einer kurzen Sicherheitsabfrage frei.
 * Vorher steht die Adresse weder im Quelltext noch im Seiteninhalt.
 */
export default function MailFreischalten() {
  const [aufgabe, setAufgabe] = useState(null)
  const [eingabe, setEingabe] = useState('')
  const [adresse, setAdresse] = useState(null)
  const [fehler, setFehler] = useState(false)
  const [kopiert, setKopiert] = useState(false)
  const feldId = useId()

  const starten = () => {
    setAufgabe(aufgabeErzeugen())
    setEingabe('')
    setFehler(false)
  }

  const absenden = (e) => {
    e.preventDefault()
    if (aufgabe?.pruefen(eingabe)) {
      setAdresse(adresseAufloesen())
      setAufgabe(null)
    } else {
      setFehler(true)
      setAufgabe(aufgabeErzeugen()) // neue Aufgabe, damit Raten nichts bringt
      setEingabe('')
    }
  }

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(adresse)
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    } catch {
      // Zwischenablage nicht verfügbar — die Adresse steht ja sichtbar da
    }
  }

  // --- Freigeschaltet ---
  if (adresse) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${adresse}`}
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
          onClick={kopieren}
          className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800/50 px-5 py-3.5 font-mono text-xs text-mist-300 transition-all duration-200 hover:border-ink-600 hover:text-mist-100"
        >
          {kopiert ? (
            <>
              <Check size={14} className="text-beam-400" />
              kopiert
            </>
          ) : (
            <>
              <Copy size={14} />
              {adresse}
            </>
          )}
        </button>
      </div>
    )
  }

  // --- Aufgabe läuft ---
  if (aufgabe) {
    return (
      <form onSubmit={absenden} className="max-w-md">
        <label htmlFor={feldId} className="block text-sm text-mist-300">
          {aufgabe.frage}
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            id={feldId}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={eingabe}
            onChange={(e) => setEingabe(e.target.value)}
            aria-invalid={fehler || undefined}
            aria-describedby={fehler ? `${feldId}-fehler` : undefined}
            autoFocus
            className={`w-24 rounded-xl border bg-ink-800/60 px-4 py-3 text-center font-mono text-sm text-mist-100 outline-none transition-colors ${
              fehler ? 'border-pulse-400/60' : 'border-ink-700 focus:border-beam-400/60'
            }`}
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-135 from-beam-400 to-pulse-500 px-5 py-3 text-sm font-semibold text-ink-950 transition-all duration-200 hover:brightness-110"
          >
            Bestätigen
          </button>
        </div>

        {fehler && (
          <p id={`${feldId}-fehler`} role="alert" className="mt-3 text-sm text-pulse-300">
            Das stimmt so nicht — hier ist eine neue Aufgabe.
          </p>
        )}
      </form>
    )
  }

  // --- Ausgangszustand ---
  return (
    <div>
      <button
        type="button"
        onClick={starten}
        className="group inline-flex items-center gap-2 rounded-xl bg-linear-135 from-beam-400 to-pulse-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-beam-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-beam-500/30 hover:brightness-110"
      >
        <ShieldCheck size={16} />
        E-Mail-Adresse anzeigen
      </button>

      <p className="mt-3 max-w-md text-xs leading-relaxed text-mist-500">
        Eine kurze Rechenaufgabe genügt. Die Adresse steht nicht im Quelltext der Seite —
        so finden sie automatische Adresssammler nicht.
      </p>
    </div>
  )
}
