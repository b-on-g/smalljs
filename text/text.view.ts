namespace $.$$ {

	/**
	 * Syntax grammar for view.tree, layered on top of $mol_syntax2 (the same tiny
	 * regex tokenizer $mol uses for its own code blocks). Token names are unique to
	 * this grammar, so their colors (see text.view.css.ts) never leak onto other code.
	 * Highlights, in priority order: line comments (`- \…`), string literals (`\…` and
	 * localized `@ \…`), components (`$…`), binding/super operators, structure markers
	 * (`/ * ?`), and primitives (numbers, null/true/false).
	 */
	const tree_syntax = new $.$mol_syntax2( {
		'tree-comment' : /- \\.*/ ,
		'tree-string' : /@ \\.*|\\.*/ ,
		'tree-comp' : /\$[\w$]*/ ,
		'tree-oper' : /<=>|<=|=>|\^/ ,
		'tree-mark' : /[\/*?]/ ,
		'tree-prim' : /\b(?:null|true|false|NaN)\b|[+-]?\d[\w.]*/ ,
	} )

	/**
	 * Structural gate shared by the Run button and the "Open in Playground" link: a
	 * snippet is offered only when it is a single, self-contained, mountable component.
	 *
	 * The playground/live runtime compiles the tree with the app's own $mol toolchain and
	 * mounts `$[ first_token ]`, so a snippet that references a component the app doesn't
	 * bundle, extends a non-view base, or spreads across several top-level components would
	 * render as an error (⚠) instead of a live result. We reject those up front rather than
	 * hand the reader a button that only leads to a crash.
	 *
	 * Requirements:
	 *  - exactly one top-level (column-0) declaration — the mount root;
	 *  - it declares its own non-reserved name and a base view (name + base);
	 *  - the base resolves to a mol_view (or subclass) in the live namespace;
	 *  - every other component it references is either defined in the snippet itself
	 *    or actually bundled into the app ($ has it) — so nothing is missing at render.
	 */
	function snippet_root( src: string ) {
		const lines = src.split( '\n' ).filter( line => line.trim() !== '' )
		if( lines.length === 0 ) return null
		// A fragment (starts with a property/binding) or a multi-component snippet has no
		// single mountable root — only column-0 `$…` lines count as top-level declarations.
		const tops = lines.filter( line => /^\$/.test( line ) )
		if( tops.length !== 1 ) return null
		const match = /^(\$[\w$]+)\s+(\$[\w$]+)/.exec( lines[ 0 ] )
		if( !match ) return null
		const [ , name, base ] = match
		// A reserved root name is rejected by the compiler itself, so never offer it.
		if( /^\$(mol|hyoo|bog|node)_/.test( name ) ) return null
		return { name, base }
	}

	function snippet_runnable( $: any, src: string ) {
		const root = snippet_root( src )
		if( !root ) return false
		const Base = $[ root.base ]
		if( typeof Base !== 'function' ) return false
		// Only view subclasses mount into the preview; a non-view base (e.g. mol_theme_auto)
		// has no DOM and would throw when the embed tries to render it.
		if( Base !== $.$mol_view && !( Base.prototype instanceof $.$mol_view ) ) return false
		// Plugins subclass mol_view but are not standalone-mountable — mounting one with no
		// host throws ("reading 'host'"). Reject the whole plugin family.
		const Plugin = $.$mol_plugin
		if( Plugin && ( Base === Plugin || Base.prototype instanceof Plugin ) ) return false
		const defined = new Set( [ root.name ] )
		for( const ref of src.match( /\$[\w$]+/g ) ?? [] ) {
			if( defined.has( ref ) ) continue
			if( typeof $[ ref ] === 'function' ) continue
			return false
		}
		return true
	}

	// Built-in controls whose own value/checked state is user-editable with no accompanying
	// logic — a text field you can type in, a box you can toggle. A tree-only snippet built
	// around one of these is genuinely interactive on its own, which is exactly what makes
	// the live preview worth a click.
	const interactive_comps = new Set( [
		'$mol_string', '$mol_number', '$mol_search', '$mol_textarea',
		'$mol_check', '$mol_check_box', '$mol_check_icon', '$mol_switch',
		'$mol_select', '$mol_pick', '$mol_filter', '$mol_date',
		'$mol_slider', '$mol_range', '$mol_color',
	] )

	/**
	 * Stricter gate on top of {@link snippet_runnable}: offer Run / "Open in Playground"
	 * only when the snippet is not merely mountable but actually *does something* when you
	 * poke it — a live, interactive demo rather than a static shell.
	 *
	 * The live/playground runtimes compile the *tree only* — the paired `view.ts` (where
	 * `@ $mol_mem` state and `@ $mol_action` handlers live) is never executed. So a snippet
	 * whose behaviour comes from that TS renders as an inert husk: the counter shows a blank
	 * count and its `+` button is dead, a `$mol_view` with empty `\` literals shows nothing.
	 * Those "technically renders" cases got a button that led nowhere — the reader clicked and
	 * nothing happened.
	 *
	 * The one thing that stays fully interactive with tree alone is a two-way `<=>` binding on
	 * a built-in input control: type into the field and its state changes right there. So we
	 * require both signals — a `<=>` operator *and* a known editable control — and reject
	 * everything else (static views, event handlers that need TS, keyed lists with no data).
	 */
	function snippet_interactive( src: string ) {
		if( !/<=>/.test( src ) ) return false
		for( const ref of src.match( /\$[\w$]+/g ) ?? [] ) {
			if( interactive_comps.has( ref ) ) return true
		}
		return false
	}

	/** A snippet earns Run / Playground buttons only when it both mounts cleanly and is interactive. */
	function snippet_demo( $: any, src: string ) {
		return snippet_runnable( $, src ) && snippet_interactive( src )
	}

	/**
	 * Author opt-out, appended to a fence's info-string: ```tree-no-run keeps the block's
	 * syntax highlighting and Copy button but offers neither Run nor "Open in Playground".
	 * It is the escape hatch for snippets the heuristics above accept yet a reader should
	 * not be invited to run — a page-local excerpt, or a listing that doesn't survive the
	 * trip through the playground URL.
	 *
	 * The flag rides *inside* the info-string instead of following it as a separate word
	 * because the markdown fence grammar ($mol_syntax2_md_flow) captures only `[\w.-]*`
	 * there: a space after the language would break the fence match outright and render
	 * the whole block as prose.
	 */
	const fence_no_run = '-no-run'

	/** Splits a fence info-string into its language and the {@link fence_no_run} flag. */
	function fence_parse( info: string ) {
		const norm = info.trim()
		const no_run = norm.toLowerCase().endsWith( fence_no_run )
		return {
			lang: no_run ? norm.slice( 0, -fence_no_run.length ) : norm,
			no_run,
		}
	}

	/**
	 * $mol_text with language-aware code blocks: view.tree gets its own highlighter,
	 * and executable snippets (view.tree) grow an "Open in Playground" button.
	 */
	export class $bog_smalljs_text extends $.$bog_smalljs_text {

		// Re-typing Pre* to our subclass regenerates the parent-side binding stubs, and
		// the `text <= pre_text* \` re-listing emits an empty `pre_text` stub that shadows
		// $mol_text's real implementation (which slices the code out of the flow token) —
		// leaving every block empty (one blank line). Delegate back to the base method so
		// blocks keep their multi-line source. Same story for per-line theme markers.
		pre_text( index: number ) {
			return $mol_text.prototype.pre_text.call( this, index )
		}

		pre_themes( index: number ) {
			return $mol_text.prototype.pre_themes.call( this, index )
		}

		// The `uri_resolve* <= uri_resolve*` binding that feeds code blocks also regenerates
		// a parent-side `uri_resolve` stub that returns the empty default, shadowing
		// $mol_text's real resolver. That makes every inline link resolve to "" and render
		// as "Bad link". Delegate to the base so links (in prose and list items) resolve.
		uri_resolve( uri: string ) {
			return $mol_text.prototype.uri_resolve.call( this, uri )
		}

		/**
		 * A ```structure fence is not code but a project layout, so it renders as the
		 * interactive tree instead of a code block: same listing, plus a "?" per line
		 * explaining why the folder is there. The listing stays inside the markdown, so
		 * the raw .md endpoint (and any reader who never loads the site) still gets it.
		 *
		 * $mol_text picks a component per flow token, and the switch below is its own,
		 * one case richer. It is repeated rather than delegated because the base builds
		 * the whole list in one memoized pass — calling it from an override of itself
		 * would re-enter the same cell.
		 */
		@ $mol_mem
		rows() {
			return this.flow_tokens().map( ( { name }, index ) => {
				switch( name ) {
					case 'quote': return this.Quote( index )
					case 'spoiler': return this.Spoiler( index )
					case 'header': return this.Header( index )
					case 'list': return this.List( index )
					case 'code': return this.lang_kind( index ) === 'structure' ? this.Structure( index ) : this.Pre( index )
					case 'code-indent': return this.Pre( index )
					case 'table': return this.Table( index )
					case 'grid': return this.Grid( index )
					case 'cut': return this.Cut( index )
					default: return this.Paragraph( index )
				}
			} )
		}

		/** Raw fence info-string of a code block (chunk 1 of the flow token), e.g. `tree-no-run`. */
		pre_info( index: number ) {
			return this.flow_tokens()[ index ].chunks[ 1 ] ?? ''
		}

		/** Fence language with any author flag stripped, e.g. `tree`, `typescript`. */
		pre_lang( index: number ) {
			return fence_parse( this.pre_info( index ) ).lang
		}

		/** False when the fence opted out via `-no-run` (see {@link fence_no_run}). */
		pre_run_enabled( index: number ) {
			return !fence_parse( this.pre_info( index ) ).no_run
		}

		/** Normalized language family used for grammar selection and playground gating. */
		lang_kind( index: number ) {
			const lang = this.pre_lang( index ).toLowerCase()
			if( lang === 'tree' || lang === 'view.tree' ) return 'tree'
			if( lang === 'ts' || lang === 'typescript' ) return 'ts'
			return lang
		}

		// Only view.tree snippets are self-contained enough to render in the playground
		// (a bare view.ts has no root component to mount), and only when the snippet is a
		// single mountable root whose deps are all bundled *and* interactive on its own —
		// otherwise the playground opens into a compile error or an inert husk whose logic
		// lives in the paired view.ts. Same gate as the inline Run button, plus the author's
		// own `-no-run` veto on the fence.
		pre_playground_showed( index: number ) {
			if( !this.pre_run_enabled( index ) ) return false
			if( this.lang_kind( index ) !== 'tree' ) return false
			return snippet_demo( this.$, this.pre_text( index ) )
		}

		// $mol_link merges this dict into the URL args on click (null removes a key),
		// so the reader lands on the playground seeded with exactly this snippet.
		pre_playground_arg( index: number ) {
			return {
				section: 'playground',
				page: null,
				tab: 'tree',
				code: this.pre_text( index ) + '\n',
				ts: null,
				css: null,
			} as Record< string, string | null >
		}

	}

	/** Code block that picks a grammar by language and can offer an "Open in Playground" link. */
	export class $bog_smalljs_text_code extends $.$bog_smalljs_text_code {

		// Doc snippets are short, so the base's virtual-scroll windowing buys nothing.
		// Render every line eagerly: it keeps measurement simple and the whole snippet
		// present in the DOM (so in-page text search and "Copy" see the full source).
		render_visible_only() {
			return false
		}

		syntax() {
			const lang = this.lang().toLowerCase()
			if( lang === 'tree' || lang === 'view.tree' ) return tree_syntax
			return super.syntax()
		}

		// A snippet earns a Run button only when it is a single, self-contained, mountable
		// root (see snippet_runnable) *and* interactive on its own — a two-way `<=>` binding
		// on a built-in input (see snippet_interactive). Fragments, multi-component snippets,
		// non-view bases, unbundled deps, static views and TS-driven demos (counters, event
		// handlers) get no button: they'd render an error or an inert husk. The same gate
		// drives "Open in Playground".
		//
		// run_enabled is the host's veto: the landing page hard-codes it off for its decorative
		// sign, and $bog_smalljs_text feeds it the fence's own `-no-run` flag per block.
		run_showed() {
			if( !this.run_enabled() ) return false
			if( this.syntax() !== tree_syntax ) return false
			return snippet_demo( this.$, this.text() )
		}

		@ $mol_action
		run_click() {
			this.run( !this.run() )
			return null
		}

		@ $mol_mem
		sub() {
			return [
				this.Rows(),
				... this.sidebar_showed() ? [ this.Copy() ] : [],
				... this.run_showed() ? [ this.Run() ] : [],
				... this.playground_showed() ? [ this.Playground() ] : [],
				// Lazily mounted: the live component is only instantiated (and the snippet
				// only compiled) once the reader flips Run on — doc pages stay light by default.
				... this.run() && this.run_showed() ? [ this.Live() ] : [],
			]
		}

	}

	/**
	 * Render-only live embed for a doc snippet: compiles the view.tree in the browser
	 * with the playground's own $mol toolchain ($bog_smalljs_playground.build_base) and
	 * mounts the resulting component — no editor, no persistence. Compilation errors are
	 * caught and shown inline so a bad snippet never takes down the page.
	 */
	export class $bog_smalljs_text_live extends $.$bog_smalljs_text_live {

		@ $mol_mem
		live_content(): readonly ( $mol_view | string )[] {
			const $ = this.$ as any
			try {
				// build_base normalizes the trailing LF and downgrades localized `@ \text`
				// (no runtime dictionary here) to a plain literal, so the raw block text is fine.
				const { Base } = $bog_smalljs_playground.build_base( $, this.tree() )
				return [ new Base() as $mol_view ]
			} catch( error ) {
				if( error instanceof Promise ) throw error
				const box = new this.$.$mol_view()
				;( box as any ).dom_name = () => 'pre'
				;( box as any ).sub = () => [ '⚠ ' + ( error instanceof Error ? error.message : String( error ) ) ]
				return [ box ]
			}
		}

	}

}
