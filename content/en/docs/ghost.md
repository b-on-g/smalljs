# Ghost views

`$mol_ghost` is a **node-less** view. Instead of creating its own DOM element, it borrows the element of its `Sub()` and mixes its own attributes, styles, and behaviour onto it. In one line from the source: *"mixin view logic to DOM node of another component."*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

A normal `$mol_view` renders its own element. A ghost renders **none** — it reuses the child's element, so nothing extra is added to the DOM tree.

## When to reach for it

Use a ghost when you want to attach behaviour to an existing component *without* wrapping it in another element — dragging, dropping, follow-on-scroll, transitions. Several framework components are built on it:

- **`$mol_drag`** / **`$mol_drop`** — pointer drag-and-drop
- **`$mol_transit`** — enter/leave transitions
- **`$mol_follower`** — keep an element aligned to another as it scrolls
- **`$mol_book_page`** — a page inside `$mol_book2` navigation

## Relation to plugins

`$mol_plugin` — the base every [plugin](#!section=docs/page=plugins) extends — is element-less for the same reason: it augments the host's element rather than adding one. A ghost is the general form (wrap one child and take over its node); a plugin is the specialised form you list under `plugins /`.
