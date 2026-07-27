# Releases

$mol wird **kontinuierlich** ausgeliefert. Statt nummerierte Versionen zu schneiden, wird das Framework direkt aus dem [mam_mol](https://github.com/hyoo-ru/mam_mol)-Monorepo ausgeliefert — jede gemergte Änderung ist sofort für alle verfügbar, die dagegen bauen. Das MAM-Build-Werkzeug holt immer die aktuellen Quellen, es gibt also keinen Upgrade-Schritt und keine Versionsmatrix abzugleichen.

## Änderungen verfolgen

- **Commit-Historie** — die [mam_mol-Commits](https://github.com/hyoo-ru/mam_mol/commits/master) sind das kanonische Änderungsprotokoll.
- **Historie pro Modul** — jeder Komponentenordner auf GitHub führt sein eigenes Commit-Log, sodass Sie nur die von Ihnen genutzten Teile beobachten können.
- **DEV-Community** — nennenswerte Ergänzungen und Beiträge werden unter dem [#mol-Tag](https://dev.to/t/mol) geteilt.

## Was das in der Praxis bedeutet

Da es keine brechenden Release-Grenzen gibt, bevorzugt das Framework eine rückwärtskompatible Evolution: Komponenten gewinnen Funktionen, ohne umbenannt zu werden, und die typisierten `view.tree`-Schnittstellen lassen Inkompatibilitäten zur Kompilierzeit statt zur Laufzeit auftauchen. Wenn ein Build nach einem Update nicht mehr kompiliert, weisen die TypeScript-Fehler Sie direkt auf das hin, was sich geändert hat.
