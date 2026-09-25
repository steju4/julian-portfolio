import { useRef } from 'react'
import { person } from '../data/profile'

/** Interaktiver Systemkern mit mehreren Orbits und technischem Kontext. */
export default function Monogram({ size = 'lg' }) {
  const coreRef = useRef(null)
  const dim = size === 'lg' ? 'size-56 sm:size-72 lg:size-80' : 'size-24'

  const bewegen = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return

    const node = coreRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * 8
    const rotateY = (x - 0.5) * 8

    node.style.cssText = `--core-x:${x * 100}%;--core-y:${y * 100}%;--core-rx:${rotateX}deg;--core-ry:${rotateY}deg`
  }

  const zuruecksetzen = () => {
    if (coreRef.current) coreRef.current.style.cssText = ''
  }

  return (
    <div
      ref={coreRef}
      onPointerMove={bewegen}
      onPointerLeave={zuruecksetzen}
      className={`system-core group relative ${dim} shrink-0 select-none`}
      aria-hidden="true"
    >
      <div className="system-core-glow absolute -inset-16 -z-10 rounded-full opacity-70 blur-3xl" />

      {/* Technische Verbindungslinien */}
      <svg viewBox="0 0 320 320" className="absolute inset-0 size-full overflow-visible opacity-50">
        <path d="M160 18 L160 56 M264 80 L230 103 M273 220 L235 198 M55 232 L88 207" />
        <circle cx="160" cy="18" r="3" />
        <circle cx="264" cy="80" r="3" />
        <circle cx="273" cy="220" r="3" />
        <circle cx="55" cy="232" r="3" />
      </svg>

      {/* Äußerer Orbit */}
      <div className="animate-orbit absolute inset-0">
        <svg viewBox="0 0 200 200" className="size-full">
          <defs>
            <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-beam-400)" />
              <stop offset="55%" stopColor="var(--color-pulse-400)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="url(#orbit-grad)"
            strokeWidth="1.25"
            strokeDasharray="8 6"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="100" cy="6" r="3.25" fill="var(--color-beam-300)" />
        </svg>
      </div>

      {/* Gegenläufiger innerer Orbit */}
      <div className="animate-orbit-reverse absolute inset-[10%]">
        <svg viewBox="0 0 200 200" className="size-full">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="var(--color-ink-600)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
          <circle cx="192" cy="100" r="3" fill="var(--color-pulse-300)" />
        </svg>
      </div>

      <div className="absolute inset-[18%] rounded-full border border-ink-700/80 bg-ink-900/30 backdrop-blur-sm" />

      {/* Kern */}
      <div
        className="absolute inset-[25%] grid place-items-center rounded-full border border-ink-700 bg-linear-160 from-ink-850 to-ink-950 shadow-2xl shadow-beam-500/15"
      >
        <div className="text-center">
          <span className="block bg-linear-135 from-beam-300 to-pulse-300 bg-clip-text font-mono text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            {person.initials}
          </span>
          <span className="mt-2 block font-mono text-[7px] uppercase tracking-[0.24em] text-mist-500 sm:text-[8px]">
            System online
          </span>
        </div>
      </div>

      {/* Kontextpunkte erscheinen beim Hover */}
      <span className="system-core-label left-[2%] top-[17%]">Web</span>
      <span className="system-core-label right-[-2%] top-[27%]">KI</span>
      <span className="system-core-label bottom-[15%] left-[5%]">Linux</span>
      <span className="system-core-label bottom-[8%] right-[-4%]">Self-hosted</span>
    </div>
  )
}
