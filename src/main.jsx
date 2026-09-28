import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
// Schriften lokal gebündelt – keine Requests an Drittanbieter (DSGVO)
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'

// Die Seite wird beim Bauen bereits zu HTML gerendert (siehe
// scripts/prerender.mjs). Der Browser übernimmt dieses HTML und hängt sich
// nur noch daran — statt alles zu verwerfen und neu aufzubauen.
const wurzel = document.getElementById('root')
// Im Entwicklungsserver fehlt data-seite, weil dort noch kein HTML vorgerendert
// wurde. Unterseiten trotzdem anhand des Pfads öffnen; im Produktions-Build
// bleibt die Kennung aus dem HTML maßgeblich für die Hydration.
const entwicklungsSeite = {
  '/impressum/': 'impressum',
  '/datenschutz/': 'datenschutz',
}[`${window.location.pathname.replace(/\/$/, '')}/`] || 'start'
const app = (
  <StrictMode>
    <App seite={wurzel.dataset.seite || entwicklungsSeite} />
  </StrictMode>
)

// Im Entwicklungsserver ist die Wurzel leer. Der Produktions-Build enthält
// dagegen das vorgerenderte HTML und wird ohne zweiten Aufbau hydriert.
if (wurzel.hasChildNodes()) {
  hydrateRoot(wurzel, app)
} else {
  createRoot(wurzel).render(app)
}
