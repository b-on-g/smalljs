#!/usr/bin/env node
// Generates content.ts from the .md sources in content/en/docs/.
//
// Why a generator: MAM's TS dependor (mol/build/build.node.ts) scans the whole
// source text for `$name` and `require(...)`/`import(...)` tokens and treats
// them as module deps. Example code embedded in docs (e.g. `$my_hello`,
// `require('moment')`) would become broken deps and fail the audit. So we embed
// each page as a JS string with `$` written `$` and `require(`/`import(`
// neutralized — invisible to the dependor, exact same text at runtime.
//
// Re-run after editing any .md or the manifest below:  node content/gen.cjs

const fs = require( 'fs' )
const path = require( 'path' )

const root = __dirname
const docs_dir = path.join( root, 'en', 'docs' )

// --- Manifest: sidebar order/groups + page metadata. Single source of layout.
const sections = [
	{
		id: 'docs',
		title: 'Docs',
		groups: [
			{ title: 'Getting Started', pages: [ 'introduction', 'getting-started' ] },
			{ title: 'Essentials', pages: [ 'installation', 'views', 'state', 'routing', 'rendering' ] },
			{ title: 'Data', pages: [ 'data', 'giper-baza' ] },
			{ title: 'More', pages: [ 'showcase', 'rosetta' ] },
			{ title: 'Advanced', pages: [ 'plugins', 'meta', 'ghost' ] },
			{ title: 'About', pages: [ 'faq', 'team', 'releases' ] },
		],
	},
]

// title + one-line summary (summary feeds llms.txt).
const meta = {
	'introduction': { title: 'Introduction', summary: 'What $mol is, who it is for, and a taste of reactive views.' },
	'getting-started': { title: 'Getting Started', summary: 'From an empty folder to a running, reactive $mol app in under 15 minutes.' },
	'installation': { title: 'Installation', summary: 'The MAM workspace, module layout, dev server, and production build.' },
	'views': { title: 'Views', summary: 'Declaring and composing components with the view.tree language.' },
	'state': { title: 'State & Reactivity', summary: 'Reactive properties, actions vs. computations, keyed and async state.' },
	'routing': { title: 'Routing', summary: 'The URL as reactive state: screens, links, and multiple parameters.' },
	'rendering': { title: 'Rendering', summary: 'No virtual DOM, lazy components, and virtualized rendering — plus reproducible benchmarks.' },
	'data': { title: 'Data Fetching', summary: 'Loading remote data with reactive async properties and loading states.' },
	'giper-baza': { title: 'Giper Baza', summary: 'Local-first data with automatic sync: entities, atoms, and CRUD.' },
	'showcase': { title: 'Showcase', summary: 'Real apps and tools built with $mol, from community platforms to devtools.' },
	'rosetta': { title: 'From React, Vue & Svelte', summary: 'A concept translation table for developers coming from other frameworks.' },
	'plugins': { title: 'Plugins', summary: 'Element-less components that attach behaviour (hotkeys, theme, navigation) to a host view.' },
	'meta': { title: 'Module metadata', summary: 'The meta.tree file: include, deploy, and pack directives for a module.' },
	'ghost': { title: 'Ghost views', summary: 'Node-less views that borrow another component\'s DOM element to mix in behaviour.' },
	'faq': { title: 'FAQ', summary: 'Common questions about $mol and smalljs: readiness, size, learning curve, and getting help.' },
	'team': { title: 'Team', summary: 'Who builds $mol and how to contribute to the open monorepo.' },
	'releases': { title: 'Releases', summary: 'How $mol is delivered continuously from the mam_mol monorepo, and how to follow changes.' },
}

// --- API reference autogen -----------------------------------------------------
// Parse each core component's generated .view.tree.d.ts (the typed API surface)
// and emit a reference page per component into the same content pipeline.
const repo = path.join( root, '..', '..', '..' )
const api_components = [
	{ klass: '$mol_view', src: 'view/view' },
	{ klass: '$mol_button_major', src: 'button/major' },
	{ klass: '$mol_button_minor', src: 'button/minor' },
	{ klass: '$mol_string', src: 'string' },
	{ klass: '$mol_number', src: 'number' },
	{ klass: '$mol_text', src: 'text/text' },
	{ klass: '$mol_paragraph', src: 'paragraph' },
	{ klass: '$mol_list', src: 'list' },
	{ klass: '$mol_row', src: 'row' },
	{ klass: '$mol_link', src: 'link' },
	{ klass: '$mol_check', src: 'check' },
	{ klass: '$mol_switch', src: 'switch' },
	{ klass: '$mol_select', src: 'select' },
	{ klass: '$mol_scroll', src: 'scroll' },
	{ klass: '$mol_page', src: 'page' },
	{ klass: '$mol_pick', src: 'pick' },
]

