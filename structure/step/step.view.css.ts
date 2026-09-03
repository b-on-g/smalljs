namespace $ {

	const { rem } = $mol_style_unit

	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

	$mol_style_define( $bog_smalljs_structure_step, {

		flex: { direction: 'row', shrink: 0 },
		align: { items: 'flex-start' },
		gap: rem( 0.75 ),
		minWidth: 0,

		Number: {
			flex: { shrink: 0 },
			justify: { content: 'center' },
			align: { items: 'center' },
			width: rem( 1.5 ),
			height: rem( 1.5 ),
			border: { radius: rem( 0.75 ) },
			background: { color: $bog_builderui_tokens.hover },
			color: $bog_builderui_tokens.special,
			font: { size: rem( 0.75 ), weight: 700 },
		},

		// Шагов пять, и каждый несёт команду в моноширинном шрифте. $mol_view по
		// умолчанию flex-shrink: 0, поэтому колонка вставала по ширине самой длинной
		// команды: на телефоне и текст, и команда уезжали за экран без возможности
		// прокрутки. Явный shrink возвращает колонку в отведённое ей место.
		Body: {
			flex: { direction: 'column', grow: 1, shrink: 1 },
			gap: rem( 0.25 ),
			minWidth: 0,
		},

		Text: {
			lineHeight: rem( 1.5 ),
			color: $bog_builderui_tokens.text,
		},

		// Команду копируют, а не разглядывают, так что на узком экране она
		// переносится по пробелам вместо того, чтобы прятаться в боковой прокрутке.
		Code: {
			font: { family: mono, size: rem( 0.75 ) },
			color: $bog_builderui_tokens.shade,
			overflow: { x: 'auto' },
			whiteSpace: 'pre-wrap',
			overflowWrap: 'break-word',
			minWidth: 0,
		},

	} )

}
