namespace $ {

	export const $bog_smalljs_probe_page = 'bog/smalljs/app/-/index.html#!section=docs/page=troubleshooting'

	export const $bog_smalljs_probe_ready = `typeof $ !== 'undefined' && !!document.querySelector( '[bog_smalljs_docs_sidebar]' ) && !!document.querySelector( '[bog_smalljs_docs_main]' )`

	export const $bog_smalljs_probe_ok = 'вёрстка в порядке'

	export const $bog_smalljs_probe_top = [
		'[bog_smalljs_top_logo]',
		'[bog_smalljs_top_search]',
		'[bog_smalljs_top_nav]',
		'[bog_smalljs_top_lang_pick]',
		'[bog_smalljs_top_github]',
	]

	export function $bog_smalljs_probe_show( rect: $bog_probe_rect | null ) {
		if( !rect ) return 'null'
		return `left ${ Math.round( rect.left ) } top ${ Math.round( rect.top ) } width ${ Math.round( rect.width ) } height ${ Math.round( rect.height ) }`
	}

	export async function $bog_smalljs_probe_check( root = $node.process.cwd() ) {

		const lines = [] as string[]
		const say = ( line: string )=> { lines.push( line ); $node.fs.writeSync( 1, 'проба: ' + line + '\n' ) }

		for( const rel of [ 'bog/smalljs/app/-/index.html', 'bog/smalljs/app/-/web.js' ] ) {
			if( $node.fs.existsSync( $node.path.join( root, rel ) ) ) continue
			return $mol_fail( new Error( 'нет bog/smalljs/app/-/, сперва собери app' ) )
		}

		const sidebar = '[bog_smalljs_docs_sidebar]'
		const main = '[bog_smalljs_docs_main]'

		const wide = await $bog_probe_rects({
			root,
			page: $bog_smalljs_probe_page,
			ready: $bog_smalljs_probe_ready,
			width: 1280,
			height: 800,
			selectors: [ sidebar, main, ... $bog_smalljs_probe_top ],
		})

		if( wide === $bog_probe_skip ) { say( $bog_probe_skip ); return lines.join( '\n' ) }

		say( `1280: сайдбар ${ $bog_smalljs_probe_show( wide.rects[ sidebar ] ) }, колонка ${ $bog_smalljs_probe_show( wide.rects[ main ] ) }, scroll.width ${ wide.scroll.width }, viewport.width ${ wide.viewport.width }` )

		if( !$bog_probe_beside( wide.rects[ sidebar ], wide.rects[ main ] ) )
			return $mol_fail( new Error( `1280: сайдбар не левее колонки` ) )
		if( !$bog_probe_aligned( wide.rects[ sidebar ], wide.rects[ main ], 'top', 2 ) )
			return $mol_fail( new Error( `1280: верхние края сайдбара и колонки разошлись` ) )
		if( !$bog_probe_fits( wide ) )
			return $mol_fail( new Error( `1280: горизонтальная прокрутка ${ wide.scroll.width } > ${ wide.viewport.width }` ) )

		const row = $bog_smalljs_probe_top.map( selector => wide.rects[ selector ] )
		say( `1280: верхняя панель ${ $bog_smalljs_probe_top.map( ( selector, index )=> `${ selector } ${ $bog_smalljs_probe_show( row[ index ] ?? null ) }` ).join( '; ' ) }` )

		for( let index = 1; index < row.length; ++ index ) {
			if( $bog_probe_aligned( row[ 0 ] ?? null, row[ index ] ?? null, 'top', 4 ) ) continue
			return $mol_fail( new Error( `1280: ${ $bog_smalljs_probe_top[ index ] } выпал из ряда верхней панели` ) )
		}

		const narrow = await $bog_probe_rects({
			root,
			page: $bog_smalljs_probe_page,
			ready: $bog_smalljs_probe_ready,
			width: 400,
			height: 800,
			selectors: [ sidebar, main ],
		})

		if( narrow === $bog_probe_skip ) { say( $bog_probe_skip ); return lines.join( '\n' ) }

		say( `400: сайдбар ${ $bog_smalljs_probe_show( narrow.rects[ sidebar ] ) }, колонка ${ $bog_smalljs_probe_show( narrow.rects[ main ] ) }, scroll.width ${ narrow.scroll.width }, viewport.width ${ narrow.viewport.width }` )

		if( !$bog_probe_fits( narrow ) )
			return $mol_fail( new Error( `400: горизонтальная прокрутка ${ narrow.scroll.width } > ${ narrow.viewport.width }` ) )

		const drawer = narrow.rects[ sidebar ]
		const hidden = !drawer || drawer.width === 0
		if( !hidden && !$bog_probe_beside( drawer, narrow.rects[ main ] ) )
			return $mol_fail( new Error( `400: сайдбар заходит на текст` ) )

		say( $bog_smalljs_probe_ok )

		return lines.join( '\n' )
	}

}
