namespace $ {

	const { rem, px } = $mol_style_unit

	// Mono label voice, mirroring the landing eyebrow (self-hosted JetBrains Mono).
	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

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

		// Sits in the same top-right corner as the playground link, shifted left so the
		// two icon buttons read as a small toolbar over the code.
		Run: {
			alignSelf: 'flex-start',
			justifySelf: 'flex-end',
			margin: { right: rem( 2 ) },
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

		'@': {
			// Active (result showing): tint the toggle with the brand accent so its state is
			// obvious, and keep it fully opaque.
			'bog_smalljs_run_active': {
				'true': {
					Run: {
						opacity: 1,
						color: $bog_builderui_tokens.control,
					},
				},
			},
		},

		// Live result panel — a second grid row under the code (the base is a $mol_stack
		// that overlaps children in cell 1/1; placing this at row 2 flows it below).
		Live: {
			gridRow: '2',
			gridColumn: '1',
			justifySelf: 'stretch',
			width: '100%',
			margin: { top: rem( 0.5 ) },
			padding: rem( 1 ),
			background: { color: $bog_builderui_tokens.card },
			border: {
				width: px( 1 ),
				style: 'solid',
				color: $bog_builderui_tokens.line,
				radius: rem( 0.375 ),
			},
			font: { family: $bog_builderui_tokens.font_body },
			whiteSpace: 'normal',
		},

	} )

	$mol_style_define( $bog_smalljs_text_live, {

		flex: { direction: 'column' },
		gap: rem( 0.75 ),

		// mono eyebrow, matching the site's section labels (see landing) — makes the panel
		// read as "rendered output" even when a structural snippet mounts to nothing visible.
		Label: {
			display: 'block',
			font: { family: mono, size: rem( 0.7 ), weight: 500 },
			letterSpacing: rem( 0.12 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
		},

		Output: {
			display: 'block',
			whiteSpace: 'normal',
		},

	} )

	// Colors for the view.tree grammar (see text.view.ts). These token-type names are
	// produced only by $bog_smalljs_text_code, so plain attribute selectors are safe and
	// cannot bleed onto other code blocks. The base (mid-lightness) HSLA is tuned for the
	// dark surface, matching how base $mol tints its own tokens; structure/comments use the
	// theme's muted `shade` var so they recede.
	//
	// The same mid-lightness reads too pale on the light theme's near-white code surface
	// (fails WCAG AA — ~2.7:1 for the orange keyword on the cream page). So the light theme
	// gets a darker variant of each hue, sampled to clear 4.5:1 on the worst-case cream
	// background (#faf9f7). The `[lights="light"]` ancestor (set on the app root) makes the
	// override 0,2,0-specific, so it wins over the 0,1,0 base without !important; dark keeps
	// the base values untouched. `shade` marks/comments already clear AA on both surfaces.
	$mol_style_attach( '$bog_smalljs_text_code.tree_syntax', `
		[mol_text_code_token_type="tree-comp"] { color: hsl( 28, 80%, 52% ) }
		[mol_text_code_token_type="tree-string"] { color: hsl( 96, 42%, 42% ) }
		[mol_text_code_token_type="tree-oper"] { color: hsl( 210, 62%, 56% ) }
		[mol_text_code_token_type="tree-prim"] { color: hsl( 45, 72%, 44% ) }
		[mol_text_code_token_type="tree-mark"] { color: var( --bog_builderui_shade ) }
		[mol_text_code_token_type="tree-comment"] { color: var( --bog_builderui_shade ); font-style: italic }

		[bog_builderui_lights="light"] [mol_text_code_token_type="tree-comp"] { color: hsl( 28, 80%, 38% ) }
		[bog_builderui_lights="light"] [mol_text_code_token_type="tree-string"] { color: hsl( 96, 42%, 34.5% ) }
		[bog_builderui_lights="light"] [mol_text_code_token_type="tree-oper"] { color: hsl( 210, 62%, 45.5% ) }
		[bog_builderui_lights="light"] [mol_text_code_token_type="tree-prim"] { color: hsl( 45, 72%, 31.5% ) }
	` )

}
