namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_docs, {

		display: 'grid',
		gridTemplateColumns: '16rem 1fr 15rem',
		flex: { grow: 1 },
		minHeight: 0,

		Sidebar: {
			padding: $mol_gap.block,
			border: { right: { width: 1, style: 'solid', color: $mol_theme.line } },
		},

		Main: {
			padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem(3), right: rem(3) },
		},

		Toc: {
			padding: $mol_gap.block,
			border: { left: { width: 1, style: 'solid', color: $mol_theme.line } },
		},

		Title: {
			font: { size: rem(2.5), weight: 700 },
			padding: { bottom: $mol_gap.block },
		},

		Nav: {
			flex: { direction: 'row' },
			justify: { content: 'space-between' },
			padding: { top: $mol_gap.block, bottom: $mol_gap.block },
			border: { top: { width: 1, style: 'solid', color: $mol_theme.line } },
			margin: { top: $mol_gap.block },
		},

	} )

}
