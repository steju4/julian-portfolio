import Backdrop from './components/Backdrop'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Github from './components/Github'
import About from './components/About'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Datenschutz from './pages/Datenschutz'
import NichtGefunden from './pages/NichtGefunden'

function Startseite() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Github />
        <About />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

/**
 * Sehr kleiner Verteiler auf die drei Seiten.
 *
 * Welche Seite gemeint ist, steht als Attribut im vorgerenderten HTML
 * (`<div id="root" data-seite="…">`) — nicht in window.location. Das ist
 * wichtig für die 404-Seite: Die wird unter beliebigen Adressen ausgeliefert,
 * und aus dem Pfad allein ließe sie sich nicht erkennen. Server und Browser
 * kämen dann zu unterschiedlichen Ergebnissen und die Hydration bräche.
 */
export default function App({ seite = 'start' }) {
  if (seite === 'datenschutz') return <Datenschutz />
  if (seite === '404') return <NichtGefunden />
  return <Startseite />
}
