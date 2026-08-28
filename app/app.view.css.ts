namespace $ {

	$mol_style_define( $bog_smalljs_app, {

		flex: { direction: 'column' },
		height: '100vh',
		overflow: { y: 'auto', x: 'hidden' },
		background: { color: $bog_builderui_tokens.back },
		color: $bog_builderui_tokens.text,

		Body: {
			flex: { direction: 'column', grow: 1 },
		},

	} )

	// App-wide palette tuning layered over the shared builderui tokens. A third
	// attribute selector ([app][base][lights]) outranks theme.css's [base][lights]
	// pair, so these win regardless of stylesheet order. Raw CSS: these set CSS vars
	// on a foreign attribute, which $mol_style_define can't express.
	//
	// The accent is deliberately re-pointed at the code-highlighter palette so the
	// site and the code samples read as one system (see text.view.css.ts):
	//  - control/focus/current -> operator-blue  (matches tree-oper) for links & CTAs
	//  - special               -> component-orange (matches tree-comp) as the one warm
	//    signature accent (hero keyword, feature initials, active-bar)
	// Values are split per-lights so small-text links clear AA on both surfaces
	// (a darker blue on the cream light bg, a brighter blue on near-black dark).
	//
	// Light: a warm off-white page (cream) with pure-white cards for editorial
	// elevation. Dark: the tuned zinc — softened text (#fafafa glares on near-black),
	// and back/card SWAPPED so the page is the lighter shade and cards/topbar/sidebar
	// the darker one (inverted elevation), hardcoded from the zinc base the app pins to.
	//
	// Три значения `lights`, а не два: пока читатель не выбрал тему сам, в
	// разметке стоит `system`, и палитру выбирает медиа-запрос — так первый кадр
	// красится без участия JS ( см. lights() в app.view.ts ). Значит и здешние
	// перекрытия обязаны знать про `system`: иначе на нём отвалятся ровно они, и
	// сайт покажет сырую палитру builderui вместо своей.
	$mol_style_attach( '$bog_smalljs_app.palette', `
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="light"] {
			--bog_builderui_control: hsl( 210, 68%, 42% );
			--bog_builderui_focus: hsl( 210, 72%, 36% );
			--bog_builderui_current: hsl( 210, 68%, 42% );
			--bog_builderui_special: hsl( 26, 82%, 44% );
			--bog_builderui_back: #faf9f7;
			--bog_builderui_card: #ffffff;
		}
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="dark"],
		[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="system"] {
			--bog_builderui_control: hsl( 210, 72%, 64% );
			--bog_builderui_focus: hsl( 210, 76%, 72% );
			--bog_builderui_current: hsl( 210, 72%, 64% );
			--bog_builderui_special: hsl( 30, 85%, 60% );
			--bog_builderui_text: #d4d4d8;
			--bog_builderui_back: #18181b;
			--bog_builderui_card: #09090b;
		}
		@media ( prefers-color-scheme: light ) {
			[bog_smalljs_app][bog_builderui_base][bog_builderui_lights="system"] {
				--bog_builderui_control: hsl( 210, 68%, 42% );
				--bog_builderui_focus: hsl( 210, 72%, 36% );
				--bog_builderui_current: hsl( 210, 68%, 42% );
				--bog_builderui_special: hsl( 26, 82%, 44% );
				--bog_builderui_text: #09090b;
				--bog_builderui_back: #faf9f7;
				--bog_builderui_card: #ffffff;
			}
		}
	` )

	// Self-hosted web fonts for THIS app only. The shared builderui/theme.css still
	// pulls the same families from Google Fonts via @import; these local @font-face
	// rules use the exact same family names ('Inter' / 'EB Garamond' / 'JetBrains
	// Mono') so the browser prefers our local woff2 over the remote copies — no edit
	// to the foreign theme.css needed. Latin + latin-ext subsets only; per-subset
	// unicode-range means an English page fetches just the latin file, and cyrillic
	// (ru) gracefully falls back to the stack's system-ui. Assets ship via
	// app.meta.tree `deploy \/bog/smalljs/assets`; the relative url() resolves
	// against the page base on both dev (app/-/) and prod (/smalljs/), matching og.png.
	// Raw CSS: @font-face is not expressible through $mol_style_define.
	$mol_style_attach( '$bog_smalljs_app.fonts', `
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 400;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-400-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 400;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-400-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 500;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-500-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 500;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-500-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 600;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-600-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 600;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-600-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 700;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-700-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'EB Garamond';
		  font-style: normal;
		  font-weight: 700;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/eb-garamond-700-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 400;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-400-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 400;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-400-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 500;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-500-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 500;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-500-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 600;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-600-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 600;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-600-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 700;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-700-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'Inter';
		  font-style: normal;
		  font-weight: 700;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/inter-700-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'JetBrains Mono';
		  font-style: normal;
		  font-weight: 400;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/jetbrains-mono-400-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'JetBrains Mono';
		  font-style: normal;
		  font-weight: 400;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/jetbrains-mono-400-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		@font-face {
		  font-family: 'JetBrains Mono';
		  font-style: normal;
		  font-weight: 500;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/jetbrains-mono-500-latin-ext.woff2) format('woff2');
		  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
		  font-family: 'JetBrains Mono';
		  font-style: normal;
		  font-weight: 500;
		  font-display: swap;
		  src: url(bog/smalljs/assets/fonts/jetbrains-mono-500-latin.woff2) format('woff2');
		  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
	` )

}
