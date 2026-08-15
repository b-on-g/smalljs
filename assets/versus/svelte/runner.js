/**
 * Svelte crash-test runner.
 *
 * Svelte is a compiler: a .svelte component is not runnable source, and nothing
 * here is prebuilt. The components below are compiled in the browser at load
 * time by the vendored compiler ( assets/versus/vendor/svelte-compiler.js, the
 * UMD bundle published on npm ), turned into blob-url modules and mounted. The
 * page stays static — no build step, no bundler artefact standing in for the
 * code the reader is shown.
 *
 * That is fair for these measurements: compiling happens while the page loads,
 * before `ready` is reported, and every measured window starts at the Run click.
 *
 * It does cost download weight, so the two vendored files should not be confused
 * with each other. svelte-compiler.js is 831 KB and exists only because this
 * page compiles at runtime; svelte-runtime.js is 104 KB, is the part a real
 * Svelte build ships, and had to be bundled once with esbuild because npm
 * publishes that runtime as a couple of hundred separate ES modules that no
 * browser can load on its own.
 *
 * Component sources are kept in template literals, and child components are
 * imported by relative path exactly as in a real project — the import specifier
 * is repointed at the compiled blob when the module is linked.
 */

import { mount, unmount, flushSync } from 'svelte'

const compiler = window.svelte

const NS = 'versus'
const CASE = new URLSearchParams( location.search ).get( 'case' ) || 'race'

const delay = ms => new Promise( done => setTimeout( done, ms ) )

function send( message ) {
	message.ns = NS
	parent.postMessage( message, '*' )
}

// The site's theme does not cross into a frame, so the page hands it over
// with a message. Applied by flipping an attribute rather than by reloading
// under a different query: a reload would throw away the result of a run
// already made, and the reader is free to switch themes after pressing Run.
function theme_apply( lights ) {
	document.documentElement.setAttribute( 'data-lights', lights === 'dark' ? 'dark' : 'light' )
}

// Thrown when the numbers would describe the browser's scheduler instead of
// the framework, so the run is dropped rather than reported.
function Invalid( reason ) {
	this.reason = reason
}

// Compiles every source in order and links each one against the modules already
// built, so `import Card from './Card.svelte'` resolves to the blob it produced.
// Plain .js files are passed through untouched, as a bundler would leave them.
async function build( files ) {

	const urls = {}
	const modules = {}

	for( const name of Object.keys( files ) ) {

		const source = files[ name ]

		let code = name.endsWith( '.svelte' )
			? compiler.compile( source, { name: name.slice( 0, -7 ), generate: 'client' } ).js.code
			: source

		for( const dep of Object.keys( urls ) ) {
			code = code.split( "'./" + dep + "'" ).join( "'" + urls[ dep ] + "'" )
		}

		urls[ name ] = URL.createObjectURL( new Blob( [ code ], { type: 'text/javascript' } ) )
		modules[ name ] = await import( urls[ name ] )
	}

	return modules
}

function click( selector ) {
	const node = document.querySelector( selector )
	if( !node ) throw new Error( 'No element matching ' + selector )
	node.click()
}

// No timer fallback on purpose: a background tab produces no frames at all,
// and a run that stalls here is ended by the visibility watch instead.
function next_frame() {
	return new Promise( done => requestAnimationFrame( () => done() ) )
}

async function scroll_to( box, from, to, duration ) {
	const start = performance.now()
	for( ;; ) {
		const part = Math.min( 1, ( performance.now() - start ) / duration )
		box.scrollTop = from + ( to - from ) * part
		if( part >= 1 ) return
		await next_frame()
	}
}

function heap_metrics() {
	const memory = performance.memory
	if( !memory ) return []
	return [ {
		name: 'Heap',
		value: Math.round( memory.usedJSHeapSize / 1048576 ),
		unit: 'MB',
	} ]
}


// ---------------------------------------------------------------- race
// versus:case race

// Idiomatic data loading: an effect reruns whenever the selected id changes and
// assigns whatever the request resolves with. Nothing cancels the request it
// replaces and nothing checks that the id is still the current one, so a slow
// earlier response still lands after a fast later one. The usual fix is a
// `let current = true` flag released from the effect's cleanup return, written
// by hand for every effect that loads something.

