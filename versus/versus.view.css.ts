namespace $ {

	const { rem } = $mol_style_unit

	// One editorial column for prose (heading, intro) and a wider one for the
	// grids: nine featured pairs, six-card tops and the rating all want room.
	const prose = rem( 48 )
	const wide = rem( 64 )

	// Rank | logo tile | name | score bar | year. Head and rows share the track
	// list, so the columns line up without a <table>.
	const rating_columns = '2.5rem 2.25rem minmax( 0, 1fr ) minmax( 7rem, 12rem ) 4rem'
	const rating_columns_narrow = '2rem minmax( 0, 1fr ) 4.5rem 3.5rem'

	$mol_style_define( $bog_smalljs_versus, {

		flex: { direction: 'column', grow: 1 },
		align: { items: 'center' },
		gap: rem( 3.5 ),
		minWidth: 0,
		padding: { top: rem( 3.5 ), bottom: rem( 4 ), left: $mol_gap.block, right: $mol_gap.block },
		background: { color: $bog_builderui_tokens.back },

		Head: {
			flex: { direction: 'column' },
			gap: rem( 1 ),
			// width:100% (not just max-width) so the column never collapses to its
			// max-content width and pushes the page sideways on a phone.
			width: '100%',
			maxWidth: prose,
		},

		Title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 2.75 ), weight: 500 },
			lineHeight: '1.14',
			letterSpacing: '-0.02em',
			color: $bog_builderui_tokens.text,
			maxWidth: '100%',
			overflowWrap: 'break-word',
		},

		Intro: {
			display: 'block',
			font: { size: rem( 1.0625 ) },
			lineHeight: '1.6',
			maxWidth: rem( 42 ),
			color: $bog_builderui_tokens.shade,
		},

		// Above the fold: two fields and the word between them, nothing else.
		Picker: {
			flex: { direction: 'row', wrap: 'nowrap' },
			align: { items: 'center' },
			gap: rem( 1 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Pick_a: {
			flex: { grow: 1, shrink: 1, basis: '0' },
			align: { self: 'stretch' },
			minWidth: 0,
			background: { color: $bog_builderui_tokens.field },
			border: { radius: $bog_builderui_tokens.radius, width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			padding: { top: rem( 0.35 ), bottom: rem( 0.35 ), left: rem( 0.5 ), right: rem( 0.5 ) },

			':focus-within': {
				border: { color: $bog_builderui_tokens.control },
			},
		},

		Pick_b: {
			flex: { grow: 1, shrink: 1, basis: '0' },
			align: { self: 'stretch' },
			minWidth: 0,
			background: { color: $bog_builderui_tokens.field },
			border: { radius: $bog_builderui_tokens.radius, width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			padding: { top: rem( 0.35 ), bottom: rem( 0.35 ), left: rem( 0.5 ), right: rem( 0.5 ) },

			':focus-within': {
				border: { color: $bog_builderui_tokens.control },
			},
		},

		Vs: {
			flex: { shrink: 0 },
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.25 ), weight: 500 },
			color: $bog_builderui_tokens.shade,
		},

		Popular: {
			flex: { direction: 'column' },
			gap: rem( 1 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Popular_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Popular_list: {
			display: 'grid',
			gridTemplateColumns: 'repeat( auto-fill, minmax( 15rem, 1fr ) )',
			gap: rem( 0.5 ),
			minWidth: 0,
		},

		Popular_link: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			justify: { content: 'center' },
			gap: rem( 0.4 ),
			minWidth: 0,
			padding: { top: rem( 0.7 ), bottom: rem( 0.7 ), left: rem( 0.75 ), right: rem( 0.75 ) },
			background: { color: $bog_builderui_tokens.card },
			border: { radius: $bog_builderui_tokens.radius, width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			font: { size: rem( 0.9375 ) },
			color: $bog_builderui_tokens.text,

			':hover': {
				border: { color: $bog_builderui_tokens.control },
				color: $bog_builderui_tokens.control,
			},
		},

		Popular_left: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			font: { weight: 600 },
		},

		Popular_mid: {
			flex: { shrink: 0 },
			color: $bog_builderui_tokens.shade,
		},

		Popular_right: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			font: { weight: 600 },
		},

		Top_apps: {
			flex: { direction: 'column' },
			gap: rem( 0.4 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Top_apps_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Top_apps_note: {
			display: 'block',
			font: { size: rem( 0.875 ) },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.shade,
			margin: { bottom: rem( 0.6 ) },
		},

		Top_apps_list: {
			display: 'grid',
			gridTemplateColumns: 'repeat( auto-fill, minmax( 12rem, 1fr ) )',
			gap: rem( 0.5 ),
			minWidth: 0,
		},

		Top_sites: {
			flex: { direction: 'column' },
			gap: rem( 0.4 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Top_sites_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Top_sites_note: {
			display: 'block',
			font: { size: rem( 0.875 ) },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.shade,
			margin: { bottom: rem( 0.6 ) },
		},

		Top_sites_list: {
			display: 'grid',
			gridTemplateColumns: 'repeat( auto-fill, minmax( 12rem, 1fr ) )',
			gap: rem( 0.5 ),
			minWidth: 0,
		},

		Card: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.6 ),
			minWidth: 0,
			padding: { top: rem( 0.6 ), bottom: rem( 0.6 ), left: rem( 0.6 ), right: rem( 0.75 ) },
			background: { color: $bog_builderui_tokens.card },
			border: { radius: $bog_builderui_tokens.radius, width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			color: $bog_builderui_tokens.text,

			':hover': {
				border: { color: $bog_builderui_tokens.control },
				color: $bog_builderui_tokens.control,
			},
		},

		Card_mark: {
			flex: { shrink: 0 },
			align: { items: 'center' },
			justify: { content: 'center' },
			width: rem( 2 ),
			height: rem( 2 ),
			borderRadius: $bog_builderui_tokens.radius,
			background: { color: $bog_builderui_tokens.hover },
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1 ), weight: 600 },
			color: $bog_builderui_tokens.special,
		},

		Card_name: {
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			font: { size: rem( 0.9375 ), weight: 600 },
		},

		Rating: {
			flex: { direction: 'column' },
			gap: rem( 0.4 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Rating_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Rating_note: {
			display: 'block',
			font: { size: rem( 0.875 ) },
			lineHeight: '1.5',
			maxWidth: rem( 42 ),
			color: $bog_builderui_tokens.shade,
			margin: { bottom: rem( 0.6 ) },
		},

		Rating_head: {
			display: 'grid',
			gridTemplateColumns: rating_columns,
			align: { items: 'center' },
			gap: rem( 0.75 ),
			padding: { top: rem( 0.4 ), bottom: rem( 0.4 ), left: rem( 0.6 ), right: rem( 0.6 ) },
			font: { size: rem( 0.75 ), weight: 600 },
			letterSpacing: '0.04em',
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Rating_head_since: {
			justify: { content: 'flex-end' },
		},

		Rating_list: {
			flex: { direction: 'column' },
			minWidth: 0,
		},

		Row: {
			display: 'grid',
			gridTemplateColumns: rating_columns,
			align: { items: 'center' },
			gap: rem( 0.75 ),
			minWidth: 0,
			padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 0.6 ), right: rem( 0.6 ) },
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },

			':hover': {
				background: { color: $bog_builderui_tokens.hover },
			},
		},

		Rank: {
			font: { size: rem( 0.875 ), weight: 600 },
			color: $bog_builderui_tokens.shade,
		},

		Row_mark: {
			align: { items: 'center' },
			justify: { content: 'center' },
			width: rem( 2 ),
			height: rem( 2 ),
			borderRadius: $bog_builderui_tokens.radius,
			background: { color: $bog_builderui_tokens.hover },
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1 ), weight: 600 },
			color: $bog_builderui_tokens.special,
		},

		Row_name: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			gap: rem( 0.1 ),
			minWidth: 0,
		},

		Row_link: {
			maxWidth: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			font: { size: rem( 0.9375 ), weight: 600 },
			color: $bog_builderui_tokens.text,

			':hover': { color: $bog_builderui_tokens.control },
		},

		Row_partial: {
			font: { size: rem( 0.75 ) },
			color: $bog_builderui_tokens.shade,
		},

		Row_score: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.5 ),
			minWidth: 0,
		},

		Row_track: {
			flex: { grow: 1 },
			minWidth: 0,
			height: rem( 0.375 ),
			borderRadius: rem( 0.25 ),
			background: { color: $bog_builderui_tokens.hover },
			overflow: 'hidden',
		},

		Row_fill: {
			height: '100%',
			borderRadius: rem( 0.25 ),
			background: { color: $bog_builderui_tokens.control },
		},

		Row_value: {
			flex: { shrink: 0 },
			justify: { content: 'flex-end' },
			minWidth: rem( 1.5 ),
			font: { size: rem( 0.875 ), weight: 600 },
			color: $bog_builderui_tokens.text,
		},

		Row_since: {
			justify: { content: 'flex-end' },
			font: { size: rem( 0.875 ) },
			color: $bog_builderui_tokens.shade,
		},

		Pager: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			gap: rem( 0.25 ),
			margin: { top: rem( 0.75 ) },
		},

		Page: {
			justify: { content: 'center' },
			minWidth: rem( 2 ),
			padding: { top: rem( 0.3 ), bottom: rem( 0.3 ), left: rem( 0.5 ), right: rem( 0.5 ) },
			borderRadius: $bog_builderui_tokens.radius,
			font: { size: rem( 0.875 ) },
			color: $bog_builderui_tokens.control,

			'[bog_smalljs_versus_page_current]': {
				true: {
					background: { color: $bog_builderui_tokens.control },
					color: $bog_builderui_tokens.back,
				},
			},
		},

		Page_next: {
			justify: { content: 'center' },
			minWidth: rem( 2 ),
			padding: { top: rem( 0.3 ), bottom: rem( 0.3 ), left: rem( 0.5 ), right: rem( 0.5 ) },
			borderRadius: $bog_builderui_tokens.radius,
			font: { size: rem( 1 ) },
			color: $bog_builderui_tokens.control,
		},

		Empty: {
			display: 'block',
			padding: { top: rem( 1 ), bottom: rem( 1 ) },
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,
		},

		'@media': {

			'(max-width: 47.9375rem)': {
				gap: rem( 2.5 ),
				padding: { top: rem( 2 ), bottom: rem( 2.5 ), left: rem( 1.25 ), right: rem( 1.25 ) },

				Title: { font: { size: rem( 2 ) } },

				Picker: {
					flex: { direction: 'column' },
					align: { items: 'stretch' },
					gap: rem( 0.5 ),
				},

				Vs: { align: { self: 'center' } },

				// The logo tile is the first thing to go: on a phone the name,
				// the score and the year are what the column is for.
				Rating_head: { gridTemplateColumns: rating_columns_narrow },
				Rating_head_mark: { display: 'none' },
				Row: { gridTemplateColumns: rating_columns_narrow },
				Row_mark: { display: 'none' },
			},

		},

	} )

	// The two picker fields are $mol_search instances, so their input and their
	// suggest list belong to $mol_search, not to this page. Restyling them
	// through $mol_style_define( $mol_search ) would repaint every search box in
	// the app; scoping raw CSS under our own block keeps the change local.
	$mol_style_attach( '$bog_smalljs_versus.picker', `

		[bog_smalljs_versus_picker] [mol_search_query] {
			font-size: 1.0625rem;
			padding: 0.5rem 0.6rem;
		}

		[bog_smalljs_versus_picker] [mol_search_menu] {
			min-width: 14rem;
		}

	` )

}
