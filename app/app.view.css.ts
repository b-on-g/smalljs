namespace $ {

	$mol_style_define( $bog_smalljs_app, {

		flex: { direction: 'column' },
		height: '100vh',
		overflow: { y: 'auto', x: 'hidden' },
		background: { color: $bog_builderui_tokens.back },
		color: $bog_builderui_tokens.text,

		Body: {
			flex: { direction: 'column', grow: 1 },
		},

	} )

	// App-wide dark-theme palette tweaks. Only under the dark theme; light stays as-is.
	// Third attribute selector outranks theme.css's [base][lights] pair, so it wins
	// regardless of stylesheet order. Raw CSS: these target CSS vars on a foreign
	// attribute, which $mol_style_define can't express.
	//
	//  - text: the shared builderui palette paints dark text pure #fafafa, which glares
	//    against near-black surfaces; soften it (also bridges to --mol_theme_text).
	//  - back/card SWAPPED: the page surface becomes the lighter shade and cards/topbar/
	//    sidebar the darker one (inverted elevation). Values are hardcoded from the zinc
	//    base (the app is pinned to bog_builderui_base="zinc"); a var() swap can't be used
	//    because back↔card would reference each other and CSS voids the circular vars.
	$mol_style_attach( '$bog_smalljs_app.dark_theme', `
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="dark"] {
			--bog_builderui_text: #d4d4d8;
			--bog_builderui_back: #18181b;
			--bog_builderui_card: #09090b;
		}
	` )

}
