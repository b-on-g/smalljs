namespace $ {

	const { rem } = $mol_style_unit

	// Utility / label voice. The subject is a code DSL, so its captions speak the
	// DSL's native register: monospace, uppercase, widely tracked, small.
	const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"

	const eyebrow = {
		font: { family: mono, size: rem( 0.75 ), weight: 500 },
		letterSpacing: rem( 0.12 ),
		textTransform: 'uppercase',
		color: $bog_builderui_tokens.shade,
	} as const

	$mol_style_define( $bog_smalljs_landing, {

		flex: { direction: 'column' },

		Hero: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: rem( 3 ),
			padding: { top: rem( 5 ), bottom: rem( 4 ), left: $mol_gap.block, right: $mol_gap.block },
		},

		Hero_head: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: rem( 1.5 ),
			// width:100% (not just max-width) so the centered column never takes its
			// max-content width and overflow a narrow viewport — it fills the available
			// width, capped at 52rem on desktop, and the title wraps inside it on phones.
			width: '100%',
			maxWidth: rem( 52 ),
		},

		Hero_eyebrow: {
			display: 'block',
			... eyebrow,
			textAlign: 'center',
		},

		Hero_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 3.5 ), weight: 500 },
			lineHeight: '1.12',
			letterSpacing: '-0.02em',
			textAlign: 'center',
			color: $bog_builderui_tokens.text,
			// As a centered flex child the title otherwise takes its max-content width and
			// spills past Hero_head; cap it to the parent so the long words wrap instead.
			maxWidth: '100%',
			// long words ("micromodule" / "микромодульный") must break, not overflow on phones
			overflowWrap: 'break-word',
		},

		Hero_title_accent: {
			display: 'inline',
			color: $bog_builderui_tokens.special,
			// the pre/post text nodes carry no surrounding spaces, so the accent adds its own
			margin: { left: '0.22em', right: '0.1em' },
		},

		Hero_subtitle: {
			display: 'block',
			font: { size: rem( 1.1875 ) },
			lineHeight: '1.55',
			textAlign: 'center',
			maxWidth: rem( 40 ),
			color: $bog_builderui_tokens.shade,
		},

		// Secondary line under the thesis — same muted token as the subtitle but a step
		// smaller and dimmed, so it reads as a footnote rather than a second headline.
		Hero_subtitle_note: {
			display: 'block',
			font: { size: rem( 0.9375 ) },
			lineHeight: '1.5',
			textAlign: 'center',
			maxWidth: rem( 38 ),
			color: $bog_builderui_tokens.shade,
			opacity: 0.72,
			margin: { top: rem( -0.75 ) },
		},

		Hero_actions: {
			flex: { direction: 'row', wrap: 'wrap' },
			gap: rem( 0.75 ),
			justify: { content: 'center' },
			align: { items: 'center' },
			margin: { top: rem( 0.5 ) },
		},

		// Primary — filled operator-blue, confident and tight (small radius, not a pill).
		// Hover-lift / focus-ring / transition live in the raw attach block below.
		Hero_cta_start: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			background: { color: $bog_builderui_tokens.current },
			color: $bog_builderui_tokens.back,
			padding: { left: rem( 1.125 ), right: rem( 1.125 ), top: rem( 0.625 ), bottom: rem( 0.625 ) },
			border: { radius: rem( 0.375 ) },
			font: { weight: 600 },
		},

		Hero_cta_start_icon: { width: rem( 0.9 ), height: rem( 0.9 ) },

		// Secondary — outline, quieter.
		Hero_cta_play: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			color: $bog_builderui_tokens.control,
			padding: { left: rem( 1.125 ), right: rem( 1.125 ), top: rem( 0.5625 ), bottom: rem( 0.5625 ) },
			border: { radius: rem( 0.375 ), width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			font: { weight: 600 },
		},

		Hero_cta_play_icon: { width: rem( 0.85 ), height: rem( 0.85 ) },

		// Tertiary — a plain text link, no chrome.
		Hero_cta_why: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.3 ),
			padding: { left: rem( 0.625 ), right: rem( 0.625 ), top: rem( 0.5625 ), bottom: rem( 0.5625 ) },
			color: $bog_builderui_tokens.control,
			font: { weight: 600 },
			border: { radius: rem( 0.375 ) },
		},

		Hero_cta_why_icon: { width: rem( 0.85 ), height: rem( 0.85 ) },

		// ── Signature: the source (left) and its live result (right) side by side ──
		Signature: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: rem( 1 ),
			width: '100%',
			maxWidth: rem( 58 ),
			margin: { left: 'auto', right: 'auto' },
		},

		Sign_panel: {
			display: 'flex',
			flex: { direction: 'row' },
			align: { items: 'stretch' },
			width: '100%',
			background: { color: $bog_builderui_tokens.card },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem( 0.75 ) },
			overflow: { x: 'hidden', y: 'hidden' },
		},

		Sign_code: {
			flex: { direction: 'column', grow: 1, shrink: 1, basis: 0 },
			minWidth: 0,
			background: { color: $bog_builderui_tokens.back },
			border: { right: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Sign_code_label: {
			display: 'block',
			... eyebrow,
			padding: { top: rem( 0.625 ), bottom: rem( 0.625 ), left: rem( 1 ), right: rem( 1 ) },
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			background: { color: $bog_builderui_tokens.card },
		},

		Sign_code_view: {
			flex: { grow: 1 },
			padding: { top: rem( 0.75 ), bottom: rem( 1 ), left: rem( 1 ), right: rem( 1 ) },
			overflow: { x: 'auto', y: 'hidden' },
			font: { family: mono, size: rem( 0.8125 ) },
			lineHeight: '1.7',
		},

		// Второй файл витрины оформляем как первый: своя подпись-разделитель
		// и та же типографика кода.
		Sign_ts_label: {
			display: 'block',
			... eyebrow,
			padding: { top: rem( 0.625 ), bottom: rem( 0.625 ), left: rem( 1 ), right: rem( 1 ) },
			border: {
				top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
				bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			background: { color: $bog_builderui_tokens.card },
		},

		Sign_ts_view: {
			padding: { top: rem( 0.75 ), bottom: rem( 1 ), left: rem( 1 ), right: rem( 1 ) },
			overflow: { x: 'auto', y: 'hidden' },
			font: { family: mono, size: rem( 0.8125 ) },
			lineHeight: '1.7',
		},

		// Третий файл — стили. Оформление то же, что у первых двух: витрина
		// обещает «три файла», и все три должны выглядеть одинаково весомо.
		Sign_css_label: {
			display: 'block',
			... eyebrow,
			padding: { top: rem( 0.625 ), bottom: rem( 0.625 ), left: rem( 1 ), right: rem( 1 ) },
			border: {
				top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
				bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			background: { color: $bog_builderui_tokens.card },
		},

		Sign_css_view: {
			padding: { top: rem( 0.75 ), bottom: rem( 1 ), left: rem( 1 ), right: rem( 1 ) },
			overflow: { x: 'auto', y: 'hidden' },
			font: { family: mono, size: rem( 0.8125 ) },
			lineHeight: '1.7',
		},

		Sign_arrow: {
			flex: { direction: 'column', grow: 0, shrink: 0 },
			justify: { content: 'center' },
			align: { items: 'center' },
			width: rem( 2.5 ),
			background: { color: $bog_builderui_tokens.card },
			border: { right: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 1.25 ) },
		},

		Sign_live: {
			flex: { direction: 'column', grow: 1, shrink: 1, basis: 0 },
			minWidth: 0,
			background: { color: $bog_builderui_tokens.card },
		},

		Sign_live_label: {
			display: 'flex',
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			... eyebrow,
			padding: { top: rem( 0.625 ), bottom: rem( 0.625 ), left: rem( 1 ), right: rem( 1 ) },
			border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },

			// a small live-green dot — the same green the code highlighter paints strings
			'::before': {
				content: '""',
				width: rem( 0.4 ),
				height: rem( 0.4 ),
				border: { radius: rem( 0.5 ) },
				// the same green the code highlighter paints strings (hsl 96 42% 42%)
				background: { color: '#62983e' },
			},
		},

		Sign_demo: {
			flex: { grow: 1 },
		},

		Sign_caption: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.0625 ), style: 'italic' },
			color: $bog_builderui_tokens.shade,
			textAlign: 'center',
		},

		// Прочитал код — тут же его и потрогай. Ссылка ведёт в песочницу ровно
		// на этот пример, а не «в песочницу вообще».
		Sign_try: {
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			color: $bog_builderui_tokens.control,
			padding: { left: rem( 1.125 ), right: rem( 1.125 ), top: rem( 0.5625 ), bottom: rem( 0.5625 ) },
			border: { radius: rem( 0.375 ), width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			font: { weight: 600, size: rem( 0.9375 ) },
		},

		Sign_try_icon: { width: rem( 0.85 ), height: rem( 0.85 ) },

		// ── Features ──
		Features: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: rem( 2.5 ),
			padding: { top: rem( 2 ), bottom: rem( 5 ), left: $mol_gap.block, right: $mol_gap.block },
			maxWidth: rem( 62 ),
			margin: { left: 'auto', right: 'auto' },
		},

		Feature1: { flex: { direction: 'column' }, gap: rem( 0.5 ) },
		Feature2: { flex: { direction: 'column' }, gap: rem( 0.5 ) },
		Feature3: { flex: { direction: 'column' }, gap: rem( 0.5 ) },

		// Titles carry the display voice; the initial letter is tinted so the three
		// initials read down the row as M · O · L — the word the framework is named for.
		Feature1_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.375 ), weight: 500 },
			letterSpacing: '-0.01em',
			'::first-letter': { color: $bog_builderui_tokens.special },
		},
		Feature2_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.375 ), weight: 500 },
			letterSpacing: '-0.01em',
			'::first-letter': { color: $bog_builderui_tokens.special },
		},
		Feature3_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 1.375 ), weight: 500 },
			letterSpacing: '-0.01em',
			'::first-letter': { color: $bog_builderui_tokens.special },
		},

		Feature1_text: { color: $bog_builderui_tokens.shade, lineHeight: '1.6' },
		Feature2_text: { color: $bog_builderui_tokens.shade, lineHeight: '1.6' },
		Feature3_text: { color: $bog_builderui_tokens.shade, lineHeight: '1.6' },

		// ── Structure ──
		// The section that answers "where does my code go" before the reader has to ask
		// on a forum. It sits after the three features and before the comparison: by
		// then they know what the framework is, and the next honest question is how a
		// project made with it is laid out.
		Arch: {
			flex: { direction: 'column' },
			gap: rem( 1 ),
			width: '100%',
			maxWidth: rem( 62 ),
			margin: { left: 'auto', right: 'auto' },
			padding: { top: rem( 2.5 ), bottom: rem( 3.5 ), left: $mol_gap.block, right: $mol_gap.block },
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Arch_eyebrow: {
			display: 'block',
			... eyebrow,
		},

		Arch_title: {
			display: 'block',
			font: { family: $bog_builderui_tokens.font_head, size: rem( 2 ), weight: 500 },
			letterSpacing: '-0.02em',
			margin: { top: rem( -0.25 ) },
		},

		Arch_line: {
			display: 'block',
			maxWidth: rem( 44 ),
			font: { size: rem( 1.0625 ) },
			lineHeight: '1.6',
			color: $bog_builderui_tokens.shade,
			margin: { bottom: rem( 0.5 ) },
		},

		Arch_link: {
			flex: { direction: 'row', grow: 0 },
			align: { items: 'center', self: 'flex-start' },
			gap: rem( 0.4 ),
			margin: { top: rem( 0.5 ) },
			color: $bog_builderui_tokens.control,
			font: { weight: 600 },
			':hover': { color: $bog_builderui_tokens.focus },
		},

		Arch_link_icon: {
			width: rem( 0.9 ),
			height: rem( 0.9 ),
			flex: { shrink: 0 },
		},

		// ── Compare ──
		// The way into the comparison section, and deliberately quiet: a thin rule,
		// one line and two text links, below the fold. The section is meant to be
		// tried rather than announced, so it gets no card, no button and no place in
		// the hero — a reader who scrolls this far is already curious enough.
		Versus: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: rem( 0.625 ),
			width: '100%',
			maxWidth: rem( 62 ),
			margin: { left: 'auto', right: 'auto' },
			padding: { top: rem( 2.5 ), bottom: rem( 3 ), left: $mol_gap.block, right: $mol_gap.block },
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
		},

		Versus_eyebrow: {
			display: 'block',
			... eyebrow,
			textAlign: 'center',
		},

		Versus_line: {
			display: 'block',
			font: { size: rem( 1.0625 ) },
			lineHeight: '1.6',
			textAlign: 'center',
			maxWidth: rem( 38 ),
			color: $bog_builderui_tokens.shade,
		},

		Versus_links: {
			flex: { direction: 'row', wrap: 'wrap' },
			justify: { content: 'center' },
			align: { items: 'center' },
			gap: rem( 1.25 ),
			margin: { top: rem( 0.375 ) },
		},

		Versus_open: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: rem( 0.4 ),
			color: $bog_builderui_tokens.control,
			font: { weight: 600 },

			':hover': { color: $bog_builderui_tokens.focus },
		},

		Versus_open_icon: {
			width: rem( 0.9 ),
			height: rem( 0.9 ),
			flex: { shrink: 0 },
		},

		// The concrete pair reads as the quieter of the two: one is the door to the
		// section, the other a single example behind it.
		Versus_pair: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			color: $bog_builderui_tokens.shade,
			font: { size: rem( 0.9375 ) },

			':hover': { color: $bog_builderui_tokens.text },
		},

		// ── Footer ──
		Footer: {
			flex: { direction: 'column' },
			gap: rem( 2 ),
			padding: { top: rem( 4 ), bottom: rem( 3 ), left: rem( 4 ), right: rem( 4 ) },
			border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
			margin: { top: 'auto', left: 'auto', right: 'auto' },
			maxWidth: rem( 75 ),
			width: '100%',
		},

		Footer_cols: {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: rem( 2 ),
			margin: { left: 'auto', right: 'auto' },
			width: '100%',
		},

		Footer_col1: { flex: { direction: 'column' }, gap: rem( 2 ) },
		Footer_col2: { flex: { direction: 'column' }, gap: rem( 2 ) },
		Footer_col3: { flex: { direction: 'column' }, gap: rem( 2 ) },
		Footer_col4: { flex: { direction: 'column' }, gap: rem( 2 ) },

		Footer_sect_docs: { flex: { direction: 'column' }, gap: rem( 0.75 ) },
		Footer_sect_about: { flex: { direction: 'column' }, gap: rem( 0.75 ) },
		Footer_sect_resources: { flex: { direction: 'column' }, gap: rem( 0.75 ) },
		Footer_sect_libs: { flex: { direction: 'column' }, gap: rem( 0.75 ) },

		// Footer headings speak the utility voice, matching the sidebar/eyebrow labels.
		Footer_sect_docs_title: { ... eyebrow, padding: { bottom: rem( 0.25 ) } },
		Footer_sect_about_title: { ... eyebrow, padding: { bottom: rem( 0.25 ) } },
		Footer_sect_resources_title: { ... eyebrow, padding: { bottom: rem( 0.25 ) } },
		Footer_sect_libs_title: { ... eyebrow, padding: { bottom: rem( 0.25 ) } },

		Footer_copy: {
			flex: { direction: 'column' },
			align: { items: 'center' },
			gap: rem( 0.25 ),
			font: { size: rem( 0.875 ) },
			color: $bog_builderui_tokens.shade,
			textAlign: 'center',
			padding: { top: rem( 2 ) },
		},

		'@media': {

			// Tablet: signature stacks a touch earlier than the phone breakpoint so the
			// two panels never get too cramped side by side.
			'(max-width: 55rem)': {
				Sign_panel: { flex: { direction: 'column' } },
				Sign_code: {
					border: {
						right: { width: 0 },
						bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
					},
				},
				Sign_arrow: {
					flex: { direction: 'row' },
					align: { self: 'center' },
					width: rem( 2.25 ),
					height: rem( 2.25 ),
					border: {
						right: { width: 0 },
						bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
					},
				},
			},

			// Phone: shrink the oversized hero, single-column features and footer so
			// nothing overflows the viewport width.
			'(max-width: 47.9375rem)': {

				Hero: {
					gap: rem( 2.25 ),
					padding: { top: rem( 3 ), bottom: rem( 2.5 ), left: rem( 1 ), right: rem( 1 ) },
				},

				// 1.875rem so the longest unbroken word — RU "микромодульный" — fits whole
				// on one line inside a 320px viewport (≈231px in ~288px of content width).
				Hero_title: { font: { size: rem( 1.875 ) } },

				Hero_subtitle: { font: { size: rem( 1.0625 ) } },

				Hero_subtitle_note: { font: { size: rem( 0.875 ) }, margin: { top: rem( -0.5 ) } },

				Features: {
					gridTemplateColumns: '1fr',
					gap: rem( 1.75 ),
					padding: { top: rem( 1 ), bottom: rem( 3 ), left: rem( 1.25 ), right: rem( 1.25 ) },
				},

				Arch: {
					padding: { top: rem( 2 ), bottom: rem( 2.5 ), left: rem( 1.25 ), right: rem( 1.25 ) },
				},

				Arch_title: { font: { size: rem( 1.625 ) } },

				Versus: {
					padding: { top: rem( 2 ), bottom: rem( 2.25 ), left: rem( 1.25 ), right: rem( 1.25 ) },
				},

				Footer: {
					padding: { top: rem( 2.5 ), bottom: rem( 2 ), left: rem( 1.25 ), right: rem( 1.25 ) },
				},

				Footer_cols: {
					gridTemplateColumns: '1fr 1fr',
					gap: rem( 1.5 ),
				},

			},

		},

	} )

	// Motion, elevation and focus states. Kept in raw CSS because $mol_style_define's
	// typed schema has no transition / transform / outline / plain box-shadow, and the
	// hero entrance needs @keyframes. Selectors target the per-sub attributes $mol
	// emits (lowercased owner_subname), scoped under the landing root.
	$mol_style_attach( '$bog_smalljs_landing.craft', `
		[bog_smalljs_landing_sign_panel] {
			box-shadow: 0 20px 48px -28px rgba( 0, 0, 0, 0.25 );
		}

		[bog_smalljs_landing_hero_head],
		[bog_smalljs_landing_signature] {
			animation: bog_smalljs_rise 0.7s cubic-bezier( 0.22, 1, 0.36, 1 ) both;
		}
		[bog_smalljs_landing_signature] { animation-delay: 0.12s }

		[bog_smalljs_landing_hero_cta_start],
		[bog_smalljs_landing_hero_cta_play],
		[bog_smalljs_landing_hero_cta_why] {
			transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease, background-color .12s ease, filter .12s ease;
		}
		/* $mol_link paints its own translucent hover/focus background and active text
		   color with :pseudo-class specificity that beats the plain attribute selector
		   above — on the filled CTA that wiped the blue fill under the white label.
		   Re-pin fill and label at the same specificity (this sheet attaches later). */
		[bog_smalljs_landing_hero_cta_start]:hover {
			transform: translateY( -1px );
			filter: brightness( 1.06 );
			box-shadow: 0 6px 16px -8px var( --bog_builderui_current );
			background-color: var( --bog_builderui_current );
		}
		[bog_smalljs_landing_hero_cta_start]:focus-visible {
			background-color: var( --bog_builderui_current );
		}
		[bog_smalljs_landing_hero_cta_start]:active {
			color: var( --bog_builderui_back );
		}
		[bog_smalljs_landing_hero_cta_play]:hover {
			transform: translateY( -1px );
			border-color: var( --bog_builderui_control );
			background: var( --bog_builderui_hover );
		}
		[bog_smalljs_landing_hero_cta_why]:hover { text-decoration: underline }

		[bog_smalljs_landing_hero_cta_start]:focus-visible,
		[bog_smalljs_landing_hero_cta_play]:focus-visible,
		[bog_smalljs_landing_hero_cta_why]:focus-visible {
			outline: 2px solid var( --bog_builderui_focus );
			outline-offset: 2px;
		}

		@media ( max-width: 55rem ) {
			[bog_smalljs_landing_sign_arrow] { transform: rotate( 90deg ) }
		}

		@keyframes bog_smalljs_rise {
			from { opacity: 0; transform: translateY( 10px ) }
			to { opacity: 1; transform: none }
		}
		@media ( prefers-reduced-motion: reduce ) {
			[bog_smalljs_landing_hero_head],
			[bog_smalljs_landing_signature] { animation: none }
		}
	` )

}