const RACE_SOURCE = `
<script>
	const users = [ 1, 2, 3, 4, 5 ].map( number => ( {
		id: number,
		name: 'User ' + number,
		about: 'Profile details for user ' + number + '.',
	} ) )

	function fetch_user( id ) {
		return new Promise( done => {
			setTimeout( () => done( users[ id - 1 ] ), 1000 - ( id - 1 ) * 200 )
		} )
	}

	let id = $state( null )
	let user = $state( null )
	let loading = $state( false )

	$effect( () => {
		if( id === null ) return
		loading = true
		fetch_user( id ).then( data => {
			user = data
			loading = false
		} )
	} )
</script>

<div class="row2">
	<div class="side">
		{#each users as item}
			<button
				class="item"
				class:item_current={ item.id === id }
				data-user={ item.id }
				onclick={ () => id = item.id }
			>{ item.name }</button>
		{/each}
	</div>
	<div class="main">
		{#if loading}
			<div class="muted">Loading…</div>
		{:else if user}
			<div class="title" data-panel="name">{ user.name }</div>
			<div class="muted">{ user.about }</div>
		{:else}
			<div class="muted">Pick a user</div>
		{/if}
	</div>
</div>
`

const race = {

	files: { 'Race.svelte': RACE_SOURCE },

	run: async () => {

		const started = performance.now()

		click( '[data-user="1"]' )
		await delay( 100 )
		click( '[data-user="5"]' )
		await delay( 1500 )

		// Clamped timers collapse both responses into one wake-up and destroy
		// the order the scenario is built on. Expected here is ~1600 ms.
		if( performance.now() - started > 2200 ) throw new Invalid( 'timers-throttled' )

		const panel = document.querySelector( '[data-panel="name"]' )
		const shown = panel ? panel.textContent : ''
		const number = shown.replace( /\D+/g, '' )

		return {
			status: number === '5' ? 'ok' : 'fail',
			observed: number
				? 'Selected user 5, panel shows user ' + number
				: 'Selected user 5, panel shows nothing',
			metrics: [],
		}
	},
}


// ------------------------------------------------------------- virtual
// versus:case virtual

// A plain {#each} over the whole data set, the way a list is written before its
// size becomes a problem. Every row sits in the DOM at once. Windowing is not
// part of Svelte and gets added later with a separate library such as
// svelte-virtual-list or TanStack Virtual, which also means giving up on
// natural row heights or measuring every row by hand.

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua '

const VIRTUAL_ROWS = ( () => {
	const rows = []
	for( let i = 0; i < 10000; ++i ) {
		const length = 20 + ( i * 37 ) % 400
		let text = ''
		while( text.length < length ) text += WORDS
		rows.push( text.slice( 0, length ) )
	}
	return rows
} )()

const VIRTUAL_SOURCE = `
<script>
	let rows = $state( [] )

	// Handle for the runner, which feeds the rows in when Run is pressed.
	export function load( next ) {
		rows = next
	}
</script>

<div class="scroll" data-role="scroll">
	{#if rows.length}
		{#each rows as text, index}
			<div class="line">{ '#' + ( index + 1 ) + ' ' + text }</div>
		{/each}
	{:else}
		<div class="hint muted">Press Run to load 10,000 rows</div>
	{/if}
</div>
`

const virtual = {

	files: { 'Virtual.svelte': VIRTUAL_SOURCE },

	run: async app => {

		const box = document.querySelector( '[data-role="scroll"]' )
		if( !box ) throw new Error( 'Scroll container is missing' )

		// Always start from the placeholder, so a repeated run times a real
		// render instead of a list that is already on screen.
		flushSync( () => app.load( [] ) )
		box.scrollTop = 0

		const started = performance.now()

		app.load( VIRTUAL_ROWS )

		await next_frame()
		await next_frame()

		// Reading scrollHeight forces the layout the rows just made necessary.
		const height = box.scrollHeight
		const render_time = Math.round( performance.now() - started )

		const middle = ( height - box.clientHeight ) / 2
		await scroll_to( box, 0, middle, 1000 )
		await scroll_to( box, middle, 0, 1000 )

		const nodes = box.querySelectorAll( '*' ).length

		return {
			status: nodes < 500 ? 'ok' : nodes > 5000 ? 'fail' : 'warn',
			observed: 'Rendered ' + nodes + ' DOM nodes for 10000 rows',
			metrics: [
				{ name: 'DOM nodes', value: nodes, unit: '' },
				{ name: 'Render time', value: render_time, unit: 'ms' },
			],
		}
	},
}


// ---------------------------------------------------------------- leak
// versus:case leak

// The effect subscribes on mount and returns nothing, so the subscription
// outlives the component that made it. The fix is
// `return () => store.unsubscribe( handler )` at the end of the effect, written
// by hand for every subscription and invisible when forgotten.

