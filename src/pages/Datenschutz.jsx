import Unterseite from './Unterseite'
import { Abschnitt, Liste } from './Textbausteine'
import { person } from '../data/profile'

/**
 * Datenschutzhinweis.
 *
 * Beschreibt genau das, was diese Seite technisch tatsächlich tut — nicht
 * mehr und nicht weniger. Wird an der Seite etwas geändert (etwa eine
 * Statistik ergänzt oder eine weitere externe Schnittstelle eingebunden),
 * muss dieser Text mitgeführt werden.
 */
export default function Datenschutz() {
  return (
    <Unterseite kicker="Datenschutz" titel="Wie diese Seite mit Daten umgeht">
      <p className="text-lg leading-relaxed text-mist-300">
        Kurz gefasst: Diese Seite setzt keine Cookies, bindet keine Werbung ein und misst
        keine Besucherzahlen. Personenbezogene Daten fallen nur dort an, wo sie technisch
        unvermeidbar sind — und genau das steht hier.
      </p>

      <Abschnitt titel="Verantwortlich">
        <p>
          {person.name}
          <br />
          {person.location}
        </p>
        <p>
          Kontakt per E-Mail. Die Adresse steht im Abschnitt{' '}
          <a href="/#kontakt" className="text-beam-300 underline-offset-4 hover:underline">
            Kontakt
          </a>{' '}
          auf der Startseite und wird dort nach einer kurzen Sicherheitsabfrage angezeigt —
          das schützt sie vor automatisierten Adresssammlern.
        </p>
      </Abschnitt>

      <Abschnitt titel="Server-Protokolle">
        <p>
          Die Seite läuft auf einem privat betriebenen Server in Deutschland. Beim Abruf
          erfasst die Webserver-Software technisch bedingt folgende Angaben:
        </p>
        <Liste
          punkte={[
            'IP-Adresse des anfragenden Geräts',
            'Zeitpunkt des Zugriffs',
            'aufgerufene Adresse und übertragene Datenmenge',
            'verwendeter Browser und dessen Version',
          ]}
        />
        <p>
          Diese Angaben sind nötig, damit die Seite ausgeliefert werden kann, und dienen
          darüber hinaus dazu, technische Störungen und Angriffsversuche zu erkennen.
          Rechtsgrundlage ist das berechtigte Interesse an einem sicheren und
          funktionsfähigen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Die Protokolle werden
          nicht mit anderen Daten zusammengeführt und nicht dauerhaft aufbewahrt.
        </p>
      </Abschnitt>

      <Abschnitt titel="Auslieferung über Cloudflare">
        <p>
          Der Server ist über einen Tunnel des Anbieters Cloudflare erreichbar. Jede
          Anfrage läuft daher über die Systeme der Cloudflare, Inc., 101 Townsend St., San
          Francisco, CA 94107, USA. Cloudflare verarbeitet dabei die IP-Adresse und
          technische Angaben zur Anfrage, um die Verbindung herzustellen und vor
          Angriffen zu schützen.
        </p>
        <p>
          Rechtsgrundlage ist das berechtigte Interesse an einer sicheren und erreichbaren
          Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO). Für die Übermittlung in die USA
          stützt sich Cloudflare auf Standardvertragsklauseln der Europäischen Kommission.
          Näheres in der{' '}
          <a
            href="https://www.cloudflare.com/de-de/privacypolicy/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-beam-300 underline-offset-4 hover:underline"
          >
            Datenschutzerklärung von Cloudflare
          </a>
          .
        </p>
      </Abschnitt>

      <Abschnitt titel="Abfrage der GitHub-Daten">
        <p>
          Der Abschnitt „GitHub" auf der Startseite zeigt aktuelle Zahlen zu meinen
          öffentlichen Projekten. Diese Zahlen werden <strong>direkt vom Browser der
          Besucherinnen und Besucher</strong> bei der öffentlichen Schnittstelle von GitHub
          abgerufen — nicht über meinen Server.
        </p>
        <p>
          Dabei erfährt die GitHub, Inc. (88 Colin P. Kelly Jr. Street, San Francisco, CA
          94107, USA), ein Unternehmen von Microsoft, die IP-Adresse und die technischen
          Angaben des Browsers. Ein Nutzerkonto ist dafür nicht erforderlich, und es werden
          keine Daten über die Besucher an GitHub übermittelt, die über die Anfrage selbst
          hinausgehen.
        </p>
        <p>
          Rechtsgrundlage ist das berechtigte Interesse an einer aktuellen und
          nachvollziehbaren Darstellung meiner Arbeit (Art. 6 Abs. 1 lit. f DSGVO).
          Einzelheiten in der{' '}
          <a
            href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noreferrer noopener"
            className="text-beam-300 underline-offset-4 hover:underline"
          >
            Datenschutzerklärung von GitHub
          </a>
          .
        </p>
        <p className="rounded-xl border border-ink-700 bg-ink-850/50 p-4">
          <strong className="text-mist-200">Wer das nicht möchte:</strong> Der Abruf findet
          ausschließlich in diesem einen Abschnitt statt. Wird JavaScript im Browser
          deaktiviert, unterbleibt er vollständig — die übrige Seite bleibt lesbar.
        </p>
      </Abschnitt>

      <Abschnitt titel="Speicher im Browser">
        <p>
          Damit die GitHub-Zahlen nicht bei jedem Seitenaufruf neu geladen werden müssen,
          legt die Seite das Ergebnis für 30 Minuten im lokalen Speicher des Browsers ab
          (<code className="font-mono text-xs text-mist-300">localStorage</code>).
        </p>
        <p>
          Das sind <strong>keine Cookies</strong>: Der Eintrag verbleibt ausschließlich auf
          dem Gerät, wird bei keinem Seitenaufruf an einen Server gesendet und enthält
          nichts über die Person, die die Seite besucht — nur die öffentlich abrufbaren
          Projektzahlen. Er lässt sich jederzeit über die Browsereinstellungen löschen.
        </p>
      </Abschnitt>

      <Abschnitt titel="Was diese Seite nicht tut">
        <Liste
          punkte={[
            'Keine Besucherstatistik, keine Reichweitenmessung, kein Tracking.',
            'Keine Cookies, die eine Einwilligung erfordern würden — deshalb gibt es hier auch kein Zustimmungsbanner.',
            'Keine Werbung und keine Weitergabe von Daten zu Werbezwecken.',
            'Keine eingebundenen Schriften, Karten, Videos oder Skripte von Dritten. Schriftarten liegen auf dem eigenen Server.',
            'Kein Kontaktformular, über das Eingaben übertragen würden.',
          ]}
        />
      </Abschnitt>

      <Abschnitt titel="Kontaktaufnahme per E-Mail">
        <p>
          Wer mir schreibt, übermittelt damit die Absenderadresse und den Inhalt der
          Nachricht. Diese Angaben verwende ich ausschließlich, um das Anliegen zu
          bearbeiten (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO), und bewahre sie nur so
          lange auf, wie es dafür nötig ist.
        </p>
      </Abschnitt>

      <Abschnitt titel="Rechte der betroffenen Personen">
        <p>Nach der Datenschutz-Grundverordnung besteht ein Recht auf:</p>
        <Liste
          punkte={[
            'Auskunft über die zur eigenen Person gespeicherten Daten (Art. 15 DSGVO)',
            'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
            'Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)',
            'Datenübertragbarkeit (Art. 20 DSGVO)',
            'Widerspruch gegen Verarbeitungen, die auf einem berechtigten Interesse beruhen (Art. 21 DSGVO)',
          ]}
        />
        <p>
          Außerdem besteht ein Beschwerderecht bei einer Aufsichtsbehörde. Zuständig ist
          der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
          Baden-Württemberg.
        </p>
      </Abschnitt>

      <Abschnitt titel="Änderungen">
        <p>
          Ändert sich etwas an der Seite, das die Verarbeitung von Daten betrifft, wird
          dieser Text entsprechend angepasst. Stand: August 2026.
        </p>
      </Abschnitt>
    </Unterseite>
  )
}
