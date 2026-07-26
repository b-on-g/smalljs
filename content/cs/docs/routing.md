# Směrování

Směrování v $mol není samostatná knihovna — URL je jen další kus reaktivního stavu. Přečtěte ji, zapište ji a pohledy reagují stejně, jako reagují na jakoukoli buňku. Tlačítko zpět, hluboké odkazy i sdílitelné URL máte zdarma.

## URL jako stav

`$mol_state_arg` zpřístupňuje parametry URL jako reaktivní hodnoty. Navažte jeden na vlastnost a adresní řádek se stane vaším zdrojem pravdy:

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

Čtení `page()` vrací aktuální hodnotu; volání `page('about')` provede navigaci. Vše, co čte `page()`, se při změně překreslí — včetně tlačítka zpět v prohlížeči, které buňku aktualizuje za vás.

## Přepínání obrazovek

Zkombinujte směrovanou hodnotu s prostým `switch`, abyste vybrali, co se vykreslí. Protože jsou pohledy [líné](#!section=docs/page=rendering), obrazovky, které nezobrazíte, se nikdy nesestaví:

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

## Odkazy nastavující argumenty

Ve `view.tree` může odkaz nastavovat argumenty URL deklarativně — kliknutí na něj naviguje bez obslužné rutiny:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` se také označí jako aktivní (`mol_link_current`), když jeho argumenty odpovídají aktuální URL, takže zvýraznění aktuální stránky nepotřebuje žádný stav navíc.

## Více parametrů

Argumenty jsou nezávislé, takže obrazovka může směrovat na několik naráz. Právě tento web dokumentace směruje jak na `section`, tak na `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Každý klíč projde tam a zpět skrz URL, takže každý pohled je ze své podstaty sdílitelný a lze jej uložit do záložek. Nastavení jednoho argumentu nechá ostatní nedotčené, což z hlubokých odkazů — konkrétní sekce *a* stránka *a* kotva — dělá pouhou otázku nastavení klíčů, na kterých vám záleží.

## Stav, který nepatří do URL

Ne každý kus stavu patří do adresního řádku. Pro hodnoty, které mají přetrvat lokálně, ale neznečišťovat odkazy — sbalený postranní panel, koncept — použijte `$mol_state_local`, který ukládá do `localStorage` se stejným tvarem getteru/setteru:

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Sáhněte po `$mol_state_arg`, když má být stav sdílitelný; po `$mol_state_local`, když si jej stačí jen zapamatovat.

## Dále

Probrali jste, jak $mol proměňuje stav na UI a URL. Podívejte se, jak se to vše efektivně dostane na obrazovku, v [Vykreslování](#!section=docs/page=rendering).
