namespace $.$$ {

	/** Frameworks in column order. */
	const frameworks = [ 'react', 'vue', 'mol' ] as const

	const framework_titles: Record< string, string > = {
		react: 'React',
		vue: 'Vue',
		mol: '$mol',
		angular: 'Angular',
		solid: 'Solid',
		svelte: 'Svelte',
	}

	/** `idle` and `running` are states of the block, the rest come off the wire.
	 *  `error` means the runner broke and there is nothing to read; `invalid`
	 *  means it ran but the conditions made the numbers worthless. They are kept
	 *  apart on purpose — only one of the two is the reader's fault to fix. */
	type Status = 'idle' | 'running' | 'ok' | 'warn' | 'fail' | 'error' | 'invalid'

	type Metric = { name: string, value: string }

	type Result = {
		status: Status,
		observed: string,
		metrics: readonly Metric[],
	}

	const result_idle: Result = { status: 'idle', observed: '', metrics: [] }

	/** Shown for a metric the runner could not measure honestly. Never a zero:
	 *  a zero is a reading, this is the absence of one. */
	const no_value = '—'

	const status_icons: Record< Status, string > = {
		idle: '○',
		running: '⏳',
		ok: '✅',
		warn: '⚠️',
		fail: '❌',
		error: '⛔',
		invalid: '↻',
	}

	/** How long a runner gets to answer a `run` before its column reports no result. */
	const answer_timeout = 15000

	/** How long after its page finishes loading a runner gets to say `ready`.
	 *  The load event fires once the document and its scripts are in, so the
	 *  greeting should follow almost immediately; anything past this is a page
	 *  that is not a runner at all — a 404 body, most likely. */
	const ready_timeout = 5000

	// Where each runner is served from, relative to the site root. React and Vue
	// are static files under the assets deploy; the $mol one is a MAM module of
	// its own, which CI copies into the output at the same path it has on the dev
	// server — so there is no assets/versus/mol/ folder.
	const runner_paths: Record< string, string > = {
		react: 'bog/smalljs/assets/versus/react/runner.html',
		vue: 'bog/smalljs/assets/versus/vue/runner.html',
		mol: 'bog/smalljs/lab/-/index.html',
		angular: 'bog/smalljs/assets/versus/angular/runner.html',
		solid: 'bog/smalljs/assets/versus/solid/runner.html',
		svelte: 'bog/smalljs/assets/versus/svelte/runner.html',
	}

	// The mam dev server serves the repo root, so the page path carries this.
	const repo_prefix = '/bog/smalljs/'

	// Path the site is mounted at on the deploy — the same mount the path router
	// is activated with in app/app.view.ts.
	const site_mount = '/smalljs/'

	/** Per case, per framework: what the runner leaves out and what has to be
	 *  written by hand in that framework for the observed behaviour to change.
	 *  Kept in TS rather than in the tree: the text is selected by case id at
	 *  runtime and is not part of the component's public interface. */
	const notes: Record< string, Record< string, string > > = {

		race: {
			react: 'The effect calls setState with whatever the request returns, with no cancellation. Ignoring a response that is no longer current takes a cancel flag or an AbortController inside the effect.',
			vue: 'The watcher assigns whatever the awaited request returns, with no cancellation. Ignoring a response that is no longer current takes a check after the await that the selected id has not changed.',
			mol: 'The panel value is computed from the selected id, so a response for an earlier id is never assigned. Nothing is written by hand here.',
		},

		virtual: {
			react: 'Every row is rendered by a plain .map() over the data. Rendering only the rows on screen takes a virtualization library and a way to measure each row, since the heights differ.',
			vue: 'Every row is rendered by a plain v-for over the data. Rendering only the rows on screen takes a virtualization library and a way to measure each row, since the heights differ.',
			mol: 'The list keeps only the rows inside the viewport in the DOM and measures their heights as it scrolls. Nothing is written by hand here.',
		},

		leak: {
			react: 'The effect subscribes and returns nothing. Releasing the subscription takes a cleanup function returned from every effect that subscribes.',
			vue: 'onMounted subscribes and there is no matching onUnmounted. Releasing the subscription takes a teardown hook in every component that subscribes.',
			mol: 'The subscription belongs to the component\'s own reactive cell and is released together with the component. Nothing is written by hand here.',
		},

		crash: {
			react: 'With no ErrorBoundary above it, a throw during render takes the whole tree down. Keeping the rest of the list on screen takes an ErrorBoundary component around every part that may throw.',
			vue: 'The production build drops the throwing component and leaves an empty comment node in its place, so the rest of the list stays and the page shows no sign that anything failed — the TypeError reaches the console only. Putting something visible where the card was takes an onErrorCaptured hook and markup to render in the failed slot.',
			mol: 'A view that throws renders the error message in its own place and the rest of the tree keeps rendering. Nothing is written by hand here.',
		},

	}

