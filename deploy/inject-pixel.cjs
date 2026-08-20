// Вставляет сниппет GEO Audit перед </body> в каждую собранную страницу.
// Идемпотентно: страницы, где пиксель уже есть, пропускаются.
// Источник сниппета — app/index.html, чтобы id жил в одном месте.
const fs = require( 'fs' )
const path = require( 'path' )

const SRC = 'bog/smalljs/app/index.html'
const ROOT = 'bog/smalljs/app/-'
const MARK = 'geoaudit24'

const block = ( fs.readFileSync( SRC, 'utf8' )
	.match( /[\t ]*<!-- GEO Audit AI traffic pixel -->[\s\S]*?<\/script>\n/ ) ?? [] )[ 0 ]

if( !block ) {
	console.error( `::error::пиксель не найден в ${ SRC } — вставлять нечего` )
	process.exit( 1 )
}

const pages = []
;( function walk( dir ) {
	for( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		const full = path.join( dir, entry.name )
		if( entry.isDirectory() ) walk( full )
		// только реальные страницы сайта: test.html — артефакт сборки
		else if( entry.name === 'index.html' ) pages.push( full )
	}
} )( ROOT )

let injected = 0, already = 0
const broken = []

for( const page of pages ) {
	const html = fs.readFileSync( page, 'utf8' )
	if( html.includes( MARK ) ) { already++; continue }
	if( !html.includes( '</body>' ) ) { broken.push( page ); continue }
	fs.writeFileSync( page, html.replace( '</body>', block + '</body>' ) )
	injected++
}

console.log( `страниц: ${ pages.length }, вставлено: ${ injected }, уже было: ${ already }` )

if( broken.length ) {
	console.error( `::error::нет </body>, пиксель не вставлен: ${ broken.join( ', ' ) }` )
	process.exit( 1 )
}
if( !pages.length ) {
	console.error( `::error::в ${ ROOT } не найдено ни одной index.html` )
	process.exit( 1 )
}
