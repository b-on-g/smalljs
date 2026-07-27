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

		@ $mol_mem
		sub() {
			return [
				this.Rows(),
				... this.sidebar_showed() ? [ this.Copy() ] : [],
				... this.playground_showed() ? [ this.Playground() ] : [],
			]
		}

	}

}
