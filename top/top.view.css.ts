namespace $ {

	const { rem } = $mol_style_unit

	// vertical link list used inside every dropdown bubble
	const menu_panel = {
		flex: { direction: 'column' },
		gap: rem(0.125),
		padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.5), right: rem(0.5) },
		minWidth: rem(11),
		background: { color: $bog_builderui_tokens.card },
		border: { radius: rem(0.5) },

		$mol_link: {
			flex: { direction: 'row' },
			justify: { content: 'flex-start' },
			padding: { top: rem(0.375), bottom: rem(0.375), left: rem(0.625), right: rem(0.625) },
			border: { radius: rem(0.375) },
			color: $bog_builderui_tokens.text,
			font: { size: rem(0.875), weight: 500 },

			':hover': {
				background: { color: $bog_builderui_tokens.hover },
				color: $bog_builderui_tokens.special,
			},
		},
	} as const

	// A section link sitting directly in the mobile menu, next to the expander
	// headers. Without this it would pick up the nested-link style of the menu's
	// $mol_link rule and read as an item of some group above it.
	const mobile_entry = {
		padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.625), right: rem(0.625) },
		border: { radius: rem(0.375) },
		font: { size: rem(0.9375), weight: 600 },
		color: $bog_builderui_tokens.text,
	} as const

	$mol_style_define( $bog_smalljs_top, {

		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: $mol_gap.text,
		padding: { left: $mol_gap.block, right: $mol_gap.block, top: $mol_gap.text, bottom: $mol_gap.text },
		height: rem(4),
		border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		position: 'sticky',
		top: 0,
		background: { color: $bog_builderui_tokens.back },
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
			background: { color: $bog_builderui_tokens.field },
			border: { radius: rem(0.5) },
			color: $bog_builderui_tokens.shade,
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
			border: { radius: rem(0.25), width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			font: { size: rem(0.75) },
			color: $bog_builderui_tokens.shade,
		},

		Nav: {
			flex: { direction: 'row', grow: 1, wrap: 'nowrap' },
			align: { items: 'center' },
			justify: { content: 'center' },
			gap: 0,
			minWidth: 0,
			font: { size: rem(0.8125), weight: 500 },

			// dropdown triggers (each $mol_pick renders a $mol_check anchor)
			$mol_check: {
				gap: rem(0.125),
				font: { size: rem(0.8125), weight: 500 },
			},
		},

		Docs_chevron: { width: rem(0.875), height: rem(0.875) },
		Ecosystem_chevron: { width: rem(0.875), height: rem(0.875) },
		About_chevron: { width: rem(0.875), height: rem(0.875) },

		Docs_menu: menu_panel,
		Ecosystem_menu: menu_panel,
		About_menu: menu_panel,

		Eco_libs_title: {
			padding: { top: rem(0.5), bottom: rem(0.25), left: rem(0.625), right: rem(0.625) },
			font: { size: rem(0.6875), weight: 600 },
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			letterSpacing: rem(0.03),
		},

		// hamburger trigger — hidden on desktop, shown on narrow screens
		Burger: {
			display: 'none',
			flex: { shrink: 0 },
		},

		Burger_icon: {
			width: rem(1.375),
			height: rem(1.375),
		},

		Mobile_menu: {
			flex: { direction: 'column' },
			gap: rem(0.25),
			padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.5), right: rem(0.5) },
			minWidth: rem(16),
			maxWidth: '92vw',
			maxHeight: '80vh',
			overflow: { y: 'auto' },
			background: { color: $bog_builderui_tokens.card },
			border: { radius: rem(0.5) },

			$mol_check_expand: {
				padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.625), right: rem(0.625) },
				border: { radius: rem(0.375) },
				font: { size: rem(0.9375), weight: 600 },
				color: $bog_builderui_tokens.text,
			},

			$mol_link: {
				flex: { direction: 'row' },
				justify: { content: 'flex-start' },
				padding: { top: rem(0.375), bottom: rem(0.375), left: rem(1.25), right: rem(0.625) },
				border: { radius: rem(0.375) },
				color: $bog_builderui_tokens.shade,
				font: { size: rem(0.875), weight: 500 },

				':hover': {
					background: { color: $bog_builderui_tokens.hover },
					color: $bog_builderui_tokens.special,
				},
			},
		},

		Mobile_playground: mobile_entry,
		Mobile_versus: mobile_entry,

		M_eco_libs_title: {
			padding: { top: rem(0.5), bottom: rem(0.25), left: rem(1.25), right: rem(0.625) },
			font: { size: rem(0.6875), weight: 600 },
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			letterSpacing: rem(0.03),
		},

		Lang_pick: {
			flex: { shrink: 0 },

			// the pick's trigger is a $mol_check anchor
			$mol_check: {
				flex: { direction: 'row' },
				align: { items: 'center' },
				gap: rem(0.25),
				padding: { left: rem(0.5), right: rem(0.5), top: rem(0.4), bottom: rem(0.4) },
				border: { radius: rem(0.375) },
				font: { size: rem(0.8125), weight: 500 },
			},
		},

		Lang_icon: {
			width: rem(1.125),
			height: rem(1.125),
		},

		Lang_chevron: { width: rem(0.875), height: rem(0.875) },

		Lang_menu: {
			flex: { direction: 'column' },
			gap: rem(0.125),
			padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.5), right: rem(0.5) },
			minWidth: rem(9),
			background: { color: $bog_builderui_tokens.card },
			border: { radius: rem(0.5) },
		},

		Lang_option: {
			flex: { direction: 'row', grow: 1 },
			justify: { content: 'flex-start' },
			align: { items: 'center' },
			gap: rem(0.75),
			padding: { top: rem(0.375), bottom: rem(0.375), left: rem(0.625), right: rem(0.625) },
			border: { radius: rem(0.375) },
			color: $bog_builderui_tokens.text,
			font: { size: rem(0.875), weight: 500 },

			':hover': {
				background: { color: $bog_builderui_tokens.hover },
				color: $bog_builderui_tokens.special,
			},
		},

		Lang_option_check: {
			width: rem(1),
			height: rem(1),
			flex: { shrink: 0 },
			color: $bog_builderui_tokens.special,
		},

		Github: {
			flex: { shrink: 0 },
		},

		'@media': {
			'(max-width: 47.9375rem)': {
				Search: { display: 'none' },
				Nav: { display: 'none' },
				Burger: { display: 'inline-flex' },
				// Free horizontal room so Lang + theme switch never push off-screen:
				// drop the wordmark (the molecule icon still brands it) and the GitHub
				// link (still reachable from the footer).
				Logo_text_box: { display: 'none' },
				Github: { display: 'none' },
				padding: { left: rem(0.75), right: rem(0.75), top: $mol_gap.text, bottom: $mol_gap.text },
			},
		},

	} )

}