function parse_api_dts( src, klass ) {
	const base = src.split( '/' ).pop()
	const dts = path.join( repo, 'mol', src, '-view.tree', `${ base }.view.tree.d.ts` )
	let text
	try { text = fs.readFileSync( dts, 'utf8' ) } catch ( e ) { return null }
	const esc = klass.replace( /\$/g, '\\$' )
	const head = text.match( new RegExp( 'export class ' + esc + '\\s+extends\\s+(\\$[\\w$]+)\\s*\\{' ) )
	if ( !head ) return null
	const body_start = text.indexOf( '{', head.index )
	const body_end = text.indexOf( '\n\t}', body_start )
	const body = text.slice( body_start + 1, body_end < 0 ? undefined : body_end )
	const props = []
	for ( const line of body.split( '\n' ) ) {
		const m = line.match( /^\t\t(\w+)\(\s*(next\?[^)]*)?\)\s*:\s*(.+?)\s*$/ )
		if ( !m ) continue
		let type = m[ 3 ].replace( /;+\s*$/, '' ).trim()
		if ( type === 'any' ) continue // internal channel
		type = type.replace( /ReturnType<\s*\$[\w$]+\['(\w+)'\]\s*>/g, "as '$1'" )
		props.push( { name: m[ 1 ], settable: !!m[ 2 ], type } )
	}
	return { ext: head[ 1 ], props }
}

