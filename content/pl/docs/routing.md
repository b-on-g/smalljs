# Routing

Routing w $mol nie jest osobną biblioteką — URL to po prostu kolejny kawałek reaktywnego stanu. Odczytaj go, zapisz, a widoki zareagują tak samo, jak reagują na dowolną komórkę. Przycisk wstecz, głębokie linki i udostępnialne adresy URL są za darmo.

## URL jako stan

`$mol_state_arg` udostępnia parametry URL jako wartości reaktywne. Powiąż jeden z właściwością, a pasek adresu stanie się twoim źródłem prawdy:

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

Odczyt `page()` zwraca bieżącą wartość; wywołanie `page('about')` nawiguje. Wszystko, co czyta `page()`, renderuje się ponownie przy zmianie — łącznie z przyciskiem wstecz przeglądarki, który aktualizuje komórkę za ciebie.

## Przełączanie ekranów

Połącz wartość z routingu ze zwykłym `switch`, aby wybrać, co się renderuje. Ponieważ widoki są [leniwe](#!section=docs/page=rendering), ekrany, których nie pokazujesz, nigdy nie są budowane:

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

## Linki ustawiające argumenty

W `view.tree` link może ustawiać argumenty URL deklaratywnie — kliknięcie go nawiguje bez handlera:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` sam oznacza się jako aktywny (`mol_link_current`), gdy jego argumenty pasują do bieżącego URL, więc podświetlenie bieżącej strony nie wymaga dodatkowego stanu.

## Wiele parametrów

Argumenty są niezależne, więc ekran może routować na kilku naraz. Ta właśnie strona dokumentacji routuje zarówno na `section`, jak i na `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Każdy klucz odbywa podróż w obie strony przez URL, więc każdy widok jest udostępnialny i możliwy do dodania do zakładek z założenia. Ustawienie jednego argumentu pozostawia pozostałe nietknięte, co sprawia, że głębokie linki — konkretna sekcja *i* strona *i* kotwica — to tylko kwestia ustawienia kluczy, na których ci zależy.

## Stan, który nie powinien być w URL

Nie każdy kawałek stanu należy do paska adresu. Dla wartości, które powinny utrzymywać się lokalnie, ale nie zaśmiecać linków — zwinięty pasek boczny, wersja robocza — użyj `$mol_state_local`, który zapisuje do `localStorage` z tym samym kształtem getter/setter:

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Sięgnij po `$mol_state_arg`, gdy stan powinien być udostępnialny; po `$mol_state_local`, gdy ma być jedynie zapamiętany.

## Dalej

Omówiłeś, jak $mol zamienia stan w UI i adresy URL. Zobacz, jak to wszystko trafia na ekran wydajnie w [Renderowanie](#!section=docs/page=rendering).
