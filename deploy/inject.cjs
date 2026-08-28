// Вставляет в каждую собранную страницу куски, которые не переживают пререндер.
//
// Почему шагом деплоя, а не просто в app/index.html: $mol при первом рендере
// забирает корень себе и выносит оттуда всё чужое, поэтому в снимке страницы
// инлайновых скриптов оболочки уже нет. Плюс кэш пререндер-экшена считается от
// бандла, а index.html в него не входит: правка одной оболочки оставляет ключ
// прежним, кэш попадает, и снимки возвращаются старые.
//
// Источник обоих кусков — app/index.html, чтобы правились они в одном месте.
// Идемпотентно: страницы, где кусок уже есть, пропускаются.
const fs = require( 'fs' )
const path = require( 'path' )

const SRC = 'bog/smalljs/app/index.html'
const ROOT = 'bog/smalljs/app/-'

const shell = fs.readFileSync( SRC, 'utf8' )

/** Что вставляем, откуда берём и куда именно на странице. */
const parts = [
	{
		name: 'пауза до языка',
		mark: 'bog_smalljs_boot',
		before: '</head>',
		block: ( shell.match( /[\t ]*<!-- Язык приезжает позже страницы\.[\s\S]*?<\/script>\n/ ) ?? [] )[ 0 ],
	},
	{
		name: 'пиксель GEO Audit',
		mark: 'geoaudit24',
		before: '</body>',
		block: ( shell.match( /[\t ]*<!-- GEO Audit AI traffic pixel -->[\s\S]*?<\/script>\n/ ) ?? [] )[ 0 ],
	},
]

for( const part of parts ) {
	if( part.block ) continue
	console.error( `::error::в ${ SRC } не найден кусок «${ part.name }» — вставлять нечего` )
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

const broken = []
const counts = Object.fromEntries( parts.map( part => [ part.name, 0 ] ) )

for( const page of pages ) {
	let html = fs.readFileSync( page, 'utf8' )
	let touched = false
	for( const part of parts ) {
		if( html.includes( part.mark ) ) continue
		if( !html.includes( part.before ) ) { broken.push( `${ page } (${ part.before })` ); continue }
		html = html.replace( part.before, part.block + part.before )
		counts[ part.name ]++
		touched = true
	}
	if( touched ) fs.writeFileSync( page, html )
}

const report = parts.map( part => `${ part.name }: ${ counts[ part.name ] }` ).join( ', ' )
console.log( `страниц: ${ pages.length }, вставлено — ${ report }` )

if( broken.length ) {
	console.error( `::error::некуда вставлять: ${ broken.join( ', ' ) }` )
	process.exit( 1 )
}
if( !pages.length ) {
	console.error( `::error::в ${ ROOT } не найдено ни одной index.html` )
	process.exit( 1 )
}
