namespace $ {

	const { rem, px } = $mol_style_unit

	const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } as const

	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

	// Verdict colours. Not theme tokens: the palette has no ok/warn/fail slots,
	// and these mid-tones stay legible on both the light and the dark card.
	const verdict_ok = '#3f9e57'
	const verdict_warn = '#bb8218'
	const verdict_fail = '#d2564f'

	$mol_style_define( $bog_smalljs_versus_case, {

		flex: { direction: 'column' },
		gap: rem( 1 ),
		padding: rem( 1.25 ),
		border: { radius: rem( 0.75 ), ... line },
		background: { color: $bog_builderui_tokens.card },

		Head: {
			flex: { direction: 'column' },
			gap: rem( 0.35 ),
		},

		Title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.25 ), weight: 600 },
			lineHeight: '1.25',
			color: $bog_builderui_tokens.text,
		},

		Hint: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.shade,
		},

		Controls: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			gap: rem( 0.75 ),
		},

		Run: {
			flex: { grow: 0, shrink: 0 },
			padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 1.25 ), right: rem( 1.25 ) },
			border: { radius: rem( 0.375 ) },
			font: { weight: 600 },

			// $mol_button renders a custom tag, not <button>, so :disabled never
			// matches and the base sheet leaves a disabled button looking active.
			'@': {
				disabled: {
					true: { opacity: 0.45 },
				},
			},
		},

		Run_hint: {
			display: 'block',
			flex: { shrink: 1 },
			minWidth: 0,
			font: { size: rem( 0.8125 ) },
			lineHeight: '1.45',
			color: $bog_builderui_tokens.shade,
		},

		Columns: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
			gap: rem( 0.75 ),
		},

		Column: {
			flex: { direction: 'column' },
			// without it the frame's intrinsic width wins over the grid track
			minWidth: 0,
			gap: rem( 0.5 ),
			padding: rem( 0.75 ),
			border: { radius: rem( 0.5 ), ... line },
			background: { color: $bog_builderui_tokens.back },
		},

		Label: {
			display: 'block',
			font: { family: mono, size: rem( 0.6875 ), weight: 600 },
			letterSpacing: rem( 0.06 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
		},

		Frame: {
			display: 'block',
			width: '100%',
			height: px( 320 ),
			minWidth: 0,
			border: { radius: rem( 0.375 ), ... line },
			// the runner pages paint a light surface of their own
			background: { color: '#ffffff' },
		},

		Card: {
			flex: { direction: 'column' },
			minWidth: 0,
			gap: rem( 0.4 ),
		},

		Observed: {
			display: 'block',
			font: { size: rem( 0.875 ) },
			lineHeight: '1.45',
			color: $bog_builderui_tokens.text,
		},

		Metrics: {
			flex: { direction: 'column' },
			gap: rem( 0.15 ),
		},

		Metric: {
			flex: { direction: 'row', wrap: 'wrap' },
			justify: { content: 'space-between' },
			gap: rem( 0.5 ),
			font: { size: rem( 0.8125 ) },
		},

		Metric_name: {
			display: 'block',
			color: $bog_builderui_tokens.shade,
		},

		Metric_value: {
			display: 'block',
			font: { family: mono },
			color: $bog_builderui_tokens.text,
		},

		Note: {
			display: 'block',
			padding: { top: rem( 0.4 ) },
			border: { top: line },
			font: { size: rem( 0.75 ) },
			lineHeight: '1.45',
			color: $bog_builderui_tokens.shade,
		},

		'@media': {
			// same breakpoint the other sections of the site fold at
			'(max-width: 47.9375rem)': {
				Columns: {
					gridTemplateColumns: '1fr',
				},
			},
		},

	} )

	$mol_style_define( $bog_smalljs_versus_case_status, {

		flex: { direction: 'row', wrap: 'wrap' },
		align: { items: 'baseline' },
		gap: rem( 0.4 ),
		font: { size: rem( 0.875 ), weight: 600 },
		color: $bog_builderui_tokens.shade,

		Icon: {
			display: 'block',
			flex: { shrink: 0 },
		},

		Text: {
			display: 'block',
		},

		// ok / warn / fail are peer verdicts and get equal weight — warn is the
		// whole band between the two thresholds, not a rare edge. error is a
		// breakage, so it borrows the same red; invalid stays uncoloured on
		// purpose, since nothing was decided and the reader is only asked to
		// run it again.
		'@': {
			bog_smalljs_versus_status: {
				ok: { color: verdict_ok },
				warn: { color: verdict_warn },
				fail: { color: verdict_fail },
				error: { color: verdict_fail },
			},
		},

	} )

}
