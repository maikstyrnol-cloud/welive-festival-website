# Markennutzung punchline studio – Umsetzung (Stand 02.10.2026)

Gilt nur für die **Live-Seiten** (welive-festival.com, film-und-ton.de). Nichts davon ist committet oder deployt.

## Was geändert wurde

**Marke als eine Einheit (Task 3)** – Die angemeldete Wort-/Bildmarke (rundes p-Zeichen über „punchline studio“) wird nur noch als unverändertes Gesamtbild eingebunden: kein Neu-Setzen des Wortteils in Systemschrift, keine Trennung, kein „®“-Zusatz, festes Seitenverhältnis 893:618.
- film-und-ton.de: `_worker.js` (Header) + Ende von `site.css`, Datei `punchline-marke-schwarz.webp` (Root).
- welive-festival.com: `index.html` (Header + Fuß), `assets/brand-mark.css`, `assets/punchline-marke-weiss.webp`.

**Premium Stream (Task 1) – entfernt am 20.10.2026.** Die Seite `/stream/` (Cloudflare-Stream-Player, nie mit einem Video bestückt) wurde auf Wunsch gelöscht, ebenso `assets/subpage.css` und der Cloudflare-Stream-Eintrag in der CSP. Damit entfällt auch der Stream als Nachweis für die Benutzung der Marke (Klasse 38) – bei Bedarf aus der Git-Historie wiederherstellen.

**Download (Task 2) – entfernt am 18.10.2026.** Formular `/download/`, Danke-Seite und `worker.js` wurden auf Wunsch gelöscht; die Seite läuft seitdem rein statisch (ohne Worker). Damit entfällt der Download als Nachweis für die Benutzung der Marke (Klasse 9) – bei Bedarf aus der Git-Historie wiederherstellen.

## Offene Punkte

1. ~~Stream~~ (entfernt, siehe oben).
2. ~~Download~~ (entfernt, siehe oben).
3. ~~film-und-ton.de: Header-Änderung deployen~~ (erledigt, live).
4. ~~`_to_delete/` aufräumen~~ (erledigt am 18.10.2026).

## Rechtlich zu beachten (keine Rechtsberatung)

- Rechtserhaltende Benutzung (§ 26 MarkenG) verlangt **ernsthafte** Benutzung für die eingetragenen Waren/Dienstleistungen. Ein Download, der nur als Nachweis existiert, und ein Stream ohne echtes Publikum können als Scheinbenutzung gewertet werden. Der Download sollte tatsächlich beworben und genutzt werden, der Stream tatsächlich Zuschauer haben; Nutzungsnachweise (Screenshots mit Datum, Abrufzahlen, Rechnungen) aufbewahren.
- Wegen der laufenden Auseinandersetzung mit Live Nation vorher mit der Anwältin abstimmen, welche Waren/Dienstleistungen (Klassen 9/38/41) ihr tatsächlich behalten wollt, bevor ihr die Nutzung dafür ausbaut.
- Newsletter-Anmeldung ist bewusst eine **separate, freiwillige** Checkbox, nicht Bedingung für den Download (Kopplungsverbot, Art. 7 Abs. 4 DSGVO); Bestätigung per Double-Opt-in im Newsletter-Tool.
