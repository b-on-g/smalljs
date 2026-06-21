namespace $ {

	$mol_style_define( $bog_smalljs_docs, {

		display: 'grid',
		gridTemplateColumns: '256px 1fr 240px',
		flex: { grow: 1 },
		minHeight: 0,

		Sidebar: {
			padding: $mol_gap.block,
			border: { right: { width: 1, style: 'solid', color: $mol_theme.line } },
		},

		Main: {
			padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: 48, right: 48 },
		},

		Toc: {
			padding: $mol_gap.block,
			border: { left: { width: 1, style: 'solid', color: $mol_theme.line } },
		},

		Title: {
			font: { size: 40, weight: 700 },
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
