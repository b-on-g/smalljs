namespace $ {

	$mol_style_define( $bog_smalljs_app, {

		flex: { direction: 'column' },
		height: '100vh',
		overflow: { y: 'auto', x: 'hidden' },
		background: { color: $bog_builderui_tokens.card },
		color: $bog_builderui_tokens.text,

		Body: {
			flex: { direction: 'column', grow: 1 },
		},

	} )

	// App-wide softer white for text on the dark theme. The shared builderui palette
	// paints dark text pure #fafafa, which glares against near-black surfaces. We only
	// override the --bog_builderui_text token (it also bridges to --mol_theme_text, so
	// this covers stock $mol text too) and only under the dark theme; light stays as-is.
	// Third attribute selector outranks theme.css's [base][lights] pair, so it wins
	// regardless of stylesheet order. Raw CSS: it targets a CSS var on a foreign
	// attribute, which $mol_style_define can't express.
	$mol_style_attach( '$bog_smalljs_app.dark_text', `
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="dark"] {
			--bog_builderui_text: #d4d4d8;
		}
	` )

}
