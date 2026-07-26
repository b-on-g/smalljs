# MAM view.tree generator bugs

Two bugs found in MAM's `.view.tree` → TypeScript generator while building this
site. Both surface as `TS2339 Property '…' does not exist on type '…'` at audit
time, and both concern **keyed** sub-components (`Name*`). Filed here so they can
be turned into issues on `hyoo-ru/mam_mol` (the generator lives in
`mol/build` + `mol/view/tree2`).

Toolchain: `$mol_tree2_from_string` → `$mol_view_tree2_to_js` → the emitted
`-view.tree/<name>.view.tree.js` + `.d.ts`.

---

## Bug 1 — keyed `<=>` event-handler target gets no stub on the base class

### Summary
For a **keyed** sub-component, an event binding `event_x? <=> handler*?` makes the
generated base class **call** `this.handler(id, next)` but does **not** emit a
declaration for `handler` on the base class. `<=` (value) bindings on the same
keyed sub-component *do* get base stubs; event `<=>` bindings do not. The `.d.ts`
then references `ReturnType< $comp['handler'] >`, which fails unless the app
author has declared `handler` somewhere the base can see.

### Minimal reproducer
```tree
$my_app $mol_view
	sub /
		<= List $mol_list
			rows <= rows /
	Row* $mol_link
		arg <= row_arg* *
		event_click? <=> pick*?
		sub / <= row_title* \
```
`row_arg` and `row_title` (both `<=`) get base stubs. `pick` (the `<=>` event)
does not.

### Expected
The base class declares an overridable `pick( id: string, next?: … ): …` stub,
exactly as it does for the non-keyed form `event_click? <=> pick?`.

### Actual
Generated `-view.tree/<name>.view.tree.js` (real output from this repo's
`search/`):
```js
(obj.arg)         = () => ((this.result_arg(id)));      // result_arg: base stub exists
(obj.event_click) = (next) => ((this.pick(id, next)));  // pick: CALLED, but never declared
(obj.attr)        = () => ({ ..., "bog_smalljs_search_current": (this.result_current(id)) });
```
Generated `.d.ts`:
```ts
type $mol_link__event_click_bog_smalljs_search_14 = $mol_type_enforce<
	ReturnType< $bog_smalljs_search['pick'] >,   // ← 'pick' not on base type
	ReturnType< $mol_link['event_click'] >
>
```
Audit error:
```
search.view.tree.d.ts(77,35): error TS2339: Property 'pick'
does not exist on type '$bog_smalljs_search'.
```
Note the non-keyed original (`event_click? <=> pick?`) compiled fine, because the
old root-level prop `pick? null` had produced a base stub — remove that
declaration / switch to keyed and the bug appears.

### Workaround (used here)
Declare the keyed handler as a root prop so the base gets a stub:
```tree
$bog_smalljs_search $mol_view
	pick*? null      # forces the base declaration
	…
	Result* $mol_link
		event_click? <=> pick*?
```
Then override in `.view.ts` with `@$mol_action pick( id, event? ) { … }`.

### Likely fix location
The emitter that walks sub-component bindings (`$mol_view_tree2_to_js`): the
branch that declares base members for `<=` bindings needs the same
declaration pass for `<=>`/`?` event bindings on keyed sub-components. Non-keyed
event bindings already declare; keyed ones only emit the call site.

---

## Bug 2 — last keyed `<=` binding on a keyed sub-component missing from the base type

### Summary
Observed during the API-reference autogen (Sprint 6). When a keyed sub-component
carries several `<=` bindings, the **last** one is sometimes not written into the
base class type, producing the same `TS2339 … does not exist` at audit — even
though the identical earlier bindings resolve.

### Symptom
```
… .view.tree.d.ts(NN,MM): error TS2339: Property '<lastKeyedProp>'
does not exist on type '$<component>'.
```
The property is referenced by the generated `$mol_type_enforce<…>` alias for the
last keyed binding but never declared on the base class.

### Workaround (used in Sprint 6)
Give the affected keyed prop an explicit default declaration and override it,
i.e. declare `prop* <default>` (or the root-level `prop*? …`) so the base stub is
generated, then `override` in `.view.ts`.

### Status / needs
This one still needs a **reduced** reproducer extracted from the API components
(`content/gen.cjs` emits `api-*.md`; the failing component was one of the 15 core
`.view.tree.d.ts` parses). It smells like the same root cause as Bug 1 — the
base-declaration pass dropping the final entry of a keyed sub-component's binding
list — so fixing Bug 1's emitter branch may resolve both. Worth confirming with a
minimal case before filing.

---

## For both

- Environment: `mam` from `hyoo-ru/mam`, `$mol_build` audit (`app/-/web.audit.js`).
- Blast radius: any app using keyed sub-components (`Name*`) with event handlers
  or multiple value bindings — i.e. most non-trivial lists.
- Neither is a runtime bug; the generated `.js` is correct. Only the emitted
  `.d.ts` type surface is incomplete, so it's caught by the audit's `tsc` pass.