	function status_parse( raw: unknown ): Status {
		return raw === 'ok' || raw === 'warn' || raw === 'fail' ? raw : 'error'
	}

	/** Runners omit a metric they could not measure honestly rather than sending
	 *  a zero, so an absent entry simply has no row. An entry that arrives without
	 *  a value gets a dash for the same reason. Order is the runner's — the first
	 *  metric is the one the status is derived from — so it is never re-sorted. */
	function metrics_parse( raw: unknown ): readonly Metric[] {
		if( !Array.isArray( raw ) ) return []
		return raw.flatMap( item => {
			if( !item || typeof item !== 'object' ) return []
			const name = ( item as { name?: unknown } ).name
			if( !name ) return []
			const value = ( item as { value?: unknown } ).value
			const unit = ( item as { unit?: unknown } ).unit
			if( value === null || value === undefined || value === '' ) {
				return [ { name: String( name ), value: no_value } ]
			}
			return [ { name: String( name ), value: String( value ) + ( unit ? ' ' + String( unit ) : '' ) } ]
		} )
	}

	export class $bog_smalljs_versus_case extends $.$bog_smalljs_versus_case {

		frameworks() {
			return frameworks as readonly string[]
		}

		columns() {
			return this.frameworks().map( id => this.Column( id ) )
		}

		framework_name( id: string ) {
			return framework_titles[ id ] ?? id
		}

		frame_title( id: string ) {
			return this.framework_name( id ) + ' — ' + this.case_id()
		}

		/** Path of the page itself. Split out so the base below can be checked
		 *  without a browser. */
		location_path() {
			return this.$.$mol_dom_context.location?.pathname ?? ''
		}

		/** Site root the runner paths hang off. The page lives at two very
		 *  different paths and the runners have to be addressed from both:
		 *
		 *      dev     /bog/smalljs/app/-/test.html  (repo root is the server root)
		 *      deploy  /smalljs/section=versus       (app/-/ is the site root)
		 *
		 *  so the base is derived from the current path rather than written down.
		 *  A relative URI would not survive here: prerendered routes are served
		 *  as /<route>/index.html, which shifts what a relative path resolves
		 *  against. The dev check has to come first — a dev path contains the
		 *  deploy mount as a substring, but not the other way round. */
		site_base() {

			const pathname = this.location_path()

			const repo_at = pathname.indexOf( repo_prefix )
			if( repo_at >= 0 ) return pathname.slice( 0, repo_at ) + '/'

			const mount_at = pathname.indexOf( site_mount )
			if( mount_at >= 0 ) return pathname.slice( 0, mount_at + site_mount.length )

			return '/'
		}

		@ $mol_mem_key
		frame_uri( id: string ) {
			return this.site_base() + runner_paths[ id ] + '?case=' + encodeURIComponent( this.case_id() )
		}

		/** Latest thing every column has to say. Written by run(), by the message
		 *  handler and by the countdown, read by everything below. */
		@ $mol_mem_key
		result( id: string, next?: Result ): Result {
			return next ?? result_idle
		}

		status( id: string ): Status {
			return this.result( id ).status
		}

		status_icon( id: string ) {
			return status_icons[ this.status( id ) ]
		}

		status_text( id: string ) {
			switch( this.status( id ) ) {
				case 'running': return this.status_running()
				case 'ok': return this.status_ok()
				case 'warn': return this.status_warn()
				case 'fail': return this.status_fail()
				case 'error': return this.status_error()
				case 'invalid': return this.status_invalid()
				default: return this.status_idle()
			}
		}

		observed( id: string ) {
			return this.result( id ).observed
		}

