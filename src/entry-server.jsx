import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/**
 * Rendert die Seite beim Bauen einmal zu HTML.
 *
 * Damit steht der komplette Inhalt schon im ausgelieferten Dokument — wichtig
 * für Suchmaschinen und vor allem für die KI-Crawler, die in der Regel kein
 * JavaScript ausführen und sonst eine leere Seite sehen würden.
 */
export function render() {
  return renderToString(<App />)
}
