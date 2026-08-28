#!/usr/bin/env node
// Generates content.ts from the .md sources in content/en/docs/.
//
// Why a generator: MAM's TS dependor (mol/build/build.node.ts) scans the whole
// source text for `$name` and `require(...)`/`import(...)` tokens and treats
// them as module deps. Example code embedded in docs (e.g. `$my_hello`,
// `require('moment')`) would become broken deps and fail the audit. So we embed
// each page as a JS string with `$` written `$` and `require(`/`import(`
// neutralized — invisible to the dependor, exact same text at runtime.
//
// Re-run after editing any .md or the manifest below:  node content/gen.cjs

const fs = require( 'fs' )
const path = require( 'path' )

const root = __dirname
const docs_dir = path.join( root, 'en', 'docs' )

// --- Manifest: sidebar order/groups + page metadata. Single source of layout.
const sections = [
	{
		id: 'docs',
		title: 'Docs',
		groups: [
			{ title: 'Getting Started', pages: [ 'introduction', 'getting-started', 'from-ts-to-view-tree', 'structure', 'tooling' ] },
			{ title: 'Essentials', pages: [ 'installation', 'views', 'state', 'routing', 'rendering', 'deployment' ] },
			{ title: 'Data', pages: [ 'data', 'data-schema', 'giper-baza' ] },
			{ title: 'More', pages: [ 'showcase', 'rosetta', 'cookbook' ] },
			{ title: 'Advanced', pages: [ 'plugins', 'meta', 'offline', 'ghost' ] },
			{ title: 'About', pages: [ 'faq', 'team', 'releases' ] },
		],
	},
]

// title + one-line summary (summary feeds llms.txt).
const meta = {
	'introduction': { title: 'Introduction', summary: 'What $mol is, who it is for, and a taste of reactive views.' },
	'getting-started': { title: 'Getting Started', summary: 'From an empty folder to a running, reactive $mol app in under 15 minutes.' },
	'from-ts-to-view-tree': { title: 'From TypeScript to view.tree', summary: 'The same component as a hand-written class and as a tree, line by line, plus the code the compiler generates from it.' },
	'structure': { title: 'Project Structure', summary: 'Where a new project goes: workspace, your own package, the project repository, and the five steps from a clone to a registered project.' },
	'tooling': { title: 'Tooling', summary: 'Project scaffolder, view.tree language server, and editor support for Zed and VS Code.' },
	'installation': { title: 'Installation', summary: 'The MAM workspace, module layout, dev server, and production build.' },
	'views': { title: 'Views', summary: 'Declaring and composing components with the view.tree language.' },
	'state': { title: 'State & Reactivity', summary: 'Reactive properties, actions vs. computations, keyed and async state.' },
	'routing': { title: 'Routing', summary: 'The URL as reactive state: screens, links, and multiple parameters.' },
	'deployment': { title: 'Deployment', summary: 'A built app is a folder of static files: the GitHub Pages workflow, branch previews, deep links on a static host, and any other host.' },
	'rendering': { title: 'Rendering', summary: 'No virtual DOM, lazy components, and virtualized rendering — plus reproducible benchmarks.' },
	'data': { title: 'Data Fetching', summary: 'Loading remote data with reactive async properties and loading states.' },
	'data-schema': { title: 'Data Schemas', summary: 'Runtime typing and validation of backend data with $mol_data and $mol_schema.' },
	'giper-baza': { title: 'Giper Baza', summary: 'Optional project for local-first data synced between clients via CRDTs: entities, atoms, and CRUD.' },
	'showcase': { title: 'Showcase', summary: 'Real apps and tools built with $mol, from community platforms to devtools.' },
	'rosetta': { title: 'From React, Vue & Svelte', summary: 'A concept translation table for developers coming from other frameworks.' },
	'cookbook': { title: 'Cookbook', summary: 'Copy-ready recipes for common tasks: inputs, lists, fetching, local state, routing, and theming.' },
	'plugins': { title: 'Plugins', summary: 'Element-less components that attach behaviour (hotkeys, theme, navigation) to a host view.' },
	'meta': { title: 'Module metadata', summary: 'The meta.tree file: include, deploy, and pack directives for a module.' },
	'offline': { title: 'Offline', summary: 'Work with no network via a caching service worker: mol/offline/install and installable PWAs.' },
	'ghost': { title: 'Ghost views', summary: 'Node-less views that borrow another component\'s DOM element to mix in behaviour.' },
	'faq': { title: 'FAQ', summary: 'Common questions about $mol and smalljs: readiness, size, learning curve, and getting help.' },
	'team': { title: 'Team', summary: 'Who builds $mol and how to contribute to the open monorepo.' },
	'releases': { title: 'Releases', summary: 'How $mol is delivered continuously from the mam_mol monorepo, and how to follow changes.' },
}

