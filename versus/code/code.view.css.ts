namespace $.$$ {

	$mol_style_define( $bog_smalljs_versus_code, {

		flex: {
			direction: 'column',
		},

		margin: {
			top: '-0.5rem',
		},

		Hint: {
			font: {
				size: '0.8125rem',
			},
			color: $bog_builderui_tokens.shade,
			padding: {
				bottom: '0.75rem',
			},
		},

		Columns: {
			display: 'grid',
			gridTemplateColumns: 'repeat( auto-fit, minmax( 20rem, 1fr ) )',
			gap: '1rem',
			width: '100%',
		},

		Column: {
			flex: {
				direction: 'column',
			},
			// Without this a grid cell refuses to shrink below the width of its
			// widest line, and one long line of code stretches the whole page.
			minWidth: 0,
			gap: '0.375rem',
		},

		Column_head: {
			justifyContent: 'space-between',
			alignItems: 'baseline',
			gap: '0.5rem',
			font: {
				size: '0.8125rem',
			},
		},

		Column_file: {
			font: {
				family: 'monospace',
				size: '0.75rem',
			},
			color: $bog_builderui_tokens.shade,
			flex: {
				shrink: 1,
			},
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		},

		Column_code: {
			display: 'block',
			font: {
				family: 'monospace',
				size: '0.75rem',
			},
			lineHeight: '1.5',
			whiteSpace: 'pre',
			overflow: 'auto',
			// A scenario is a hundred lines and more, so this pane is a window
			// onto it rather than the whole of it. 24rem filled half a laptop
			// screen twice over once both columns opened, which reads as the page
			// having been taken over by code the reader only asked to glance at.
			maxHeight: '16rem',
			color: $bog_builderui_tokens.text,
			background: {
				color: $bog_builderui_tokens.field,
			},
			border: {
				radius: '0.5rem',
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
			},
			padding: {
				top: '0.75rem',
				bottom: '0.75rem',
				left: '0.875rem',
				right: '0.875rem',
			},
		},

		Missing: {
			font: {
				size: '0.8125rem',
			},
			color: $bog_builderui_tokens.shade,
			padding: {
				top: '0.5rem',
			},
		},

	} )

}