const LEAK_STORE_SOURCE = `
export const store = {

	value: 0,
	subscribers: [],

	subscribe( handler ) {
		this.subscribers.push( handler )
	},

	unsubscribe( handler ) {
		const index = this.subscribers.indexOf( handler )
		if( index >= 0 ) this.subscribers.splice( index, 1 )
	},

	set( value ) {
		this.value = value
		this.subscribers.forEach( handler => handler( value ) )
	},
}
`

const LEAK_WIDGET_SOURCE = `
<script>
	import { store } from './store.js'

	let value = $state( store.value )

	$effect( () => {
		store.subscribe( next => value = next )
	} )
</script>

<div>Widget sees store value { value }</div>
`

const LEAK_APP_SOURCE = `
<script>
	import Widget from './Widget.svelte'
	import { store } from './store.js'

	let shown = $state( false )
	let cycles = $state( 0 )
	let live = $state( store.subscribers.length )

	// Handles for the runner, which drives the mount cycles from outside.
	export function set_shown( next ) { shown = next }
	export function set_stats( next_cycles, next_live ) {
		cycles = next_cycles
		live = next_live
	}
</script>

<div class="column">
	<div class="stat">Mount cycles: { cycles }</div>
	<div class="stat">Live subscribers: { live }</div>
	<div class="slot">
		{#if shown}
			<Widget />
		{:else}
			<div class="muted">Widget not mounted</div>
		{/if}
	</div>
</div>
`

const leak = {

	files: {
		'store.js': LEAK_STORE_SOURCE,
		'Widget.svelte': LEAK_WIDGET_SOURCE,
		'App.svelte': LEAK_APP_SOURCE,
	},

	run: async ( app, modules ) => {

		const store = modules[ 'store.js' ].store

		// The store outlives the tree, so every run starts from a known zero.
		store.subscribers = []

		for( let i = 0; i < 100; ++i ) {
			flushSync( () => app.set_shown( true ) )
			flushSync( () => app.set_shown( false ) )
		}

		await delay( 50 )

		const live = store.subscribers.length

		flushSync( () => app.set_stats( 100, live ) )

		return {
			status: live === 0 ? 'ok' : 'fail',
			observed: '100 mount cycles left ' + live + ' live subscribers',
			metrics: [ { name: 'Live subscribers', value: live, unit: '' } ].concat( heap_metrics() ),
		}
	},
}


// --------------------------------------------------------------- crash
// versus:case crash

// No <svelte:boundary> anywhere, which is what an app looks like until someone
// adds one. The card reads fields off its item straight in the markup, so a
// null item throws while the list is being updated. The fix is a boundary with
// a failed snippet wrapped around every part that has to keep working on its
// own.

const CRASH_CARD_SOURCE = `
<script>
	let { item } = $props()
</script>

<div class="card">
	<div class="card_title">{ item.title }</div>
	<div class="card_text">{ item.text }</div>
</div>
`

const CRASH_APP_SOURCE = `
<script module>
	export function make_cards( broken ) {
		const cards = []
		for( let i = 1; i <= 20; ++i ) {
			cards.push( { id: i, title: 'Card ' + i, text: 'Details for card ' + i } )
		}
		if( broken ) cards[ 6 ] = null
		return cards
	}
</script>

<script>
	import Card from './Card.svelte'

	let items = $state( make_cards( false ) )

	// Handle for the runner, which swaps the data from outside.
	export function set_items( next ) { items = next }
</script>

<div class="cards" data-role="cards">
	{#each items as item}
		<Card { item } />
	{/each}
</div>
`

const crash = {

	files: {
		'Card.svelte': CRASH_CARD_SOURCE,
		'App.svelte': CRASH_APP_SOURCE,
	},

	run: async ( app, modules ) => {

		const broken = modules[ 'App.svelte' ].make_cards( true )

		muted = true
		try {
			flushSync( () => app.set_items( broken ) )
		} catch( error ) {
			// Svelte rethrows the error out of the flush that hit it.
		}

		await delay( 200 )
		muted = false

		const cards = host.querySelectorAll( '.card' )
		// Nothing renders this marker here — Svelte has no error placeholder
		// without a boundary. The check stays so all runners score the same way.
		const placeholder = !!host.querySelector( '[data-role="card-error"]' )
		// The seventh card can also stay in the DOM with the text it had before
		// the update, which is neither a survivor nor a placeholder.
		const seventh = cards[ 6 ]
		const stale = !!seventh && seventh.textContent.indexOf( 'Card 7' ) === 0

		return {
			status: cards.length === 0 ? 'fail' : cards.length === 19 && placeholder ? 'ok' : 'warn',
			observed: cards.length === 0
				? 'Card 7 threw during render, 0 of 20 cards remained'
				: cards.length + ' of 20 cards survived, card 7 '
					+ ( placeholder
						? 'was replaced by an error placeholder'
						: stale
							? 'kept the text it had before the update'
							: 'disappeared without a placeholder' ),
			metrics: [ { name: 'Surviving cards', value: cards.length, unit: '' } ],
		}
	},
}


