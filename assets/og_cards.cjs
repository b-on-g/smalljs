// Build-time generator for per-page Open Graph cards (1200x630 PNG).
//
// Reads the slug -> title map out of the generated content/content.ts, renders
// a branded HTML card per page with the page title as the headline, and
// rasterizes it to assets/og/<slug>.png via puppeteer. app.view.ts points
// og:image at these per-slug cards (falling back to the generic assets/og.png).
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

// Highlight $mol / $-identifiers in the accent colour, like the wordmark.
function highlight( title ) {
	return esc( title ).replace( /(\$[a-z][a-z0-9_]*)/gi, '<span class="accent">$1</span>' )
}

function card_html( title ) {
	return `<!doctype html><html><head><meta charset="utf-8"><style>
	* { margin: 0; box-sizing: border-box; }
	html, body { width: 1200px; height: 630px; }
	body {
		font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
		background: #09090b;
		color: #fafafa;
		position: relative;
		overflow: hidden;
	}
	/* Flat solid shapes only — no smooth gradients — so the PNG stays small. */
	.corner {
		position: absolute; top: 0; right: 0; width: 360px; height: 360px;
		background: #7c3aed; opacity: 0.16;
		clip-path: polygon( 100% 0, 0 0, 100% 100% );
	}
	.bar { position: absolute; left: 0; bottom: 0; width: 100%; height: 12px; background: #7c3aed; }
	.pad { position: absolute; inset: 0; padding: 96px; display: flex; flex-direction: column; }
	.brand { display: flex; align-items: center; gap: 24px; }
	.mark {
		width: 96px; height: 96px; border-radius: 22px; background: #7c3aed;
		display: flex; align-items: center; justify-content: center;
		font-size: 58px; font-weight: 700; color: #fff;
	}
	.word { font-size: 60px; font-weight: 700; }
	.headline {
		margin-top: auto;
		font-size: 92px; line-height: 1.06; font-weight: 800;
		letter-spacing: -0.02em;
		display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;
		overflow: hidden;
	}
	.accent { color: #a78bfa; }
	.tag { margin-top: 40px; font-size: 32px; font-weight: 400; color: #a1a1aa; }
	</style></head><body>
		<div class="corner"></div>
		<div class="bar"></div>
		<div class="pad">
			<div class="brand"><div class="mark">S</div><div class="word">smalljs</div></div>
			<div class="headline">${ highlight( title ) }</div>
			<div class="tag">The <span class="accent">$mol</span> reactive framework — docs</div>
		</div>
	</body></html>`
}

;( async () => {
	fs.mkdirSync( out_dir, { recursive: true } )
	const list = pages()
	const browser = await puppeteer.launch( { headless: 'new', args: [ '--no-sandbox' ] } )
	const page = await browser.newPage()
	await page.setViewport( { width: 1200, height: 630, deviceScaleFactor: 1 } )
	for ( const { slug, title } of list ) {
		await page.setContent( card_html( title ), { waitUntil: 'load' } )
		await page.evaluate( () => document.fonts.ready )
		await page.screenshot( { path: path.join( out_dir, `${ slug }.png` ), type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } } )
	}
	await browser.close()
	console.log( `generated ${ list.length } og cards -> assets/og/` )
} )().catch( e => { console.error( e ); process.exit( 1 ) } )