function api_markdown( klass, src, parsed ) {
	const gh = `https://github.com/hyoo-ru/mam_mol/tree/master/${ src }`
	let md = `# ${ klass }\n\n`
	md += `Extends \`${ parsed.ext }\`. [View source on GitHub](${ gh })\n\n`
	md += `This reference is generated from the component's typed \`.view.tree\` interface.\n\n`
	if ( !parsed.props.length ) {
		md += `## Properties\n\n${ klass } adds no new bindable properties of its own — see \`${ parsed.ext }\`.\n`
		return md
	}
	md += `## Properties\n\n| Property | Access | Type |\n|---|---|---|\n`
	for ( const p of parsed.props ) {
		const type = p.type.replace( /\|/g, '\\|' ).replace( /`/g, '' )
		md += `| \`${ p.name }\` | ${ p.settable ? 'read / write' : 'read' } | \`${ type }\` |\n`
	}
	return md
}

const api_group = { title: 'API', pages: [] }
let api_count = 0
for ( const comp of api_components ) {
	const parsed = parse_api_dts( comp.src, comp.klass )
	if ( !parsed ) continue
	const slug = 'api-' + comp.klass.replace( /^\$/, '' ).replace( /_/g, '-' )
	fs.writeFileSync( path.join( docs_dir, `${ slug }.md` ), api_markdown( comp.klass, comp.src, parsed ) )
	meta[ slug ] = { title: comp.klass, summary: `API reference for ${ comp.klass }.` }
	api_group.pages.push( slug )
	api_count++
}
if ( api_group.pages.length ) sections[ 0 ].groups.push( api_group )

const titles = Object.fromEntries( Object.entries( meta ).map( ( [ k, v ] ) => [ k, v.title ] ) )

const default_slug = 'introduction'

// Production base where the deploy step copies the raw .md endpoints + llms.txt.
const prod_base = 'https://b-on-g.github.io/smalljs'

// --- Embed a raw string so MAM's dependor never mistakes example code for deps.
function embed( text ) {
	return JSON.stringify( text )
		.replace( /\$/g, '\\u0024' )
		.replace( /\brequire\(/g, 'require\\u0028' )
		.replace( /\bimport\(/g, 'import\\u0028' )
}

const slugs = Object.keys( titles )

const page_entries = slugs.map( slug => {
	const file = `content/en/docs/${ slug }.md`
	const md = fs.readFileSync( path.join( docs_dir, `${ slug }.md` ), 'utf8' )
	return (
		`\t\t\t\t'${ slug }': {\n` +
		`\t\t\t\t\tslug: '${ slug }',\n` +
		`\t\t\t\t\ttitle: ${ JSON.stringify( titles[ slug ] ) },\n` +
		`\t\t\t\t\tfile: '${ file }',\n` +
		`\t\t\t\t\tmd: ${ embed( md ) },\n` +
		`\t\t\t\t},`
	)
} ).join( '\n' )

const out = `namespace $ {

	/**
	 * Docs content registry for smalljs. GENERATED by content/gen.cjs — do not
	 * edit by hand; edit the .md sources in content/en/docs/ and re-run the
	 * generator. Markdown is embedded (not fetched) so it bundles into web.js
	 * and works with the app/- deploy and the prerender step.
	 */

	export type $bog_smalljs_content_page = {
		slug: string
		title: string
		/** GitHub-relative path, for the Edit-on-GitHub link. */
		file: string
		md: string
	}

	export type $bog_smalljs_content_group = {
		title: string
		pages: readonly string[]
	}

	export type $bog_smalljs_content_section = {
		id: string
		title: string
		groups: readonly $bog_smalljs_content_group[]
	}

	export class $bog_smalljs_content extends $mol_object2 {

		static sections(): readonly $bog_smalljs_content_section[] {
			return ${ JSON.stringify( sections, null, '\t' ).replace( /\n/g, '\n\t\t\t' ) }
		}

		static pages(): Readonly< Record< string, $bog_smalljs_content_page > > {
			return {
${ page_entries }
			}
		}

		/** Flat ordered slug list for prev/next. */
		static order( section = 'docs' ): readonly string[] {
			const sec = this.sections().find( s => s.id === section )
			if ( !sec ) return []
			return sec.groups.flatMap( g => g.pages )
		}

		static page( slug: string ): $bog_smalljs_content_page | null {
			return this.pages()[ slug ] ?? null
		}

		static default_slug(): string {
			return '${ default_slug }'
		}

	}

}
`

fs.writeFileSync( path.join( root, 'content.ts' ), out )

// --- llms.txt (llmstxt.org) so Claude/Cursor can cite the docs. --------------
let llms = `# smalljs\n\n`
llms += `> Documentation for $mol — a reactive UI framework with typed views, automatic reactivity, and no virtual DOM. Each page below is available as raw Markdown at the linked URL.\n\n`
for ( const sec of sections ) {
	for ( const group of sec.groups ) {
		llms += `## ${ group.title }\n\n`
		for ( const slug of group.pages ) {
			llms += `- [${ meta[ slug ].title }](${ prod_base }/docs/${ slug }.md): ${ meta[ slug ].summary }\n`
		}
		llms += `\n`
	}
}
fs.writeFileSync( path.join( root, 'llms.txt' ), llms )

// --- Interactive course lessons ----------------------------------------------
// Authored inline (this file is .cjs, not scanned by MAM, so real $mol_* is fine);
// emitted escaped into lessons.ts. `expect` is a substring the finished source
// should contain — a simple, deterministic auto-check.
const lessons = [
	{
		id: 'hello',
		title: 'Hello World',
		expect: 'Hello',
		expect_in: 'tree',
		md: [
			'# Hello World',
			'',
			'Welcome! On the left is a live $mol editor — **view.tree** describes structure and the result renders on the right.',
			'',
			'Right now the component shows a placeholder. Change the text after the `\\` and watch the preview update instantly.',
			'',
			'**Goal:** make the greeting say hello to $mol.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Greeting $mol_view\n\t\t\tsub / <= greeting \\Edit me\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Greeting $mol_view\n\t\t\tsub / <= greeting \\Hello, $mol!\n',
		solution_ts: '',
	},
	{
		id: 'views',
		title: 'Views',
		expect: 'Subtitle',
		expect_in: 'tree',
		md: [
			'# Views',
			'',
			'A view is built from other views. Here `$my_demo` has one child; add a second so the card shows a title *and* a subtitle.',
			'',
			'**Goal:** add a `Subtitle` sub-view under `sub /`, with its own text.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Title $mol_view\n\t\t\tsub / <= title \\My component\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Title $mol_view\n\t\t\tsub / <= title \\My component\n\t\t<= Subtitle $mol_view\n\t\t\tsub / <= subtitle \\Built from views\n',
		solution_ts: '',
	},
	{
		id: 'state',
		title: 'State',
		expect: '$mol_mem',
		expect_in: 'ts',
		md: [
			'# State',
			'',
			'Logic lives in **view.ts** — switch to that tab. `@ $mol_mem` makes a value reactive: everything that reads it updates on its own.',
			'',
			'**Goal:** in view.ts, give the component a reactive `count()` and a `count_text()` that returns it as a string, so the preview shows a number.',
			'',
			'Stuck? Press **Solution**.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tcount_text \\?\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tcount_text \\?\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n',
		solution_ts: 'class $my_demo extends $.$my_demo {\n\t@ $mol_mem count( next?: number ) { return next ?? 5 }\n\tcount_text() { return String( this.count() ) }\n}\n',
	},
	{
		id: 'events',
		title: 'Events',
		expect: '$mol_action',
		expect_in: 'ts',
		md: [
			'# Events',
			'',
			'Interactivity comes from event handlers. The view.tree already wires the button\u2019s `click` to an `inc?` action — you implement `inc` in view.ts as a `@ $mol_action` that changes state.',
			'',
			'**Goal:** make the button increase the count on each click.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tcount_text \\0\n\tinc? null\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n\t\t<= Button $mol_button_major\n\t\t\tclick? <=> inc?\n\t\t\tsub / <= button_label \\+1\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tcount_text \\0\n\tinc? null\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n\t\t<= Button $mol_button_major\n\t\t\tclick? <=> inc?\n\t\t\tsub / <= button_label \\+1\n',
		solution_ts: 'class $my_demo extends $.$my_demo {\n\t@ $mol_mem count( next?: number ) { return next ?? 0 }\n\t@ $mol_action inc() { this.count( this.count() + 1 ) }\n\tcount_text() { return String( this.count() ) }\n}\n',
	},
	{
		id: 'routing',
		title: 'Routing',
		expect: '$mol_state_arg',
		expect_in: 'ts',
		md: [
			'# Routing',
			'',
			'The URL is just reactive state. `$mol_state_arg` reads and writes a query parameter, so a value survives reloads and is shareable.',
			'',
			'**Goal:** back the input with a URL argument named `name` in view.ts, and echo it below.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tname? \\\n\techo \\\n\tsub /\n\t\t<= Field $mol_string\n\t\t\tvalue? <=> name?\n\t\t\thint \\Type your name\n\t\t<= Echo $mol_view\n\t\t\tsub / <= echo\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tname? \\\n\techo \\\n\tsub /\n\t\t<= Field $mol_string\n\t\t\tvalue? <=> name?\n\t\t\thint \\Type your name\n\t\t<= Echo $mol_view\n\t\t\tsub / <= echo\n',
		solution_ts: 'class $my_demo extends $.$my_demo {\n\t@ $mol_mem name( next?: string ) { return $.$mol_state_arg.value( \'name\', next ) ?? \'\' }\n\techo() { return this.name() ? \'Hello, \' + this.name() + \'!\' : \'\' }\n}\n',
	},
]

const lesson_entries = lessons.map( l => (
	`\t\t\t\t'${ l.id }': {\n` +
	`\t\t\t\t\tid: '${ l.id }',\n` +
	`\t\t\t\t\ttitle: ${ JSON.stringify( l.title ) },\n` +
	`\t\t\t\t\texpect: ${ embed( l.expect ) },\n` +
	`\t\t\t\t\texpect_in: '${ l.expect_in }',\n` +
	`\t\t\t\t\tmd: ${ embed( l.md ) },\n` +
	`\t\t\t\t\tstart_tree: ${ embed( l.start_tree ) },\n` +
	`\t\t\t\t\tstart_ts: ${ embed( l.start_ts ) },\n` +
	`\t\t\t\t\tsolution_tree: ${ embed( l.solution_tree ) },\n` +
	`\t\t\t\t\tsolution_ts: ${ embed( l.solution_ts ) },\n` +
	`\t\t\t\t},`
) ).join( '\n' )

const lessons_ts = `namespace $ {

	/**
	 * Interactive course lessons. GENERATED by content/gen.cjs — edit the lessons
	 * array there and re-run the generator. Code snippets are embedded escaped so
	 * their $mol_* examples are not mistaken for module dependencies.
	 */

	export type $bog_smalljs_lesson = {
		id: string
		title: string
		/** Substring the finished source should contain (simple auto-check). */
		expect: string
		expect_in: 'tree' | 'ts'
		md: string
		start_tree: string
		start_ts: string
		solution_tree: string
		solution_ts: string
	}

	export class $bog_smalljs_lessons extends $mol_object2 {

		static all(): readonly $bog_smalljs_lesson[] {
			return [
${ lessons.map( l => `\t\t\t\tthis.lesson( '${ l.id }' )!` ).join( ',\n' ) },
			]
		}

		static ids(): readonly string[] {
			return [ ${ lessons.map( l => `'${ l.id }'` ).join( ', ' ) } ]
		}

		static map(): Readonly< Record< string, $bog_smalljs_lesson > > {
			return {
${ lesson_entries }
			}
		}

		static lesson( id: string ): $bog_smalljs_lesson | null {
			return this.map()[ id ] ?? null
		}

		static first(): string { return this.ids()[ 0 ] }

	}

}
`
// $bog_smalljs_lessons must live in a folder matching its name.
const lessons_dir = path.join( root, '..', 'lessons' )
fs.mkdirSync( lessons_dir, { recursive: true } )
fs.writeFileSync( path.join( lessons_dir, 'lessons.ts' ), lessons_ts )

console.log( `generated: content.ts (${ slugs.length } pages, incl. ${ api_count } API) + llms.txt + lessons.ts (${ lessons.length } lessons)` )
