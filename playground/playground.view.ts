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

		// The standalone defaults (counter logic + styling) target the $my_demo component, so
		// they only make sense while that default tree is loaded. When a different tree is in
		// the editor — most notably a doc snippet opened via "Open in Playground", which seeds
		// `code` but clears `ts`/`css` — attaching the $my_demo class/styles would compile a
		// reference to an undefined component and blow up the preview ("$my_demo is not
		// defined"). In that case the defaults must be empty.
		tree_is_default() {
			const S = String.fromCharCode( 36 ) // "$" — kept out of MAM's dep scan
			const tree = this.stored( 'code' ) || this.default_tree()
			return /(\$[\w$]+)/.exec( tree )?.[ 1 ] === S + 'my_demo'
		}

		default_css() {
			// An embedder controls the css via seed_css, mirroring default_ts's seed gate.
			if ( this.seed_tree() ) return this.seed_css()
			// A non-default tree (e.g. a doc snippet) has no $my_demo to style.
			if ( !this.tree_is_default() ) return ''
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
				`\t\t\tpadding: { bottom: '0.5rem' },`,
				`\t\t},`,
				`\t} )`,
				`}`,
			].join( '\n' ) + '\n'
		}

		default_ts() {
			// An embedder (e.g. the course) fully controls the ts via seed_ts,
			// even when empty — mirror default_tree's seed gate.
			if ( this.seed_tree() ) return this.seed_ts()
			// A non-default tree (e.g. a doc snippet) has no $my_demo class to extend.
			if ( !this.tree_is_default() ) return ''
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
		stored( key: string, next?: string | null ): string | null {
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

		// --- сброс к исходному примеру ------------------------------------

		/** Кнопки сброса просто нет в разметке, пока откатывать нечего. */
		tabs_content(): readonly $mol_view[] {
			const list: $mol_view[] = [ this.Tree_tab(), this.Ts_tab(), this.Css_tab(), this.Tabs_gap() ]
			if ( this.is_modified() ) list.push( this.Reset() )
			return list
		}

		/** Что-то из трёх исходников правили — значит есть что откатывать. */
		is_modified(): boolean {
			return [ 'code', 'ts', 'css' ].some( key => this.stored( key ) !== null )
		}

		@ $mol_action
		reset() {

			// Сначала гасим отложенные коммиты. Иначе таймер, заведённый последним
			// нажатием клавиши, доживёт свои 400 мс и запишет старый текст ПОВЕРХ
			// сброса — кнопка работала бы через раз.
			for ( const key in this.timers ) {
				this.timers[ key ]?.destructor()
				this.timers[ key ] = null
			}

			for ( const key of [ 'code', 'ts', 'css' ] ) this.stored( key, null )

			// Ячейки *_committed приходится заполнять руками. В них писали через
			// commit(), а запись в @$mol_mem замораживает зависимости: такая ячейка
			// больше не читает stored() и сама от его очистки не пересчитается.
			// Черновики (*_draft) в этом не нуждаются — они пересчитаются сами,
			// но выставляем и их, чтобы состояние было одинаковым по всем трём.
			this.tree_draft( this.default_tree() )
			this.ts_draft( this.default_ts() )
			this.css_draft( this.default_css() )
			this.tree_committed( this.default_tree() )
			this.ts_committed( this.default_ts() )
			this.css_committed( this.default_css() )

			// *_draft снова завели таймеры на запись только что подставленных
			// дефолтов — они бы вернули значения в хранилище и is_modified()
			// опять стал бы true. Гасим повторно.
			for ( const key in this.timers ) {
				this.timers[ key ]?.destructor()
				this.timers[ key ] = null
			}

			return null
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

		// view.tree -> base class, evaluated into the real namespace so child
		// components and cross-references resolve at render time. Extracted as a
		// static so the render-only live embeds ($bog_smalljs_text_live) can reuse
		// the exact same $mol toolchain without dragging in the editor.
		static build_base( $: any, tree_src: string ): { root: string, Base: any } {
			// $mol_tree2 needs a trailing LF; a localized `@ \text` has no runtime dictionary
			// here, so it would render as its raw key — downgrade it to a plain `\text` literal
			// so the preview shows the human-readable default instead. Both the editor preview
			// and the render-only doc embeds go through here, so they stay consistent.
			tree_src = tree_src.replace( /\n*$/, '\n' ).replace( /@ \\/g, '\\' )
			const root = /(\$[\w$]+)/.exec( tree_src )?.[ 1 ]
			if ( !root ) throw new Error( 'No component found — the first line must declare one (a name and a base view).' )
			if ( /^\$(mol|hyoo|bog|node)_/.test( root ) ) {
				throw new Error( `Choose another name — ${ root } is reserved by the framework.` )
			}

			const tree = $.$mol_tree2_from_string( tree_src, 'playground.view.tree' )
			const tree_js = $.$mol_tree2_text_to_string_mapped_js(
				$.$mol_tree2_js_to_text( $.$mol_view_tree2_to_js( tree ) ),
			)
			new Function( '$', '$mol_mem', '$mol_mem_key', tree_js )( $, $.$mol_mem, $.$mol_mem_key )

			const Base = $[ root ]
			if ( typeof Base !== 'function' ) throw new Error( `Component ${ root } could not be built.` )
			return { root, Base }
		}

		compile(): $mol_view {

			const $ = this.$ as any
			const tree_src = this.tree_committed()
			const ts_src = this.ts_committed()

			const { root, Base } = $bog_smalljs_playground.build_base( $, tree_src )

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
