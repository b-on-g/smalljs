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
			font: { weight: 600 },
		},

		Logo_image: {
			width: rem(1.75),
			height: rem(1.75),
			minWidth: rem(1.75),
			minHeight: rem(1.75),
		},

		Search: {
			flex: { direction: 'row', grow: 0, basis: rem(10), shrink: 0 },
			justify: { content: 'flex-start' },
			align: { items: 'center' },
			gap: $mol_gap.text,
			padding: { left: rem(0.625), right: rem(0.5), top: rem(0.3), bottom: rem(0.3) },
			background: { color: $mol_theme.field },
			border: { radius: rem(0.5) },
			color: $mol_theme.shade,
			font: { size: rem(0.875) },
		},

		Search_icon: {
			width: rem(1),
			height: rem(1),
		},

		Search_label: {
			flex: { grow: 1 },
		},

		Search_hint: {
			padding: { left: rem(0.375), right: rem(0.375), top: rem(0.05), bottom: rem(0.05) },
			background: { color: $mol_theme.card },
			border: { radius: rem(0.25) },
			font: { size: rem(0.75) },
			color: $mol_theme.shade,
		},

		Nav: {
			flex: { direction: 'row', grow: 1, wrap: 'nowrap' },
			align: { items: 'center' },
			justify: { content: 'center' },
			gap: 0,
			minWidth: 0,
		},

		Nav_docs: { flex: { direction: 'row' }, align: { items: 'center' }, gap: rem(0.125) },
		Nav_ecosystem: { flex: { direction: 'row' }, align: { items: 'center' }, gap: rem(0.125) },
		Nav_about: { flex: { direction: 'row' }, align: { items: 'center' }, gap: rem(0.125) },
		Nav_support: { flex: { direction: 'row' }, align: { items: 'center' }, gap: rem(0.125) },

		Nav_docs_chevron: { width: rem(0.875), height: rem(0.875) },
		Nav_ecosystem_chevron: { width: rem(0.875), height: rem(0.875) },
		Nav_about_chevron: { width: rem(0.875), height: rem(0.875) },
		Nav_support_chevron: { width: rem(0.875), height: rem(0.875) },

		Lang: {
			flex: { shrink: 0 },
			padding: rem(0.4),
		},

		Lang_icon: {
			width: rem(1.125),
			height: rem(1.125),
		},

		Github: {
			flex: { shrink: 0 },
		},

	} )

}
