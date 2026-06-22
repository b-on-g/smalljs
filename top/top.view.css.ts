namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_top, {

		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: $mol_gap.text,
		padding: { left: $mol_gap.block, right: $mol_gap.block, top: $mol_gap.text, bottom: $mol_gap.text },
		height: rem(4),
		border: { bottom: { width: 1, style: 'solid', color: $mol_theme.line } },
		position: 'sticky',
		top: 0,
		background: { color: $mol_theme.back },
		zIndex: 100,

		Logo: {
			align: { items: 'center' },
			gap: $mol_gap.text,
			flex: { shrink: 0 },
		},

		Logo_image: {
			width: rem(2),
			height: rem(2),
			minWidth: rem(2),
			minHeight: rem(2),
		},

		Search: {
			flex: { grow: 0, basis: rem(8), shrink: 0 },
			justify: { content: 'flex-start' },
			align: { items: 'center' },
			padding: { left: rem(0.75), right: rem(0.75), top: rem(0.4), bottom: rem(0.4) },
			background: { color: $mol_theme.field },
			border: { radius: rem(0.5) },
			color: $mol_theme.shade,
			font: { size: rem(0.875) },
		},

		Nav: {
			flex: { direction: 'row', grow: 1, wrap: 'nowrap' },
			align: { items: 'center' },
			justify: { content: 'flex-end' },
			gap: 0,
			minWidth: 0,
		},

		Lang: {
			flex: { shrink: 0 },
			font: { size: rem(0.875) },
		},

		Github: {
			flex: { shrink: 0 },
		},

	} )

}
