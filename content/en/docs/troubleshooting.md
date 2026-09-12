# Troubleshooting

Every entry on this page has the same shape: the build is green, the audit is clean, the console is quiet, and the screen is empty or not what you meant. The compiler cannot see these mistakes because each one is a valid program that happens to describe a different component. Find the heading that sounds like what you see; under it is the cause and the fix.

## My property override does nothing, no error

The name in `view.tree` and the name of the method in the class differ, most often by case: `exchange_form` in the tree, `exchangeForm` in the class. Those are two properties. The class one is never called, the tree one keeps its default, and nothing reports it.

Names are `snake_case` everywhere and must match letter for letter. After editing a `.view.ts`, check that every override still names an existing property; the generated `-view.tree/*.view.tree.d.ts` next to the tree is the list to compare against.

## I need a placeholder, disabled, or type on an input

These are properties of `$mol_string`: `hint` for the placeholder, `enabled` for the disabled state, `type` for the input type. Set them where the input is used:

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Any other property of any other component is found the same way: open its `.view.tree`, as [How to read the sources](#!section=docs/page=mental-model/Docs.Body=How%20to%20read%20the%20sources) shows. `attr *` is for real DOM attributes the component does not already model, and it has a trap of its own, described next.

## A button or input lost attributes it used to have

An `attr *` block without `^` as its first line replaces the whole attribute dictionary of the base component. A `$mol_button` written that way loses `disabled`, `role` and `tabindex`. Start the block with `^` to inherit, then add your keys:

```tree
attr *
	^
	data_kind \primary
```

## A word renders as separate letters

A string was passed where a list is expected, and the string was spread character by character. Strings start with `\`, lists start with `/`. The usual case is `sub`, which is a list:

```tree
sub / <= label \Hello
```

## The screen is empty, tests are green

An override fell out of the `.view.ts`. The tree gives every property a default, so when the class stops redefining `rows()`, TypeScript is satisfied and the list renders empty. Tests that only check the model stay green because the model is fine.

For every override the screen depends on, write a test that reads what the user sees: `rows()`, `sub()`, `title()` of the sub-views, or the DOM. [Testing](#!section=docs/page=testing) shows both.

## Data never loads, a component is stuck in loading state

A `@ $mol_mem` method returned a promise as its value, usually from `$mol_wire_async` or an `async` helper. A promise in the cell reads as "still computing" to everyone, and when it resolves the cell recomputes and produces a fresh promise. The network works; the view never sees a result.

A cell may suspend by calling `this.$.$mol_fetch.json()` and friends directly, and it may return a plain value. It must not return the promise itself. Put the result of asynchronous work in a separate state cell and have the effect return a flag or a key.

A second cause is a swallowed error: a `try`/`catch` inside a cell that catches the suspension along with real failures. Rethrow anything that is a `Promise`, or use `$mol_fail_catch`, which does that check for you.

## Circular subscription

A `@ $mol_mem` method wrote to another cell, or performed a side effect that ended up invalidating something it had read. Computations only read and return; writes, network, timers and DOM belong in `@ $mol_action` handlers. The other source of the same message is a `<=>` binding to a child combined with a method in the class that delegates to that same child, described next.

## Maximum call stack

Two shapes produce it. First, the tree has `tab? <=> tab?` on a child and the class has `tab() { return this.Head().tab() }`: the child asks the owner, the owner asks the child. Remove the `<=>` to the child you delegate to.

Second, a sub-view was retyped to your own class and the class calls `super` on a property listed in the tree. That `super` is not the base implementation but the stub the tree generated for the listed binding, and the stub delegates back to the owner. Delegate to the original implementation explicitly instead, see the retyping entry below.

## A value written with a capital letter cannot be overridden from TypeScript

`<= Label* \` generates a method named `Label`, and `label()` in the class is a different method. Sub-views are capitalized, values are lowercase, and the case in the tree decides the name of the generated method.

## Every row of a nested list shows the same item

A keyed sub-view inside another keyed sub-view does not receive its key. `Cell*0` inside `Row*0` renders with the key `0` in every row. Move the row into a component of its own and pass its data through properties, and key the outer view as `Row*`, not `Row*0`.

## I changed a sub-view's class and its content disappeared

Retyping `Pre* $mol_text_code` to `Pre* $my_code` drops the bindings the base tree declared for it, so they must be listed again. Listing `text <= pre_text* \` creates an empty stub that shadows the real `pre_text` of `$mol_text`. Delegate in the class instead of relying on `super`, which is that stub:

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## Methods from a base component's view.ts are missing on the subclass

`$my_child $my_base` in a tree extends the class generated from `base.view.tree`, not the class you wrote in `base.view.ts`. Methods defined there do not reach the child, and TypeScript reports them as missing. Logic shared by several views lives in a plain `.ts` file in `namespace $`, with no tree, the way `$mol_view` itself is written.

## A base component declared in the same view.tree file loses its behaviour

When a tree file declares both a base and a class that extends it, the base's `.view.ts` body is skipped for the child. Give a base that has a `.view.ts` a folder of its own.

## Styles leak between a sub-view and the component inside it

`Nav $my_app_nav` inside `$my_app` puts the same `my_app_nav` attribute on both the sub-view and the component, and one selector hits both. Name the sub-view something that does not repeat the tail of the class, such as `Nav_row`.

## A selector on a false attribute never matches

A boolean attribute set to `false` is removed from the element, so `[expanded="false"]` matches nothing. Conditional rendering is not a CSS job; override the sub-view factory and return `null` for the variant that has no such view.

## A style number changes nothing

Every number in `style *` gets `px` appended: `flexGrow 1` becomes `flex-grow: 1px`, which the browser discards. Write unitless values as strings, `flexGrow \1`.

## Two children of a scroll view lie on top of each other

`$mol_scroll` holds exactly one child. Wrap the children in a `$mol_view` or a `$mol_list` and give that to the scroll.

## minimal_height has no visible effect

`minimal_height` is a number the virtualized `$mol_list` uses to estimate rows before they render; it does not set a height. Height is set in the `.view.css.ts`.

## An embedded component pushes the page sideways

A view mounted inside a foreign layout does not shrink below its content by default. Give the root `minWidth: 0` in its styles so it can be squeezed like the surrounding elements.

## Third-party CSS does not style my component

A component without `dom_name` renders as an element named after its class, which is an unknown inline element to a CSS framework. Set the tag explicitly: `$mol_button` has none, so a button you want styled by outside CSS needs `dom_name \button`.

## Clicking a link to the current page clears the URL

A `$mol_link` with `arg *` toggles: on a page whose URL already matches, a click removes those keys. For a link that only navigates, subclass it with `uri_off <= uri`. To reload the same route on click, call `$mol_state_arg.value()` from a handler and `preventDefault` the event.

## My input handler runs on every render

A `prop?` you added to a subclass of `$mol_string` has the name of a property the base already uses: `enter`, `submit`, `hint`, `value`, `keyboard`. Compare your new names against the base tree before adding them.

## The error thrown from my value setter never shows

`$mol_string` catches an exception from `value?` and hands it to the input's `setCustomValidity`, so it appears only as native form validation. Report the error through a channel of your own, a status line or a message sub-view.

## A keyed handler binding is reported as missing

`event_click? <=> pick*? null` on a keyed sub-view does not generate a stub for `pick`. Declare it at the root of the tree yourself, `pick*? null`, and implement it in the class.

## The bundle contains a module I never use

The builder finds dependencies by scanning the source text for `$mol_name` tokens, and a token in a string literal or in a `/** */` doc comment counts as much as one in code. A name mentioned in a doc comment as an example pulls its whole module, and the failure shows up in a file you never touched. Write examples and notes without the `$` prefix, or name the folder instead.

## Next

Most of these come down to one rule: the name in the tree is the contract, and the compiler checks the types but not the names. [Mental model](#!section=docs/page=mental-model) explains why the tree is a list of overrides, and [Testing](#!section=docs/page=testing) shows the test that catches the silent ones.
