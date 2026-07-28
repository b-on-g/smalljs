namespace $.$$ {

	const Lessons = $bog_smalljs_lessons

	export class $bog_smalljs_course extends $.$bog_smalljs_course {

		lesson( next?: string ) {
			return this.$.$mol_state_arg.value( 'lesson', next ) ?? Lessons.first()
		}

		current(): $bog_smalljs_lesson | null {
			return Lessons.lesson( this.lesson() )
		}

		/** Active UI language; reading it makes the course reactive to switches. */
		lang() {
			return this.$.$mol_locale.lang()
		}

		lesson_md() {
			return Lessons.lesson_md( this.lesson(), this.lang() ) ?? '# Not found'
		}

		ids() {
			return Lessons.ids()
		}

		// --- lesson list --------------------------------------------------

		lesson_links() {
			return this.ids().map( id => this.Lesson_link( id ) )
		}

		lesson_arg( id: string ) {
			return { section: 'course', page: null, lesson: id }
		}

		lesson_link_label( id: string ) {
			const num = this.ids().indexOf( id ) + 1
			const title = Lessons.lesson_title( id, this.lang() ) ?? id
			return `${ this.done( id ) ? '✓ ' : '' }${ num }. ${ title }`
		}

		// --- embedded editor (one per lesson, seeded + scoped) ------------

		editor_host() {
			return [ this.Editor( this.lesson() ) ]
		}

		editor_seed_tree( id: string ) {
			return Lessons.lesson( id )?.start_tree ?? ''
		}

		editor_seed_ts( id: string ) {
			return Lessons.lesson( id )?.start_ts ?? ''
		}

		editor_store_key( id: string ) {
			return `smalljs/course/${ id }`
		}

		// --- solution -----------------------------------------------------

		@ $mol_action
		toggle_solution() {
			this.solution_shown( !this.solution_shown() )
			return null
		}

		solution_label() {
			return this.solution_shown() ? 'Hide solution' : 'Show solution'
		}

		solution_md() {
			const lesson = this.current()
			if( !this.solution_shown() || !lesson ) return ''
			const parts = [ '## Solution', '', '```tree', lesson.solution_tree.trimEnd(), '```' ]
			if( lesson.solution_ts.trim() ) {
				parts.push( '', '```typescript', lesson.solution_ts.trimEnd(), '```' )
			}
			return parts.join( '\n' )
		}

		// --- auto-check + progress ----------------------------------------

		// Current source for a lesson (localStorage edit, or the starter).
		lesson_source( lesson: $bog_smalljs_lesson ) {
			const key = lesson.expect_in === 'ts' ? 'ts' : 'code'
			const stored = this.$.$mol_state_local.value( `smalljs/course/${ lesson.id }/${ key }` )
			const seed = lesson.expect_in === 'ts' ? lesson.start_ts : lesson.start_tree
			return ( stored ?? seed ) as string
		}

		passed( lesson: $bog_smalljs_lesson ) {
			return this.lesson_source( lesson ).includes( lesson.expect )
		}

		done( id: string ) {
			const lesson = Lessons.lesson( id )
			return lesson ? this.passed( lesson ) : false
		}

		status_text() {
			const lesson = this.current()
			if( !lesson ) return ''
			return this.passed( lesson )
				? '✓ Looks good — move on when you are ready.'
				: 'Edit the code on the right to complete this step.'
		}

		// --- prev / next --------------------------------------------------

		nav_index() {
			return this.ids().indexOf( this.lesson() )
		}

		prev_arg() {
			const index = this.nav_index()
			return { section: 'course', page: null, lesson: index > 0 ? this.ids()[ index - 1 ] : this.lesson() }
		}

		next_arg() {
			const index = this.nav_index()
			const ids = this.ids()
			return { section: 'course', page: null, lesson: index < ids.length - 1 ? ids[ index + 1 ] : this.lesson() }
		}

	}

}
