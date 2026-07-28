# Offline

Eine $mol-App kann ohne Netzwerk weiterlaufen — öffnen Sie sie einmal online, und sie bleibt nutzbar, nachdem Sie offline gehen, bis hin zur Installation als PWA. Das kommt von einem einzigen eingebauten Modul, `mol/offline/install`, und ist von jeder Datenschicht unabhängig.

## Was es tut

`mol/offline/install` führt `$mol_offline` aus, das einen **Service Worker** (`web.js`) als Caching-Proxy registriert. Jedes erfolgreiche `GET` einer statischen Ressource — das App-Bundle, Styles, Bilder — wird in einem Cache namens `$mol_offline` abgelegt. Bei einem späteren Laden liefert der Worker diese Antworten direkt aus dem Cache, sodass die App sofort öffnet und einen HTTP-Fehler oder eine abgebrochene Verbindung übersteht, indem sie auf die zwischengespeicherte Kopie zurückfällt. Weil die ganze App cachebar ist und so ausgeliefert wird, kann der Browser anbieten, sie **als PWA zu installieren**.

## Wie man es aktiviert

Fügen Sie eine Zeile in die `*.meta.tree` Ihrer App ein:

```tree
include \/mol/offline/install
```

Dieser erzwungene Include zieht das Modul ins Bundle, sodass sich sein Service Worker als Seiteneffekt registriert — kein anderer Code muss darauf verweisen. Wie `include` funktioniert, siehe [Modul-Metadaten](#!section=docs/page=meta).

Zwei Laufzeitanforderungen des Browsers:

- Über **HTTPS** ausliefern (oder `localhost` in der Entwicklung) — sonst laufen Service Worker nicht.
- Ein Web-App-Manifest bereitstellen, damit die App installierbar ist.

## Was es *nicht* ist

Offline-Caching hält *einen* Client ohne Netzwerk funktionsfähig. Es synchronisiert **keine** Daten zwischen Clients: Anfragen mit einem Query-String werden durchgereicht, und Nicht-`GET`-Anfragen werden nie zwischengespeichert. Wenn mehrere Clients oder Geräte dieselben live bearbeitbaren Daten teilen müssen — mit konfliktfreien Zusammenführungen — ist das eine andere Sache, die das separate Projekt [Giper Baza](#!section=docs/page=giper-baza) übernimmt.
