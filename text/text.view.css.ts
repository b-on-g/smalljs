namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_text_code, {

		// The base component is a $mol_stack that overlaps its children in one cell;
		// Copy sits top-left, so the playground link takes the top-right corner.
		Playground: {
			alignSelf: 'flex-start',
			justifySelf: 'flex-end',
			padding: rem( 0.25 ),
			color: $bog_builderui_tokens.shade,
			background: { color: $bog_builderui_tokens.card },
			border: { radius: rem( 0.375 ) },
			opacity: 0.65,

			':hover': {
				opacity: 1,
				color: $bog_builderui_tokens.control,
			},
		},

		Playground_icon: {
			width: rem( 1.05 ),
			height: rem( 1.05 ),
		},

	} )

	// Colors for the view.tree grammar (see text.view.ts). These token-type names are
	// produced only by $bog_smalljs_text_code, so plain attribute selectors are safe and
	// cannot bleed onto other code blocks. Mid-lightness HSLA reads well in both themes,
	// matching how base $mol tints its own tokens; structure/comments use the theme's
	// muted `shade` var so they recede.
	$mol_style_attach( '$bog_smalljs_text_code.tree_syntax', `
		[mol_text_code_token_type="tree-comp"] { color: hsl( 28, 80%, 52% ) }
		[mol_text_code_token_type="tree-string"] { color: hsl( 96, 42%, 42% ) }
		[mol_text_code_token_type="tree-oper"] { color: hsl( 210, 62%, 56% ) }
		[mol_text_code_token_type="tree-prim"] { color: hsl( 45, 72%, 44% ) }
		[mol_text_code_token_type="tree-mark"] { color: var( --bog_builderui_shade ) }
		[mol_text_code_token_type="tree-comment"] { color: var( --bog_builderui_shade ); font-style: italic }
	` )

}
