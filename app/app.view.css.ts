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

	// App-wide palette tuning layered over the shared builderui tokens. A third
	// attribute selector ([app][base][lights]) outranks theme.css's [base][lights]
	// pair, so these win regardless of stylesheet order. Raw CSS: these set CSS vars
	// on a foreign attribute, which $mol_style_define can't express.
	//
	// The accent is deliberately re-pointed at the code-highlighter palette so the
	// site and the code samples read as one system (see text.view.css.ts):
	//  - control/focus/current -> operator-blue  (matches tree-oper) for links & CTAs
	//  - special               -> component-orange (matches tree-comp) as the one warm
	//    signature accent (hero keyword, feature initials, active-bar)
	// Values are split per-lights so small-text links clear AA on both surfaces
	// (a darker blue on the cream light bg, a brighter blue on near-black dark).
	//
	// Light: a warm off-white page (cream) with pure-white cards for editorial
	// elevation. Dark: the tuned zinc — softened text (#fafafa glares on near-black),
	// and back/card SWAPPED so the page is the lighter shade and cards/topbar/sidebar
	// the darker one (inverted elevation), hardcoded from the zinc base the app pins to.
	$mol_style_attach( '$bog_smalljs_app.palette', `
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="light"] {
			--bog_builderui_control: hsl( 210, 68%, 42% );
			--bog_builderui_focus: hsl( 210, 72%, 36% );
			--bog_builderui_current: hsl( 210, 68%, 42% );
			--bog_builderui_special: hsl( 26, 82%, 44% );
			--bog_builderui_back: #faf9f7;
			--bog_builderui_card: #ffffff;
		}
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="dark"] {
			--bog_builderui_control: hsl( 210, 72%, 64% );
			--bog_builderui_focus: hsl( 210, 76%, 72% );
			--bog_builderui_current: hsl( 210, 72%, 64% );
			--bog_builderui_special: hsl( 30, 85%, 60% );
			--bog_builderui_text: #d4d4d8;
			--bog_builderui_back: #18181b;
			--bog_builderui_card: #09090b;
		}
	` )

}
