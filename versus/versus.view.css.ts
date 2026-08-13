namespace $ {

	const { rem } = $mol_style_unit

	// One editorial column for prose (heading, intro, methodology) and a wider one for
	// the cases, which hold three side-by-side runner frames and need the room.
	const prose = rem( 48 )
	const wide = rem( 76 )

	$mol_style_define( $bog_smalljs_versus, {

		flex: { direction: 'column', grow: 1 },
		align: { items: 'center' },
		gap: rem( 3 ),
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

		// Cases style themselves ($bog_smalljs_versus_case owns its layout); the page
		// only decides how wide the column is and how far apart the blocks sit.
		Cases: {
			flex: { direction: 'column' },
			gap: rem( 3 ),
			width: '100%',
			maxWidth: wide,
			minWidth: 0,
		},

		Method: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			gap: rem( 0.75 ),
			width: '100%',
			maxWidth: prose,
			padding: { top: rem( 2 ) },
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Method_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.625 ), weight: 500 },
			lineHeight: '1.2',
			color: $bog_builderui_tokens.text,
		},

		Method_text: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,
		},

		Method_link: {
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			margin: { top: rem( 0.25 ) },
			color: $bog_builderui_tokens.control,
			font: { size: rem( 0.9375 ), weight: 600 },

			':hover': { color: $bog_builderui_tokens.focus },
		},

		Method_link_icon: {
			width: rem( 0.9 ),
			height: rem( 0.9 ),
			flex: { shrink: 0 },
		},

		'@media': {

			'(max-width: 47.9375rem)': {
				gap: rem( 2.25 ),
				padding: { top: rem( 2 ), bottom: rem( 2.5 ), left: rem( 1.25 ), right: rem( 1.25 ) },

				Title: { font: { size: rem( 2 ) } },

				Cases: { gap: rem( 2.25 ) },

				Method: { padding: { top: rem( 1.5 ) } },
			},

		},

	} )

}