// --- API reference autogen -----------------------------------------------------
// Parse each core component's generated .view.tree.d.ts (the typed API surface)
// and emit a reference page per component into the same content pipeline.
const repo = path.join( root, '..', '..', '..' )
const api_components = [
	{ klass: '$mol_view', src: 'view/view' },
	{ klass: '$mol_button_major', src: 'button/major' },
	{ klass: '$mol_button_minor', src: 'button/minor' },
	{ klass: '$mol_string', src: 'string' },
	{ klass: '$mol_number', src: 'number' },
	{ klass: '$mol_text', src: 'text/text' },
	{ klass: '$mol_paragraph', src: 'paragraph' },
	{ klass: '$mol_list', src: 'list' },
	{ klass: '$mol_row', src: 'row' },
	{ klass: '$mol_link', src: 'link' },
	{ klass: '$mol_check', src: 'check' },
	{ klass: '$mol_switch', src: 'switch' },
	{ klass: '$mol_select', src: 'select' },
	{ klass: '$mol_scroll', src: 'scroll' },
	{ klass: '$mol_page', src: 'page' },
	{ klass: '$mol_pick', src: 'pick' },
]

function parse_api_dts( src, klass ) {
	const base = src.split( '/' ).pop()
	const dts = path.join( repo, 'mol', src, '-view.tree', `${ base }.view.tree.d.ts` )
	let text
	try { text = fs.readFileSync( dts, 'utf8' ) } catch ( e ) { return null }
	const esc = klass.replace( /\$/g, '\\$' )
	const head = text.match( new RegExp( 'export class ' + esc + '\\s+extends\\s+(\\$[\\w$]+)\\s*\\{' ) )
	if ( !head ) return null
	const body_start = text.indexOf( '{', head.index )
	const body_end = text.indexOf( '\n\t}', body_start )
	const body = text.slice( body_start + 1, body_end < 0 ? undefined : body_end )
	const props = []
	for ( const line of body.split( '\n' ) ) {
		const m = line.match( /^\t\t(\w+)\(\s*(next\?[^)]*)?\)\s*:\s*(.+?)\s*$/ )
		if ( !m ) continue
		let type = m[ 3 ].replace( /;+\s*$/, '' ).trim()
		if ( type === 'any' ) continue // internal channel
		type = type.replace( /ReturnType<\s*\$[\w$]+\['(\w+)'\]\s*>/g, "as '$1'" )
		props.push( { name: m[ 1 ], settable: !!m[ 2 ], type } )
	}
	return { ext: head[ 1 ], props }
}

