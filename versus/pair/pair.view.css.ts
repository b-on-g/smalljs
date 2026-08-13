namespace $ {

	const { rem } = $mol_style_unit

	const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } as const

	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

	// One editorial column for prose and a wider one for the sections, which hold
	// the runner frames and the three-column metric rows.
	const prose = rem( 48 )
	const wide = rem( 76 )

	// The two halves of a metric bar. Not theme tokens: the palette has no
	// winner/loser slots, and these mid-tones stay legible on both themes. The
	// leading half is the better one whichever way the metric points, so the
	// colours mean the same thing in every row.
	const bar_ahead = '#3f9e57'
	const bar_behind = '#8a8f98'

	$mol_style_define( $bog_smalljs_versus_pair, {

		flex: { direction: 'column', grow: 1 },
		align: { items: 'center' },
		gap: rem( 3 ),
		minWidth: 0,
		padding: { top: rem( 3.5 ), bottom: rem( 4 ), left: $mol_gap.block, right: $mol_gap.block },
		background: { color: $bog_builderui_tokens.back },

		Head: {
			flex: { direction: 'column' },
			gap: rem( 0.75 ),
			// width:100% (not just max-width) so the column never collapses to its
			// max-content width and pushes the page sideways on a phone.
			width: '100%',
			maxWidth: prose,
		},

		Title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 2.75 ), weight: 500 },
			lineHeight: '1.14',
			letterSpacing: '-0.02em',
			color: $bog_builderui_tokens.text,
			maxWidth: '100%',
			overflowWrap: 'break-word',
		},

		Verdict: {
			display: 'block',
			font: { size: rem( 1.125 ), weight: 600 },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.text,
		},

		Verdict_note: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,
		},

		Sections: {
			flex: { direction: 'column' },
			gap: rem( 3 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Method: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			gap: rem( 0.75 ),
			width: '100%',
			maxWidth: prose,
			padding: { top: rem( 2 ) },
			border: { top: line },
		},

		Method_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Method_text: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,
		},

		Method_link: {
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			margin: { top: rem( 0.25 ) },
			color: $bog_builderui_tokens.control,
			font: { size: rem( 0.9375 ), weight: 600 },

			':hover': { color: $bog_builderui_tokens.focus },
		},

		Method_link_icon: {
			width: rem( 0.9 ),
			height: rem( 0.9 ),
			flex: { shrink: 0 },
		},

		Suggest: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			gap: rem( 0.75 ),
			width: '100%',
			maxWidth: prose,
			padding: { top: rem( 2 ) },
			border: { top: line },
		},

		Suggest_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Suggest_text: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,
		},

		Suggest_form: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			gap: rem( 0.5 ),
			margin: { top: rem( 0.25 ) },
			width: '100%',
		},

		Suggest_field: {
			flex: { grow: 1, shrink: 1 },
			// without it the input keeps its intrinsic width and pushes the button
			// off the row on a narrow screen
			minWidth: rem( 12 ),
			maxWidth: rem( 20 ),
			padding: { top: rem( 0.4 ), bottom: rem( 0.4 ), left: rem( 0.6 ), right: rem( 0.6 ) },
			border: { radius: rem( 0.375 ), ... line },
			background: { color: $bog_builderui_tokens.field },
			color: $bog_builderui_tokens.text,
		},

		Suggest_send: {
			flex: { direction: 'row', grow: 0, shrink: 0 },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			padding: { top: rem( 0.45 ), bottom: rem( 0.45 ), left: rem( 0.9 ), right: rem( 0.9 ) },
			border: { radius: rem( 0.375 ), ... line },
			color: $bog_builderui_tokens.control,
			font: { size: rem( 0.9375 ), weight: 600 },

			':hover': { color: $bog_builderui_tokens.focus },
		},

		Suggest_send_icon: {
			width: rem( 0.9 ),
			height: rem( 0.9 ),
			flex: { shrink: 0 },
		},

		'@media': {

			'(max-width: 47.9375rem)': {
				gap: rem( 2.25 ),
				padding: { top: rem( 2 ), bottom: rem( 2.5 ), left: rem( 1.25 ), right: rem( 1.25 ) },

				Title: { font: { size: rem( 2 ) } },

				Sections: { gap: rem( 2.25 ) },

				Method: { padding: { top: rem( 1.5 ) } },

				Suggest: { padding: { top: rem( 1.5 ) } },
			},

		},

	} )

	$mol_style_define( $bog_smalljs_versus_pair_section, {

		flex: { direction: 'column' },
		gap: rem( 0.75 ),
		minWidth: 0,

		Head: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'baseline' },
			justify: { content: 'space-between' },
			gap: rem( 0.5 ),
		},

		Title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Score: {
			display: 'block',
			font: { size: rem( 0.875 ), weight: 600 },
			lineHeight: '1.4',
			color: $bog_builderui_tokens.shade,
		},

		Note: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			maxWidth: rem( 42 ),
			color: $bog_builderui_tokens.shade,
		},

		Content: {
			flex: { direction: 'column' },
			gap: rem( 0.75 ),
			minWidth: 0,
		},

	} )

	$mol_style_define( $bog_smalljs_versus_pair_names, {

		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1fr)',
		align: { items: 'baseline' },
		gap: rem( 0.75 ),
		// matches the metric card's own padding plus its 1px border, so the two
		// framework names sit exactly over the columns of values below them
		padding: { bottom: rem( 0.15 ), left: rem( 0.8125 ), right: rem( 0.8125 ) },

		Left: {
			display: 'block',
			textAlign: 'right',
			font: { family: mono, size: rem( 0.6875 ), weight: 600 },
			letterSpacing: rem( 0.06 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
			overflowWrap: 'break-word',
		},

		Middle: {
			display: 'block',
		},

		Right: {
			display: 'block',
			font: { family: mono, size: rem( 0.6875 ), weight: 600 },
			letterSpacing: rem( 0.06 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
			overflowWrap: 'break-word',
		},

		'@media': {
			'(max-width: 47.9375rem)': {
				gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
			},
		},

	} )

	$mol_style_define( $bog_smalljs_versus_pair_metric, {

		flex: { direction: 'column' },
		gap: rem( 0.3 ),
		minWidth: 0,
		padding: rem( 0.75 ),
		border: { radius: rem( 0.5 ), ... line },
		background: { color: $bog_builderui_tokens.card },

		Title: {
			display: 'block',
			font: { size: rem( 0.9375 ), weight: 600 },
			lineHeight: '1.35',
			color: $bog_builderui_tokens.text,
		},

		Row: {
			display: 'grid',
			gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1fr)',
			align: { items: 'center' },
			gap: rem( 0.75 ),
			padding: { top: rem( 0.15 ), bottom: rem( 0.15 ) },
		},

		Value_left: {
			display: 'block',
			textAlign: 'right',
			font: { family: mono, size: rem( 1 ) },
			color: $bog_builderui_tokens.text,
			overflowWrap: 'break-word',
		},

		Value_right: {
			display: 'block',
			font: { family: mono, size: rem( 1 ) },
			color: $bog_builderui_tokens.text,
			overflowWrap: 'break-word',
		},

		Gap: {
			display: 'block',
		},

		Bar: {
			display: 'flex',
			flex: { direction: 'row' },
			height: rem( 0.5 ),
			minWidth: 0,
			border: { radius: rem( 0.25 ) },
			overflow: 'hidden',
			background: { color: $bog_builderui_tokens.line },
		},

		Bar_left: {
			display: 'block',
			flex: { shrink: 0 },
			background: { color: bar_ahead },
		},

		Bar_right: {
			display: 'block',
			flex: { shrink: 0 },
			background: { color: bar_behind },
		},

		Delta: {
			display: 'block',
			font: { size: rem( 0.875 ), weight: 600 },
			lineHeight: '1.45',
			color: $bog_builderui_tokens.text,
		},

		Human: {
			display: 'block',
			font: { size: rem( 0.875 ) },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.shade,
		},

		Sources: {
			flex: { direction: 'row', wrap: 'wrap' },
			gap: [ rem( 0.15 ), rem( 1 ) ],
			padding: { top: rem( 0.35 ) },
			margin: { top: rem( 0.15 ) },
			border: { top: line },
		},

		'@media': {
			'(max-width: 47.9375rem)': {
				Row: {
					gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
				},
				Value_left: { font: { size: rem( 0.9375 ) } },
				Value_right: { font: { size: rem( 0.9375 ) } },
			},
		},

	} )

	$mol_style_define( $bog_smalljs_versus_pair_source, {

		flex: { direction: 'row', wrap: 'wrap' },
		align: { items: 'baseline' },
		gap: rem( 0.35 ),
		minWidth: 0,
		font: { size: rem( 0.75 ) },
		lineHeight: '1.45',
		color: $bog_builderui_tokens.shade,

		Name: {
			display: 'block',
			font: { weight: 600 },
		},

		Link: {
			display: 'inline',
			minWidth: 0,
			color: $bog_builderui_tokens.control,
			overflowWrap: 'break-word',

			':hover': { color: $bog_builderui_tokens.focus },
		},

		Text: {
			display: 'block',
			minWidth: 0,
			font: { family: mono },
			overflowWrap: 'break-word',
		},

		Taken: {
			display: 'block',
			font: { family: mono },
		},

	} )

	$mol_style_define( $bog_smalljs_versus_pair_case, {

		Missing_note: {
			display: 'block',
			flex: { shrink: 1 },
			minWidth: 0,
			font: { size: rem( 0.8125 ) },
			lineHeight: '1.45',
			color: $bog_builderui_tokens.shade,
		},

	} )

}