		/** One neutral state, one line per reason. A reason this build has never
		 *  heard of gets the general wording rather than being pushed into an
		 *  error: the protocol is expected to grow, and a runner reporting an
		 *  unmeasurable run is doing its job, not failing at it. */
		invalid_text( reason: unknown ) {
			switch( reason ) {
				case 'tab-hidden': return this.invalid_tab_hidden()
				case 'timers-throttled': return this.invalid_timers_throttled()
				case 'frame-offscreen': return this.invalid_frame_offscreen()
				default: return this.invalid_other()
			}
		}

		note( id: string ) {
			return notes[ this.case_id() ]?.[ id ] ?? ''
		}

		metric_ids( id: string ) {
			return this.result( id ).metrics.map( ( _, index ) => id + '/' + index )
		}

		metric_rows( id: string ) {
			return this.metric_ids( id ).map( key => this.Metric( key ) )
		}

		metric( key: string ): Metric | undefined {
			const slash = key.lastIndexOf( '/' )
			return this.result( key.slice( 0, slash ) ).metrics[ Number( key.slice( slash + 1 ) ) ]
		}

		metric_name( key: string ) {
			return this.metric( key )?.name ?? ''
		}

		metric_value( key: string ) {
			return this.metric( key )?.value ?? no_value
		}

		/** Rows of the result card, skipping the ones with nothing to show —
		 *  an empty view would still take a gap in the column. */
		card_content( id: string ) {
			return [
				this.Status( id ),
				... this.observed( id ) ? [ this.Observed( id ) ] : [],
				... this.metric_ids( id ).length ? [ this.Metrics( id ) ] : [],
				... this.note( id ) ? [ this.Note( id ) ] : [],
			]
		}

		controls_content() {
			return [
				this.Run(),
				... this.run_hint() ? [ this.Run_hint() ] : [],
			]
		}

		/** Every runner reports `ready` once its scenario is mounted. Until all
		 *  three have, a run would post into a frame that cannot answer. */
		@ $mol_mem_key
		ready( id: string, next?: boolean ): boolean {
			return next ?? false
		}

		frames_ready() {
			return this.frameworks().every( id => this.ready( id ) )
		}

		/** Whether the frame's document finished loading, whatever it turned out
		 *  to be. A 404 is still a document, so this fires for a missing runner
		 *  too — which is exactly what makes it usable as the starting gun for
		 *  the greeting countdown below. */
		@ $mol_mem_key
		frame_settled( id: string, next?: boolean ): boolean {
			return next ?? false
		}

		@ $mol_action
		frame_loaded( id: string, next?: unknown ) {
			this.frame_settled( id, true )
			return null
		}

		/** Grades a frame that loaded something but never introduced itself.
		 *  Without this the column would sit on "Not run yet" for good and Run
		 *  would stay disabled with no hint of which frame is holding it up —
		 *  the 15 s answer timeout never gets a chance, because a run cannot
		 *  start in the first place. Disarms itself the moment `ready` lands. */
		@ $mol_mem_key
		ready_watchdog( id: string ) {
			if( !this.frame_settled( id ) ) return null
			if( this.ready( id ) ) return null
			return new this.$.$mol_after_timeout( ready_timeout, ()=> this.ready_expire( id ) )
		}

		@ $mol_action
		ready_expire( id: string ) {
			if( this.ready( id ) ) return null
			this.result( id, { status: 'error', observed: this.error_not_loaded(), metrics: [] } )
			return null
		}

		/** Frames that answered with nothing runnable. */
		frames_broken() {
			return this.frameworks().some( id => !this.ready( id ) && this.status( id ) === 'error' )
		}

		/** Whether the tab is in front. A background tab clamps setTimeout to
		 *  about a second and never fires requestAnimationFrame, which turns every
		 *  scenario here into a coin toss, so runs do not start in one. */
		@ $mol_mem
		page_visible( next?: boolean ): boolean {
			return next ?? !this.$.$mol_dom_context.document?.hidden
		}

		@ $mol_action
		visibility_sync() {
			this.page_visible( !this.$.$mol_dom_context.document.hidden )
			return null
		}

		run_enabled() {
			return this.frames_ready() && this.page_visible()
		}

		/** Why Run is not available, when it is not. The broken case comes before
		 *  the loading one: a frame that will never load is still "not ready",
		 *  and telling the reader to wait for it would be a lie. */
		run_hint() {
			if( !this.page_visible() ) return this.run_hint_hidden()
			if( this.frames_broken() ) return this.run_hint_broken()
			if( !this.frames_ready() ) return this.run_hint_loading()
			return ''
		}

