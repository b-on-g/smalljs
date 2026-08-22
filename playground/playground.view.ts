namespace $ {
	/** Где отдельно стоящая песочница держит черновики. */
	export const $bog_smalljs_playground_store = '$bog_smalljs_playground'
}

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
			return $bog_smalljs_playground_samples[ this.sample() ].tree
		}

		// The standalone defaults (counter logic + styling) target the $my_demo component, so
		// they only make sense while that default tree is loaded. When a different tree is in
		// the editor — most notably a doc snippet opened via "Open in Playground", which seeds
		// `code` but clears `ts`/`css` — attaching the $my_demo class/styles would compile a
		// reference to an undefined component and blow up the preview ("$my_demo is not
		// defined"). In that case the defaults must be empty.
		// --- примеры -------------------------------------------------------

		/** Выбранный пример. Живёт в URL, чтобы ссылкой можно было поделиться. */
		@ $mol_mem
		sample( next?: string ) {
			const id = this.$.$mol_state_arg.value( 'sample', next )
			return id && $bog_smalljs_playground_samples[ id ] ? id : 'counter'
		}

		sample_ids() { return $bog_smalljs_playground_sample_ids }

		sample_options() {
			return this.sample_ids().map( id => this.Sample_option( id ) )
		}

		sample_title( id: string ) {
			return this.$.$mol_locale.text( `$bog_smalljs_playground_sample_${ id }_title` ) || id
		}

		samples_label() { return this.sample_title( this.sample() ) }

		/** Выбор примера — это сброс на него: черновики берутся из дефолтов. */
		@ $mol_action
		sample_pick( id: string ) {
			this.sample( id )
			this.reset()
			this.Samples().showed( false )
			return null
		}

		tree_is_default() {
			const tree = this.stored( 'code' ) || this.default_tree()
			const root = $bog_smalljs_playground_samples[ this.sample() ]?.root
			return !!root && /(\$[\w$]+)/.exec( tree )?.[ 1 ] === root
		}

		default_css() {
			// An embedder controls the css via seed_css, mirroring default_ts's seed gate.
			if ( this.seed_tree() ) return this.seed_css()
			// Дерево увели от примера (например, сниппет из доков) — стилить нечего.
			if ( !this.tree_is_default() ) return ''
			return $bog_smalljs_playground_samples[ this.sample() ].css
		}

		default_ts() {
			// An embedder (e.g. the course) fully controls the ts via seed_ts,
			// even when empty — mirror default_tree's seed gate.
			if ( this.seed_tree() ) return this.seed_ts()
			// Дерево увели от примера — расширять нечего.
			if ( !this.tree_is_default() ) return ''
			return $bog_smalljs_playground_samples[ this.sample() ].ts
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
			// Раньше отдельно стоящая песочница держала код прямо в адресной строке,
			// и URL распухал от первого же символа. Теперь черновики живут в
			// localStorage — адрес остаётся чистым и переживает перезагрузку,
			// а длинную ссылку собирает кнопка «Поделиться», когда её попросят.
			// У встраивателя (курс) свой скоуп на урок — он работал так и раньше.
			const scope = this.store_scope() || $bog_smalljs_playground_store
			if ( next !== undefined ) return this.$.$mol_state_local.value( `${ scope }/${ key }`, next ) ?? null

			const local = this.$.$mol_state_local.value( `${ scope }/${ key }` )
			if ( local != null ) return local as string

			// Ссылка — транспорт, а не хранилище: из неё только читаем.
			// Свои правки уедут в localStorage и с этого момента будут главнее,
			// а адрес освободится при первом же изменении (см. commit).
			if ( this.store_scope() ) return null
			return this.$.$mol_state_arg.value( key ) ?? null
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

		// --- ссылка: принять и отдать ---------------------------------------

		@ $mol_mem
		shared( next?: boolean ) { return next ?? false }

		share_title() {
			return this.shared() ? this.share_done_hint() : this.share_hint()
		}

		/** Ссылка собирается по требованию, а не висит в адресе постоянно. */
		@ $mol_action
		share() {

			const link = this.$.$mol_state_arg.link( {
				code: this.tree_draft(),
				ts: this.ts_draft(),
				css: this.css_draft(),
				sample: this.sample(),
			} )

			// Без await: обработчик события в $mol может быть переигран, а
			// повторная запись в буфер вне жеста пользователя уже не пройдёт.
			this.$.$mol_dom_context.navigator?.clipboard?.writeText( link )

			this.shared( true )
			this.timers[ 'shared' ]?.destructor()
			this.timers[ 'shared' ] = new this.$.$mol_after_timeout( 2000, () => this.shared( false ) )

			return null
		}

		// --- сброс к исходному примеру ------------------------------------

		/** Кнопки сброса просто нет в разметке, пока откатывать нечего. */
		tabs_content(): readonly $mol_view[] {
			const list: $mol_view[] = [ this.Tree_tab(), this.Ts_tab(), this.Css_tab(), this.Tabs_gap() ]
			// Выбор примера не показываем, когда содержимое задал встраиватель:
			// у курса свой сценарий на урок, чужие примеры там ни к чему.
			if ( !this.seed_tree() ) list.push( this.Samples(), this.Share() )
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
			// Пришли по ссылке и начали править — код уже в localStorage,
			// держать его ещё и в адресе незачем.
			if ( !this.store_scope() && this.$.$mol_state_arg.value( key ) !== null ) {
				this.$.$mol_state_arg.value( key, null )
			}
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
