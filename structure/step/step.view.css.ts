namespace $ {

	const { rem } = $mol_style_unit

	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

	$mol_style_define( $bog_smalljs_structure_step, {

		flex: { direction: 'row', shrink: 0 },
		align: { items: 'flex-start' },
		gap: rem( 0.75 ),
		minWidth: 0,

		Number: {
			flex: { shrink: 0 },
			justify: { content: 'center' },
			align: { items: 'center' },
			width: rem( 1.5 ),
			height: rem( 1.5 ),
			border: { radius: rem( 0.75 ) },
			background: { color: $bog_builderui_tokens.hover },
			color: $bog_builderui_tokens.special,
			font: { size: rem( 0.75 ), weight: 700 },
		},

		Body: {
			flex: { direction: 'column' },
			gap: rem( 0.25 ),
			minWidth: 0,
		},

		Text: {
			lineHeight: rem( 1.5 ),
			color: $bog_builderui_tokens.text,
		},

		Code: {
			font: { family: mono, size: rem( 0.75 ) },
			color: $bog_builderui_tokens.shade,
			overflow: { x: 'auto' },
			whiteSpace: 'pre',
			minWidth: 0,
		},

	} )

}