// versus:end
// -------------------------------------------------------------- runner

const SCENARIOS = { race: race, virtual: virtual, leak: leak, crash: crash }

const host = document.getElementById( 'host' )

let scenario = null
let modules = null
let app = null
let running = false
let muted = false

function fresh_container() {
	host.innerHTML = ''
	const node = document.createElement( 'div' )
	node.className = 'app'
	host.appendChild( node )
	return node
}

async function boot() {

	scenario = SCENARIOS[ CASE ]

	if( !scenario ) {
		send( { type: 'error', message: 'Unknown case: ' + CASE } )
		return
	}

	if( app ) {
		muted = true
		try { unmount( app ) } catch( error ) {}
		muted = false
		app = null
	}

	// Compiled once and reused: a reset remounts the same modules, so the
	// compiler never runs between Run presses.
	if( !modules ) modules = await build( scenario.files )

	const names = Object.keys( scenario.files )
	const root = modules[ names[ names.length - 1 ] ]

	app = mount( root.default, { target: fresh_container() } )
	flushSync()

	send( { type: 'ready', case: CASE } )
}

// visibilityState rather than document.hidden: the two agree in every browser
// that follows the spec, and this one is also correct for the states that are
// not plain 'visible'. All runners check it the same way.
function tab_hidden() {
	return document.visibilityState !== 'visible'
}

// A hidden tab clamps timers to a common wake-up, and a frame scrolled out of
// the viewport stops getting frames at all. Both make the run say more about
// the browser than about the framework, so watch for them the whole way
// through and drop the run the moment either happens.
function run_watch() {

	let abort = null
	const alarm = new Promise( ( done, fail ) => { abort = fail } )

	const on_visibility = () => {
		if( tab_hidden() ) abort( new Invalid( 'tab-hidden' ) )
	}
	document.addEventListener( 'visibilitychange', on_visibility )

	// Inside an iframe this reports the intersection with the parent page's
	// viewport, so it fires when the reader scrolls the case out of sight.
	const observer = new IntersectionObserver( entries => {
		if( !entries[ entries.length - 1 ].isIntersecting ) abort( new Invalid( 'frame-offscreen' ) )
	} )
	observer.observe( document.documentElement )

	if( tab_hidden() ) abort( new Invalid( 'tab-hidden' ) )

	return {
		alarm: alarm,
		stop: () => {
			document.removeEventListener( 'visibilitychange', on_visibility )
			observer.disconnect()
		},
	}
}

async function start() {

	if( running || !scenario || !app ) return
	running = true

	const watch = run_watch()

	try {
		const result = await Promise.race( [ scenario.run( app, modules ), watch.alarm ] )
		send( {
			type: 'result',
			case: CASE,
			status: result.status,
			observed: result.observed,
			metrics: result.metrics || [],
		} )
	} catch( error ) {
		if( error instanceof Invalid ) send( { type: 'invalid', case: CASE, reason: error.reason } )
		else send( { type: 'error', message: error && error.message || String( error ) } )
	} finally {
		watch.stop()
		running = false
	}
}

window.addEventListener( 'message', event => {
	const data = event.data
	if( !data || data.ns !== NS ) return
	if( data.type === 'run' ) start()
	else if( data.type === 'reset' ) boot()
	else if( data.type === 'theme' ) theme_apply( data.lights )
} )

window.addEventListener( 'error', event => {
	if( muted ) return
	send( { type: 'error', message: String( event.message || event.error ) } )
} )

window.addEventListener( 'unhandledrejection', event => {
	if( muted ) return
	send( { type: 'error', message: String( event.reason ) } )
} )

// Standalone check: when the page is opened outside an iframe it gets its
// own Run button and prints the result to the console.
if( window.parent === window ) {
	window.addEventListener( 'message', event => {
		if( event.data && event.data.ns === NS ) console.log( event.data )
	} )
	const button = document.createElement( 'button' )
	button.className = 'standalone'
	button.textContent = 'Run'
	button.onclick = start
	document.body.appendChild( button )
}

boot()
