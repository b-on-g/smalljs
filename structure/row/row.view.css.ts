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
		// Знак вопроса не кричит: колонка ярких иконок читалась бы как украшение и
		// тянула бы внимание с самого дерева.
		Help: {
			flex: { shrink: 0 },
			align: { items: 'center' },
			margin: { left: rem( 0.375 ) },
			color: $bog_builderui_tokens.shade,
			opacity: 0.45,
			cursor: 'help',
			':hover': {
				opacity: 1,
				color: $bog_builderui_tokens.special,
			},
			':focus-visible': {
				opacity: 1,
				color: $bog_builderui_tokens.special,
			},

			// Пузырь рисуется в верхнем слое браузера, поэтому оформляем его сами:
			// собственные цвета $mol_pop берёт из темы $mol, а сайт живёт на токенах
			// builderui.
			Bubble: {
				// Своя ширина, но не шире экрана: на телефоне пузырь иначе уезжает
				// за левый край, потому что $mol_follower его не подрезает.
				maxWidth: $mol_style_func.calc( 'min( 24rem, 100vw - 2rem )' ),
				border: {
					radius: rem( 0.5 ),
					width: '1px',
					style: 'solid',
					color: $bog_builderui_tokens.line,
				},
				background: { color: $bog_builderui_tokens.card },
			},
		},

		Help_icon: {
			width: rem( 0.875 ),
			height: rem( 0.875 ),
			flex: { shrink: 0 },
		},

		// Пузырь висит в верхнем слое, но CSS наследует от строки дерева — без явного
		// шрифта объяснение набралось бы моноширинным, как сам листинг.
		Note: {
			font: { family: $bog_builderui_tokens.font_body },
			padding: {
				top: rem( 0.5 ),
				bottom: rem( 0.5 ),
				left: rem( 0.75 ),
				right: rem( 0.75 ),
			},
			fontSize: rem( 0.8125 ),
			lineHeight: rem( 1.5 ),
			color: $bog_builderui_tokens.text,
			background: { color: $bog_builderui_tokens.card },
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

		},

	} )

}
