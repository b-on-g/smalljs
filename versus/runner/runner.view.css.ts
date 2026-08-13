namespace $ {

	const { rem } = $mol_style_unit

	// Plain neutral palette instead of theme tokens: the three runner pages of a
	// case sit side by side and have to look the same, and the React and Vue
	// pages have no theme to read from.
	const text = '#18181b'
	const shade = '#71717a'
	const line_color = '#d4d4d8'
	const card = '#ffffff'
	const back = '#fafafa'
	const current = '#e0e7ff'
	const current_text = '#3730a3'

	const line = { width: '1px', style: 'solid', color: line_color } as const

	// mol_view ships with flex-shrink: 0, so every pane that has to fit the
	// frame instead of growing past it says shrink: 1 on its own.
	const pane = {
		flex: { direction: 'column', grow: 1, shrink: 1 },
		minHeight: 0,
		minWidth: 0,
	} as const

	const scroller = {
		flex: { grow: 1, shrink: 1 },
		minHeight: 0,
		border: { width: '1px', style: 'solid', color: line_color, radius: rem( 0.25 ) },
		background: { color: back },
	} as const

	const hint = {
		flex: { shrink: 0 },
		color: shade,
		font: { size: rem( 0.75 ) },
	} as const

	const row = {
		padding: { top: rem( 0.25 ), bottom: rem( 0.25 ), left: rem( 0.5 ), right: rem( 0.5 ) },
		border: { bottom: { width: '1px', style: 'solid', color: line_color } },
	} as const

	$mol_style_define( $bog_smalljs_versus_runner, {

		flex: { direction: 'column' },
		gap: rem( 0.5 ),
		height: '100%',
		minHeight: 0,
		padding: rem( 0.75 ),
		overflow: 'hidden',
		background: { color: card },
		color: text,
		font: {
			family: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
			size: rem( 0.8125 ),
		},

		Race: {
			flex: { direction: 'row', grow: 1, shrink: 1 },
			gap: rem( 0.5 ),
			minHeight: 0,
		},

		Race_options: {
			flex: { direction: 'column', shrink: 0 },
			gap: rem( 0.25 ),
			minWidth: rem( 6 ),
		},

		Race_panel: {
			...pane,
			gap: rem( 0.25 ),
			padding: rem( 0.5 ),
			border: { ...line, radius: rem( 0.25 ) },
			background: { color: back },
		},

		Race_panel_name: {
			minHeight: rem( 1.25 ),
			font: { weight: 600 },
		},

		Race_panel_descr: {
			minHeight: rem( 1.25 ),
			color: shade,
		},

		Virtual: pane,

		Virtual_scroll: scroller,

		Virtual_placeholder: {
			...row,
			color: shade,
		},

		Virtual_list: {
			flex: { direction: 'column' },
		},

		Virtual_row: row,

		Leak: {
			...pane,
			gap: rem( 0.5 ),
		},

		Leak_hint: hint,

		Leak_place: {
			flex: { direction: 'column', shrink: 0 },
			minHeight: rem( 2 ),
			padding: rem( 0.5 ),
			border: { ...line, radius: rem( 0.25 ) },
			background: { color: back },
		},

		Crash: pane,

		Crash_scroll: scroller,

		Crash_list: {
			flex: { direction: 'column' },
			gap: rem( 0.25 ),
			padding: rem( 0.25 ),
		},

	} )

	$mol_style_define( $bog_smalljs_versus_runner_option, {

		flex: { grow: 0, shrink: 0 },
		justify: { content: 'flex-start' },
		minHeight: rem( 1.75 ),
		padding: { top: rem( 0.25 ), bottom: rem( 0.25 ), left: rem( 0.5 ), right: rem( 0.5 ) },
		border: { radius: rem( 0.25 ) },
		font: { size: rem( 0.8125 ) },
		color: text,

		'@': {
			versus_current: {
				true: {
					background: { color: current },
					color: current_text,
				},
			},
		},

	} )

	$mol_style_define( $bog_smalljs_versus_runner_probe, {

		color: shade,

	} )

	$mol_style_define( $bog_smalljs_versus_runner_card, {

		flex: { direction: 'column', shrink: 0 },
		minHeight: rem( 2.5 ),
		padding: { top: rem( 0.25 ), bottom: rem( 0.25 ), left: rem( 0.5 ), right: rem( 0.5 ) },
		border: { ...line, radius: rem( 0.25 ) },
		background: { color: card },

	} )

}
