import { person } from '../data/profile'

/** Monogramm-Avatar mit rotierendem Orbit-Ring. */
export default function Monogram({ size = 'lg' }) {
  const dim = size === 'lg' ? 'size-40 sm:size-48' : 'size-24'

  return (
    <div className={`relative ${dim} shrink-0`}>
      {/* Rotierender Ring */}
      <svg
        viewBox="0 0 200 200"
        className="animate-orbit absolute inset-0 size-full"
        aria-hidden="true"
      >
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
          strokeWidth="1.5"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="100" cy="6" r="4" fill="var(--color-beam-300)" />
      </svg>

      {/* Ruhender Innenring */}
      <div className="absolute inset-3 rounded-full border border-ink-700" />

      {/* Monogramm */}
      <div className="absolute inset-5 grid place-items-center rounded-full border border-ink-700 bg-linear-160 from-ink-850 to-ink-900 shadow-2xl shadow-beam-500/10">
        <span className="bg-linear-135 from-beam-300 to-pulse-300 bg-clip-text font-mono text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          {person.initials}
        </span>
      </div>

      {/* Weicher Schein */}
      <div className="absolute inset-6 -z-10 rounded-full bg-beam-500/20 blur-3xl" />
    </div>
  )
}
