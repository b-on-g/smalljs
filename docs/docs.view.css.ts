namespace $ {

	const { rem } = $mol_style_unit

	const topbar = rem( 4 )

	// One sidebar navigation link (also used for prev/next captions).
	const sidebar_link = {
		flex: { direction: 'row' },
		justify: { content: 'flex-start' },
		padding: { top: rem( 0.3 ), bottom: rem( 0.3 ), left: rem( 0.625 ), right: rem( 0.625 ) },
		border: { radius: rem( 0.375 ) },
		color: $bog_builderui_tokens.shade,
		font: { size: rem( 0.875 ), weight: 500 },

		':hover': {
			background: { color: $bog_builderui_tokens.hover },
			color: $bog_builderui_tokens.text,
		},

		// active page — $mol_link sets mol_link_current="true". A warm accent-bar on
		// the left (added in the raw attach block below) carries the signal, while the
		// label stays at full text contrast rather than tinting small text orange.
		'@': {
			mol_link_current: {
				true: {
					color: $bog_builderui_tokens.text,
					background: { color: $bog_builderui_tokens.hover },
					font: { weight: 600 },
				},
			},
		},
	} as const

	$mol_style_define( $bog_smalljs_docs, {

		display: 'grid',
		gridTemplateColumns: `16rem minmax(0, 1fr) 15rem`,
		flex: { grow: 1 },
		align: { items: 'start' },
		minHeight: 0,

		Menu_toggle: {
			display: 'none',
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center' },
			gap: $mol_gap.text,
			gridColumn: '1 / -1',
			position: 'sticky',
			top: topbar,
			zIndex: 80,
			padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: $mol_gap.block, right: $mol_gap.block },
			background: { color: $bog_builderui_tokens.back },
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			font: { weight: 600 },
			color: $bog_builderui_tokens.text,
		},

		Menu_icon: {
			width: rem( 1.25 ),
			height: rem( 1.25 ),
			flex: { shrink: 0 },
		},

		Sidebar: {
			flex: { direction: 'column' },
			position: 'sticky',
			top: topbar,
			maxHeight: $mol_style_func.calc( '100vh - 4rem' ),
			overflow: { y: 'auto', x: 'hidden' },
			padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem( 0.75 ), right: rem( 0.75 ) },
			border: { right: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			background: { color: $bog_builderui_tokens.back },
		},

		Group: {
			flex: { direction: 'column' },
			gap: rem( 0.0625 ),
			margin: { bottom: $mol_gap.block },
		},

		Group_title: {
			padding: { top: rem( 0.5 ), bottom: rem( 0.25 ), left: rem( 0.625 ), right: rem( 0.625 ) },
			font: { size: rem( 0.6875 ), weight: 700 },
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			letterSpacing: rem( 0.03 ),
		},

		Link: sidebar_link,

		Main: {
			flex: { direction: 'column' },
			minWidth: 0,
			padding: { top: rem( 2 ), bottom: rem( 3 ), left: rem( 3 ), right: rem( 3 ) },
		},

		Body: {
			flex: { direction: 'column' },
			maxWidth: rem( 48 ),
			width: '100%',
		},

		Edit: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: $mol_gap.text,
			margin: { top: rem( 2 ) },
			color: $bog_builderui_tokens.control,
			font: { size: rem( 0.875 ), weight: 500 },

			':hover': { color: $bog_builderui_tokens.focus },
		},

		Edit_icon: {
			width: rem( 1 ),
			height: rem( 1 ),
		},

		Feedback: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			gap: rem( 0.5 ),
			maxWidth: rem( 48 ),
			margin: { top: rem( 1.5 ) },
			padding: { top: $mol_gap.block },
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Feedback_prompt: {
			font: { size: rem( 0.75 ), weight: 600 },
			letterSpacing: rem( 0.03 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
			margin: { right: rem( 0.25 ) },
		},

		Feedback_yes: {
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center' },
			gap: rem( 0.375 ),
			padding: { top: rem( 0.3 ), bottom: rem( 0.3 ), left: rem( 0.75 ), right: rem( 0.75 ) },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem( 0.375 ) },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 0.8125 ), weight: 500 },

			':hover': {
				border: { color: $bog_builderui_tokens.focus },
				color: $bog_builderui_tokens.text,
			},
		},

		Feedback_no: {
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center' },
			gap: rem( 0.375 ),
			padding: { top: rem( 0.3 ), bottom: rem( 0.3 ), left: rem( 0.75 ), right: rem( 0.75 ) },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem( 0.375 ) },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 0.8125 ), weight: 500 },

			':hover': {
				border: { color: $bog_builderui_tokens.focus },
				color: $bog_builderui_tokens.text,
			},
		},

		Feedback_yes_icon: { width: rem( 1 ), height: rem( 1 ) },
		Feedback_no_icon: { width: rem( 1 ), height: rem( 1 ) },

		Feedback_thanks: {
			font: { size: rem( 0.8125 ), weight: 500 },
			color: $bog_builderui_tokens.control,
		},

		Nav: {
			flex: { direction: 'row', wrap: 'wrap' },
			justify: { content: 'space-between' },
			gap: $mol_gap.block,
			maxWidth: rem( 48 ),
			padding: { top: $mol_gap.block, bottom: $mol_gap.block },
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			margin: { top: rem( 2 ) },
		},

		Prev: {
			flex: { direction: 'column', grow: 1, basis: rem( 12 ) },
			align: { items: 'flex-start' },
			gap: rem( 0.125 ),
			padding: $mol_gap.block,
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem( 0.5 ) },

			':hover': { border: { color: $bog_builderui_tokens.focus } },
		},

		Next: {
			flex: { direction: 'column', grow: 1, basis: rem( 12 ) },
			align: { items: 'flex-end' },
			gap: rem( 0.125 ),
			padding: $mol_gap.block,
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem( 0.5 ) },

			':hover': { border: { color: $bog_builderui_tokens.focus } },
		},

		Prev_hint: {
			font: { size: rem( 0.75 ) },
			color: $bog_builderui_tokens.shade,
		},

		Next_hint: {
			font: { size: rem( 0.75 ) },
			color: $bog_builderui_tokens.shade,
		},

		Prev_title: {
			color: $bog_builderui_tokens.control,
			font: { weight: 600 },
		},

		Next_title: {
			color: $bog_builderui_tokens.control,
			font: { weight: 600 },
		},

		Toc: {
			flex: { direction: 'column' },
			position: 'sticky',
			top: topbar,
			maxHeight: $mol_style_func.calc( '100vh - 4rem' ),
			overflow: { y: 'auto', x: 'hidden' },
			padding: { top: rem( 2 ), bottom: $mol_gap.block, left: rem( 1 ), right: rem( 1 ) },
			border: { left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Toc_title: {
			padding: { bottom: rem( 0.5 ) },
			font: { size: rem( 0.75 ), weight: 700 },
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			letterSpacing: rem( 0.03 ),
		},

		Toc_list: {
			flex: { direction: 'column' },
			gap: rem( 0.0625 ),
		},

		Toc_link: {
			padding: { top: rem( 0.25 ), bottom: rem( 0.25 ), left: rem( 0.5 ), right: rem( 0.5 ) },
			border: { radius: rem( 0.25 ) },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 0.8125 ) },

			':hover': { color: $bog_builderui_tokens.text },

			'@': {
				mol_link_current: {
					true: {
						color: $bog_builderui_tokens.text,
						font: { weight: 600 },
					},
				},
			},
		},

		'@media': {

			// Tablet: drop the right-hand table of contents.
			'(max-width: 63.9375rem)': {
				gridTemplateColumns: `16rem minmax(0, 1fr)`,
				Toc: { display: 'none' },
			},

			// Phone: sidebar becomes a slide-in drawer, content full width.
			'(max-width: 47.9375rem)': {
				gridTemplateColumns: `minmax(0, 1fr)`,

				Menu_toggle: { display: 'flex' },

				Main: {
					padding: { top: rem( 1.25 ), bottom: rem( 2 ), left: rem( 1.25 ), right: rem( 1.25 ) },
				},

				Sidebar: {
					position: 'fixed',
					top: topbar,
					bottom: 0,
					left: 0,
					zIndex: 90,
					width: rem( 17 ),
					maxWidth: '85vw',
					transform: 'translateX(-100%)',
					transition: 'transform 0.2s',
					boxShadow: '0 0 24px -6px #00000055',
				},

				// drawer open state
				'@': {
					bog_smalljs_sidebar_open: {
						true: {
							Sidebar: { transform: 'translateX(0)' },
						},
					},
				},
			},

		},

	} )

	// $mol_text renders a list bullet/number via [mol_text_list_item]::before with
	// position:absolute + margin-left:-1.75rem (sits in the left gutter). Without a
	// positioning context the marker anchors to the scroll container and drifts on
	// scroll. Anchoring it to the item (position:relative) fixed the drift but the
	// item has overflow:auto, which clips the marker poking out to the left. So put
	// the positioning context on the LIST (overflow:visible) instead: the marker
	// stays glued to its line AND isn't clipped. Raw CSS (attributes belong to $mol_text).
	$mol_style_attach( '$bog_smalljs_docs.list_marker', `
		[bog_smalljs_docs_body] [mol_text_list] { position: relative }
	` )

	// Deep-linking to a heading (TOC click / shared URL with Docs.Body=<heading>)
	// scrolls it to the very top of the scroll container, where the 64px sticky top
	// bar hides it — the page looks like it jumped past the heading. scroll-margin-top
	// leaves room so the anchored heading lands just below the bar. $mol_text honors it.
	$mol_style_attach( '$bog_smalljs_docs.header_anchor', `
		[bog_smalljs_docs_body] [mol_text_header] { scroll-margin-top: 5rem }
	` )

	// Warm inset accent-bar on the active sidebar/TOC link. Raw CSS: $mol_style_define
	// has no plain box-shadow, and an inset bar adds the accent without a layout shift.
	$mol_style_attach( '$bog_smalljs_docs.active_bar', `
		[bog_smalljs_docs] [mol_link_current="true"] {
			box-shadow: inset 2px 0 0 var( --bog_builderui_special );
		}
	` )

}
