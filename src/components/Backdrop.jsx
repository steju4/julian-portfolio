/** Dekorativer Hintergrund: Aurora-Verläufe über feinem Raster. */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />

      <div className="bg-grid mask-fade-b absolute inset-0 opacity-45" />

      <div className="animate-aurora absolute -left-40 -top-48 size-[36rem] rounded-full bg-beam-500/12 blur-[120px]" />
      <div
        className="animate-aurora absolute -right-32 top-24 size-[32rem] rounded-full bg-pulse-500/12 blur-[120px]"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-beam-400/8 blur-[130px]"
        style={{ animationDelay: '-16s' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[at_50%_0%] from-transparent to-ink-950/85" />
    </div>
  )
}
