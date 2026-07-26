# Routing

Routing in $mol ist keine separate Bibliothek — die URL ist nur ein weiteres Stück reaktiven Zustands. Lesen Sie sie, schreiben Sie sie, und Ansichten reagieren genauso, wie sie auf jede Zelle reagieren. Der Zurück-Button, Deep Links und teilbare URLs gibt es alle gratis.

## Die URL als Zustand

`$mol_state_arg` stellt URL-Parameter als reaktive Werte bereit. Binden Sie einen an eine Eigenschaft, und die Adressleiste wird zu Ihrer Quelle der Wahrheit:

```typescript
namespace $.$$ {
	export class $my_app extends $.$my_app {
		@ $mol_mem
		page( next?: string ) {
			return $mol_state_arg.value( 'page', next ) ?? 'home'
		}
	}
}
```

`page()` zu lesen gibt den aktuellen Wert zurück; `page('about')` aufzurufen navigiert. Alles, was `page()` liest, wird bei Änderung neu gerendert — einschließlich des Zurück-Buttons des Browsers, der die Zelle für Sie aktualisiert.

## Bildschirme wechseln

Kombinieren Sie einen gerouteten Wert mit einem einfachen `switch`, um zu wählen, was gerendert wird. Da Ansichten [faul](#!section=docs/page=rendering) sind, werden die Bildschirme, die Sie nicht zeigen, nie gebaut:

```typescript
@ $mol_mem
body_content() {
	switch ( this.page() ) {
		case 'about': return [ this.About() ]
		case 'docs': return [ this.Docs() ]
		default: return [ this.Home() ]
	}
}
```

## Links, die Argumente setzen

In `view.tree` kann ein Link URL-Argumente deklarativ setzen — ein Klick darauf navigiert ohne Handler:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` markiert sich auch als aktiv (`mol_link_current`), wenn seine Argumente mit der aktuellen URL übereinstimmen, sodass das Hervorheben der aktuellen Seite keinen zusätzlichen Zustand braucht.

## Mehrere Parameter

Argumente sind unabhängig, daher kann ein Bildschirm auf mehreren gleichzeitig routen. Genau diese Doku-Seite routet sowohl auf `section` als auch auf `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Jeder Schlüssel macht den Rundlauf durch die URL, daher ist jede Ansicht von Natur aus teilbar und als Lesezeichen speicherbar. Das Setzen eines Arguments lässt die anderen unberührt, was Deep Links — einen bestimmten Abschnitt *und* eine Seite *und* einen Anker — zu einer bloßen Frage des Setzens der Schlüssel macht, die Ihnen wichtig sind.

## Zustand, der nicht in die URL gehört

Nicht jedes Stück Zustand gehört in die Adressleiste. Für Werte, die lokal bestehen bleiben, aber Links nicht verschmutzen sollen — eine eingeklappte Seitenleiste, ein Entwurf — verwenden Sie `$mol_state_local`, das in `localStorage` mit derselben Getter/Setter-Form speichert:

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Greifen Sie zu `$mol_state_arg`, wenn der Zustand teilbar sein soll; zu `$mol_state_local`, wenn er lediglich gemerkt werden soll.

## Weiter

Sie haben behandelt, wie $mol Zustand in UI und URLs verwandelt. Sehen Sie, wie das alles effizient auf den Bildschirm gelangt, in [Rendering](#!section=docs/page=rendering).
