// Build-time generator for Open Graph cards (1200x630 PNG) — the root assets/og.png
// plus a per-page card in assets/og/<slug>.png.
//
// The cards mirror the live site's landing hero (zinc-light cream palette,
// EB Garamond headline, component-orange accent, JetBrains Mono eyebrow, real
// logo mark) so a shared link previews the way the site actually looks.
// Palette/typography sources: app/app.view.css.ts + landing/landing.view.css.ts.
//
// Reads the slug -> title map out of the generated content/content.ts, renders
// a branded HTML card per page with the page title as the headline, and
// rasterizes it via puppeteer. app.view.ts points og:image at the per-slug
// cards (falling back to the generic assets/og.png).
//
// Run manually after content changes:  node assets/og_cards.cjs
// It is deliberately NOT wired into the watched build — rasterization is slow
// and the output is committed like the rest of assets/.

const fs = require( 'fs' )
const path = require( 'path' )
// Resolved via node_modules lookup walking up to the MAM workspace root.
const puppeteer = require( 'puppeteer' )

const root = path.resolve( __dirname, '..' )
const content_ts = fs.readFileSync( path.join( root, 'content', 'content.ts' ), 'utf8' )
const out_dir = path.join( __dirname, 'og' )

const logo_svg = fs.readFileSync( path.join( __dirname, 'logo.svg' ), 'utf8' )
	.replace( /<\?xml[^>]*\?>\s*|<!DOCTYPE[^>]*>\s*/g, '' )

const font = name => `file://${ path.join( __dirname, 'fonts', name ) }`

// Top-level page entries: 4-tab-indented "'slug': {" then slug/title lines.
function pages() {
	const re = /\n\t{4}'([^']+)': \{\n\t{5}slug: '[^']+',\n\t{5}title: ("(?:[^"\\]|\\.)*")/g
	const list = []
	let m
	while ( ( m = re.exec( content_ts ) ) ) {
		list.push( { slug: m[ 1 ], title: JSON.parse( m[ 2 ] ) } )
	}
	return list
}

const esc = s => s.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' )

// Highlight $mol / $-identifiers in the warm accent, like the site's hero keyword.
function highlight( title ) {
	return esc( title ).replace( /(\$[a-z][a-z0-9_]*)/gi, '<span class="accent">$1</span>' )
}

// Site palette (zinc light + app overrides from app.view.css.ts).
const back = '#faf9f7'
const text = '#09090b'
const shade = '#71717a'
const line = '#e4e4e7'
const blue = 'hsl( 210, 68%, 42% )'
const orange = 'hsl( 26, 82%, 44% )'

function card_html( { eyebrow, headline, headline_size, tagline } ) {
	return `<!doctype html><html><head><meta charset="utf-8"><style>
	@font-face { font-family: 'EB Garamond'; font-weight: 500; src: url('${ font( 'eb-garamond-500-latin.woff2' ) }') format('woff2'); }
	@font-face { font-family: 'Inter'; font-weight: 400; src: url('${ font( 'inter-400-latin.woff2' ) }') format('woff2'); }
	@font-face { font-family: 'Inter'; font-weight: 600; src: url('${ font( 'inter-600-latin.woff2' ) }') format('woff2'); }
	@font-face { font-family: 'JetBrains Mono'; font-weight: 500; src: url('${ font( 'jetbrains-mono-500-latin.woff2' ) }') format('woff2'); }
	* { margin: 0; box-sizing: border-box; }
	html, body { width: 1200px; height: 630px; }
	body {
		font-family: 'Inter', sans-serif;
		background: ${ back };
		color: ${ text };
		position: relative;
		overflow: hidden;
	}
	.brand {
		position: absolute; top: 56px; left: 64px;
		display: flex; align-items: center; gap: 18px;
	}
	.brand svg { width: 64px; height: 64px; }
	.word { font-size: 44px; font-weight: 600; color: ${ blue }; letter-spacing: -0.01em; }
	.pad {
		position: absolute; inset: 0; padding: 96px;
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		text-align: center; gap: 36px;
		margin-top: 40px;
	}
	.eyebrow {
		font-family: 'JetBrains Mono', monospace;
		font-size: 26px; font-weight: 500;
		letter-spacing: 0.35em; text-transform: uppercase;
		color: ${ shade };
	}
	.headline {
		font-family: 'EB Garamond', Georgia, serif;
		font-size: ${ headline_size }px; line-height: 1.1; font-weight: 500;
		letter-spacing: -0.02em;
		max-width: 1040px;
		display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;
		overflow: hidden;
	}
	.accent { color: ${ orange }; }
	.tag { font-size: 30px; font-weight: 400; color: ${ shade }; line-height: 1.5; max-width: 900px; }
	.rule { position: absolute; left: 64px; right: 64px; bottom: 64px; height: 1px; background: ${ line }; }
	.site { position: absolute; right: 64px; bottom: 76px; font-size: 24px; color: ${ shade }; background: ${ back }; padding-left: 24px; }
	</style></head><body>
		<div class="brand">${ logo_svg }<div class="word">smalljs</div></div>
		<div class="pad">
			<div class="eyebrow">${ esc( eyebrow ) }</div>
			<div class="headline">${ headline }</div>
			<div class="tag">${ tagline }</div>
		</div>
		<div class="rule"></div>
		<div class="site">b-on-g.github.io/smalljs</div>
	</body></html>`
}

// The root card mirrors the landing hero verbatim.
const home_card = {
	eyebrow: 'Reactive micromodules',
	headline: '$mol — the reactive <span class="accent">micromodule</span> framework',
	headline_size: 88,
	tagline: `Reactivity lives in the framework's foundation, not bolted on top.`,
}

const page_card = title => ( {
	eyebrow: 'Docs',
	headline: highlight( title ),
	headline_size: 84,
	tagline: `The <span class="accent">$mol</span> reactive framework — documentation`,
} )

;( async () => {
	fs.mkdirSync( out_dir, { recursive: true } )
	const list = pages()
	const browser = await puppeteer.launch( { headless: 'new', args: [ '--no-sandbox' ] } )
	const page = await browser.newPage()
	await page.setViewport( { width: 1200, height: 630, deviceScaleFactor: 1 } )

	const shoot = async ( card, out ) => {
		await page.setContent( card_html( card ), { waitUntil: 'load' } )
		await page.evaluate( () => document.fonts.ready )
		await page.screenshot( { path: out, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } } )
	}

	await shoot( home_card, path.join( __dirname, 'og.png' ) )
	for ( const { slug, title } of list ) {
		await shoot( page_card( title ), path.join( out_dir, `${ slug }.png` ) )
	}

	await browser.close()
	console.log( `generated og.png + ${ list.length } og cards -> assets/og/` )
} )().catch( e => { console.error( e ); process.exit( 1 ) } )
