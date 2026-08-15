namespace $ {

	const { rem } = $mol_style_unit

	// Palette shared by all six runners, named here as variables so the dark set
	// can replace the light one in place. The values are written out rather than
	// taken from the site's tokens: a runner is its own document inside a frame
	// and the site's variables do not cross that boundary. The columns are read
	// side by side, so a difference in hue between them would be read as a
	// difference between the frameworks. The raised surface the other five
	// define has no counterpart here: nothing in this runner is filled apart
	// from the page itself, and giving one column a fill the rest lack would
	// show up as exactly that kind of difference.
	const palette_light = {
		'--versus_back': '#ffffff',
		'--versus_text': '#18181b',
		'--versus_shade': '#71717a',
		'--versus_line': '#d4d4d8',
		'--versus_line_soft': '#e4e4e7',
		'--versus_current': '#dbeafe',
		'--versus_current_text': '#1e40af',
	} as const

	const palette_dark = {
		'--versus_back': '#18181b',
		'--versus_text': '#d4d4d8',
		'--versus_shade': '#a1a1aa',
		'--versus_line': '#3f3f46',
		'--versus_line_soft': '#2f2f35',
		'--versus_current': '#1e40af',
		'--versus_current_text': '#dbeafe',
	} as const

	const {
		back,
		text,
		shade,
		line: line_color,
		line_soft,
		current,
		current_text,
	} = $mol_style_prop( 'versus', [
		'back',
		'text',
		'shade',
		'line',
		'line_soft',
		'current',
		'current_text',
	] as const )

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
		border: { bottom: { width: '1px', style: 'solid', color: line_soft } },
	} as const

	$mol_style_define( $bog_smalljs_lab, {

		flex: { direction: 'column' },
		gap: rem( 0.5 ),
		height: '100%',
		minHeight: 0,
		padding: rem( 0.75 ),
		overflow: 'hidden',
		background: { color: back },
		color: text,
		font: {
			family: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
			size: rem( 0.8125 ),
		},

		// The palette lives on the root element, so every part below it — the
		// options, the probes, the crash cards, each defined in its own block —
		// inherits the switch without repeating it.
		...palette_light,

		'@': {
			versus_lights: {
				dark: palette_dark,
			},
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

	$mol_style_define( $bog_smalljs_lab_option, {

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

	$mol_style_define( $bog_smalljs_lab_probe, {

		color: shade,

	} )

	$mol_style_define( $bog_smalljs_lab_card, {

		flex: { direction: 'column', shrink: 0 },
		minHeight: rem( 2.5 ),
		padding: { top: rem( 0.25 ), bottom: rem( 0.25 ), left: rem( 0.5 ), right: rem( 0.5 ) },
		border: { ...line, radius: rem( 0.25 ) },
		background: { color: back },

	} )

}
