namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_landing, {

		flex: { direction: 'column' },

		Hero: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: $mol_gap.block,
			padding: { top: rem(6), bottom: rem(6), left: $mol_gap.block, right: $mol_gap.block },
		},

		Hero_title: {
			font: { size: rem(3.5), weight: 700 },
			textAlign: 'center',
			maxWidth: rem(60),
		},

		Hero_subtitle: {
			font: { size: rem(1.25) },
			textAlign: 'center',
			maxWidth: rem(45),
			color: $mol_theme.text,
		},

		Hero_actions: {
			flex: { direction: 'row', wrap: 'wrap' },
			gap: $mol_gap.block,
			justify: { content: 'center' },
		},

		Sponsor_banner: {
			align: { items: 'center' },
			justify: { content: 'center' },
			padding: { top: $mol_gap.block, bottom: $mol_gap.block },
			font: { size: rem(0.875) },
			color: $mol_theme.text,
			border: { top: { width: 1, style: 'solid', color: $mol_theme.line }, bottom: { width: 1, style: 'solid', color: $mol_theme.line } },
		},

		Features: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: $mol_gap.block,
			padding: { top: rem(4), bottom: rem(4), left: $mol_gap.block, right: $mol_gap.block },
			maxWidth: rem(75),
			margin: { left: 'auto', right: 'auto' },
		},

		Feature1: { flex: { direction: 'column' }, gap: $mol_gap.text },
		Feature2: { flex: { direction: 'column' }, gap: $mol_gap.text },
		Feature3: { flex: { direction: 'column' }, gap: $mol_gap.text },

		Feature1_title: { font: { size: rem(1.25), weight: 600 } },
		Feature2_title: { font: { size: rem(1.25), weight: 600 } },
		Feature3_title: { font: { size: rem(1.25), weight: 600 } },

		Sponsors: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: $mol_gap.block,
			padding: { top: rem(3), bottom: rem(3) },
		},

		Sponsors_title: { font: { size: rem(1.5), weight: 600 } },

		Footer: {
			flex: { direction: 'column' },
			gap: $mol_gap.block,
			padding: { top: rem(3), bottom: rem(3), left: $mol_gap.block, right: $mol_gap.block },
			border: { top: { width: 1, style: 'solid', color: $mol_theme.line } },
			margin: { top: 'auto' },
		},

		Footer_cols: {
			display: 'grid',
			gridTemplateColumns: 'repeat(8, 1fr)',
			gap: $mol_gap.block,
		},

		Footer_col_docs: { flex: { direction: 'column' } },
		Footer_col_about: { flex: { direction: 'column' } },
		Footer_col_support: { flex: { direction: 'column' } },
		Footer_col_resources: { flex: { direction: 'column' } },
		Footer_col_libs: { flex: { direction: 'column' } },
		Footer_col_courses: { flex: { direction: 'column' } },
		Footer_col_help: { flex: { direction: 'column' } },
		Footer_col_news: { flex: { direction: 'column' } },

		Footer_col_docs_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_about_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_support_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_resources_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_libs_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_courses_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_help_title: { font: { size: rem(0.875), weight: 600 } },
		Footer_col_news_title: { font: { size: rem(0.875), weight: 600 } },

		Footer_copy: {
			font: { size: rem(0.875) },
			color: $mol_theme.text,
			textAlign: 'center',
		},

	} )

}
