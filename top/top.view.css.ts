namespace $ {

	$mol_style_define( $bog_smalljs_top, {

		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: $mol_gap.block,
		padding: { left: $mol_gap.block, right: $mol_gap.block, top: $mol_gap.text, bottom: $mol_gap.text },
		height: 64,
		border: { bottom: { width: 1, style: 'solid', color: $mol_theme.line } },
		position: 'sticky',
		top: 0,
		background: { color: $mol_theme.back },
		zIndex: 100,

		Logo: {
			align: { items: 'center' },
			gap: $mol_gap.text,
		},

		Logo_image: {
			width: 32,
			height: 32,
		},

		Search: {
			flex: { grow: 0, basis: 240 },
			justify: { content: 'flex-start' },
		},

		Nav: {
			flex: { direction: 'row', grow: 1 },
			align: { items: 'center' },
			justify: { content: 'center' },
			gap: $mol_gap.text,
		},

	} )

}
