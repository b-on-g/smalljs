namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_structure, {

		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr)',
		gap: rem( 1.5 ),
		align: { items: 'start' },

		Tree: {
			flex: { direction: 'column' },
			minWidth: 0,
			overflow: { x: 'auto' },
			padding: {
				top: rem( 0.75 ),
				bottom: rem( 0.75 ),
				left: rem( 0.25 ),
				right: rem( 0.25 ),
			},
			border: {
				radius: rem( 0.5 ),
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
			},
			background: { color: $bog_builderui_tokens.card },
		},

		Steps: {
			flex: { direction: 'column' },
			gap: rem( 0.75 ),
			minWidth: 0,
		},

		Steps_title: {
			font: { size: rem( 0.75 ), weight: 700 },
			letterSpacing: rem( 0.03 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
			padding: { bottom: rem( 0.25 ) },
		},

		// Внутри чужой панели (песочница) рамка и фон только мешают: у панели свои.
		'@': {
			bog_smalljs_structure_plain: {
				true: {
					Tree: {
						padding: 0,
						border: {
							radius: 0,
							width: '0px',
							style: 'solid',
							color: $bog_builderui_tokens.line,
						},
						background: { color: 'transparent' },
					},
				},
			},
		},

		'@media': {

			// Side by side once there is room for both columns; stacked below that,
			// which is also how the tree reads on a phone.
			'(min-width: 60rem)': {
				'@': {
					bog_smalljs_structure_steps: {
						true: {
							gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
							gap: rem( 2.5 ),
						},
					},
				},
			},

		},

	} )

}
