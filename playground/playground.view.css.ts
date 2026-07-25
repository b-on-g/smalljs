namespace $ {

	const { rem } = $mol_style_unit

	const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } as const

	const label = {
		flex: { shrink: 0 },
		padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 0.875 ), right: rem( 0.875 ) },
		font: { size: rem( 0.6875 ), weight: 700 },
		color: $bog_builderui_tokens.shade,
		textTransform: 'uppercase',
		letterSpacing: rem( 0.03 ),
		background: { color: $bog_builderui_tokens.back },
		border: { bottom: line },
	} as const

	const pane = {
		flex: { direction: 'column' },
		minWidth: 0,
		minHeight: 0,
		overflow: { x: 'hidden', y: 'hidden' },
	} as const

	$mol_style_define( $bog_smalljs_playground, {

		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		flex: { grow: 1 },
		minHeight: 0,
		height: $mol_style_func.calc( '100vh - 4rem' ),
		background: { color: $bog_builderui_tokens.back },

		Editor_pane: {
			...pane,
			border: { right: line },
		},

		Preview_pane: pane,

		Editor_label: label,
		Preview_label: label,

		Editor: {
			flex: { grow: 1 },
			minHeight: 0,
			border: { radius: rem( 0 ) },
			font: { family: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', size: rem( 0.8125 ) },
		},

		Preview: {
			flex: { direction: 'column', grow: 1 },
			minHeight: 0,
			overflow: { y: 'auto' },
			padding: $mol_gap.block,
			color: $bog_builderui_tokens.text,
		},

		'@media': {
			'(max-width: 47.9375rem)': {
				gridTemplateColumns: '1fr',
				gridTemplateRows: '1fr 1fr',
				Editor_pane: {
					...pane,
					border: { right: { width: '0px', style: 'solid', color: $bog_builderui_tokens.line }, bottom: line },
				},
			},
		},

	} )

}
