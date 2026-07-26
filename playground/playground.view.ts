namespace $.$$ {

	// TypeScript compiler, lazy-loaded from a CDN only when the user writes logic.
	const TS_CDN = 'https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.js'

	/**
	 * A live view.tree + view.ts playground. view.tree is compiled with $mol's own
	 * toolchain ($mol_tree2_from_string -> $mol_view_tree2_to_js -> ...); optional
	 * view.ts logic is transpiled in the browser by the TypeScript compiler and
	 * layered on top as a subclass. We do NOT write a parser.
	 *
	 * Snippet components must be bundled into this app, so they are force-referenced
	 * here (in a doc comment, which MAM keeps) to pull them into the bundle:
	 * $mol_view $mol_button_major $mol_button_minor $mol_string $mol_number
	 * $mol_text $mol_paragraph $mol_list $mol_row $mol_link $mol_check $mol_switch
	 */
	export class $bog_smalljs_playground extends $.$bog_smalljs_playground {

		// --- default snippets --------------------------------------------

		default_tree() {
			if ( this.seed_tree() ) return this.seed_tree() // seeded by an embedder (e.g. course)
			const S = String.fromCharCode( 36 ) // "$" — kept out of MAM's dep scan
			return [
				`${ S }my_demo ${ S }mol_view`,
				`\tcount_text \\0`,
				`\tinc? null`,
				`\tsub /`,
				`\t\t<= Value ${ S }mol_view`,
				`\t\t\tsub / <= count_text`,
				`\t\t<= Button ${ S }mol_button_major`,
				`\t\t\tclick? <=> inc?`,
				`\t\t\tsub / <= button_label \\Count up`,
			].join( '\n' ) + '\n'
		}

		default_css() {
			// An embedder controls the css via seed_css, mirroring default_ts's seed gate.
			if ( this.seed_tree() ) return this.seed_css()
			// Standalone: a working view.css.ts sample that styles the default counter,
			// so opening the css.ts tab shows real, applied styling.
			const S = String.fromCharCode( 36 ) // "$" — kept out of MAM's dep scan
			return [
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_demo, {`,
				`\t\tflex: { direction: 'column', gap: '1rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tValue: {`,
				`\t\t\tfont: { size: '2rem', weight: 700 },`,
				`\t\t\tcolor: '#0088ff',`,
				`\t\t},`,
				`\t} )`,
				`}`,
			].join( '\n' ) + '\n'
		}

		default_ts() {
			// An embedder (e.g. the course) fully controls the ts via seed_ts,
			// even when empty — mirror default_tree's seed gate.
			if ( this.seed_tree() ) return this.seed_ts()
			// Standalone playground: ship a working counter so the default
			// example is live on open (the tree alone has no logic, so inc()
			// would be dead). This does fetch the TS compiler on first render.
			const S = String.fromCharCode( 36 ) // "$" — kept out of MAM's dep scan
			return [
				`class ${ S }my_demo extends ${ S }.${ S }my_demo {`,
				`\t@ ${ S }mol_mem count( next?: number ) { return next ?? 0 }`,
				`\t@ ${ S }mol_action inc() { this.count( this.count() + 1 ) }`,
				`\tcount_text() { return String( this.count() ) }`,
				`}`,
			].join( '\n' ) + '\n'
		}

		// --- tabs ---------------------------------------------------------

		@ $mol_mem
		tab( next?: string ) {
			return this.$.$mol_state_arg.value( 'tab', next ) ?? 'tree'
		}

		@ $mol_action
		show_tree() { this.tab( 'tree' ); return null }

		@ $mol_action
		show_ts() { this.tab( 'ts' ); return null }

		@ $mol_action
		show_css() { this.tab( 'css' ); return null }

		editor_hint() {
			const tab = this.tab()
			if ( tab === 'ts' ) return 'Optional — add a class with logic (state, actions), e.g. count() and inc().'
			if ( tab === 'css' ) return 'Optional — style the component with $mol_style_define.'
			return 'Type a view.tree here…'
		}

		// Persistence funnel — standalone stores in the URL hash (shareable); when an
		// embedder sets store_scope (e.g. the course, per lesson), store in localStorage.
		stored( key: string, next?: string ): string | null {
			const scope = this.store_scope()
			if ( scope ) return this.$.$mol_state_local.value( `${ scope }/${ key }`, next ) ?? null
			return this.$.$mol_state_arg.value( key, next ) ?? null
		}

		// --- editor sources (immediate) + debounced committed copies ------

		@ $mol_mem
		tree_draft( next?: string ) {
			if ( next !== undefined ) { this.schedule( 'code', next ); return next }
			return this.stored( 'code' ) || this.default_tree()
		}

		@ $mol_mem
		ts_draft( next?: string ) {
			if ( next !== undefined ) { this.schedule( 'ts', next ); return next }
			return this.stored( 'ts' ) || this.default_ts()
		}

		@ $mol_mem
		tree_committed( next?: string ) {
			return next ?? ( this.stored( 'code' ) || this.default_tree() )
		}

		@ $mol_mem
		ts_committed( next?: string ) {
			return next ?? ( this.stored( 'ts' ) || this.default_ts() )
		}

		@ $mol_mem
		css_draft( next?: string ) {
			if ( next !== undefined ) { this.schedule( 'css', next ); return next }
			return this.stored( 'css' ) || this.default_css()
		}

		@ $mol_mem
		css_committed( next?: string ) {
			return next ?? ( this.stored( 'css' ) || this.default_css() )
		}

		// One editor, bound to the active tab's source.
		draft( next?: string ) {
			const tab = this.tab()
			if ( next !== undefined ) {
				if ( tab === 'ts' ) return this.ts_draft( next )
				if ( tab === 'css' ) return this.css_draft( next )
				return this.tree_draft( next )
			}
			if ( tab === 'ts' ) return this.ts_draft()
			if ( tab === 'css' ) return this.css_draft()
			return this.tree_draft()
		}

		// --- debounce -----------------------------------------------------

		timers = {} as Record< string, $mol_after_timeout | null >

		@ $mol_action
		schedule( key: string, value: string ) {
			this.timers[ key ]?.destructor()
			this.timers[ key ] = new this.$.$mol_after_timeout( 400, () => this.commit( key, value ) )
		}

		@ $mol_action
		commit( key: string, value: string ) {
			this.stored( key, value )
			if ( key === 'ts' ) this.ts_committed( value )
			else if ( key === 'css' ) this.css_committed( value )
			else this.tree_committed( value )
		}

		// --- compilation --------------------------------------------------

		// TypeScript compiler, fetched on demand (suspends the preview until ready).
		ts_lib(): any {
			this.$.$mol_import.script( TS_CDN )
			const ts = ( globalThis as any ).ts
			if ( !ts ) throw new Error( 'TypeScript compiler is unavailable.' )
			return ts
		}

		compile(): $mol_view {

			const $ = this.$ as any
			const tree_src = this.tree_committed()
			const ts_src = this.ts_committed()

			const root = /(\$[\w$]+)/.exec( tree_src )?.[ 1 ]
			if ( !root ) throw new Error( 'No component found — the first line must declare one (a name and a base view).' )
			if ( /^\$(mol|hyoo|bog|node)_/.test( root ) ) {
				throw new Error( `Choose another name — ${ root } is reserved by the framework.` )
			}

			// view.tree -> base class, evaluated into the real namespace so child
			// components and cross-references resolve at render time.
			const tree = $.$mol_tree2_from_string( tree_src, 'playground.view.tree' )
			const tree_js = $.$mol_tree2_text_to_string_mapped_js(
				$.$mol_tree2_js_to_text( $.$mol_view_tree2_to_js( tree ) ),
			)
			new Function( '$', '$mol_mem', '$mol_mem_key', tree_js )( $, $.$mol_mem, $.$mol_mem_key )

			// optional view.css.ts -> styles registered via $mol_style_define. The generated
			// CSS targets the component by attribute selector (keyed by its name), so it applies
			// to the rendered element regardless of order. $mol_style_attach is idempotent, so
			// re-running on every recompile just updates the one <style> element.
			const css_src = this.css_committed()
			if ( css_src.trim() ) {
				const ts = this.ts_lib()
				const css_js = ts.transpileModule( css_src, {
					compilerOptions: { target: ts.ScriptTarget.ES2018, module: ts.ModuleKind.None },
				} ).outputText
				new Function( '$', css_js )( $ )
			}

			// optional view.ts -> subclass with logic, transpiled in the browser.
			if ( ts_src.trim() ) {
				const ts = this.ts_lib()
				const out = ts.transpileModule( ts_src, {
					compilerOptions: {
						experimentalDecorators: true,
						target: ts.ScriptTarget.ES2018,
						module: ts.ModuleKind.None,
					},
				} ).outputText
				const body = out + `\n;return typeof ${ root } !== 'undefined' ? ${ root } : null;`
				const Sub = new Function( '$', '$mol_mem', '$mol_mem_key', '$mol_action', body )(
					$, $.$mol_mem, $.$mol_mem_key, $.$mol_action,
				)
				if ( typeof Sub === 'function' ) return new Sub() as $mol_view
			}

			const Base = $[ root ]
			if ( typeof Base !== 'function' ) throw new Error( `Component ${ root } could not be built.` )
			return new Base() as $mol_view
		}

		error_box( message: string ): $mol_view {
			const box = new this.$.$mol_view()
			;( box as any ).dom_name = () => 'pre'
			;( box as any ).sub = () => [ '⚠ ' + message ]
			return box
		}

		@ $mol_mem
		preview_content(): readonly ( $mol_view | string )[] {
			try {
				return [ this.compile() ]
			} catch ( error ) {
				if ( error instanceof Promise ) throw error // TS still loading — keep the loading state
				return [ this.error_box( error instanceof Error ? error.message : String( error ) ) ]
			}
		}

	}

}
