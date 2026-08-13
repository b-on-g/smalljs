namespace $.$$ {

	/** Rows of the rating shown at once, as on the reference site. */
	const page_size = 10

	/** The two top blocks are not an editorial opinion: each one counts wins in
	 *  the categories named under its heading, so the order can be recomputed by
	 *  anyone from the same JSON. */
	const top_apps_categories = [ 'speed', 'code' ]
	const top_sites_categories = [ 'weight', 'builtin' ]

	/** The nine comparisons the section leads with. Which pairs are worth
	 *  featuring is a choice, not a measurement — so it lives here in the open
	 *  rather than pretending to be derived from traffic we do not have. Ids are
	 *  written in canonical (alphabetical) order, the same one the URL uses. */
	const popular_pairs: readonly ( readonly [ string, string ] )[] = [
		[ 'react', 'vue' ],
		[ 'angular', 'react' ],
		[ 'react', 'svelte' ],
		[ 'svelte', 'vue' ],
		[ 'react', 'solid' ],
		[ 'solid', 'svelte' ],
		[ 'angular', 'vue' ],
		[ 'mol', 'react' ],
		[ 'mol', 'vue' ],
	]

	/** Canonical order of a pair: alphabetical by id, so `react`/`vue` and
	 *  `vue`/`react` are one address and one page. Plain code-unit comparison —
	 *  ids are lower-case ascii slugs, so locale rules cannot reorder them. */
	function pair_order( a: string, b: string ) {
		return a < b ? [ a, b ] as const : [ b, a ] as const
	}

	function pair_key( a: string, b: string ) {
		return pair_order( a, b ).join( '/' )
	}

	/** Letter shown in the square tile that stands in for a logo. */
	function mark_of( title: string ) {
		const letter = /[\p{L}\p{N}]/u.exec( title )
		return ( letter ? letter[ 0 ] : title.slice( 0, 1 ) ).toUpperCase()
	}

	export class $bog_smalljs_versus extends $.$bog_smalljs_versus {

		// ——— Data ———————————————————————————————————————————————————————————
		//
		// The catalogue is compiled into the bundle by versus/data/gen.cjs, so
		// there is nothing to fetch and no loading state: `list()` is always the
		// full roster. Which frameworks exist is the data module's business, not
		// this page's — nothing here keeps its own list of ids.

		data() {
			return this.$.$bog_smalljs_versus_data
		}

		/** Every framework in the catalogue. */
		frameworks(): readonly $bog_smalljs_versus_data_framework[] {
			return this.data().list()
		}

		/** Metric descriptions, keyed by metric id. */
		registry(): Readonly< Record< string, $bog_smalljs_versus_data_metric > > {
			return this.data().registry()
		}

		/** Human name of a framework id. Also used by the app shell for the
		 *  `React vs Vue — $mol` page title, which is why it is declared in the
		 *  tree rather than kept private here.
		 *
		 *  An id nobody wrote a file for is shown capitalized rather than mapped
		 *  through a table of hand-written names: a second place where a
		 *  framework is named is a second place to keep in step with the data. */
		framework_title( id: string ) {
			if( !id ) return ''
			return this.data().item( id )?.title ?? id[ 0 ].toUpperCase() + id.slice( 1 )
		}

		// ——— Scoring ————————————————————————————————————————————————————————
		//
		// A category is won by whoever is better on more of its metrics. Only
		// metrics *both* sides publish are counted, so a framework with a fuller
		// file cannot win on paperwork alone. The rating score is the number of
		// categories won across all pairwise duels; there is no overall grade.

		@ $mol_mem
		metrics_by_category() {
			const map: Record< string, string[] > = {}
			const registry = this.registry()
			for( const id of Object.keys( registry ) ) {
				const cat = registry[ id ].category
				;( map[ cat ] ??= [] ).push( id )
			}
			return map as Readonly< Record< string, readonly string[] > >
		}

		@ $mol_mem
		categories(): readonly string[] {
			return Object.keys( this.metrics_by_category() )
		}

		/** +1 when `a` is better, -1 when `b` is, 0 when tied or when either side
		 *  does not publish the metric — the rule from the section's spec, and
		 *  the same one the comparison page scores a category by. */
		compare_metric( metric: string, a: $bog_smalljs_versus_data_framework, b: $bog_smalljs_versus_data_framework ) {

			const meta = this.registry()[ metric ]
			const left = a.metrics[ metric ]
			const right = b.metrics[ metric ]
			if( !meta || !left || !right ) return 0

			const x = Number( left.value )
			const y = Number( right.value )
			if( !Number.isFinite( x ) || !Number.isFinite( y ) || x === y ) return 0

			// `boolean` rides the higher-is-better branch: true (1) beats false (0).
			return meta.better === 'lower' ? ( x < y ? 1 : -1 ) : ( x > y ? 1 : -1 )
		}

		/** +1 / -1 / 0 for one category of one duel. */
		category_winner( a: $bog_smalljs_versus_data_framework, b: $bog_smalljs_versus_data_framework, category: string ) {

			let wins = 0
			let losses = 0

			for( const metric of this.metrics_by_category()[ category ] ?? [] ) {
				const cmp = this.compare_metric( metric, a, b )
				if( cmp > 0 ) ++ wins
				else if( cmp < 0 ) ++ losses
			}

			return Math.sign( wins - losses )
		}

		/** Categories won by each framework against every other one. `key` is a
		 *  comma-separated category filter; empty means all of them. */
		@ $mol_mem_key
		scores( key: string ) {

			const categories = key ? key.split( ',' ) : this.categories()
			const list = this.frameworks()
			const result: Record< string, number > = {}

			for( const fw of list ) {
				let won = 0
				for( const other of list ) {
					if( other.id === fw.id ) continue
					for( const category of categories ) {
						if( this.category_winner( fw, other, category ) > 0 ) ++ won
					}
				}
				result[ fw.id ] = won
			}

			return result as Readonly< typeof result >
		}

		/** Frameworks ordered by `scores( key )`, ties broken by name so the
		 *  order never wobbles between renders. */
		@ $mol_mem_key
		ranked( key: string ): readonly $bog_smalljs_versus_data_framework[] {
			const scores = this.scores( key )
			return [ ... this.frameworks() ].sort(
				( x, y ) => ( scores[ y.id ] ?? 0 ) - ( scores[ x.id ] ?? 0 ) || x.title.localeCompare( y.title )
			)
		}

		/** How many of the registry's metrics this framework actually publishes. */
		coverage( id: string ) {
			return Object.keys( this.data().item( id )?.metrics ?? {} ).length
		}

		/** Whether the row deserves a word about how thin its table is. Every
		 *  file is missing something, so flagging "incomplete" everywhere would
		 *  say nothing; the note appears once less than half the registry is
		 *  filled in, where the placing really is standing on little. */
		partial( id: string ) {
			const total = Object.keys( this.registry() ).length
			if( !total ) return false
			return this.coverage( id ) * 2 < total
		}

		row_partial_text( id: string ) {
			return this.row_partial_template()
				.replace( '{n}', String( this.coverage( id ) ) )
				.replace( '{total}', String( Object.keys( this.registry() ).length ) )
		}

		// ——— Picking a pair —————————————————————————————————————————————————

		/** Field text defaults to whatever the address preselects, so a link like
		 *  `section=versus/a=react` opens the section with React already in the
		 *  left field. Typing overrides it. */
		@ $mol_mem
		override query_a( next?: string ) {
			if( next !== undefined ) return next
			return this.framework_title( this.$.$mol_state_arg.value( 'a' ) ?? '' )
		}

		@ $mol_mem
		override query_b( next?: string ) {
			if( next !== undefined ) return next
			return this.framework_title( this.$.$mol_state_arg.value( 'b' ) ?? '' )
		}

		/** Id behind the text typed in a field, or '' while it matches nothing. */
		query_id( text: string ) {
			const norm = text.trim().toLowerCase()
			if( !norm ) return ''
			for( const fw of this.frameworks() ) {
				if( fw.id === norm || fw.title.toLowerCase() === norm ) return fw.id
			}
			return ''
		}

		/** Titles offered under a field: everything the text is a substring of,
		 *  minus whatever the other field already holds. */
		suggest_titles( query: string, exclude: string ) {
			const norm = query.trim().toLowerCase()
			return this.frameworks()
				.filter( fw => fw.id !== exclude )
				.filter( fw => !norm || fw.title.toLowerCase().includes( norm ) || fw.id.includes( norm ) )
				.map( fw => fw.title )
				.slice( 0, 8 )
		}

		@ $mol_mem
		suggests_a() {
			return this.suggest_titles( this.query_a(), this.query_id( this.query_b() ) )
		}

		@ $mol_mem
		suggests_b() {
			return this.suggest_titles( this.query_b(), this.query_id( this.query_a() ) )
		}

		/** Both fields resolved to different frameworks — open their page. The
		 *  reference site has no Compare button either: choosing the second one
		 *  is the action.
		 *
		 *  This cell only *notices*; the address is written by the action below,
		 *  reached through `$mol_wire_async` so the write lands outside this
		 *  memoized body. Writing `$mol_state_arg` from inside one is the
		 *  invalidation loop $mol forbids. The check against the current address
		 *  is what keeps a page that renders these very fields from re-triggering
		 *  itself once the address already says this. */
		@ $mol_mem
		pick_sync() {

			const a = this.query_id( this.query_a() )
			const b = this.query_id( this.query_b() )
			if( !a || !b || a === b ) return null

			const [ first, second ] = pair_order( a, b )

			const arg = this.$.$mol_state_arg
			if( arg.value( 'a' ) === first && arg.value( 'b' ) === second ) return null

			$mol_wire_async( this ).pair_open( first, second )

			return null
		}

		/** Navigation proper: a history entry the reader can step back out of. */
		@ $mol_action
		pair_open( a: string, b: string ) {
			this.$.$mol_state_arg.go({ section: 'versus', a, b })
			return null
		}

		// ——— Popular comparisons ————————————————————————————————————————————

		popular_links() {
			return popular_pairs.map( ( [ a, b ] ) => this.Popular_link( pair_key( a, b ) ) )
		}

		pair_arg( key: string ) {
			const [ a, b ] = key.split( '/' )
			return { section: 'versus', a, b }
		}

		pair_left( key: string ) {
			return this.framework_title( key.split( '/' )[ 0 ] )
		}

		pair_right( key: string ) {
			return this.framework_title( key.split( '/' )[ 1 ] )
		}

		// ——— Top blocks —————————————————————————————————————————————————————

		/** Cards of one top block. The key of a card carries its block, because
		 *  the same framework can lead both lists and one view cannot hang in two
		 *  places at once. */
		top_content( block: string, categories: readonly string[] ) {
			const ranked = this.ranked( categories.join( ',' ) ).slice( 0, 6 )
			if( !ranked.length ) return [ this.Empty( block ) ]
			return ranked.map( fw => this.Card( block + '/' + fw.id ) )
		}

		@ $mol_mem
		top_apps_content() {
			return this.top_content( 'apps', top_apps_categories )
		}

		@ $mol_mem
		top_sites_content() {
			return this.top_content( 'sites', top_sites_categories )
		}

		card_id( key: string ) {
			return key.split( '/' )[ 1 ]
		}

		card_name( key: string ) {
			return this.framework_title( this.card_id( key ) )
		}

		card_mark( key: string ) {
			return mark_of( this.card_name( key ) )
		}

		/** A card preselects its framework in the left field: there is no page
		 *  for a single framework, the section is about pairs. */
		card_arg( key: string ) {
			return { section: 'versus', a: this.card_id( key ), b: null }
		}

		// ——— Rating —————————————————————————————————————————————————————————

		@ $mol_mem
		rating_rows() {
			return this.ranked( '' )
		}

		@ $mol_mem
		ranks() {
			const map: Record< string, number > = {}
			this.rating_rows().forEach( ( fw, index ) => map[ fw.id ] = index + 1 )
			return map as Readonly< typeof map >
		}

		@ $mol_mem
		rating_content() {

			const rows = this.rating_rows()
			if( !rows.length ) return [ this.Empty( 'rating' ) ]

			const from = this.page_current_index() * page_size
			return rows.slice( from, from + page_size ).map( fw => this.Row( fw.id ) )
		}

		row_content( id: string ) {
			return [
				this.Rank( id ),
				this.Row_mark( id ),
				this.Row_name( id ),
				this.Row_score( id ),
				this.Row_since( id ),
			]
		}

		row_name_content( id: string ) {
			return [
				this.Row_link( id ),
				... this.partial( id ) ? [ this.Row_partial( id ) ] : [],
			]
		}

		rank( id: string ) {
			return String( this.ranks()[ id ] ?? '' )
		}

		row_mark( id: string ) {
			return mark_of( this.framework_title( id ) )
		}

		row_title( id: string ) {
			return this.framework_title( id )
		}

		row_arg( id: string ) {
			return { section: 'versus', a: id, b: null }
		}

		row_score_text( id: string ) {
			return String( this.scores( '' )[ id ] ?? 0 )
		}

		row_fill_width( id: string ) {
			const scores = this.scores( '' )
			const top = Math.max( 0, ... Object.values( scores ) )
			if( !top ) return '0%'
			return Math.round( ( scores[ id ] ?? 0 ) / top * 100 ) + '%'
		}

		row_since_text( id: string ) {
			const since = this.data().item( id )?.since
			return since ? String( since ) : '—'
		}

		// ——— Pagination —————————————————————————————————————————————————————
		//
		// Kept out of the address on purpose: page 2 of the rating is the same
		// page for a crawler, and a second URL for it would only split it.

		@ $mol_mem
		page( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		pages() {
			return Math.ceil( this.rating_rows().length / page_size )
		}

		/** Clamped, so shrinking data cannot leave the view on a page that is no
		 *  longer there. */
		page_current_index() {
			return Math.max( 0, Math.min( this.page(), this.pages() - 1 ) )
		}

		@ $mol_mem
		pager_content() {

			const pages = this.pages()
			if( pages <= 1 ) return []

			const list: readonly $mol_view[] = [
				... Array.from( { length: pages }, ( _, index ) => this.Page( String( index ) ) ),
				... this.page_current_index() < pages - 1 ? [ this.Page_next() ] : [],
			]

			return list
		}

		page_label( key: string ) {
			return String( Number( key ) + 1 )
		}

		page_current( key: string ) {
			return Number( key ) === this.page_current_index()
		}

		@ $mol_action
		page_click( key: string, event?: Event ) {
			this.page( Number( key ) )
			return null
		}

		@ $mol_action
		page_next( event?: Event ) {
			this.page( Math.min( this.page_current_index() + 1, this.pages() - 1 ) )
			return null
		}

	}

}