// UI strings for the autogenerated API pages, per language. Only prose/headings
// are localized — component names, property names, types, signatures, code, and
// $mol_* identifiers are universal and stay verbatim.
const API_I18N = {
	en: { ext: ( e, gh ) => `Extends \`${ e }\`. [View source on GitHub](${ gh })`, reference: "This reference is generated from the component's typed `.view.tree` interface.", properties: 'Properties', no_props: ( k, e ) => `${ k } adds no new bindable properties of its own — see \`${ e }\`.`, cols: '| Property | Access | Type |', read: 'read', rw: 'read / write' },
	ru: { ext: ( e, gh ) => `Расширяет \`${ e }\`. [Посмотреть исходник на GitHub](${ gh })`, reference: 'Этот справочник сгенерирован из типизированного интерфейса `.view.tree` компонента.', properties: 'Свойства', no_props: ( k, e ) => `${ k } не добавляет собственных привязываемых свойств — см. \`${ e }\`.`, cols: '| Свойство | Доступ | Тип |', read: 'чтение', rw: 'чтение / запись' },
	zh: { ext: ( e, gh ) => `继承自 \`${ e }\`。[在 GitHub 上查看源码](${ gh })`, reference: '本参考由组件的带类型 `.view.tree` 接口生成。', properties: '属性', no_props: ( k, e ) => `${ k } 没有自己新增的可绑定属性——参见 \`${ e }\`。`, cols: '| 属性 | 访问 | 类型 |', read: '读', rw: '读 / 写' },
	zh_hk: { ext: ( e, gh ) => `繼承自 \`${ e }\`。[在 GitHub 上查看原始碼](${ gh })`, reference: '本參考由元件的帶型別 `.view.tree` 介面生成。', properties: '屬性', no_props: ( k, e ) => `${ k } 沒有自己新增的可綁定屬性——參見 \`${ e }\`。`, cols: '| 屬性 | 存取 | 型別 |', read: '讀', rw: '讀 / 寫' },
	ja: { ext: ( e, gh ) => `\`${ e }\` を継承。[GitHub でソースを見る](${ gh })`, reference: 'このリファレンスはコンポーネントの型付き `.view.tree` インターフェイスから生成されています。', properties: 'プロパティ', no_props: ( k, e ) => `${ k } は独自の新しいバインド可能なプロパティを追加しません——\`${ e }\` を参照してください。`, cols: '| プロパティ | アクセス | 型 |', read: '読み取り', rw: '読み取り / 書き込み' },
	ko: { ext: ( e, gh ) => `\`${ e }\`을(를) 확장합니다. [GitHub에서 소스 보기](${ gh })`, reference: '이 레퍼런스는 컴포넌트의 타입이 있는 `.view.tree` 인터페이스에서 생성됩니다.', properties: '속성', no_props: ( k, e ) => `${ k }은(는) 자체적으로 새로 바인딩 가능한 속성을 추가하지 않습니다——\`${ e }\`를 참조하세요.`, cols: '| 속성 | 접근 | 타입 |', read: '읽기', rw: '읽기 / 쓰기' },
	fr: { ext: ( e, gh ) => `Étend \`${ e }\`. [Voir la source sur GitHub](${ gh })`, reference: "Cette référence est générée à partir de l'interface typée `.view.tree` du composant.", properties: 'Propriétés', no_props: ( k, e ) => `${ k } n'ajoute aucune nouvelle propriété liable propre — voir \`${ e }\`.`, cols: '| Propriété | Accès | Type |', read: 'lecture', rw: 'lecture / écriture' },
	de: { ext: ( e, gh ) => `Erweitert \`${ e }\`. [Quellcode auf GitHub ansehen](${ gh })`, reference: 'Diese Referenz wird aus der typisierten `.view.tree`-Schnittstelle der Komponente generiert.', properties: 'Eigenschaften', no_props: ( k, e ) => `${ k } fügt keine eigenen neuen bindbaren Eigenschaften hinzu — siehe \`${ e }\`.`, cols: '| Eigenschaft | Zugriff | Typ |', read: 'Lesen', rw: 'Lesen / Schreiben' },
	pt: { ext: ( e, gh ) => `Estende \`${ e }\`. [Ver o código-fonte no GitHub](${ gh })`, reference: 'Esta referência é gerada a partir da interface tipada `.view.tree` do componente.', properties: 'Propriedades', no_props: ( k, e ) => `${ k } não adiciona novas propriedades vinculáveis próprias — veja \`${ e }\`.`, cols: '| Propriedade | Acesso | Tipo |', read: 'leitura', rw: 'leitura / escrita' },
	it: { ext: ( e, gh ) => `Estende \`${ e }\`. [Vedi il sorgente su GitHub](${ gh })`, reference: "Questo riferimento è generato dall'interfaccia tipizzata `.view.tree` del componente.", properties: 'Proprietà', no_props: ( k, e ) => `${ k } non aggiunge nuove proprietà collegabili proprie — vedi \`${ e }\`.`, cols: '| Proprietà | Accesso | Tipo |', read: 'lettura', rw: 'lettura / scrittura' },
	uk: { ext: ( e, gh ) => `Розширює \`${ e }\`. [Переглянути код на GitHub](${ gh })`, reference: 'Цей довідник згенеровано з типізованого інтерфейсу `.view.tree` компонента.', properties: 'Властивості', no_props: ( k, e ) => `${ k } не додає власних нових прив'язуваних властивостей — див. \`${ e }\`.`, cols: '| Властивість | Доступ | Тип |', read: 'читання', rw: 'читання / запис' },
	pl: { ext: ( e, gh ) => `Rozszerza \`${ e }\`. [Zobacz źródło na GitHubie](${ gh })`, reference: 'Ta referencja jest generowana z typowanego interfejsu `.view.tree` komponentu.', properties: 'Właściwości', no_props: ( k, e ) => `${ k } nie dodaje własnych nowych właściwości do powiązania — zobacz \`${ e }\`.`, cols: '| Właściwość | Dostęp | Typ |', read: 'odczyt', rw: 'odczyt / zapis' },
	cs: { ext: ( e, gh ) => `Rozšiřuje \`${ e }\`. [Zobrazit zdroj na GitHubu](${ gh })`, reference: 'Tato reference je generována z typovaného rozhraní `.view.tree` komponenty.', properties: 'Vlastnosti', no_props: ( k, e ) => `${ k } nepřidává žádné vlastní nové navazatelné vlastnosti — viz \`${ e }\`.`, cols: '| Vlastnost | Přístup | Typ |', read: 'čtení', rw: 'čtení / zápis' },
	fa: { ext: ( e, gh ) => `\`${ e }\` را گسترش می‌دهد. [دیدنِ سورس در GitHub](${ gh })`, reference: 'این مرجع از واسطِ نوع‌دارِ `.view.tree`ِ کامپوننت تولید شده است.', properties: 'ویژگی‌ها', no_props: ( k, e ) => `${ k } هیچ ویژگیِ قابلِ‌اتصالِ تازهٔ خودش را نمی‌افزاید — \`${ e }\` را ببینید.`, cols: '| ویژگی | دسترسی | نوع |', read: 'خواندن', rw: 'خواندن / نوشتن' },
	bn: { ext: ( e, gh ) => `\`${ e }\` কে এক্সটেন্ড করে। [GitHub-এ সোর্স দেখুন](${ gh })`, reference: 'এই রেফারেন্স কম্পোনেন্টের টাইপড `.view.tree` ইন্টারফেস থেকে জেনারেট করা হয়।', properties: 'প্রপার্টি', no_props: ( k, e ) => `${ k } নিজের কোনো নতুন বাইন্ডযোগ্য প্রপার্টি যোগ করে না——\`${ e }\` দেখুন।`, cols: '| প্রপার্টি | অ্যাক্সেস | টাইপ |', read: 'পড়া', rw: 'পড়া / লেখা' },
}

