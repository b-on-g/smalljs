namespace $ {

	$mol_style_define( $bog_smalljs_landing, {

		flex: { direction: 'column' },

		Hero: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: $mol_gap.block,
			padding: { top: 96, bottom: 96, left: $mol_gap.block, right: $mol_gap.block },
		},

		Hero_title: {
			font: { size: 56, weight: 700 },
			textAlign: 'center',
			maxWidth: 960,
		},

		Hero_subtitle: {
			font: { size: 20 },
			textAlign: 'center',
			maxWidth: 720,
			color: $mol_theme.text,
		},

		Hero_actions: {
			flex: { direction: 'row', wrap: 'wrap' },
			gap: $mol_gap.block,
			justify: { content: 'center' },
		},

		Hero_sponsor: {
			font: { size: 14 },
			color: $mol_theme.text,
		},

		Features: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: $mol_gap.block,
			padding: { top: 64, bottom: 64, left: $mol_gap.block, right: $mol_gap.block },
			maxWidth: 1200,
			margin: { left: 'auto', right: 'auto' },
		},

		Sponsors: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: $mol_gap.block,
			padding: { top: 48, bottom: 48 },
		},

		Footer: {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: $mol_gap.block,
			padding: { top: 48, bottom: 48, left: $mol_gap.block, right: $mol_gap.block },
			border: { top: { width: 1, style: 'solid', color: $mol_theme.line } },
			margin: { top: 'auto' },
		},

	} )

}
