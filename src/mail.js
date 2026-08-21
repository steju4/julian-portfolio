// ---------------------------------------------------------------------------
//  Schutz der E-Mail-Adresse
//
//  Die Adresse steht bewusst NICHT im Klartext im Quelltext der Seite. Sie
//  liegt verfremdet vor und wird erst zusammengesetzt, wenn jemand die
//  Sicherheitsabfrage im Kontaktbereich gelöst hat.
//
//  Einordnung: Das ist kein kryptografischer Schutz. Wer einen echten Browser
//  automatisiert und die Aufgabe löst, kommt an die Adresse. Es richtet sich
//  gegen die übliche Sorte Adresssammler, die schlicht den HTML-Quelltext nach
//  Mustern durchsucht — und die läuft hier ins Leere.
// ---------------------------------------------------------------------------

const SCHLUESSEL = 0x5c
const VERFREMDET = 'NikwNT0yci8oOTI7OTA5HDsxPTUwcj8zMQ=='

/** Setzt die Adresse zusammen. Wird erst nach bestandener Prüfung aufgerufen. */
export function adresseAufloesen() {
  const roh = atob(VERFREMDET)
  let ergebnis = ''
  for (let i = 0; i < roh.length; i += 1) {
    ergebnis += String.fromCharCode(roh.charCodeAt(i) ^ SCHLUESSEL)
  }
  return ergebnis
}

/**
 * Erzeugt eine einfache Rechenaufgabe.
 *
 * Bewusst als Text formuliert und nicht als Bild: Das bleibt mit Tastatur und
 * Screenreader bedienbar. Gegen Massenversender reicht es, weil die den
 * JavaScript-Teil der Seite gar nicht erst ausführen.
 */
export function aufgabeErzeugen() {
  const a = 2 + Math.floor(Math.random() * 8) // 2 … 9
  const b = 2 + Math.floor(Math.random() * 8)

  return {
    frage: `Wie viel ergibt ${a} plus ${b}?`,
    kurz: `${a} + ${b}`,
    pruefen: (eingabe) => Number.parseInt(String(eingabe).trim(), 10) === a + b,
  }
}
