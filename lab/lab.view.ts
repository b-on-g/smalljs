namespace $ {

	/**
	 * Shared store with a plain list of subscribers. Same shape in every runner
	 * of the comparison, so that `subscribers.length` means the same thing.
	 */
	export class $bog_smalljs_lab_store extends $mol_object {

		subscribers = [] as ( ()=> void )[]

		@ $mol_mem
		static shared(): $bog_smalljs_lab_store {
			return new this
		}

		subscribe( handler: ()=> void ) {
			this.subscribers.push( handler )
			return new $bog_smalljs_lab_link( this, handler )
		}

	}

	/**
	 * Reports whether a node is inside the viewport. An observer with no root of
	 * its own measures against the top level viewport even from a nested frame,
	 * which is what makes a scrolled away frame detectable from the inside.
	 */
	export class $bog_smalljs_lab_watch extends $mol_object {

		readonly observer: IntersectionObserver

		constructor(
			node: Element,
			handler: ( visible: boolean )=> void,
		) {
			super()
			this.observer = new $mol_dom_context.IntersectionObserver(
				entries => handler( entries[ entries.length - 1 ].isIntersecting ),
				{ threshold: 0 },
			)
			this.observer.observe( node )
		}

		override destructor() {
			this.observer.disconnect()
		}

	}

	/**
	 * Handle of a single subscription. It is created inside a reactive cell of
	 * the subscribing component, so the engine drops it together with that
	 * component and the store forgets the handler without a manual call.
	 */
	export class $bog_smalljs_lab_link extends $mol_object {

		constructor(
			readonly store: $bog_smalljs_lab_store,
			readonly handler: ()=> void,
		) {
			super()
		}

		override destructor() {
			const index = this.store.subscribers.indexOf( this.handler )
			if( index >= 0 ) this.store.subscribers.splice( index, 1 )
		}

	}

}

namespace $.$$ {

	type Metric = { name: string, value: number, unit: string }

	type Status = 'ok' | 'warn' | 'fail'

	/** Filler text of the virtual list rows. Hoisted, so that building 10 000
	 *  rows does not rebuild it 10 000 times. */
	const filler = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua '

	export class $bog_smalljs_lab extends $.$bog_smalljs_lab {

		/** Scenario to mount, taken from the query of the page the iframe loads. */
		@ $mol_mem
		case_id() {
			const href = this.$.$mol_dom_context.location.href
			return new URL( href ).searchParams.get( 'case' ) ?? 'race'
		}

		@ $mol_mem
		case_content(): readonly $mol_view[] {
			switch( this.case_id() ) {
				case 'virtual': return [ this.Virtual() ]
				case 'leak': return [ this.Leak() ]
				case 'crash': return [ this.Crash() ]
				default: return [ this.Race() ]
			}
		}

		// The listeners and the ready beacon are returned from their own cells and
		// held through auto(), otherwise the reactive engine would destroy them
		// right after they were created.
		override auto() {
			return [
				this.message_listener(),
				this.visibility_listener(),
				this.frame_watch(),
				this.ready_beacon(),
			]
		}

		@ $mol_mem
		message_listener() {
			return new this.$.$mol_dom_listener(
				this.$.$mol_dom_context,
				'message',
				( event: MessageEvent )=> this.message_receive( event ),
			)
		}

		// Checked through visibilityState rather than the `hidden` flag: inside a
		// frame Chrome leaves `hidden` false while visibilityState already says
		// the tab went away, which makes a check on the flag silently dead.
		hidden() {
			return this.$.$mol_dom_context.document.visibilityState !== 'visible'
		}

		@ $mol_mem
		visibility_listener() {
			return new this.$.$mol_dom_listener(
				this.$.$mol_dom_context.document,
				'visibilitychange',
				()=> { if( this.hidden() ) this.spoil( 'tab-hidden' ) },
			)
		}

		/** A frame scrolled out of the viewport stops being given animation
		 *  frames, which would otherwise look like the framework hanging. */
		@ $mol_mem
		frame_watch() {
			return new this.$.$bog_smalljs_lab_watch(
				this.dom_node(),
				visible => { if( !visible ) this.spoil( 'frame-offscreen' ) },
			)
		}

		/** Why the current run stopped being trustworthy, empty while it still
		 *  is. The first reason wins: it is the one that actually spoiled the
		 *  measurement, the rest are its consequences. */
		@ $mol_mem
		spoil_reason( next?: string ) {
			return next ?? ''
		}

