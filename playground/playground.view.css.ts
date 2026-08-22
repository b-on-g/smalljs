namespace $ {

	const { rem } = $mol_style_unit

	const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } as const

	const label = {
		flex: { shrink: 0 },
		padding: { top: rem( 0.5 ), bottom: rem( 0.5 ), left: rem( 0.875 ), right: rem( 0.875 ) },
		font: { size: rem( 0.6875 ), weight: 700 },
		color: $bog_builderui_tokens.shade,
		textTransform: 'uppercase',
		letterSpacing: rem( 0.03 ),
		background: { color: $bog_builderui_tokens.back },
		border: { bottom: line },
	} as const

	const pane = {
		flex: { direction: 'column' },
		minWidth: 0,
		minHeight: 0,
		overflow: { x: 'hidden', y: 'hidden' },
	} as const

	const tab = {
		flex: { grow: 0 },
		padding: { top: rem( 0.4 ), bottom: rem( 0.4 ), left: rem( 0.75 ), right: rem( 0.75 ) },
		border: { radius: rem( 0 ) },
		font: { size: rem( 0.75 ), weight: 600 },
		color: $bog_builderui_tokens.shade,
		background: { color: $bog_builderui_tokens.back },
	} as const

	const tab_active = {
		color: $bog_builderui_tokens.special,
		background: { color: $bog_builderui_tokens.card },
	} as const

	// Подпись файла над редактором на широком экране — вкладок там нет.
	const file_label = {
		display: 'block',
		font: { size: '0.75rem', weight: 600 },
		letterSpacing: '0.04em',
		textTransform: 'uppercase',
		color: $bog_builderui_tokens.shade,
		padding: {
			top: '0.5rem',
			bottom: '0.375rem',
			left: '1rem',
			right: '1rem',
		},
		border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		background: { color: $bog_builderui_tokens.card },
	} as const

	$mol_style_define( $bog_smalljs_playground, {

		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		flex: { grow: 1 },
		minWidth: 0, // shrink to the container (e.g. embedded in the course column) instead of forcing content width
		minHeight: 0,
		height: $mol_style_func.calc( '100vh - 4rem' ),
		background: { color: $bog_builderui_tokens.back },

		Editor_pane: {
			...pane,
			border: { right: line },
		},

		Preview_pane: pane,

		Tabs: {
			flex: { direction: 'row', shrink: 0 },
			align: { items: 'stretch' },
			border: { bottom: line },
			background: { color: $bog_builderui_tokens.back },
		},

		Tree_tab: tab,
		Ts_tab: tab,
		Css_tab: tab,

		// Распорка отжимает сброс к правому краю ряда табов.
		Tabs_gap: {
			flex: { grow: 1 },
		},

		// Выбор примера: в том же ряду, что и табы, слева от сброса.
		Samples: {
			align: { self: 'center' },
			margin: { right: '0.25rem' },
		},

		Samples_label: {
			font: { size: '0.8125rem' },
			color: $bog_builderui_tokens.shade,
		},

		Samples_chevron: {
			width: '0.875rem',
			height: '0.875rem',
			flex: { shrink: 0 },
			color: $bog_builderui_tokens.shade,
		},

		Samples_menu: {
			flex: { direction: 'column' },
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.25rem',
				right: '0.25rem',
			},
			minWidth: '11rem',
		},

		Sample_option: {
			justify: { content: 'flex-start' },
			padding: {
				top: '0.375rem',
				bottom: '0.375rem',
				left: '0.625rem',
				right: '0.625rem',
			},
			border: { radius: '0.375rem' },
			font: { size: '0.875rem' },
			':hover': {
				background: { color: $bog_builderui_tokens.card },
			},
		},

		// Журнал под превью. Свёрнут по умолчанию, но счётчик ошибок виден
		// на кнопке и в свёрнутом виде — иначе ловить их было бы незачем.
		Preview_gap: { flex: { grow: 1 } },

		Log_toggle: {
			align: { self: 'center' },
			padding: {
				top: '0.125rem',
				bottom: '0.125rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			font: { size: '0.75rem' },
			color: $bog_builderui_tokens.shade,
			border: { radius: '0.375rem' },
			':hover': { color: $bog_builderui_tokens.text },
		},

		Log: {
			display: 'none',
			flex: { direction: 'column', shrink: 0 },
			maxHeight: '12rem',
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			background: { color: $bog_builderui_tokens.back },
			'@': {
				bog_smalljs_pg_log_shown: {
					true: { display: 'flex' },
				},
			},
		},

		Log_head: {
			flex: { direction: 'row', shrink: 0 },
			align: { items: 'center' },
			padding: {
				top: '0.375rem',
				bottom: '0.375rem',
				left: '0.75rem',
				right: '0.5rem',
			},
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Log_title: {
			font: { size: '0.75rem', weight: 600 },
			letterSpacing: '0.04em',
			textTransform: 'uppercase',
			color: $bog_builderui_tokens.shade,
		},

		Log_gap: { flex: { grow: 1 } },

		Log_clear: {
			padding: {
				top: 0,
				bottom: 0,
				left: '0.375rem',
				right: '0.375rem',
			},
			color: $bog_builderui_tokens.shade,
			':hover': { color: $bog_builderui_tokens.text },
		},

		Log_list: {
			flex: { direction: 'column', shrink: 1 },
			minHeight: 0,
			overflow: 'auto',
			padding: {
				top: '0.375rem',
				bottom: '0.5rem',
				left: '0.75rem',
				right: '0.75rem',
			},
		},

		Log_row: {
			font: { family: "'JetBrains Mono', ui-monospace, monospace", size: '0.75rem' },
			lineHeight: '1.6',
			whiteSpace: 'pre-wrap',
			wordBreak: 'break-word',
			color: $bog_builderui_tokens.text,
			'@': {
				bog_smalljs_pg_level: {
					warn: { color: '#b26a00' },
					error: { color: '#c0392b' },
				},
			},
		},

		Share: {
			align: { self: 'center' },
			margin: { right: '0.25rem' },
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			color: $bog_builderui_tokens.shade,
			border: { radius: '0.375rem' },
			':hover': {
				color: $bog_builderui_tokens.text,
				background: { color: $bog_builderui_tokens.card },
			},
		},

		Share_icon: {
			width: '1rem',
			height: '1rem',
			flex: { shrink: 0 },
		},

		// Кнопки нет в разметке, пока откатывать нечего — см. tabs_content().
		Reset: {
			align: { self: 'center' },
			margin: { right: '0.5rem' },
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			color: $bog_builderui_tokens.shade,
			border: { radius: '0.375rem' },
			':hover': {
				color: $bog_builderui_tokens.text,
				background: { color: $bog_builderui_tokens.card },
			},
		},

		Reset_icon: {
			width: '1rem',
			height: '1rem',
			flex: { shrink: 0 },
		},

		Preview_label: label,

		Editor: {
			flex: { grow: 1 },
			minHeight: 0,
			border: { radius: rem( 0 ) },
			font: { family: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', size: rem( 0.8125 ) },
		},

		Preview: {
			flex: { direction: 'column', grow: 1 },
			minHeight: 0,
			overflow: { y: 'auto' },
			padding: $mol_gap.block,
			color: $bog_builderui_tokens.text,
		},


		// Все три редактора существуют всегда, а показ переключается стилями.
		// По умолчанию — вкладки: так было изначально и так привычнее.
		// Кнопка в ряду вкладок разворачивает файлы стопкой, выбор запоминается.
		Editors: {
			flex: { direction: 'column', grow: 1, shrink: 1 },
			minHeight: 0,
			overflow: 'auto',
		},

		Editor_tree_label: { display: 'none' },
		Editor_ts_label: { display: 'none' },
		Editor_css_label: { display: 'none' },

		Layout_toggle: {
			align: { self: 'center' },
			margin: { right: '0.25rem' },
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			color: $bog_builderui_tokens.shade,
			border: { radius: '0.375rem' },
			':hover': {
				color: $bog_builderui_tokens.text,
				background: { color: $bog_builderui_tokens.card },
			},
		},

		Layout_icon: {
			width: '1rem',
			height: '1rem',
			flex: { shrink: 0 },
		},

		Editor_ts: { display: 'none' },
		Editor_css: { display: 'none' },

		'@media': {

			'(max-width: 47.9375rem)': {
				gridTemplateColumns: '1fr',
				gridTemplateRows: '1fr 1fr',
				Editor_pane: {
					...pane,
					border: { right: { width: '0px', style: 'solid', color: $bog_builderui_tokens.line }, bottom: line },
				},
			},
		},


		// Правила режима идут последними: они перекрывают display: none
		// у скрытых редакторов, а при равной специфичности выигрывает
		// тот, кто ниже по файлу.
		'@': {
			bog_smalljs_pg_tab: {
				tree: { Tree_tab: tab_active },
				ts: { Ts_tab: tab_active },
				css: { Css_tab: tab_active },
			},
			bog_smalljs_pg_editors: {
				all: {
					Tree_tab: { display: 'none' },
					Ts_tab: { display: 'none' },
					Css_tab: { display: 'none' },
					Editor_tree_label: { ...file_label, border: { top: { width: '0px', style: 'solid', color: $bog_builderui_tokens.line } } },
					Editor_ts_label: file_label,
					Editor_css_label: file_label,
					Editor_ts: { display: 'flex', flex: { shrink: 0 } },
					Editor_css: { display: 'flex', flex: { shrink: 0 } },
					Layout_toggle: {
						color: $bog_builderui_tokens.text,
						background: { color: $bog_builderui_tokens.card },
					},
				},
			},
		},
	} )

}