		/** Bumped on every Run, so a countdown armed by an earlier run cannot
		 *  touch the results of a later one. */
		@ $mol_mem
		run_id( next?: number ) {
			return next ?? 0
		}

		@ $mol_action
		run() {

			if( !this.run_enabled() ) return null

			const run_id = this.run_id() + 1
			this.run_id( run_id )

			for( const id of this.frameworks() ) {
				this.result( id, { status: 'running', observed: '', metrics: [] } )
				this.post( id, { ns: 'versus', type: 'run', case: this.case_id() } )
			}

			return null
		}

		/** Countdown for the answers of the current run. It lives in a cell of its
		 *  own rather than being started from run(): a fiber spawned inside an
		 *  action is owned by that action and dies with it, taking its timer along.
		 *  Re-arming needs no code — the cell depends on run_id, so the next Run
		 *  drops this timer and creates the next one. Returned from the cell and
		 *  read through auto(), otherwise it would be destroyed on creation. */
		@ $mol_mem
		watchdog() {
			const run_id = this.run_id()
			if( !run_id ) return null
			return new this.$.$mol_after_timeout( answer_timeout, ()=> this.expire( run_id ) )
		}

		@ $mol_action
		expire( run_id: number ) {

			if( this.run_id() !== run_id ) return null

			for( const id of this.frameworks() ) {
				if( this.status( id ) !== 'running' ) continue
				this.result( id, { status: 'error', observed: this.error_timeout(), metrics: [] } )
			}

			return null
		}

		frame_window( id: string ) {
			return ( this.Frame( id ).dom_node() as HTMLIFrameElement ).contentWindow
		}

		post( id: string, message: unknown ) {
			this.frame_window( id )?.postMessage( message, '*' )
		}

		// One listener per case block on the window, not per frame: a frame that
		// has not finished loading has no contentWindow to listen on yet. The
		// sender is resolved by comparing event.source with each frame's window —
		// origins differ between dev and deploy, so they are not filtered on.
		// Returned from a cell and kept alive through auto(), otherwise the
		// reactive engine would drop the object right after creating it.
		@ $mol_mem
		message_listener() {
			return new $mol_dom_listener(
				this.$.$mol_dom_context,
				'message',
				$mol_wire_async( this ).message_receive,
			)
		}

		@ $mol_mem
		visibility_listener() {
			return new $mol_dom_listener(
				this.$.$mol_dom_context.document,
				'visibilitychange',
				()=> this.visibility_sync(),
			)
		}

		override auto() {
			return [
				this.message_listener(),
				this.visibility_listener(),
				this.watchdog(),
				... this.frameworks().map( id => this.ready_watchdog( id ) ),
			]
		}

		message_receive( event?: MessageEvent ) {

			if( !event ) return

			const packet = event.data as {
				ns?: unknown,
				type?: unknown,
				case?: unknown,
				status?: unknown,
				observed?: unknown,
				metrics?: unknown,
				message?: unknown,
				reason?: unknown,
			} | null

			if( !packet || typeof packet !== 'object' ) return
			if( packet.ns !== 'versus' ) return

			const id = this.frameworks().find( id => event.source === this.frame_window( id ) )
			if( !id ) return

			if( packet.case !== undefined && packet.case !== this.case_id() ) return

			switch( packet.type ) {

				// A remount invalidates whatever the previous run left on the card,
				// unless a run is in flight and this is the frame answering it.
				case 'ready': {
					this.ready( id, true )
					if( this.status( id ) === 'running' ) return
					this.result( id, result_idle )
					return
				}

				case 'result': {
					this.result( id, {
						status: status_parse( packet.status ),
						observed: String( packet.observed ?? '' ),
						metrics: metrics_parse( packet.metrics ),
					} )
					return
				}

				// Not a verdict and not a breakage: the run happened under
				// conditions that make its numbers meaningless. The previous
				// verdict goes away with it rather than staying up next to the
				// explanation, where it would read as still standing.
				case 'invalid': {
					this.result( id, {
						status: 'invalid',
						observed: this.invalid_text( packet.reason ),
						metrics: [],
					} )
					return
				}

				case 'error': {
					this.result( id, {
						status: 'error',
						observed: String( packet.message ?? '' ),
						metrics: [],
					} )
					return
				}

			}
		}

	}

}
