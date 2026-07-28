namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_demo, {

		flex: { direction: 'column' },
		justify: { content: 'center' },
		gap: rem( 1.25 ),
		padding: rem( 1.75 ),

		Name: {
			flex: { grow: 0 },
			padding: { top: rem( 0.625 ), bottom: rem( 0.625 ), left: rem( 0.875 ), right: rem( 0.875 ) },
			background: { color: $bog_builderui_tokens.field },
			border: {
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
				radius: rem( 0.375 ),
			},
			color: $bog_builderui_tokens.text,
			font: { family: $bog_builderui_tokens.font_body, size: rem( 1 ) },

			':focus-within': {
				border: { color: $bog_builderui_tokens.control },
			},
		},

		Greeting: {
			display: 'block',
			font: {
				family: $bog_builderui_tokens.font_head,
				size: rem( 1.75 ),
				weight: 500,
			},
			letterSpacing: '-0.01em',
			color: $bog_builderui_tokens.text,
			// the live output is the payoff — keep it from wrapping oddly on narrow cards
			overflowWrap: 'break-word',
		},

	} )

}
