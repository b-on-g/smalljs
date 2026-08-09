# Introduction

## What is $mol?

$mol is a reactive UI framework where you describe **what** the interface is, and the framework figures out **how** and **when** to update it. No virtual DOM, no manual subscriptions, no `useEffect`. You write components as a tree; $mol renders only what is visible and recomputes only what actually changed.

A component has three files:

- `name.view.tree` — the declarative layout (a compact tree language)
- `name.view.ts` — the behaviour (plain TypeScript classes)
- `name.view.css.ts` — typed styles (checked by the compiler)

That separation is the whole idea: layout stays readable, logic stays testable, styles stay type-safe.

None of the three is required on its own. The tree is a shorthand for structure you can also write by hand: [From TypeScript to view.tree](#!section=docs/page=from-ts-to-view-tree) builds one component both ways and shows the code the tree compiles to.

## Who is it for?

- You want a **small** app that stays small as it grows — the runtime is compact and rendering is virtualized by default.
- You like **types everywhere** — even styles are checked by TypeScript.
- You are tired of wiring reactivity by hand — state in $mol is automatically reactive, like a spreadsheet.

## A taste

A counter, in full:

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` is reactive: anything that reads it re-renders automatically when it changes. There is no `setState`, no dependency array, no store to register.

## Where to next?

Ready to run something on your own machine? Head to [Getting Started](#!section=docs/page=getting-started) and build a working app in under fifteen minutes.
