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

export default function App() {
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
