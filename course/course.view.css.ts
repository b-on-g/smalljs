namespace $ {

	const { rem } = $mol_style_unit

	const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } as const

	$mol_style_define( $bog_smalljs_course, {

		display: 'grid',
		gridTemplateColumns: '22rem 1fr',
		flex: { grow: 1 },
		minHeight: 0,
		height: $mol_style_func.calc( '100vh - 4rem' ),
		background: { color: $bog_builderui_tokens.back },

		Aside: {
			flex: { direction: 'column' },
			minHeight: 0,
			overflow: { y: 'auto' },
			gap: $mol_gap.block,
			padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem( 1.25 ), right: rem( 1.25 ) },
			border: { right: line },
		},

		Lesson_list: {
			flex: { direction: 'column' },
			gap: rem( 0.0625 ),
			padding: { bottom: rem( 0.5 ) },
			border: { bottom: line },
		},

		Lesson_link: {
			flex: { direction: 'row' },
			justify: { content: 'flex-start' },
			padding: { top: rem( 0.3 ), bottom: rem( 0.3 ), left: rem( 0.5 ), right: rem( 0.5 ) },
			border: { radius: rem( 0.375 ) },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 0.8125 ), weight: 500 },

			':hover': { background: { color: $bog_builderui_tokens.hover }, color: $bog_builderui_tokens.text },

			'@': {
				mol_link_current: {
					true: {
						color: $bog_builderui_tokens.special,
						background: { color: $bog_builderui_tokens.hover },
						font: { weight: 600 },
					},
				},
			},
		},

		Instruction: {
			flex: { direction: 'column' },
		},

		Status: {
			padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 0.75 ), right: rem( 0.75 ) },
			border: { radius: rem( 0.375 ) },
			background: { color: $bog_builderui_tokens.card },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 0.8125 ) },
		},

		Controls: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			justify: { content: 'space-between' },
			gap: $mol_gap.text,
		},

		Solution_block: {
			flex: { direction: 'column' },
		},

		Editor_host: {
			display: 'flex',
			minWidth: 0,
			minHeight: 0,
		},

		'@media': {
			'(max-width: 47.9375rem)': {
				gridTemplateColumns: '1fr',
				gridTemplateRows: 'auto auto',
				height: 'auto',
				Aside: {
					flex: { direction: 'column' },
					minHeight: 0,
					overflow: { y: 'visible' },
					gap: $mol_gap.block,
					padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem( 1.25 ), right: rem( 1.25 ) },
					border: { right: { width: '0px', style: 'solid', color: $bog_builderui_tokens.line }, bottom: line },
				},
			},
		},

	} )

}