function api_markdown( klass, src, parsed, lang = 'en' ) {
	const t = API_I18N[ lang ] || API_I18N.en
	const gh = `https://github.com/hyoo-ru/mam_mol/tree/master/${ src }`
	let md = `# ${ klass }\n\n`
	md += `${ t.ext( parsed.ext, gh ) }\n\n`
	md += `${ t.reference }\n\n`
	if ( !parsed.props.length ) {
		md += `## ${ t.properties }\n\n${ t.no_props( klass, parsed.ext ) }\n`
		return md
	}
	md += `## ${ t.properties }\n\n${ t.cols }\n|---|---|---|\n`
	for ( const p of parsed.props ) {
		const type = p.type.replace( /\|/g, '\\|' ).replace( /`/g, '' )
		md += `| \`${ p.name }\` | ${ p.settable ? t.rw : t.read } | \`${ type }\` |\n`
	}
	return md
}

const api_group = { title: 'API', pages: [] }
const api_meta = {} // slug -> { klass, src, parsed } for on-the-fly localization
let api_count = 0
for ( const comp of api_components ) {
	const parsed = parse_api_dts( comp.src, comp.klass )
	if ( !parsed ) continue
	const slug = 'api-' + comp.klass.replace( /^\$/, '' ).replace( /_/g, '-' )
	fs.writeFileSync( path.join( docs_dir, `${ slug }.md` ), api_markdown( comp.klass, comp.src, parsed ) )
	api_meta[ slug ] = { klass: comp.klass, src: comp.src, parsed }
	meta[ slug ] = { title: comp.klass, summary: `API reference for ${ comp.klass }.` }
	api_group.pages.push( slug )
	api_count++
}
if ( api_group.pages.length ) sections[ 0 ].groups.push( api_group )

const titles = Object.fromEntries( Object.entries( meta ).map( ( [ k, v ] ) => [ k, v.title ] ) )

const default_slug = 'introduction'

// Production base where the deploy step copies the raw .md endpoints + llms.txt.
const prod_base = 'https://b-on-g.github.io/smalljs'

// --- Embed a raw string so MAM's dependor never mistakes example code for deps.
function embed( text ) {
	return JSON.stringify( text )
		.replace( /\$/g, '\\u0024' )
		.replace( /\brequire\(/g, 'require\\u0028' )
		.replace( /\bimport\(/g, 'import\\u0028' )
}

const slugs = Object.keys( titles )

// --- Translations. EN is the source/fallback; any content/<lang>/docs/<slug>.md
// that exists is bundled alongside as a per-language override. The RU title is
// derived from the translated page's first `# ` heading, so translators only
// touch the .md — no separate title manifest to keep in sync.
const langs = [ 'zh', 'zh_hk', 'ja', 'ko', 'fr', 'de', 'pt', 'it', 'ru', 'uk', 'pl', 'cs', 'fa', 'bn' ]

function first_heading( md ) {
	const m = md.match( /^#\s+(.+?)\s*$/m )
	return m ? m[ 1 ] : null
}

// First prose paragraph of a markdown doc, stripped of markup and truncated —
// used as a per-language meta/OG description. Skips headings, code fences,
// blockquotes, lists, tables, images and HTML to land on real sentences.
function first_paragraph( md, max = 160 ) {
	const lines = md.split( /\r?\n/ )
	let fence = false
	const buf = []
	for ( const raw of lines ) {
		const line = raw.trim()
		if ( /^(```|~~~)/.test( line ) ) { fence = !fence; continue }
		if ( fence ) continue
		if ( !line ) { if ( buf.length ) break; else continue }
		if ( /^(#|>|\||<|!|-|\*|\+|\d+\.)\s?/.test( line ) ) {
			if ( buf.length ) break; else continue
		}
		buf.push( line )
	}
	let text = buf.join( ' ' )
	text = text
		.replace( /!\[[^\]]*\]\([^)]*\)/g, '' )               // images
		.replace( /\[([^\]]+)\]\([^)]*\)/g, '$1' )            // links -> text
		.replace( /`([^`]+)`/g, '$1' )                        // inline code
		.replace( /\*\*([^*]+)\*\*/g, '$1' )                  // bold
		.replace( /__([^_]+)__/g, '$1' )                      // bold (underscore)
		.replace( /\*([^*]+)\*/g, '$1' )                      // italic
		.replace( /~~([^~]+)~~/g, '$1' )                      // strikethrough
		// italic `_x_` only at word boundaries — keeps identifiers like $mol_view
		.replace( /(^|[\s(])_([^_]+)_(?=[\s).,;:!?]|$)/g, '$1$2' )
		.replace( /\s+/g, ' ' )
		.trim()
	if ( text.length <= max ) return text
	const cut = text.slice( 0, max )
	const at = cut.lastIndexOf( ' ' )
	return ( at > max * 0.6 ? cut.slice( 0, at ) : cut ).trimEnd() + '…'
}

function translations( slug ) {
	const tr = {}
	for ( const lang of langs ) {
		// API pages are localized on the fly from the parsed interface + API_I18N,
		// so no per-language override files are needed for them.
		if ( api_meta[ slug ] ) {
			const a = api_meta[ slug ]
			const md = api_markdown( a.klass, a.src, a.parsed, lang )
			tr[ lang ] = { title: first_heading( md ) ?? titles[ slug ], summary: first_paragraph( md ), md }
			continue
		}
		const file = path.join( root, lang, 'docs', `${ slug }.md` )
		if ( !fs.existsSync( file ) ) continue
		const md = fs.readFileSync( file, 'utf8' )
		tr[ lang ] = { title: first_heading( md ) ?? titles[ slug ], summary: first_paragraph( md ), md }
	}
	return tr
}

let translated_count = 0

const page_entries = slugs.map( slug => {
	const file = `content/en/docs/${ slug }.md`
	const md = fs.readFileSync( path.join( docs_dir, `${ slug }.md` ), 'utf8' )
	const tr = translations( slug )
	const tr_keys = Object.keys( tr )
	if ( tr_keys.length ) translated_count++
	const tr_entries = tr_keys.map( lang => (
		`\t\t\t\t\t\t${ lang }: {\n` +
		`\t\t\t\t\t\t\ttitle: ${ JSON.stringify( tr[ lang ].title ) },\n` +
		( tr[ lang ].summary ? `\t\t\t\t\t\t\tsummary: ${ JSON.stringify( tr[ lang ].summary ) },\n` : '' ) +
		`\t\t\t\t\t\t\tmd: ${ embed( tr[ lang ].md ) },\n` +
		`\t\t\t\t\t\t},`
	) ).join( '\n' )
	return (
		`\t\t\t\t'${ slug }': {\n` +
		`\t\t\t\t\tslug: '${ slug }',\n` +
		`\t\t\t\t\ttitle: ${ JSON.stringify( titles[ slug ] ) },\n` +
		`\t\t\t\t\tsummary: ${ JSON.stringify( ( meta[ slug ] && meta[ slug ].summary ) || '' ) },\n` +
		`\t\t\t\t\tfile: '${ file }',\n` +
		`\t\t\t\t\tmd: ${ embed( md ) },\n` +
		( tr_keys.length ? `\t\t\t\t\ttr: {\n${ tr_entries }\n\t\t\t\t\t},\n` : '' ) +
		`\t\t\t\t},`
	)
} ).join( '\n' )

const out = `namespace $ {

	/**
	 * Docs content registry for smalljs. GENERATED by content/gen.cjs — do not
	 * edit by hand; edit the .md sources in content/en/docs/ and re-run the
	 * generator. Markdown is embedded (not fetched) so it bundles into web.js
	 * and works with the app/- deploy and the prerender step.
	 */

	export type $bog_smalljs_content_translation = {
		title: string
		/** First prose paragraph of the translated page, for meta/OG descriptions. */
		summary?: string
		md: string
	}

	export type $bog_smalljs_content_page = {
		slug: string
		title: string
		/** One-line description, used for meta/OG descriptions and llms.txt. */
		summary: string
		/** GitHub-relative path, for the Edit-on-GitHub link. */
		file: string
		md: string
		/** Per-language overrides, keyed by lang code. EN lives in title/md above. */
		tr?: Readonly< Record< string, $bog_smalljs_content_translation > >
	}

	export type $bog_smalljs_content_group = {
		title: string
		pages: readonly string[]
	}

	export type $bog_smalljs_content_section = {
		id: string
		title: string
		groups: readonly $bog_smalljs_content_group[]
	}

	export class $bog_smalljs_content extends $mol_object2 {

		static sections(): readonly $bog_smalljs_content_section[] {
			return ${ JSON.stringify( sections, null, '\t' ).replace( /\n/g, '\n\t\t\t' ) }
		}

		static pages(): Readonly< Record< string, $bog_smalljs_content_page > > {
			return {
${ page_entries }
			}
		}

		/** Flat ordered slug list for prev/next. */
		static order( section = 'docs' ): readonly string[] {
			const sec = this.sections().find( s => s.id === section )
			if ( !sec ) return []
			return sec.groups.flatMap( g => g.pages )
		}

		static page( slug: string ): $bog_smalljs_content_page | null {
			return this.pages()[ slug ] ?? null
		}

		/** Markdown for a page in the given language, falling back to EN. */
		static page_md( slug: string, lang = 'en' ): string | null {
			const page = this.pages()[ slug ]
			if( !page ) return null
			return page.tr?.[ lang ]?.md ?? page.md
		}

		/** Localized title for a page, falling back to EN. */
		static page_title( slug: string, lang = 'en' ): string | null {
			const page = this.pages()[ slug ]
			if( !page ) return null
			return page.tr?.[ lang ]?.title ?? page.title
		}

		/** Summary for a page in the given language: the translated first
		 *  paragraph when present, else the EN manifest one-liner. */
		static page_summary( slug: string, lang = 'en' ): string | null {
			const page = this.pages()[ slug ]
			if( !page ) return null
			return page.tr?.[ lang ]?.summary ?? page.summary ?? null
		}

		static default_slug(): string {
			return '${ default_slug }'
		}

	}

}
`

fs.writeFileSync( path.join( root, 'content.ts' ), out )

// --- llms.txt (llmstxt.org) so Claude/Cursor can cite the docs. --------------
let llms = `# smalljs\n\n`
llms += `> Documentation for $mol — a reactive UI framework with typed views, automatic reactivity, and no virtual DOM. Each page below is available as raw Markdown at the linked URL.\n\n`
for ( const sec of sections ) {
	for ( const group of sec.groups ) {
		llms += `## ${ group.title }\n\n`
		for ( const slug of group.pages ) {
			llms += `- [${ meta[ slug ].title }](${ prod_base }/docs/${ slug }.md): ${ meta[ slug ].summary }\n`
		}
		llms += `\n`
	}
}
fs.writeFileSync( path.join( root, 'llms.txt' ), llms )

// --- versus: frameworks and their pair pages ---------------------------------
// "X vs Y" is what people type, so the pair pages are the section's search
// channel and belong in the map. A pair is listed only when BOTH sides publish
// a data file carrying at least one metric: a page with two columns of dashes is
// thin content, and inventing numbers to fill it is the one thing versus/SPEC2.md
// forbids outright. The rule is also what keeps the map from exploding — pairs
// grow as n*(n-1)/2, and gating on real data is a cap that needs no maintenance.
//
// Each pair is emitted once, ids in alphabetical order, matching the single
// canonical address the section normalizes to. The reverse spelling
// (`a=react/b=mol`) is deliberately absent: it is the same page, and listing
// both would hand crawlers a duplicate.
const versus_dir = path.join( root, '..', 'versus', 'data' )

// Before versus/data/ lands, fall back to the three frameworks that have live
// crash-test runners, so the section is never absent from the map entirely.
const versus_fallback = [ 'mol', 'react', 'vue' ]

function versus_ids() {

	if( !fs.existsSync( versus_dir ) ) return versus_fallback

	const ids = fs.readdirSync( versus_dir )
		.filter( name => name.endsWith( '.json' ) && name !== 'registry.json' )
		.map( name => {
			const data = JSON.parse( fs.readFileSync( path.join( versus_dir, name ), 'utf8' ) )
			const measured = data.metrics && Object.keys( data.metrics ).length > 0
			return measured ? ( data.id || path.basename( name, '.json' ) ) : null
		} )
		.filter( Boolean )

	return ids.length ? ids : versus_fallback
}

function versus_pairs_of( ids ) {
	const pairs = []
	for ( let x = 0; x < ids.length; ++ x ) {
		for ( let y = x + 1; y < ids.length; ++ y ) pairs.push( [ ids[ x ], ids[ y ] ] )
	}
	return pairs
}

const versus_pairs = versus_pairs_of( versus_ids().sort() )

// --- sitemap.xml + robots.txt ------------------------------------------------
// The app now uses path-based routing ($bog_builderui_router), so every screen is a
// distinct, crawlable URL — `/smalljs/section=docs/page=<slug>` etc. These are the
// exact pathnames the router writes to the address bar (segments = `key=val` joined
// by `/`), so they match the canonical/hreflang links the app emits 1:1. Enumerate
// them deterministically from the manifest here rather than relying on a link crawl.
// The raw Markdown endpoints (/docs/<slug>.md) remain published and indexed via
// llms.txt for LLM citation; the sitemap points crawlers at the real app URLs.
const lastmod = new Date().toISOString().slice( 0, 10 )

// Маршруты без хоста: '' — главная, остальные — `section=…/…`.
const base_routes = [ '' ]
	.concat( slugs.map( slug => `section=docs/page=${ slug }` ) )
	.concat( [ 'section=playground', 'section=course', 'section=versus' ] )
	.concat( versus_pairs.map( ( [ a, b ] ) => `section=versus/a=${ a }/b=${ b }` ) )

// Языковые варианты каждого маршрута. Приложение уже объявляет их в hreflang
// (app.view.ts, meta_langs + route_path([['mol_locale', code]])), и роутер их
// понимает — но без записи в sitemap пререндер не делал для них статики, и
// краулер на каждой заявленной альтернате получал 404. Список обязан совпадать
// с meta_langs в app.view.ts, иначе hreflang и sitemap разойдутся.
const meta_langs = [ 'en', 'ru', 'zh', 'zh_hk', 'ja', 'ko', 'fr', 'de', 'pt', 'it', 'uk', 'pl', 'cs', 'fa', 'bn' ]
const localized_route = ( lang, route ) => route
	? `mol_locale=${ lang }/${ route }`
	: `mol_locale=${ lang }`

const sitemap_urls = base_routes.map( route => `${ prod_base }/${ route }` )
	.concat( meta_langs.flatMap( lang =>
		base_routes.map( route => `${ prod_base }/${ localized_route( lang, route ) }` )
	) )
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`
	+ `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
	+ sitemap_urls.map( loc =>
		`\t<url>\n\t\t<loc>${ loc }</loc>\n\t\t<lastmod>${ lastmod }</lastmod>\n\t</url>`
	).join( '\n' )
	+ `\n</urlset>\n`
fs.writeFileSync( path.join( root, 'sitemap.xml' ), sitemap )

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${ prod_base }/sitemap.xml\n`
fs.writeFileSync( path.join( root, 'robots.txt' ), robots )

// --- Interactive course lessons ----------------------------------------------
// Authored inline (this file is .cjs, not scanned by MAM, so real $mol_* is fine);
// emitted escaped into lessons.ts. `expect` is a substring the finished source
// should contain — a simple, deterministic auto-check.
const lessons = [
	{
		id: 'hello',
		title: 'Hello World',
		expect: 'Hello',
		expect_in: 'tree',
		md: [
			'# Hello World',
			'',
			'Welcome! On the left is a live $mol editor — **view.tree** describes structure and the result renders on the right.',
			'',
			'Right now the component shows a placeholder. Change the text after the `\\` and watch the preview update instantly.',
			'',
			'**Goal:** make the greeting say hello to $mol.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Greeting $mol_view\n\t\t\tsub / <= greeting \\Edit me\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Greeting $mol_view\n\t\t\tsub / <= greeting \\Hello, $mol!\n',
		solution_ts: '',
	},
	{
		id: 'views',
		title: 'Views',
		expect: 'Subtitle',
		expect_in: 'tree',
		md: [
			'# Views',
			'',
			'A view is built from other views. Here `$my_demo` has one child; add a second so the card shows a title *and* a subtitle.',
			'',
			'**Goal:** add a `Subtitle` sub-view under `sub /`, with its own text.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Title $mol_view\n\t\t\tsub / <= title \\My component\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tsub /\n\t\t<= Title $mol_view\n\t\t\tsub / <= title \\My component\n\t\t<= Subtitle $mol_view\n\t\t\tsub / <= subtitle \\Built from views\n',
		solution_ts: '',
	},
	{
		id: 'state',
		title: 'State',
		expect: '$mol_mem',
		expect_in: 'ts',
		md: [
			'# State',
			'',
			'Logic lives in **view.ts** — switch to that tab. `@ $mol_mem` makes a value reactive: everything that reads it updates on its own.',
			'',
			'**Goal:** in view.ts, give the component a reactive `count()` and a `count_text()` that returns it as a string, so the preview shows a number.',
			'',
			'Stuck? Press **Solution**.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tcount_text \\?\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tcount_text \\?\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n',
		solution_ts: 'class $my_demo extends $.$my_demo {\n\t@ $mol_mem count( next?: number ) { return next ?? 5 }\n\tcount_text() { return String( this.count() ) }\n}\n',
	},
	{
		id: 'events',
		title: 'Events',
		expect: '$mol_action',
		expect_in: 'ts',
		md: [
			'# Events',
			'',
			'Interactivity comes from event handlers. The view.tree already wires the button\u2019s `click` to an `inc?` action — you implement `inc` in view.ts as a `@ $mol_action` that changes state.',
			'',
			'**Goal:** make the button increase the count on each click.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tcount_text \\0\n\tinc? null\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n\t\t<= Button $mol_button_major\n\t\t\tclick? <=> inc?\n\t\t\tsub / <= button_label \\+1\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tcount_text \\0\n\tinc? null\n\tsub /\n\t\t<= Value $mol_view\n\t\t\tsub / <= count_text\n\t\t<= Button $mol_button_major\n\t\t\tclick? <=> inc?\n\t\t\tsub / <= button_label \\+1\n',
		solution_ts: 'class $my_demo extends $.$my_demo {\n\t@ $mol_mem count( next?: number ) { return next ?? 0 }\n\t@ $mol_action inc() { this.count( this.count() + 1 ) }\n\tcount_text() { return String( this.count() ) }\n}\n',
	},
	{
		id: 'routing',
		title: 'Routing',
		expect: '$mol_state_arg',
		expect_in: 'ts',
		md: [
			'# Routing',
			'',
			'The URL is just reactive state. `$mol_state_arg` reads and writes a query parameter, so a value survives reloads and is shareable.',
			'',
			'**Goal:** back the input with a URL argument named `name` in view.ts, and echo it below.',
		].join( '\n' ),
		start_tree: '$my_demo $mol_view\n\tname? \\\n\techo \\\n\tsub /\n\t\t<= Field $mol_string\n\t\t\tvalue? <=> name?\n\t\t\thint \\Type your name\n\t\t<= Echo $mol_view\n\t\t\tsub / <= echo\n',
		start_ts: '',
		solution_tree: '$my_demo $mol_view\n\tname? \\\n\techo \\\n\tsub /\n\t\t<= Field $mol_string\n\t\t\tvalue? <=> name?\n\t\t\thint \\Type your name\n\t\t<= Echo $mol_view\n\t\t\tsub / <= echo\n',
		solution_ts: 'class $my_demo extends $.$my_demo {\n\t@ $mol_mem name( next?: string ) { return $.$mol_state_arg.value( \'name\', next ) ?? \'\' }\n\techo() { return this.name() ? \'Hello, \' + this.name() + \'!\' : \'\' }\n}\n',
	},
]

// Per-language lesson overrides. EN is the source/fallback (the inline `lessons`
// array); any content/<lang>/lessons/<id>.md that exists is bundled alongside as
// a translation. Only the prose is translated — the first `# ` heading is the
// localized title, the whole file is the localized md. Code (start/solution/
// expect) is universal and never duplicated per language.
function lesson_translations( id, en_title ) {
	const tr = {}
	for ( const lang of langs ) {
		const file = path.join( root, lang, 'lessons', `${ id }.md` )
		if ( !fs.existsSync( file ) ) continue
		const md = fs.readFileSync( file, 'utf8' )
		tr[ lang ] = { title: first_heading( md ) ?? en_title, md }
	}
	return tr
}

let lessons_translated = 0

const lesson_entries = lessons.map( l => {
	const tr = lesson_translations( l.id, l.title )
	const tr_keys = Object.keys( tr )
	if ( tr_keys.length ) lessons_translated++
	const tr_entries = tr_keys.map( lang => (
		`\t\t\t\t\t\t${ lang }: {\n` +
		`\t\t\t\t\t\t\ttitle: ${ JSON.stringify( tr[ lang ].title ) },\n` +
		`\t\t\t\t\t\t\tmd: ${ embed( tr[ lang ].md ) },\n` +
		`\t\t\t\t\t\t},`
	) ).join( '\n' )
	return (
		`\t\t\t\t'${ l.id }': {\n` +
		`\t\t\t\t\tid: '${ l.id }',\n` +
		`\t\t\t\t\ttitle: ${ JSON.stringify( l.title ) },\n` +
		`\t\t\t\t\texpect: ${ embed( l.expect ) },\n` +
		`\t\t\t\t\texpect_in: '${ l.expect_in }',\n` +
		`\t\t\t\t\tmd: ${ embed( l.md ) },\n` +
		`\t\t\t\t\tstart_tree: ${ embed( l.start_tree ) },\n` +
		`\t\t\t\t\tstart_ts: ${ embed( l.start_ts ) },\n` +
		`\t\t\t\t\tsolution_tree: ${ embed( l.solution_tree ) },\n` +
		`\t\t\t\t\tsolution_ts: ${ embed( l.solution_ts ) },\n` +
		( tr_keys.length ? `\t\t\t\t\ttr: {\n${ tr_entries }\n\t\t\t\t\t},\n` : '' ) +
		`\t\t\t\t},`
	)
} ).join( '\n' )

const lessons_ts = `namespace $ {

	/**
	 * Interactive course lessons. GENERATED by content/gen.cjs — edit the lessons
	 * array there and re-run the generator. Code snippets are embedded escaped so
	 * their $mol_* examples are not mistaken for module dependencies.
	 */

	export type $bog_smalljs_lesson_translation = {
		title: string
		md: string
	}

	export type $bog_smalljs_lesson = {
		id: string
		title: string
		/** Substring the finished source should contain (simple auto-check). */
		expect: string
		expect_in: 'tree' | 'ts'
		md: string
		start_tree: string
		start_ts: string
		solution_tree: string
		solution_ts: string
		/** Per-language prose overrides (title + md), keyed by lang. EN is above. */
		tr?: Readonly< Record< string, $bog_smalljs_lesson_translation > >
	}

	export class $bog_smalljs_lessons extends $mol_object2 {

		static all(): readonly $bog_smalljs_lesson[] {
			return [
${ lessons.map( l => `\t\t\t\tthis.lesson( '${ l.id }' )!` ).join( ',\n' ) },
			]
		}

		static ids(): readonly string[] {
			return [ ${ lessons.map( l => `'${ l.id }'` ).join( ', ' ) } ]
		}

		static map(): Readonly< Record< string, $bog_smalljs_lesson > > {
			return {
${ lesson_entries }
			}
		}

		static lesson( id: string ): $bog_smalljs_lesson | null {
			return this.map()[ id ] ?? null
		}

		/** Localized title for a lesson, falling back to EN. */
		static lesson_title( id: string, lang = 'en' ): string | null {
			const lesson = this.map()[ id ]
			if( !lesson ) return null
			return lesson.tr?.[ lang ]?.title ?? lesson.title
		}

		/** Localized instruction markdown for a lesson, falling back to EN. */
		static lesson_md( id: string, lang = 'en' ): string | null {
			const lesson = this.map()[ id ]
			if( !lesson ) return null
			return lesson.tr?.[ lang ]?.md ?? lesson.md
		}

		static first(): string { return this.ids()[ 0 ] }

	}

}
`
// $bog_smalljs_lessons must live in a folder matching its name.
const lessons_dir = path.join( root, '..', 'lessons' )
fs.mkdirSync( lessons_dir, { recursive: true } )
fs.writeFileSync( path.join( lessons_dir, 'lessons.ts' ), lessons_ts )

console.log( `generated: content.ts (${ slugs.length } pages, incl. ${ api_count } API, ${ translated_count } translated) + llms.txt + lessons.ts (${ lessons.length } lessons, ${ lessons_translated } translated) + sitemap.xml (${ sitemap_urls.length } routes = ${ base_routes.length } base + ${ meta_langs.length } langs, incl. ${ versus_pairs.length } versus pairs)` )
