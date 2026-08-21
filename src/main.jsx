import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
// Schriften lokal gebündelt – keine Requests an Drittanbieter (DSGVO)
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'

// Die Seite wird beim Bauen bereits zu HTML gerendert (siehe
// scripts/prerender.mjs). Der Browser übernimmt dieses HTML und hängt sich
// nur noch daran — statt alles zu verwerfen und neu aufzubauen.
const wurzel = document.getElementById('root')

hydrateRoot(
  wurzel,
  <StrictMode>
    <App seite={wurzel.dataset.seite || 'start'} />
  </StrictMode>,
)