		spoil( reason: string ) {
			if( !this.spoil_reason() ) this.spoil_reason( reason )
		}

		spoiled() {
			if( this.hidden() ) this.spoil( 'tab-hidden' )
			return this.spoil_reason()
		}

		/** Announces the mounted scenario once the first render is over. */
		@ $mol_mem
		ready_beacon() {
			const case_id = this.case_id()
			return new this.$.$mol_after_tick( ()=> this.post({ type: 'ready', case: case_id }) )
		}

		post( message: Record< string, unknown > ) {
			this.$.$mol_dom_context.parent.postMessage({ ns: 'versus', ... message }, '*' )
		}

		message_receive( event: MessageEvent ) {

			const packet = event.data as { ns?: unknown, type?: unknown, lights?: unknown } | null

			if( !packet || typeof packet !== 'object' ) return
			if( packet.ns !== 'versus' ) return

			if( packet.type === 'run' ) this.run()
			if( packet.type === 'reset' ) this.reset()
			if( packet.type === 'theme' ) this.theme_receive( packet )

		}

		/** The page hands its theme over instead of putting it in the query: a
		 *  different src reloads the runner and throws away the result of a run
		 *  already made, while the reader may switch themes at any moment,
		 *  including after Run. Anything other than `dark` reads as light, so an
		 *  unknown value leaves the frame legible rather than blank. */
		theme_receive( packet: { lights?: unknown } ) {
			this.lights( packet.lights === 'dark' ? 'dark' : 'light' )
		}

		/** Pins the built-in $mol parts — hover, focus ring, scrollbars — to the
		 *  same side of the theme as the runner's own palette. Without it they
		 *  follow the operating system rather than the site, and a reader with a
		 *  light system reading the site in dark gets pale scrollbars on a dark
		 *  list. */
		mol_theme() {
			return this.lights() === 'dark' ? '$mol_theme_dark' : '$mol_theme_light'
		}

		async run() {
			this.spoil_reason( '' )
			this.spoiled()
			try {
				switch( this.case_id() ) {
					case 'virtual': await this.run_virtual(); break
					case 'leak': await this.run_leak(); break
					case 'crash': await this.run_crash(); break
					default: await this.run_race(); break
				}
			} catch( error: unknown ) {
				this.post({ type: 'error', message: this.$.$mol_error_message( error ) })
			}
		}

		@ $mol_action
		reset() {
			this.race_selected( 0 )
			this.virtual_filled( false )
			this.leak_cycle( 0 )
			this.leak_mounted( false )
			this.crash_broken( false )
			return null
		}

		report( status: Status, observed: string, metrics: readonly Metric[] = [] ) {

			const reason = this.spoiled()
			if( reason ) return this.report_invalid( reason )

			this.post({
				type: 'result',
				case: this.case_id(),
				status,
				observed,
				metrics,
			})
		}

		/** Nothing measured is worth reporting, and the page should say why
		 *  rather than hold on to the verdict of an earlier run. */
		report_invalid( reason: string ) {
			this.post({
				type: 'invalid',
				case: this.case_id(),
				reason,
			})
		}

		sleep( delay: number ) {
			return new Promise< void >( done => new this.$.$mol_after_timeout( delay, ()=> done() ) )
		}

		/** Waits for one animation frame. A hidden tab and a frame scrolled out of
		 *  the viewport are never given one, so the wait also ends once the run
		 *  is spoiled — otherwise it would hang forever and could not even report
		 *  why it gave up. */
		frame() {
			return new Promise< void >( done => {

				let settled = false
				const finish = ()=> {
					if( settled ) return
					settled = true
					done()
				}

				new this.$.$mol_after_frame( finish )

				const guard = ()=> {
					if( settled ) return
					if( this.spoiled() ) return finish()
					new this.$.$mol_after_timeout( 100, guard )
				}
				new this.$.$mol_after_timeout( 100, guard )

			} )
		}

		// ---------------------------------------------------------------- race
		// versus:case race

		race_ids() {
			return [ 1, 2, 3, 4, 5 ]
		}

