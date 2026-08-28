namespace $ {

	const { rem } = $mol_style_unit

	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

	$mol_style_define( $bog_smalljs_structure_row, {

		flex: { direction: 'column' },
		minWidth: 0,

		Line: {
			flex: { direction: 'row', shrink: 0 },
			align: { items: 'center' },
			minWidth: 0,
			padding: {
				top: rem( 0.0625 ),
				bottom: rem( 0.0625 ),
				left: rem( 0.5 ),
				right: rem( 0.5 ),
			},
			border: { radius: rem( 0.25 ) },
			font: { family: mono, size: rem( 0.8125 ) },
			lineHeight: rem( 1.5 ),
			whiteSpace: 'pre',
		},

		Prefix: {
			flex: { shrink: 0 },
			whiteSpace: 'pre',
			color: $bog_builderui_tokens.shade,
			opacity: 0.5,
		},

		Name: {
			flex: { shrink: 0 },
			whiteSpace: 'pre',
			color: $bog_builderui_tokens.text,
		},

		Comment: {
			flex: { shrink: 1 },
			minWidth: 0,
			whiteSpace: 'pre',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			color: $bog_builderui_tokens.shade,
		},

		// The question mark stays quiet until the line is hovered — a column of bright
		// icons would read as decoration and pull attention off the tree itself.
		// $mol_button is a full-size control by default; here it rides inside a line of
		// code and has to keep that line's height.
		Help: {
			flex: { shrink: 0 },
			minHeight: 0,
			height: rem( 1.25 ),
			margin: { left: rem( 0.375 ) },
			padding: {
				top: 0,
				bottom: 0,
				left: rem( 0.125 ),
				right: rem( 0.125 ),
			},
			border: { radius: rem( 0.25 ) },
			color: $bog_builderui_tokens.shade,
			opacity: 0.45,
			':hover': {
				opacity: 1,
				color: $bog_builderui_tokens.special,
			},
		},

		Help_icon: {
			width: rem( 0.875 ),
			height: rem( 0.875 ),
			flex: { shrink: 0 },
		},

		Note: {
			margin: {
				left: rem( 1.5 ),
				top: rem( 0.25 ),
				bottom: rem( 0.5 ),
			},
			padding: {
				left: rem( 0.75 ),
				top: rem( 0.125 ),
				bottom: rem( 0.125 ),
			},
			maxWidth: rem( 34 ),
			border: {
				left: {
					width: '2px',
					style: 'solid',
					color: $bog_builderui_tokens.special,
				},
			},
			font: { size: rem( 0.8125 ) },
			lineHeight: rem( 1.5 ),
			color: $bog_builderui_tokens.text,
			whiteSpace: 'normal',
		},

		'@': {

			// Colour says what a line is: folders that are repositories of their own
			// carry the accent, registries the secondary one, plain files stay quiet.
			bog_smalljs_structure_kind: {
				workspace: { Name: { font: { weight: 700 } } },
				framework: { Name: { color: $bog_builderui_tokens.special } },
				package: { Name: { color: $bog_builderui_tokens.special } },
				project: { Name: { color: $bog_builderui_tokens.special } },
				submodule: { Name: { color: $bog_builderui_tokens.special } },
				registry: { Name: { color: $bog_builderui_tokens.control } },
				registry_own: { Name: { color: $bog_builderui_tokens.control } },
				gitattributes: { Name: { color: $bog_builderui_tokens.shade } },
			},

			bog_smalljs_structure_pickable: {
				true: {
					Line: {
						cursor: 'pointer',
						':hover': {
							background: { color: $bog_builderui_tokens.hover },
						},
					},
				},
			},

			bog_smalljs_structure_active: {
				true: {
					Line: {
						background: { color: $bog_builderui_tokens.hover },
					},
					Name: {
						color: $bog_builderui_tokens.special,
						font: { weight: 700 },
					},
				},
			},

			bog_smalljs_structure_open: {
				true: {
					Help: {
						opacity: 1,
						color: $bog_builderui_tokens.special,
					},
				},
			},

		},

	} )

}
