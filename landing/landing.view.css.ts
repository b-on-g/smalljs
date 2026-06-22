namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_landing, {

		flex: { direction: 'column' },

		Hero: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: $mol_gap.block,
			padding: { top: rem(4), bottom: 0, left: $mol_gap.block, right: $mol_gap.block },
		},

		Hero_title: {
			display: 'block',
			font: { size: rem(4.75), weight: 900 },
			lineHeight: '1.25',
			textAlign: 'center',
			maxWidth: rem(60),
		},

		Hero_title_accent: {
			display: 'inline',
			color: $mol_theme.special,
			margin: { left: '0.25em', right: '0.15em' },
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
			align: { items: 'center' },
		},

		Hero_cta_why: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem(0.4),
			background: { color: $mol_theme.current },
			color: $mol_theme.back,
			padding: { left: rem(1.25), right: rem(1.25), top: rem(0.625), bottom: rem(0.625) },
			border: { radius: rem(1.25) },
			font: { weight: 600 },
		},

		Hero_cta_why_icon: { width: rem(1), height: rem(1) },

		Hero_cta_start: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem(0.4),
			background: { color: $mol_theme.card },
			padding: { left: rem(1.25), right: rem(1.25), top: rem(0.625), bottom: rem(0.625) },
			border: { radius: rem(1.25) },
			font: { weight: 600 },
		},

		Hero_cta_start_icon: { width: rem(0.875), height: rem(0.875) },

		Hero_cta_install: {
			background: { color: $mol_theme.card },
			padding: { left: rem(1.25), right: rem(1.25), top: rem(0.625), bottom: rem(0.625) },
			border: { radius: rem(1.25) },
			font: { weight: 600 },
		},

		Hero_cta_play: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem(0.4),
			background: { color: $mol_theme.back },
			padding: { left: rem(1.25), right: rem(1.25), top: rem(0.5), bottom: rem(0.5) },
			border: { radius: rem(1.25), width: '1px', style: 'solid', color: $mol_theme.current },
			color: $mol_theme.current,
			font: { weight: 600 },
		},

		Hero_cta_play_icon: { width: rem(0.875), height: rem(0.875) },

		Sponsor_banner: {
			align: { items: 'center' },
			justify: { content: 'center' },
			padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: $mol_gap.block, right: $mol_gap.block },
			margin: { top: rem(3), left: 'auto', right: 'auto' },
			font: { size: rem(0.875) },
			color: $mol_theme.text,
			border: { top: { width: '1px', style: 'solid', color: $mol_theme.line }, bottom: { width: '1px', style: 'solid', color: $mol_theme.line } },
			width: '100%',
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

		Feature1_title: {
			display: 'block',
			font: { size: rem(1.25), weight: 600 },
			'::first-letter': { color: $mol_theme.special },
		},
		Feature2_title: {
			display: 'block',
			font: { size: rem(1.25), weight: 600 },
			'::first-letter': { color: $mol_theme.special },
		},
		Feature3_title: {
			display: 'block',
			font: { size: rem(1.25), weight: 600 },
			'::first-letter': { color: $mol_theme.special },
		},

		Sponsors: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			gap: $mol_gap.block,
			padding: { top: rem(3), bottom: rem(3), left: $mol_gap.block, right: $mol_gap.block },
			maxWidth: rem(75),
			margin: { left: 'auto', right: 'auto' },
			width: '100%',
		},

		Sponsors_title: { font: { size: rem(1.25), weight: 600 } },

		Sponsors_grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: $mol_gap.block,
			width: '100%',
		},

		Sponsor_card1: {
			background: { color: $mol_theme.card },
			border: { radius: rem(0.5) },
			height: rem(8),
		},
		Sponsor_card2: {
			background: { color: $mol_theme.card },
			border: { radius: rem(0.5) },
			height: rem(8),
		},
		Sponsor_card3: {
			background: { color: $mol_theme.card },
			border: { radius: rem(0.5) },
			height: rem(8),
		},

		Sponsors_cta: {
			align: { self: 'center' },
			color: $mol_theme.shade,
			font: { size: rem(0.875) },
		},

		Footer: {
			flex: { direction: 'column' },
			gap: $mol_gap.block,
			padding: { top: rem(3), bottom: rem(3), left: $mol_gap.block, right: $mol_gap.block },
			border: { top: { width: '1px', style: 'solid', color: $mol_theme.line } },
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