		@ $mol_mem
		race_selected( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		race_options(): readonly $mol_view[] {
			return this.race_ids().map( id => this.Race_option( id ) )
		}

		race_option_label( id: number ) {
			return `User ${ id }`
		}

		race_option_current( id: number ) {
			return this.race_selected() === id
		}

		@ $mol_action
		race_option_click( id: number, next?: unknown ) {
			this.race_selected( id )
			return null
		}

		race_delay( id: number ) {
			return 1000 - ( id - 1 ) * 200
		}

		async race_load( id: number ) {
			await this.sleep( this.race_delay( id ) )
			return {
				name: `User ${ id }`,
				descr: `Profile of user ${ id }, answered in ${ this.race_delay( id ) } ms`,
			}
		}

		/** The record is a value of the selected id. A record for an id nobody
		 *  looks at any more has no place to land. */
		@ $mol_mem_key
		race_user( id: number ): { name: string, descr: string } {
			return $mol_wire_sync( this ).race_load( id )
		}

		/** The empty state carries the same words as the React and Vue runners.
		 *  The three frames are read side by side, and a column that is silent
		 *  where the others speak looks like a column that failed to load. */
		race_panel_name() {
			const id = this.race_selected()
			return id ? this.race_user( id ).name : 'Pick a user'
		}

		race_panel_descr() {
			const id = this.race_selected()
			return id ? this.race_user( id ).descr : ''
		}

		/** The two waits add up to 1600 ms. Past this the machine was stretching
		 *  timers, and stretched timers pull the 200 ms and 1000 ms answers
		 *  towards each other until the order of arrival is a coin toss. */
		race_deadline() {
			return 2200
		}

		async run_race() {

			const started = performance.now()

			this.race_selected( 1 )
			await this.sleep( 100 )
			this.race_selected( 5 )
			await this.sleep( 1500 )

			if( performance.now() - started > this.race_deadline() ) this.spoil( 'timers-throttled' )

			const shown = this.Race_panel().dom_node().textContent ?? ''
			const found = shown.match( /User (\d+)/ )
			const id = found ? Number( found[1] ) : 0

			this.report(
				id === 5 ? 'ok' : 'fail',
				id
					? `Selected user 5, panel showed user ${ id }`
					: `Selected user 5, panel showed no user`,
			)

		}

		// ------------------------------------------------------------- virtual
		// versus:case virtual

		virtual_count() {
			return 10000
		}

		@ $mol_mem
		virtual_filled( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		virtual_rows(): readonly $mol_view[] {

			if( !this.virtual_filled() ) return [ this.Virtual_placeholder() ]

			const rows = [] as $mol_view[]
			for( let index = 0; index < this.virtual_count(); ++ index ) {
				rows.push( this.Virtual_row( index ) )
			}

			return rows
		}

		virtual_row_text( index: number ) {
			const size = 20 + ( index * 37 ) % 400
			const head = `Row ${ index + 1 }. `
			const body = filler.repeat( Math.ceil( size / filler.length ) )
			return ( head + body ).slice( 0, size )
		}

		async run_virtual() {

			const container = this.Virtual_scroll().dom_node()

			// Back to an empty list first, so a repeated Run measures the same
			// work over again instead of reading a list that is already there.
			this.virtual_filled( false )
			this.Virtual_scroll().scroll_top( 0 )
			await this.sleep( 16 )

			const started = performance.now()

			this.virtual_filled( true )

			await this.frame()
			await this.frame()

			// Reading the height makes the browser lay the rows out, so the
			// measurement covers the frame the user actually waits for.
			const height = container.scrollHeight

			const render_time = Math.round( performance.now() - started )

			// Without frames the time above measured the wait, not the work, so
			// the run stops here instead of spending two more seconds scrolling.
			const spoiled = this.spoiled()
			if( spoiled ) return this.report_invalid( spoiled )

			this.Virtual_scroll().scroll_top( Math.round( ( height - container.clientHeight ) / 2 ) )
			await this.sleep( 1000 )
			this.Virtual_scroll().scroll_top( 0 )
			await this.sleep( 1000 )

			const nodes = container.querySelectorAll( '*' ).length

			this.report(
				nodes < 500 ? 'ok' : nodes > 5000 ? 'fail' : 'warn',
				`Rendered ${ nodes } DOM nodes for ${ this.virtual_count() } rows`,
				[
					{ name: 'DOM nodes', value: nodes, unit: '' },
					{ name: 'Render time', value: render_time, unit: 'ms' },
				],
			)

		}

		// ---------------------------------------------------------------- leak
		// versus:case leak

		leak_count() {
			return 100
		}

		@ $mol_mem
		leak_cycle( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		leak_mounted( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		leak_probes(): readonly $mol_view[] {
			return this.leak_mounted() ? [ this.Leak_probe( this.leak_cycle() ) ] : []
		}

		leak_probe_label( cycle: number ) {
			return `Subscribed component, mount ${ cycle }`
		}

		async run_leak() {

			const store = this.$.$bog_smalljs_lab_store.shared()
			const place = this.Leak_place()

			// dom_tree() renders the place right here instead of on the next
			// frame, so that every pass of the loop is a real mount and unmount.
			for( let cycle = 1; cycle <= this.leak_count(); ++ cycle ) {
				this.leak_cycle( cycle )
				this.leak_mounted( true )
				place.dom_tree()
				this.leak_mounted( false )
				place.dom_tree()
			}

			// Cells left without subscribers are collected on the next tick.
			await this.sleep( 100 )

			const live = store.subscribers.length

			const metrics = [ { name: 'Live subscribers', value: live, unit: '' } ] as Metric[]

			const memory = ( performance as unknown as { memory?: { usedJSHeapSize: number } } ).memory
			if( memory ) metrics.push({
				name: 'Heap',
				value: Math.round( memory.usedJSHeapSize / 1048576 ),
				unit: 'MB',
			})

			this.report(
				live === 0 ? 'ok' : 'fail',
				`${ this.leak_count() } mount cycles left ${ live } live subscribers`,
				metrics,
			)

		}

		// --------------------------------------------------------------- crash
		// versus:case crash

		crash_count() {
			return 20
		}

		/** Zero based index of the card whose record is replaced with null. */
		crash_broken_index() {
			return 6
		}

		@ $mol_mem
		crash_broken( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		crash_records(): readonly ( { name: string, text: string } | null )[] {

			const broken = this.crash_broken()
			const records = [] as ( { name: string, text: string } | null )[]

			for( let index = 0; index < this.crash_count(); ++ index ) {
				records.push(
					broken && index === this.crash_broken_index()
						? null
						: { name: `Card ${ index + 1 }`, text: `Payload of card ${ index + 1 }` }
				)
			}

			return records
		}

		@ $mol_mem
		crash_cards(): readonly $mol_view[] {

			const cards = [] as $mol_view[]
			for( let index = 0; index < this.crash_count(); ++ index ) {
				cards.push( this.Crash_card( index ) )
			}

			return cards
		}

		crash_card_name( index: number ) {
			return this.crash_records()[ index ]!.name
		}

		crash_card_text( index: number ) {
			return this.crash_records()[ index ]!.text
		}

		async run_crash() {

			// Whole records first, so a repeated Run swaps them out again.
			this.crash_broken( false )
			await this.sleep( 16 )

			this.crash_broken( true )
			await this.sleep( 200 )

			const container = this.Crash_list().dom_node()
			const alive = container.querySelectorAll( '[versus_card]:not([mol_view_error])' ).length
			const broken = container.querySelector( '[versus_card][mol_view_error]' )
			const placeholder = !!broken && ( broken.textContent ?? '' ).trim().length > 0

			const number = this.crash_broken_index() + 1

			const status: Status = alive === 0
				? 'fail'
				: alive === this.crash_count() - 1 && placeholder
					? 'ok'
					: 'warn'

			const observed = alive === 0
				? `0 of ${ this.crash_count() } cards survived, the list disappeared`
				: placeholder
					? `${ alive } of ${ this.crash_count() } cards survived, card ${ number } showed an error placeholder`
					: `${ alive } of ${ this.crash_count() } cards survived, card ${ number } disappeared without a placeholder`

			this.report( status, observed, [ { name: 'Surviving cards', value: alive, unit: '' } ] )

		}

	// versus:end
	}

	export class $bog_smalljs_lab_probe extends $.$bog_smalljs_lab_probe {

		/** Subscription lives in a cell of this component, so it is released
		 *  together with the component. There is no teardown hook to forget. */
		@ $mol_mem
		subscription() {
			return this.$.$bog_smalljs_lab_store.shared().subscribe( ()=> this.label() )
		}

		override auto() {
			return [ this.subscription() ]
		}

	}

}
