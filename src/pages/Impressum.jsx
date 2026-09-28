import Unterseite from './Unterseite'
import { Abschnitt } from './Textbausteine'
import MailFreischalten from '../components/MailFreischalten'
import { person } from '../data/profile'

export default function Impressum() {
  return (
    <Unterseite kicker="Angaben zur Website" titel="Impressum">
      <Abschnitt titel="Anbieter">
        <p>
          {person.name}<br />
          {person.plz} {person.ort}
        </p>
      </Abschnitt>

      <Abschnitt titel="Kontakt">
        <MailFreischalten />
      </Abschnitt>
    </Unterseite>
  )
}
