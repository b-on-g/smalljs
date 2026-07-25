# Rendering

This chapter is about what happens between your reactive state changing and pixels updating on screen. You rarely have to think about it — but understanding the model explains why $mol code stays fast without special effort.

## No virtual DOM

$mol does not diff a virtual tree. Each view property is bound directly to the DOM node or attribute it controls, through the same reactive cells you already met in [State](#!section=docs/page=state). When a cell changes, only the exact bindings that read it re-run — not a subtree, not a component function, just the affected properties.

That means there is no reconciliation pass to optimize, no keys to hand-tune for a list diff, and no `memo`/`shouldComponentUpdate` to reach for. The dependency graph already knows the minimal set of updates.

## Components are lazy

A view is only constructed when something asks for it. A screen you never navigate to is never built; a tab you never open costs nothing. Because construction is on-demand and cached, composing large trees of components is cheap — the parts that aren't needed simply don't exist yet.

## Rendering is virtualized

$mol renders only what is inside the viewport. Components scrolled out of view are not kept as hidden DOM — they are not created at all, and are built the moment they scroll into range. This is an architectural property of the framework, not an opt-in feature or a special list component: any layout is virtualized, so a list of ten items and a list of ten thousand cost about the same to display.

The practical effect is that you write ordinary component trees and long lists without reaching for windowing libraries.

## Reproducible numbers

Performance claims are only useful if you can reproduce them. Rather than quote figures here, $mol participates in the community **js-framework-benchmark**; you can read its results and re-run the suite yourself:

<https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html>

Treat that as the source of truth for comparisons — measured, versioned, and independent of this page.

## Next

That completes the core model of how $mol runs. Next, put it to work loading real data in [Data Fetching](#!section=docs/page=data).
