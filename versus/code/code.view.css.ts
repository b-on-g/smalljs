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
			color: $mol_theme.shade,
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
			color: $mol_theme.shade,
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
			// Tall enough to read a scenario without the page turning into a
			// scroll of code; the block scrolls inside itself past that.
			maxHeight: '24rem',
			background: {
				color: $mol_theme.back,
			},
			border: {
				radius: '0.5rem',
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
			color: $mol_theme.shade,
			padding: {
				top: '0.5rem',
			},
		},

	} )

}
