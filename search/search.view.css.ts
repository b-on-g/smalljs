namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_search, {

		display: 'none',
		position: 'fixed',
		top: 0, left: 0, right: 0, bottom: 0,
		zIndex: 1000,
		justify: { content: 'center' },
		align: { items: 'flex-start' },

		'@': {
			bog_smalljs_search_open: {
				true: { display: 'flex' },
			},
		},

		Backdrop: {
			position: 'absolute',
			top: 0, left: 0, right: 0, bottom: 0,
			background: { color: '#00000099' },
		},

		Panel: {
			position: 'relative',
			flex: { direction: 'column' },
			margin: { top: rem( 5.5 ) },
			width: rem( 40 ),
			maxWidth: '92vw',
			maxHeight: '70vh',
			overflow: { y: 'auto' },
			background: { color: $bog_builderui_tokens.card },
			border: { radius: rem( 0.75 ), width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			boxShadow: '0 12px 48px -12px #00000080',
		},

		Field: {
			flex: { shrink: 0 },
			padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 0.875 ), right: rem( 0.875 ) },
			font: { size: rem( 1.0625 ) },
			background: { color: $bog_builderui_tokens.card },
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			color: $bog_builderui_tokens.text,
		},

		Hint: {
			flex: { shrink: 0 },
			padding: { top: rem( 0.375 ), bottom: rem( 0.375 ), left: rem( 0.875 ), right: rem( 0.875 ) },
			font: { size: rem( 0.75 ) },
			color: $bog_builderui_tokens.shade,
			background: { color: $bog_builderui_tokens.back },
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Results: {
			flex: { direction: 'column' },
			padding: rem( 0.375 ),
		},

		Result: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			gap: rem( 0.125 ),
			padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 0.625 ), right: rem( 0.625 ) },
			border: { radius: rem( 0.5 ) },

			':hover': { background: { color: $bog_builderui_tokens.hover } },
		},

		Result_title: {
			font: { size: rem( 0.9375 ), weight: 600 },
			color: $bog_builderui_tokens.text,
		},

		Result_snippet: {
			font: { size: rem( 0.8125 ) },
			color: $bog_builderui_tokens.shade,
		},

	} )

	// Keyboard-highlighted result row. Raw CSS because the custom attribute
	// isn't part of $mol_link's typed attrs, so $mol_style_define rejects it.
	$mol_style_attach( 'bog/smalljs/search/search.view.css', `
		[bog_smalljs_search_current="true"] {
			background-color: var(--bog_builderui_hover);
		}
	` )

}
