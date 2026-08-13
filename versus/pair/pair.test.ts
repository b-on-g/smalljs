namespace $.$$ {

	type Meta = $bog_smalljs_versus_pair_meta
	type Measure = $bog_smalljs_versus_pair_measure

	function meta( better: Meta[ 'better' ], category = 'code' ): Meta {
		return { category, title: 'Metric', unit: '', better, human: '' }
	}

	function measure( value: number | boolean ): Measure {
		return { value, source: 'https://example.org/a/b/c', measured_at: '2026-08-13' }
	}

	/**
	 * A pair page over a made-up data set. Nothing here touches `versus/data`:
	 * the rules being checked are about how two readings are compared, and they
	 * have to hold for readings the real files do not happen to contain — a metric
	 * only one side reports, a category nobody has measured, a tie.
	 */
	function pair_over(
		metrics: Readonly< Record< string, { meta: Meta, left?: number | boolean, right?: number | boolean } > >,
		runners: { left?: boolean, right?: boolean } = { left: true, right: true },
	) {

		const view = new $bog_smalljs_versus_pair()

		view.left = ()=> 'a'
		view.right = ()=> 'b'
		view.left_title = ()=> 'A'
		view.right_title = ()=> 'B'

		view.meta = ( id: string )=> metrics[ id ]?.meta ?? null

		view.measure = ( id: string, metric: string )=> {
			const entry = metrics[ metric ]
			if( !entry ) return null
			const value = id === 'a' ? entry.left : entry.right
			return value === undefined ? null : measure( value )
		}

		view.registry_metrics = ( category: string )=> {
			return Object.keys( metrics ).filter( id => metrics[ id ].meta.category === category )
		}

		view.runner = ( id: string )=> ( id === 'a' ? runners.left : runners.right ) === true

		// The live category is decided in a browser, so a headless run has to be
		// told what happened there rather than guessing.
		view.edge_score = ()=> ( { left: 0, right: 0, total: 0 } )

		return view
	}

	$mol_test({

		'a metric only one side reports counts for nobody'() {

			const view = pair_over( {
				both: { meta: meta( 'lower' ), left: 10, right: 20 },
				lonely: { meta: meta( 'lower' ), left: 1 },
			} )

			const score = view.score( 'code' )

			// two rows are shown, one of them is scored
			$mol_assert_equal( view.rows( 'code' ).length, 2 )
			$mol_assert_equal( score.total, 1 )
			$mol_assert_equal( score.left, 1 )
			$mol_assert_equal( score.right, 0 )
		},

		'a fuller data file does not win a category on its own'() {

			// B is better on the one metric both publish; A publishes three more
			// that B does not. Counting those would hand A the category.
			const view = pair_over( {
				shared: { meta: meta( 'lower' ), left: 20, right: 10 },
				extra1: { meta: meta( 'lower' ), left: 1 },
				extra2: { meta: meta( 'lower' ), left: 1 },
				extra3: { meta: meta( 'lower' ), left: 1 },
			} )

			const score = view.score( 'code' )

			$mol_assert_equal( score.total, 1 )
			$mol_assert_equal( score.left, 0 )
			$mol_assert_equal( score.right, 1 )
		},

		'a metric neither side reports is not shown at all'() {

			const view = pair_over( {
				known: { meta: meta( 'lower' ), left: 10, right: 20 },
				unmeasured: { meta: meta( 'lower' ) },
			} )

			$mol_assert_equal( view.rows( 'code' ).map( row => row.id ), [ 'known' ] )
		},

		'a category nobody measured stays out of the verdict count'() {

			const view = pair_over( {
				one: { meta: meta( 'lower' ), left: 10, right: 20 },
				// a weight metric only A has: the category exists but decides nothing
				two: { meta: meta( 'lower', 'weight' ), left: 5 },
			} )

			$mol_assert_equal( view.decided().join(), 'code' )
			$mol_assert_equal( view.tally(), { left: 1, right: 0, ties: 0, total: 1 } )
		},

		'an equal reading is a tie, and a tie is a result'() {

			const view = pair_over( {
				same: { meta: meta( 'lower' ), left: 42, right: 42 },
			} )

			$mol_assert_equal( view.score( 'code' ), { left: 0, right: 0, total: 1 } )
			$mol_assert_equal( view.tally(), { left: 0, right: 0, ties: 1, total: 1 } )
		},

		'zero is a reading, not a missing value'() {

			const view = pair_over( {
				cve: { meta: meta( 'lower' ), left: 0, right: 3 },
			} )

			$mol_assert_equal( view.rows( 'code' ).length, 1 )
			$mol_assert_equal( view.score( 'code' ), { left: 1, right: 0, total: 1 } )
			$mol_assert_equal( view.metric_left_value( 'cve' ), '0' )
		},

		'higher-is-better flips which side the bar and the score go to'() {

			const view = pair_over( {
				stars: { meta: meta( 'higher', 'market' ), left: 100, right: 300 },
			} )

			$mol_assert_equal( view.score( 'market' ), { left: 0, right: 1, total: 1 } )
			// the longer half of the bar is always the better side
			$mol_assert_equal( view.metric_right_share( 'stars' ), '75%' )
		},

		'the bar always gives its longer half to the better side'() {

			const view = pair_over( {
				ms: { meta: meta( 'lower', 'speed' ), left: 100, right: 300 },
			} )

			$mol_assert_equal( view.metric_left_share( 'ms' ), '75%' )
			$mol_assert_equal( view.metric_right_share( 'ms' ), '25%' )
		},

		'a yes/no metric has no bar and is decided by having it'() {

			const view = pair_over( {
				router: { meta: meta( 'boolean', 'builtin' ), left: true, right: false },
			} )
			view.value_yes = ()=> 'yes'
			view.value_no = ()=> 'no'

			$mol_assert_equal( view.metric_bar( 'router' ), false )
			$mol_assert_equal( view.score( 'builtin' ), { left: 1, right: 0, total: 1 } )
			$mol_assert_equal( view.metric_left_value( 'router' ), 'yes' )
			$mol_assert_equal( view.metric_right_value( 'router' ), 'no' )
		},

		'a missing reading is a dash, never a zero'() {

			const view = pair_over( {
				lonely: { meta: meta( 'lower' ), left: 7 },
			} )

			$mol_assert_equal( view.metric_left_value( 'lonely' ), '7' )
			$mol_assert_equal( view.metric_right_value( 'lonely' ), '—' )
			$mol_assert_equal( view.metric_bar( 'lonely' ), false )
		},

		'the gap is stated against the losing side, whichever way the metric points'() {

			const lower = pair_over( { ms: { meta: meta( 'lower', 'speed' ), left: 69, right: 100 } } )
			lower.delta_below = ()=> '{a} is {p}% below {b}'
			// 31 of the loser's 100
			$mol_assert_equal( lower.metric_delta( 'ms' ), 'A is 31% below B' )

			const higher = pair_over( { stars: { meta: meta( 'higher', 'market' ), left: 150, right: 100 } } )
			higher.delta_above = ()=> '{a} is {p}% above {b}'
			// 50 of the loser's 100
			$mol_assert_equal( higher.metric_delta( 'stars' ), 'A is 50% above B' )
		},

		'a gap past a doubling is stated as a multiplier'() {

			const view = pair_over( { stars: { meta: meta( 'higher', 'market' ), left: 340, right: 100 } } )
			view.delta_times = ()=> '{a} is {p}× {b}'

			$mol_assert_equal( view.metric_delta( 'stars' ), 'A is 3.4× B' )
		},

		'a metric only one side reports says so instead of showing a winner'() {

			const view = pair_over( { lonely: { meta: meta( 'lower' ), left: 7 } } )
			view.delta_partial = ()=> 'not counted: only {a}'

			$mol_assert_equal( view.metric_delta( 'lonely' ), 'not counted: only A' )
		},

		'a live case counts only once both columns have a verdict'() {

			const view = pair_over( {} )

			$mol_assert_equal( view.case_side( 'ok', 'fail' ), 'left' )
			$mol_assert_equal( view.case_side( 'warn', 'ok' ), 'right' )
			$mol_assert_equal( view.case_side( 'warn', 'warn' ), 'tie' )
			// not run, broke, or ran under conditions that void the measurement
			$mol_assert_equal( view.case_side( 'ok', 'idle' ), 'none' )
			$mol_assert_equal( view.case_side( 'ok', 'error' ), 'none' )
			$mol_assert_equal( view.case_side( 'ok', 'invalid' ), 'none' )
			$mol_assert_equal( view.case_side( 'running', 'running' ), 'none' )
		},

		'with no runner on one side the live category decides nothing'() {

			const view = pair_over( { one: { meta: meta( 'lower' ), left: 1, right: 2 } }, { left: true } )
			view.edge_missing_one = ()=> 'no live tests for {b}'

			$mol_assert_equal( view.edge_live(), false )
			$mol_assert_equal( view.edge_missing_note(), 'no live tests for B' )
			$mol_assert_equal( view.decided().includes( 'edge' ), false )
		},

		'the verdict names the leader and spells the ties out'() {

			const view = pair_over( {} )
			view.verdict_win = ()=> '{a} wins {x} of {total} categories, {b} {y}, {ties} tied'
			view.score = ( category: string )=> {
				if( category === 'code' ) return { left: 2, right: 0, total: 2 }
				if( category === 'builtin' ) return { left: 3, right: 1, total: 4 }
				if( category === 'weight' ) return { left: 0, right: 1, total: 1 }
				if( category === 'speed' ) return { left: 1, right: 1, total: 2 }
				return { left: 0, right: 0, total: 0 }
			}

			$mol_assert_equal( view.verdict_text(), 'A wins 2 of 4 categories, B 1, one tied' )
		},

		'nothing measured means nothing claimed'() {

			const view = pair_over( {} )
			view.verdict_none = ()=> 'nothing to compare for {a} and {b}'

			$mol_assert_equal( view.tally().total, 0 )
			$mol_assert_equal( view.verdict_text(), 'nothing to compare for A and B' )
		},

		'thousands are grouped and units are kept'() {

			const view = pair_over( {
				downloads: {
					meta: { category: 'market', title: 'Downloads', unit: 'per week', better: 'higher', human: '' },
					left: 163083190,
					right: 14550122,
				},
			} )

			$mol_assert_equal( view.metric_left_value( 'downloads' ), '163,083,190 per week' )
		},

	})

}
