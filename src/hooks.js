import { useCallback, useEffect, useRef, useState } from 'react'
import { ladeGithub, letzterStand } from './github'

/**
 * Blendet ein Element ein, sobald es in den Viewport scrollt.
 * Fällt ohne IntersectionObserver auf "immer sichtbar" zurück.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, visible]
}

/** Markiert den aktuell sichtbaren Abschnitt für die Navigation. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids.join(',')])

  return active
}

/** true, sobald die Seite über einen Schwellwert gescrollt wurde. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/**
 * Lädt die GitHub-Daten und hält sie aktuell.
 *
 * Aktualisiert wird zurückhaltend: alle 5 Minuten, aber nur solange der Tab
 * sichtbar ist, und zusätzlich beim Zurückkehren auf den Tab. Das hält die
 * Zahlen aktuell, ohne das Anfragekontingent der GitHub-API zu verbrauchen.
 */
export function useGithub() {
  const [zustand, setZustand] = useState(() => {
    const bekannt = letzterStand()
    return { status: bekannt ? 'bereit' : 'laden', daten: bekannt, fehler: null }
  })

  const laden = useCallback(async (erzwingen = false) => {
    setZustand((z) => ({ ...z, status: z.daten ? 'aktualisiert' : 'laden' }))
    try {
      const daten = await ladeGithub({ erzwingen })
      setZustand({ status: 'bereit', daten, fehler: null })
    } catch (e) {
      // Der zuletzt bekannte Stand bleibt sichtbar — die Seite wird nicht leer.
      setZustand((z) => ({
        status: z.daten ? 'bereit' : 'fehler',
        daten: z.daten,
        fehler: e?.message === 'ratelimit' ? 'ratelimit' : 'netzwerk',
      }))
    }
  }, [])

  useEffect(() => {
    laden()

    const intervall = setInterval(() => {
      if (document.visibilityState === 'visible') laden()
    }, 5 * 60 * 1000)

    const beiSichtbar = () => {
      if (document.visibilityState === 'visible') laden()
    }
    document.addEventListener('visibilitychange', beiSichtbar)

    return () => {
      clearInterval(intervall)
      document.removeEventListener('visibilitychange', beiSichtbar)
    }
  }, [laden])

  return { ...zustand, neuLaden: () => laden(true) }
}
