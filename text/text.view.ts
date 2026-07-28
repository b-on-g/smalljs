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

		/** Fence info-string of a code block (chunk 1 of the flow token), e.g. `tree`, `typescript`. */
		pre_lang( index: number ) {
			return this.flow_tokens()[ index ].chunks[ 1 ] ?? ''
		}

		/** Normalized language family used for grammar selection and playground gating. */
		lang_kind( index: number ) {
			const lang = this.pre_lang( index ).toLowerCase()
			if( lang === 'tree' || lang === 'view.tree' ) return 'tree'
			if( lang === 'ts' || lang === 'typescript' ) return 'ts'
			return lang
		}

		// Only view.tree snippets are self-contained enough to render in the playground
		// (a bare view.ts has no root component to mount), so the button is tree-only.
		pre_playground_showed( index: number ) {
			return this.lang_kind( index ) === 'tree'
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

		// A snippet is runnable only when it declares a mountable root component of its
		// own — first token is a `$name` that isn't a framework-reserved prefix. Fragments
		// (starting with a property, or with a bare `$mol_*`) get no Run button and just
		// keep the "Open in Playground" escape hatch (WS1).
		run_showed() {
			if( this.syntax() !== tree_syntax ) return false
			const root = /(\$[\w$]+)/.exec( this.text() )?.[ 1 ]
			return !!root && !/^\$(mol|hyoo|bog|node)_/.test( root )
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
				// $mol_tree2 requires a trailing LF; doc block text is captured without one.
				// Localized `@ \text` has no runtime locale dictionary here (that lives in a
				// generated .locale=en.json), so it would render as the raw key. Downgrade it
				// to a plain `\text` literal so the preview shows the human-readable default.
				const src = this.tree().replace( /\n*$/, '\n' ).replace( /@ \\/g, '\\' )
				const { Base } = $bog_smalljs_playground.build_base( $, src )
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
