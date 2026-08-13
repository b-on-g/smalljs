namespace $.$$ {

	/** Categories in reading order. Edge cases come first: they are the only
	 *  thing on this page the reader can start and watch, and everything below
	 *  them is a table. */
	const categories = [ 'edge', 'code', 'weight', 'speed', 'builtin', 'market', 'cost' ] as const

	/** Canonical order of the metrics inside a category. The registry decides
	 *  which category a metric belongs to; this decides what comes first, so the
	 *  same comparison reads the same way whatever order the JSON happens to be
	 *  written in. A metric the registry knows and this list does not still
	 *  shows up — appended after the known ones — so adding a measurement does
	 *  not require touching this file. */
	const metric_order: Readonly< Record< string, readonly string[] > > = {
		code: [ 'loc_todomvc', 'files_todomvc', 'deps_direct', 'deps_transitive', 'node_modules_size' ],
		weight: [ 'bundle_gzip', 'framework_gzip', 'app_gzip', 'startup_bytes', 'tti_3g', 'lighthouse' ],
		speed: [ 'create_1k', 'update_1k', 'swap_rows', 'remove_row', 'mem_ready', 'mem_1k', 'startup_tbt' ],
		builtin: [ 'router', 'i18n', 'themes', 'virtual', 'offline', 'ssr', 'tests_nodom', 'di', 'forms', 'typed_templates' ],
		market: [ 'stars', 'npm_downloads', 'so_questions', 'jobs', 'ui_kits', 'maintainers', 'release_rate' ],
		cost: [ 'cve_tree', 'breaking_3y' ],
	}

	/** Live crash tests, in the order they run on the section page. */
	const case_ids = [ 'race', 'virtual', 'leak', 'crash' ] as const

	/** Shown wherever a value is absent. Never a zero: a zero is a reading, this
	 *  is the absence of one. */
	const no_value = '—'

	/** Live case statuses that count towards the edge score, best first. A case
	 *  that has not run, broke, or ran under conditions that make it worthless
	 *  is simply not scored. */
	const case_rank: Readonly< Record< string, number > > = { ok: 2, warn: 1, fail: 0 }

	/** Past this multiple a percentage stops reading as a quantity, so the gap
	 *  is stated as "3.4×" instead of "240% above". */
	const times_from = 2

	/** Where a suggestion goes. There is no backend behind this section, so the
	 *  form fills in a real issue rather than pretending to submit somewhere. */
	const issues_uri = 'https://github.com/b-on-g/smalljs/issues/new'

	const count_words = [ 'none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ]

	function count_word( count: number ) {
		return count_words[ count ] ?? String( count )
	}

	/** Fills `{name}` slots in a localized template. A slot with nothing to put
	 *  in it is left alone rather than blanked, so a broken translation shows
	 *  what it is missing instead of a hole. */
	function fill( template: string, vars: Readonly< Record< string, string | number > > ) {
		return template.replace( /\{(\w+)\}/g, ( whole, name: string ) => {
			const value = vars[ name ]
			return value === undefined ? whole : String( value )
		} )
	}

	/** Groups thousands and keeps at most two decimals, without going through
	 *  toLocaleString: the page is prerendered on a machine whose locale has
	 *  nothing to do with the reader's, and a separator that changes between
	 *  the prerender and the live render would flicker on hydration. */
	function number_text( value: number ) {

		const abs = Math.abs( value )
		const rounded = abs >= 100 ? Math.round( value )
			: abs >= 10 ? Math.round( value * 10 ) / 10
			: Math.round( value * 100 ) / 100

		const [ int, frac ] = String( rounded ).split( '.' )
		const grouped = int.replace( /\B(?=(\d{3})+$)/g, ',' )

		return frac ? grouped + '.' + frac : grouped
	}

	function percent_text( value: number ) {
		return value >= 10 ? String( Math.round( value ) ) : String( Math.round( value * 10 ) / 10 )
	}

	function times_text( value: number ) {
		return String( Math.round( value * 10 ) / 10 )
	}

	/** Readable stand-in for a source URL. The full address stays in the href —
	 *  this is only what the eye reads, and a line of benchmark rows each ending
	 *  in a hundred-character URL is a line nobody reads at all. Short paths are
	 *  kept whole, since that is usually the part that identifies the source. */
	function link_label( uri: string ) {

		const bare = uri
			.replace( /^https?:\/\//, '' )
			.replace( /[?#].*$/, '' )
			.replace( /\/+$/, '' )

		const parts = bare.split( '/' )
		parts[ 0 ] = parts[ 0 ].replace( /^www\./, '' )

		if( parts.length <= 3 ) return parts.join( '/' )

		return parts[ 0 ] + '/…/' + parts[ parts.length - 1 ]
	}

	/** A 0..1 share as a CSS width. Rounded before it reaches the style, so a
	 *  division that lands on 62.50000000000001 does not end up in the DOM. */
	function share_text( share: number ) {
		return Math.round( share * 1000 ) / 10 + '%'
	}

	type Measure = $bog_smalljs_versus_pair_measure

	type Row = {
		readonly id: string
		readonly meta: $bog_smalljs_versus_pair_meta
		readonly left: Measure | null
		readonly right: Measure | null
		readonly diff: $bog_smalljs_versus_pair_diff
	}

	/** Wins on each side out of the metrics both sides report. `total` is that
	 *  shared count, not the number of metrics in the category. */
	type Score = {
		readonly left: number
		readonly right: number
		readonly total: number
	}

	const score_none: Score = { left: 0, right: 0, total: 0 }

	/**
	 * One comparison of two frameworks.
	 *
	 * There is no overall score anywhere on this page, on purpose: rolling seven
	 * unlike categories into a single number would need weights, and a weight is
	 * an opinion wearing the clothes of a measurement.
	 *
	 * What a category score does mean: the share of metrics a side is better on,
	 * counted only among the metrics **both** sides report. A metric one of them
	 * has no reading for is drawn as a dash on both sides and scores for nobody.
	 * Counting it would hand the win to whoever has the fuller data file, which
	 * measures how much work went into the table rather than the framework.
	 */
	export class $bog_smalljs_versus_pair extends $.$bog_smalljs_versus_pair {

		data() {
			return this.$.$bog_smalljs_versus_pair_data
		}

		compare() {
			return this.$.$bog_smalljs_versus_pair_compare
		}

		// Every read of the data set goes through one of these four, so the page
		// can be exercised against a made-up data set without a data set being
		// present, and so a change in where the numbers live touches four lines.

		meta( metric: string ) {
			return this.data().meta( metric )
		}

		measure( id: string, metric: string ) {
			return this.data().measure( id, metric )
		}

		registry_metrics( category: string ) {
			return this.data().category_metrics( category )
		}

		runner( id: string ) {
			return this.data().framework( id ).runner === true
		}

		/** Display names come from the data files. Before a file exists the id is
		 *  shown as it stands rather than being prettied up into a name nobody
		 *  wrote down. */
		override left_title() {
			return this.data().title( this.left() )
		}

		override right_title() {
			return this.data().title( this.right() )
		}

		title_text() {
			return this.left_title() + ' vs ' + this.right_title()
		}

		head_content() {
			return [
				this.Title(),
				this.Verdict(),
				... this.verdict_note_text() ? [ this.Verdict_note() ] : [],
			]
		}

		// ---- metrics ------------------------------------------------------

		/** Metric ids of a category: the canonical order first, then anything the
		 *  registry lists that this build has never heard of. */
		metric_ids( category: string ): readonly string[] {

			const known = metric_order[ category ] ?? []
			const listed = this.registry_metrics( category )
			const rest = listed.filter( id => !known.includes( id ) )

			return [ ... known.filter( id => listed.includes( id ) ), ... rest ]
		}

		/** Rows of a category. A metric neither side reports is dropped: a wall
		 *  of dashes says nothing that the category score does not already say,
		 *  and it buries the rows that do carry a reading. A metric only one side
		 *  reports stays — it is worth seeing what is known — but it is marked as
		 *  not counted. */
		@ $mol_mem_key
		rows( category: string ): readonly Row[] {

			const left = this.left()
			const right = this.right()

			return this.metric_ids( category ).flatMap( id => {

				const meta = this.meta( id )
				if( !meta ) return []

				const left_measure = this.measure( left, id )
				const right_measure = this.measure( right, id )
				if( !left_measure && !right_measure ) return []

				return [ {
					id,
					meta,
					left: left_measure,
					right: right_measure,
					diff: this.compare().diff(
						meta.better,
						left_measure?.value,
						right_measure?.value,
					),
				} ]
			} )
		}

		row( id: string ): Row | null {
			const meta = this.meta( id )
			if( !meta ) return null
			return this.rows( meta.category ).find( row => row.id === id ) ?? null
		}

		// ---- scores -------------------------------------------------------

		@ $mol_mem_key
		score( category: string ): Score {

			if( category === 'edge' ) return this.edge_score()

			let left = 0
			let right = 0
			let total = 0

			for( const row of this.rows( category ) ) {
				if( row.diff.side === 'none' ) continue
				total += 1
				if( row.diff.side === 'left' ) left += 1
				if( row.diff.side === 'right' ) right += 1
			}

			return { left, right, total }
		}

		/** Same rule as every other category, applied to what the reader has
		 *  actually run. A case counts once both columns have a status that can
		 *  be ranked; until then it is a metric one side has no reading for, and
		 *  it scores for nobody. Which is why the verdict grows from six
		 *  categories to seven as the cases below are run, rather than claiming
		 *  an outcome for tests that have not happened. */
		@ $mol_mem
		edge_score(): Score {

			const left = this.left()
			const right = this.right()
			if( !this.edge_live() ) return score_none

			let left_wins = 0
			let right_wins = 0
			let total = 0

			for( const block of this.cases() ) {

				const side = this.case_side( block.status( left ), block.status( right ) )
				if( side === 'none' ) continue

				total += 1
				if( side === 'left' ) left_wins += 1
				if( side === 'right' ) right_wins += 1
			}

			return { left: left_wins, right: right_wins, total }
		}

		/** Which side one live case went to. Unrunnable outcomes on either side —
		 *  not started, broken, measured under conditions that void the run — make
		 *  the case count for nobody, exactly as a metric only one side reports
		 *  counts for nobody. */
		case_side( left_status: string, right_status: string ): $bog_smalljs_versus_pair_side {

			const left = case_rank[ left_status ]
			const right = case_rank[ right_status ]
			if( left === undefined || right === undefined ) return 'none'

			if( left === right ) return 'tie'
			return left > right ? 'left' : 'right'
		}

		/** Whether the live tests can decide anything for this pair at all. */
		edge_live() {
			return this.runner( this.left() ) && this.runner( this.right() )
		}

		/** Categories that have something to say. A category with no metric both
		 *  sides report is not a draw — nothing was compared — so it stays out of
		 *  the count instead of quietly padding it. */
		decided(): readonly string[] {
			return categories.filter( id => this.score( id ).total > 0 )
		}

		/** Category counts behind the verdict line. */
		@ $mol_mem
		tally() {

			let left = 0
			let right = 0
			let ties = 0

			for( const id of this.decided() ) {

				const score = this.score( id )
				const left_share = score.left / score.total
				const right_share = score.right / score.total

				if( left_share > right_share ) left += 1
				else if( right_share > left_share ) right += 1
				else ties += 1
			}

			return { left, right, ties, total: left + right + ties }
		}

		// ---- verdict ------------------------------------------------------

		verdict_text() {

			const tally = this.tally()
			const left_name = this.left_title()
			const right_name = this.right_title()

			if( !tally.total ) return fill( this.verdict_none(), { a: left_name, b: right_name } )

			if( tally.left === tally.right ) return fill( this.verdict_draw(), {
				a: left_name,
				b: right_name,
				x: tally.left,
				total: tally.total,
				ties: count_word( tally.ties ),
			} )

			const left_wins = tally.left > tally.right

			return fill( this.verdict_win(), {
				a: left_wins ? left_name : right_name,
				b: left_wins ? right_name : left_name,
				x: left_wins ? tally.left : tally.right,
				y: left_wins ? tally.right : tally.left,
				total: tally.total,
				ties: count_word( tally.ties ),
			} )
		}

		/** What the verdict line does not cover: the live category while it is
		 *  still unrun, and the static ones nobody has measured for this pair. */
		verdict_note_text() {

			const parts: string[] = []

			if( !this.edge_live() ) {
				// Says what the missing runner means for the count. The case blocks
				// below carry their own line about what it means for them.
				parts.push(
					this.runner( this.left() ) || this.runner( this.right() )
						? fill( this.verdict_note_no_runner(), {
							b: this.runner( this.left() ) ? this.right_title() : this.left_title(),
						} )
						: this.verdict_note_no_runner_both()
				)
			} else if( !this.score( 'edge' ).total ) {
				parts.push( this.verdict_note_edge() )
			}

			const gaps = categories.length - 1 - this.decided().filter( id => id !== 'edge' ).length

			if( gaps === 1 ) parts.push( this.verdict_note_gap_one() )
			else if( gaps > 1 ) parts.push( fill( this.verdict_note_gaps(), { n: gaps } ) )

			return parts.join( ' ' )
		}

		// ---- sections -----------------------------------------------------

		sections() {
			return categories.map( id => this.Section( id ) )
		}

		section_title( category: string ) {
			switch( category ) {
				case 'edge': return this.category_edge()
				case 'code': return this.category_code()
				case 'weight': return this.category_weight()
				case 'speed': return this.category_speed()
				case 'builtin': return this.category_builtin()
				case 'market': return this.category_market()
				case 'cost': return this.category_cost()
				default: return category
			}
		}

		section_note( category: string ) {
			switch( category ) {
				case 'edge': return this.note_edge()
				case 'code': return this.note_code()
				case 'weight': return this.note_weight()
				case 'speed': return this.note_speed()
				case 'builtin': return this.note_builtin()
				case 'market': return this.note_market()
				case 'cost': return this.note_cost()
				default: return ''
			}
		}

		section_score( category: string ) {

			const score = this.score( category )
			const left_name = this.left_title()
			const right_name = this.right_title()

			if( !score.total ) {
				if( category !== 'edge' ) return this.score_empty()
				return this.edge_live() ? this.edge_score_empty() : this.edge_score_no_runner()
			}

			const line = fill( category === 'edge' ? this.edge_score_line() : this.score_line(), {
				a: left_name,
				b: right_name,
				x: score.left,
				y: score.right,
				n: score.total,
			} )

			const outcome = score.left === score.right
				? this.score_tied()
				: fill( this.score_ahead(), { a: score.left > score.right ? left_name : right_name } )

			return line + ' · ' + outcome
		}

		section_content( category: string ): readonly $mol_view[] {

			if( category === 'edge' ) return this.cases()

			const rows = this.rows( category )
			if( !rows.length ) return []

			return [ this.Names( category ), ... rows.map( row => this.Metric( row.id ) ) ]
		}

		// ---- one metric row -----------------------------------------------

		metric_title( id: string ) {
			return this.row( id )?.meta.title ?? id
		}

		metric_human( id: string ) {
			return this.row( id )?.meta.human ?? ''
		}

		/** Whether both sides have a reading. Only a shared metric is ever printed
		 *  as a pair of values; see `metric_left_value` for why. */
		shared( id: string ) {
			const row = this.row( id )
			return !!row?.left && !!row?.right
		}

		/** How the number was obtained — the same procedure for both sides, which
		 *  is what makes the two comparable at all. Printed next to the row rather
		 *  than hidden behind the methodology link at the bottom: a reader who
		 *  doubts one number should not have to go looking for what it means. */
		metric_method( id: string ) {
			return this.shared( id ) ? this.row( id )?.meta.method ?? '' : ''
		}

		value_text( measure: Measure | null, meta: $bog_smalljs_versus_pair_meta | undefined ) {

			if( !measure ) return no_value

			const value = measure.value

			if( typeof value === 'boolean' ) return value ? this.value_yes() : this.value_no()
			if( typeof value === 'string' ) return value

			const unit = meta?.unit ?? ''
			const text = number_text( value )

			if( !unit ) return text
			return unit === '%' ? text + unit : text + ' ' + unit
		}

		metric_left_value( id: string ) {
			const row = this.row( id )
			return this.value_text( row?.left ?? null, row?.meta )
		}

		metric_right_value( id: string ) {
			const row = this.row( id )
			return this.value_text( row?.right ?? null, row?.meta )
		}

		/** Left's share of the bar, or null when this row has no honest bar. */
		metric_share( id: string ) {
			return this.row( id )?.diff.share ?? null
		}

		metric_bar( id: string ) {
			return this.metric_share( id ) !== null
		}

		/** Which half of the bar is the better one. The length already says it,
		 *  but the colour has to agree: a fixed green on the left would read as
		 *  "left is good" and would be wrong on every row the right side wins. */
		metric_lead( id: string ) {
			const side = this.row( id )?.diff.side
			return side === 'left' || side === 'right' ? side : ''
		}

		metric_left_share( id: string ) {
			return share_text( this.metric_share( id ) ?? 0.5 )
		}

		metric_right_share( id: string ) {
			return share_text( 1 - ( this.metric_share( id ) ?? 0.5 ) )
		}

		/** The sentence next to the bar. Every wording states its own base — a
		 *  percentage is always measured against the losing side — because "62%
		 *  faster" is ambiguous about what it is 62% of, and an ambiguous number
		 *  is the kind a reader is right to distrust. */
		metric_delta( id: string ) {

			const row = this.row( id )
			if( !row ) return ''

			const left_name = this.left_title()
			const right_name = this.right_title()
			const boolean = row.meta.better === 'boolean'

			if( row.diff.side === 'none' ) {

				if( row.left && row.right ) return ''

				return fill( this.delta_partial(), { a: row.left ? left_name : right_name } )
			}

			if( row.diff.side === 'tie' ) {
				if( !boolean ) return this.delta_tie()
				return row.left?.value === true ? this.delta_both() : this.delta_neither()
			}

			const winner = row.diff.side === 'left' ? left_name : right_name
			const loser = row.diff.side === 'left' ? right_name : left_name

			if( boolean ) return fill( this.delta_only(), { a: winner } )

			const { percent, times } = row.diff

			if( times !== null && percent !== null && times >= times_from ) {
				return fill( this.delta_times(), { a: winner, p: times_text( times ), b: loser } )
			}

			if( percent === null ) return fill( this.delta_ahead(), { a: winner } )
			if( Math.round( percent * 10 ) === 0 ) return ''

			const template = row.meta.better === 'lower' ? this.delta_below() : this.delta_above()

			return fill( template, { a: winner, p: percent_text( percent ), b: loser } )
		}

		// ---- sources -------------------------------------------------------

		/** One line per side that has a reading, so a row built from two
		 *  measurements taken on different days cannot hide that. */
		metric_sources( id: string ) {

			const row = this.row( id )
			if( !row ) return []

			return [
				... row.left ? [ this.Source( id + '/left' ) ] : [],
				... row.right ? [ this.Source( id + '/right' ) ] : [],
			]
		}

		source_measure( key: string ) {
			const slash = key.lastIndexOf( '/' )
			const row = this.row( key.slice( 0, slash ) )
			return key.slice( slash + 1 ) === 'left' ? row?.left : row?.right
		}

		source_name( key: string ) {
			return key.endsWith( '/left' ) ? this.left_title() : this.right_title()
		}

		/** Whichever of the two links is an address a reader can open. `source`
		 *  can be a path in the repository, which is worth printing but is not a
		 *  link; `method` is the page describing how the number was taken. */
		source_uri( key: string ) {

			const measure = this.source_measure( key )
			if( !measure ) return ''

			if( /^https?:\/\//.test( measure.source ) ) return measure.source
			if( /^https?:\/\//.test( measure.method ?? '' ) ) return measure.method ?? ''

			return ''
		}

		source_label( key: string ) {

			const measure = this.source_measure( key )
			if( !measure ) return ''

			const uri = this.source_uri( key )
			if( uri ) return link_label( uri )

			return measure.source || this.no_data()
		}

		source_date( key: string ) {
			return this.source_measure( key )?.measured_at ?? ''
		}

		// ---- live cases -----------------------------------------------------

		cases() {
			return [
				this.Case_race(),
				this.Case_virtual(),
				this.Case_leak(),
				this.Case_crash(),
			]
		}

		/** Said once, under the Run button of every case, when one of the pair has
		 *  no runner. Written here rather than in the case block because only the
		 *  page knows what the two are called. */
		edge_missing_note() {

			const left_runner = this.runner( this.left() )
			const right_runner = this.runner( this.right() )

			if( left_runner && right_runner ) return ''
			if( !left_runner && !right_runner ) return this.edge_missing_both()

			return fill( this.edge_missing_one(), { b: left_runner ? this.right_title() : this.left_title() } )
		}

		// ---- suggestion -----------------------------------------------------

		suggest_uri() {

			const name = this.suggest_name().trim()

			const title = 'Add ' + ( name || 'a framework' ) + ' to the comparison'
			const body = [
				'Framework: ' + ( name || '' ),
				'Home page: ',
				'',
				'What it would take: a data file under versus/data/ with sources and dates for each metric,',
				'and a runner page if the live edge cases should cover it too.',
			].join( '\n' )

			return issues_uri
				+ '?title=' + encodeURIComponent( title )
				+ '&body=' + encodeURIComponent( body )
		}

	}

	/**
	 * The crash-test block of the section page, narrowed to the two frameworks
	 * of this pair. Everything else about it — the protocol, the timeouts, the
	 * visibility rules — is inherited untouched, so a case behaves here exactly
	 * as it does on the section page and the two pages cannot drift apart.
	 */
	export class $bog_smalljs_versus_pair_case extends $.$bog_smalljs_versus_pair_case {

		/** Only the sides that have a runner. A framework nobody wrote a runner
		 *  for gets no column rather than an empty one: an empty frame next to a
		 *  working one reads as a failure, and it is not one. */
		frameworks() {
			return [ this.left(), this.right() ].filter( id => {
				return id ? this.$.$bog_smalljs_versus_pair_data.framework( id ).runner : false
			} )
		}

		/** The section page always has three columns and says so in its stylesheet.
		 *  Here the count depends on how many of the pair have a runner, so it has
		 *  to reach the stylesheet as an attribute — otherwise a pair with one
		 *  runner leaves two thirds of the block empty and reads as two frames
		 *  that failed to load. */
		columns_count() {
			return this.frameworks().length
		}

		/** With no runnable column there is nothing to run, so the button goes
		 *  and only the explanation stays. */
		override controls_content() {

			const note = this.missing_note() ? [ this.Missing_note() ] : []
			if( !this.frameworks().length ) return note

			return [ ... super.controls_content(), ... note ]
		}

	}

	export class $bog_smalljs_versus_pair_section extends $.$bog_smalljs_versus_pair_section {

		head_content() {
			return [
				this.Title(),
				... this.score() ? [ this.Score() ] : [],
			]
		}

		section_content() {
			return [
				this.Head(),
				... this.note() ? [ this.Note() ] : [],
				... this.content().length ? [ this.Content() ] : [],
			]
		}

	}

	export class $bog_smalljs_versus_pair_metric extends $.$bog_smalljs_versus_pair_metric {

		/** The middle cell is always there, with or without a bar, so the values
		 *  of every row line up down the page whether or not a particular metric
		 *  can be drawn as a proportion. */
		row_content() {
			return [
				this.Value_left(),
				this.bar() ? this.Bar() : this.Gap(),
				this.Value_right(),
			]
		}

		metric_content() {
			return [
				this.Title(),
				this.Row(),
				... this.delta() ? [ this.Delta() ] : [],
				... this.human() ? [ this.Human() ] : [],
				... this.method() ? [ this.Method() ] : [],
				... this.sources().length ? [ this.Sources() ] : [],
			]
		}

	}

	export class $bog_smalljs_versus_pair_source extends $.$bog_smalljs_versus_pair_source {

		source_content() {
			return [
				this.Name(),
				this.uri() ? this.Link() : this.Text(),
				... this.date() ? [ this.Taken() ] : [],
			]
		}

	}

}
