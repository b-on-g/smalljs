namespace $ {

	/** One entry of `versus/data/registry.json`: what a metric is called, which
	 *  direction is better, and the sentence that turns the number into something
	 *  a reader can act on. */
	export type $bog_smalljs_versus_pair_meta = {
		readonly category: string
		readonly title: string
		readonly unit: string
		/** `lower` and `higher` are numeric; `boolean` is the has-it / has-it-not
		 *  matrix. Anything else is kept as-is and simply never scored. */
		readonly better: string
		readonly human: string
	}

	/** One measurement out of `versus/data/<framework>.json`. There is no entry
	 *  for a metric nobody measured — absence is the way "we do not know" is
	 *  written down, so nothing here is ever a placeholder zero. */
	export type $bog_smalljs_versus_pair_measure = {
		readonly value: number | boolean | string
		readonly source: string
		readonly measured_at: string
		readonly method: string
	}

	export type $bog_smalljs_versus_pair_framework = {
		readonly id: string
		readonly title: string
		readonly since: number | null
		/** Whether a live crash-test runner exists for it. False means the edge
		 *  cases block shows one column and says so. */
		readonly runner: boolean
		readonly metrics: Readonly< Record< string, $bog_smalljs_versus_pair_measure > >
	}

	// Where the data files are served from, relative to the site root.
	const data_dir = 'bog/smalljs/versus/data/'

	// The mam dev server serves the repo root, so the page path carries this.
	const repo_prefix = '/bog/smalljs/'

	// Path the site is mounted at on the deploy.
	const site_mount = '/smalljs/'

	function text_of( raw: unknown ) {
		return typeof raw === 'string' ? raw : ''
	}

	function record_of( raw: unknown ): Readonly< Record< string, unknown > > {
		if( !raw || typeof raw !== 'object' || Array.isArray( raw ) ) return {}
		return raw as Record< string, unknown >
	}

	/** A metric is present only when it carries a usable value. `null`, a missing
	 *  field and a NaN all mean the same thing here — nobody measured it — and all
	 *  three end up as no entry at all. A zero, on the other hand, is a reading
	 *  like any other and is kept. */
	function measure_of( raw: unknown ): $bog_smalljs_versus_pair_measure | null {

		const rec = record_of( raw )
		const value = rec.value

		if( typeof value === 'number' ) {
			if( !Number.isFinite( value ) ) return null
		} else if( typeof value !== 'boolean' && typeof value !== 'string' ) {
			return null
		}

		return {
			value,
			source: text_of( rec.source ),
			measured_at: text_of( rec.measured_at ),
			method: text_of( rec.method ),
		}
	}

	function framework_of( id: string, raw: unknown ): $bog_smalljs_versus_pair_framework {

		const rec = record_of( raw )
		const metrics: Record< string, $bog_smalljs_versus_pair_measure > = {}

		for( const [ key, value ] of Object.entries( record_of( rec.metrics ) ) ) {
			const measure = measure_of( value )
			if( measure ) metrics[ key ] = measure
		}

		return {
			id: text_of( rec.id ) || id,
			title: text_of( rec.title ) || id,
			since: typeof rec.since === 'number' && Number.isFinite( rec.since ) ? rec.since : null,
			runner: rec.runner === true,
			metrics,
		}
	}

	function registry_of( raw: unknown ): Readonly< Record< string, $bog_smalljs_versus_pair_meta > > {

		const out: Record< string, $bog_smalljs_versus_pair_meta > = {}

		for( const [ key, value ] of Object.entries( record_of( raw ) ) ) {

			const rec = record_of( value )
			const category = text_of( rec.category )
			if( !category ) continue

			out[ key ] = {
				category,
				title: text_of( rec.title ) || key,
				unit: text_of( rec.unit ),
				better: text_of( rec.better ),
				human: text_of( rec.human ),
			}
		}

		return out
	}

	/**
	 * Reads `versus/data/*.json` and hands the page parsed, defensive values.
	 *
	 * A file that is not there yet, a metric nobody measured and a field somebody
	 * left out are all normal states of this section, not errors: the data is
	 * filled in over time and the page has to render at every stage of that. So a
	 * failed request resolves to an empty framework rather than throwing, and the
	 * page shows the same dash it shows for a metric that was never measured.
	 *
	 * The one thing that is re-thrown is the suspend signal of the reactive
	 * engine — swallowing it would turn a pending request into permanent "no
	 * data" instead of a loading state.
	 */
	export class $bog_smalljs_versus_pair_data extends $mol_object2 {

		/** Path of the page itself. Split out so the base below can be checked
		 *  without a browser. */
		static location_path() {
			return this.$.$mol_dom_context.location?.pathname ?? ''
		}

		/** Site root the data files hang off. Derived the same way, and for the
		 *  same reason, as the runner paths in `$bog_smalljs_versus_case`: the
		 *  page lives at `/bog/smalljs/app/-/test.html` on the dev server and at
		 *  `/smalljs/...` on the deploy. The dev check comes first, because a dev
		 *  path contains the deploy mount as a substring but not the other way
		 *  round. */
		static site_base() {

			const pathname = this.location_path()

			const repo_at = pathname.indexOf( repo_prefix )
			if( repo_at >= 0 ) return pathname.slice( 0, repo_at ) + '/'

			const mount_at = pathname.indexOf( site_mount )
			if( mount_at >= 0 ) return pathname.slice( 0, mount_at + site_mount.length )

			return '/'
		}

		static uri( name: string ) {
			return this.site_base() + data_dir + name + '.json'
		}

		/** Raw JSON, or null when there is nothing to read. */
		@ $mol_mem_key
		static json( name: string ): unknown {
			if( !name ) return null
			try {
				return this.$.$mol_fetch.json( this.uri( name ) )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				return null
			}
		}

		@ $mol_mem
		static registry() {
			return registry_of( this.json( 'registry' ) )
		}

		/** Never null: a framework with no file is a framework with no metrics,
		 *  which is exactly how the page has to treat it anyway. */
		@ $mol_mem_key
		static framework( id: string ): $bog_smalljs_versus_pair_framework {
			return framework_of( id, this.json( id ) )
		}

		/** Whether anything at all was read for this id. Used to tell "we have no
		 *  file for this framework" apart from "we have a file and it is thin". */
		static known( id: string ) {
			return this.json( id ) !== null
		}

		static title( id: string ) {
			return this.framework( id ).title
		}

		static measure( id: string, metric: string ): $bog_smalljs_versus_pair_measure | null {
			return this.framework( id ).metrics[ metric ] ?? null
		}

		static meta( metric: string ): $bog_smalljs_versus_pair_meta | null {
			return this.registry()[ metric ] ?? null
		}

		/** Metric ids of a category, in the order the registry lists them. The
		 *  page reorders them by its own canonical list and appends whatever it
		 *  does not know about, so a metric added to the registry alone still
		 *  reaches the page. */
		@ $mol_mem_key
		static category_metrics( category: string ): readonly string[] {
			return Object.entries( this.registry() )
				.filter( ( [ , meta ] ) => meta.category === category )
				.map( ( [ id ] ) => id )
		}

	}

}
