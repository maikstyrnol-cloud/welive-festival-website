# Markennutzung punchline studio – Umsetzung (Stand 02.10.2026)

Gilt nur für die **Live-Seiten** (welive-festival.com, film-und-ton.de). Nichts davon ist committet oder deployt.

## Was geändert wurde

**Marke als eine Einheit (Task 3)** – Die angemeldete Wort-/Bildmarke (rundes p-Zeichen über „punchline studio“) wird nur noch als unverändertes Gesamtbild eingebunden: kein Neu-Setzen des Wortteils in Systemschrift, keine Trennung, kein „®“-Zusatz, festes Seitenverhältnis 893:618.
- film-und-ton.de: `_worker.js` (Header) + Ende von `site.css`, Datei `punchline-marke-schwarz.webp` (Root).
- welive-festival.com: `index.html` (Header + Fuß), `assets/brand-mark.css`, `assets/punchline-marke-weiss.webp`.

**Premium Stream (Task 1)** – `/stream/` mit Cloudflare-Stream-Player (iframe, kein Cloudflare-Logo, Farben WeLive-Rot) und Zeile „Technisches Web-Streaming bereitgestellt durch [Marke]“. Einen Tag `<cloudflare-stream>` gibt es nicht; Stream wird per iframe eingebettet. CSP in `_headers` ist erweitert.

**Download (Task 2) – entfernt am 18.10.2026.** Formular `/download/`, Danke-Seite und `worker.js` wurden auf Wunsch gelöscht; die Seite läuft seitdem rein statisch (ohne Worker). Damit entfällt der Download als Nachweis für die Benutzung der Marke (Klasse 9) – bei Bedarf aus der Git-Historie wiederherstellen.

## Noch zu tun, bevor es live geht

1. **Stream:** Video in Cloudflare Stream hochladen, in `stream/index.html` `CUSTOMER_CODE` und `VIDEO_ID` eintragen, `noindex` entfernen.
2. ~~Download~~ (entfernt, siehe oben).
3. Erst danach: Link „Premium Stream“ in Header/Footer der Startseite setzen und in `sitemap.xml` aufnehmen.
4. Datenschutzerklärung ergänzen (Cloudflare Stream).
5. film-und-ton.de: Header-Änderung prüfen (Preview), dann committen und deployen. Die EN-Seiten ziehen den Header aus demselben `_worker.js`.
6. Unbenutzte Dateien in `welive-festival-website/_to_delete/` löschen (konnten nicht automatisch entfernt werden).

## Rechtlich zu beachten (keine Rechtsberatung)

- Rechtserhaltende Benutzung (§ 26 MarkenG) verlangt **ernsthafte** Benutzung für die eingetragenen Waren/Dienstleistungen. Ein Download, der nur als Nachweis existiert, und ein Stream ohne echtes Publikum können als Scheinbenutzung gewertet werden. Der Download sollte tatsächlich beworben und genutzt werden, der Stream tatsächlich Zuschauer haben; Nutzungsnachweise (Screenshots mit Datum, Abrufzahlen, Rechnungen) aufbewahren.
- Wegen der laufenden Auseinandersetzung mit Live Nation vorher mit der Anwältin abstimmen, welche Waren/Dienstleistungen (Klassen 9/38/41) ihr tatsächlich behalten wollt, bevor ihr die Nutzung dafür ausbaut.
- Newsletter-Anmeldung ist bewusst eine **separate, freiwillige** Checkbox, nicht Bedingung für den Download (Kopplungsverbot, Art. 7 Abs. 4 DSGVO); Bestätigung per Double-Opt-in im Newsletter-Tool.
