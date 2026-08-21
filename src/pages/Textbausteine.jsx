export function Abschnitt({ titel, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-mist-100 sm:text-2xl">{titel}</h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-mist-400">
        {children}
      </div>
    </section>
  )
}

export function Liste({ punkte }) {
  return (
    <ul className="space-y-2.5 border-l border-ink-700 pl-5">
      {punkte.map((p, i) => (
        <li key={i} className="text-[0.9375rem] leading-relaxed text-mist-400">
          {p}
        </li>
      ))}
    </ul>
  )
}
