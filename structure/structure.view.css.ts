namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $bog_smalljs_structure, {

		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr)',
		gap: rem( 1.5 ),
		align: { items: 'start' },

		Tree: {
			flex: { direction: 'column' },
			minWidth: 0,
			overflow: { x: 'auto' },
			padding: {
				top: rem( 0.75 ),
				bottom: rem( 0.75 ),
				left: rem( 0.25 ),
				right: rem( 0.25 ),
			},
			border: {
				radius: rem( 0.5 ),
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
			},
			background: { color: $bog_builderui_tokens.card },
		},

		Steps: {
			flex: { direction: 'column' },
			gap: rem( 0.75 ),
			minWidth: 0,
		},

		Steps_title: {
			font: { size: rem( 0.75 ), weight: 700 },
			letterSpacing: rem( 0.03 ),
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
			padding: { bottom: rem( 0.25 ) },
		},

		// После пятого шага честный вопрос один: зачем держать свой репозиторий
		// рядом с чужим. Ответ раскрывается по клику: на главной он занимает строку,
		// а прочитать его можно, не уходя со страницы.
		Why: {
			flex: { direction: 'column' },
			minWidth: 0,
			maxWidth: '100%',
			margin: { top: rem( 0.25 ) },
			padding: { top: rem( 0.75 ) },
			border: {
				top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
		},

		// Без явного размера svg занимает ту коробку, которую ему дали. В свёрнутом
		// состоянии шеврон единственный тянущийся элемент строки, и он растягивает
		// заголовок на всю ширину. Тот же случай уже ловили в versus/code.
		$mol_icon_chevron: {
			width: '1em',
			height: '1em',
			flex: { grow: 0, shrink: 0 },
		},

		$mol_check_expand: {
			padding: 0,
			font: { size: rem( 0.8125 ), weight: 600 },
			color: $bog_builderui_tokens.shade,
			background: { color: 'transparent' },
			textAlign: 'left',
			':hover': {
				color: $bog_builderui_tokens.special,
			},
		},

		Why_text: {
			minWidth: 0,
			padding: { top: rem( 0.5 ) },
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,

			$mol_paragraph: {
				padding: { bottom: rem( 0.5 ) },
			},

			$mol_link: {
				display: 'inline',
				color: $bog_builderui_tokens.control,
				':hover': {
					color: $bog_builderui_tokens.focus,
				},
			},
		},

		// Внутри чужой панели (песочница) рамка и фон только мешают: у панели свои.
		'@': {
			bog_smalljs_structure_plain: {
				true: {
					Tree: {
						padding: 0,
						border: {
							radius: 0,
							width: '0px',
							style: 'solid',
							color: $bog_builderui_tokens.line,
						},
						background: { color: 'transparent' },
					},
				},
			},
		},

		'@media': {

			// Side by side once there is room for both columns; stacked below that,
			// which is also how the tree reads on a phone.
			'(min-width: 60rem)': {
				'@': {
					bog_smalljs_structure_steps: {
						true: {
							gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
							gap: rem( 2.5 ),
						},
					},
				},
			},

		},

	} )

}
