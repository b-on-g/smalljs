# Testing

A $mol view is a function of its state, and that changes what a test looks like. A user scenario is written as calls to the view's own methods: set the draft, run the action, read what the user would see.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

No selectors, no browser, no Playwright or Cypress, no waiting for anything. The same file also gives you:

- **Speed.** Tests run in Node in milliseconds; a thousand of them take about a minute. `node my/hello/-/node.test.js` runs the ones for a module.
- **Zero setup.** A `hello.test.ts` next to the component is picked up by the builder and compiled into `-/node.test.js`. Continuous integration with `mam_build` runs it and fails the build when a test fails.
- **Service substitution through the context.** Every test gets its own `$`, and everything a component reaches through `this.$.X` is swapped by assigning a test double to that `$`. That is the reason to write `this.$.$mol_fetch` rather than `$mol_fetch`: the first one is replaceable, the second one is not.
- **Mocked time.** Timers created through the context do not tick on their own; `$mol_after_mock_warp()` runs whatever is queued.
- **A real DOM when you need one.** The Node bundle carries jsdom, so `dom_node()` and `querySelectorAll` work in the same test file.

## A scenario through view methods

Take the todo list from the [Cookbook](#!section=docs/page=cookbook): a `draft?` string, an `items` list, an `add` action and a `delete` action. Its test lives in `my/todo/todo.test.ts`:

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

A few things to notice:

- The test file uses `namespace $`, not `$.$$`. The context `$` comes in as the argument, fresh for every test, and the component is created with `Klass.make({ $ })` so it reads services from that context.
- A click is a call to the handler. `app.add()` is what the button does; `app.Add().click( event )` goes through the same path when you want to include the binding.
- Assert what the user sees: `items()`, `item_rows()`, `sub()`, the `title()` of a sub-view. A model checked through the screen also catches an override that fell out of the class, which a test of the model alone would not.
- `$mol_assert_equal` compares by identity, `$mol_assert_like` compares structure, `$mol_assert_fail( ()=> ..., 'message' )` expects a throw.
- The test name is the description. There are no comments in the body.

## Mocking a service

Each test receives a fresh context derived from the global one. Assign a subclass to a service on that `$` before creating the component, and every `this.$.X` inside the component resolves to the replacement. Here is the fetch double for the `$my_users` component from [Data Fetching](#!section=docs/page=data):

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

`users()` in the component calls `this.$.$mol_fetch.json( ... )`, so the request goes to the mock and the value is available synchronously, no waiting involved. Had the component called `$mol_fetch.json( ... )` on the global, the mock would not have been consulted. The built-in mocks already replace global `fetch` and `XMLHttpRequest` on the context with proxies that throw, so a request that slips past the context fails loudly instead of touching the network.

The same pattern covers `$mol_state_arg` for the URL, `$mol_state_local` for storage, and anything else your component takes from `this.$`.

There is also `$mol_test_mocks`, a list of functions that run against the context before every test in the bundle, including tests of other modules. It is the place for rules that hold everywhere, the way the framework registers its own mocks: a storage double that keeps whatever it is given, a locale that returns an empty dictionary, the network ban above. Fixture data for one component does not belong there.

## Time

The framework's own tests register mocks for `$mol_after_timeout`, `$mol_after_frame` and their relatives, and those mocks are in your bundle too. A timer created through `new this.$.$mol_after_timeout( ms, task )` is queued instead of scheduled, and `$mol_after_mock_warp()` runs the queue. Given a toast that hides itself:

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

the test moves time by hand:

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

A bare `setTimeout` in a view is not mocked and outlives the test; it is one of the reasons to create timers through the context.

## Through the DOM

In the Node bundle `$mol_dom_context` is a jsdom window, so a view renders into real elements. Use it when the check is about markup rather than state:

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()` creates the element, `dom_tree()` renders the subtree, and `destructor()` releases the view so its cells do not outlive the test. The attribute a sub-view gets from its name, `[my_greeter_hello]` here, is the selector when you prefer `querySelector` over calling the sub-view.

jsdom lacks two globals that input fields and gestures reach for, `ShadowRoot` and `PointerEvent`. A `$mol_string` rendered without them logs a `ReferenceError` and stays empty while the rest of the tree renders. Borrow them from the jsdom window; this is a data-free rule for every test, so it goes into `$mol_test_mocks`:

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## What a Node test does not cover

Geometry and styling. Whether two blocks line up, whether a panel overflows the screen, whether the dark theme reads well: none of that exists in jsdom. For layout you touched, open the module's `-/test.html` in a browser, which mounts the app and runs the same tests there, and look.

## Practical notes

- **Silence is a failure.** A test that failed an assertion and a test that hung look the same: no output and a process that stays alive. Look for `All tests passed` at the end; if it is missing, check the last assertion first. An `async` test is limited to one second.
- **Break one on purpose.** When a run prints nothing, flip an assertion and confirm the failure shows. A test suite that cannot fail is not measuring anything.
- **Do not assert localized strings.** Values marked `@` in the tree are resolved through the locale, which warms up again in every fresh context. Assert structure, not the text of a label.

## Next

[Troubleshooting](#!section=docs/page=troubleshooting) lists the mistakes that keep tests green and screens empty, and [Data Fetching](#!section=docs/page=data) shows the component the mock above was written for.
