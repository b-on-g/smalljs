namespace $.$$ {

	function case_at( pathname: string ) {
		const view = new $bog_smalljs_versus_case()
		view.location_path = ()=> pathname
		view.case_id = ()=> 'race'
		return view
	}

	$mol_test({

		'runner uris on the mam dev server'() {
			const view = case_at( '/bog/smalljs/app/-/test.html' )
			$mol_assert_equal(
				view.frame_uri( 'react' ),
				'/bog/smalljs/assets/versus/react/runner.html?case=race',
			)
			// the $mol runner is a module of its own, not a copy under assets
			$mol_assert_equal(
				view.frame_uri( 'mol' ),
				'/bog/smalljs/versus/runner/-/index.html?case=race',
			)
		},

		'runner uris on the deploy, from any route depth'() {
			const vue = '/smalljs/bog/smalljs/assets/versus/vue/runner.html?case=race'
			$mol_assert_equal( case_at( '/smalljs/' ).frame_uri( 'vue' ), vue )
			$mol_assert_equal( case_at( '/smalljs/section=versus' ).frame_uri( 'vue' ), vue )
			// prerendered routes are served as /<route>/index.html
			$mol_assert_equal( case_at( '/smalljs/section=versus/' ).frame_uri( 'vue' ), vue )
			$mol_assert_equal(
				case_at( '/smalljs/section=versus' ).frame_uri( 'mol' ),
				'/smalljs/bog/smalljs/versus/runner/-/index.html?case=race',
			)
		},

		'a dev path is not mistaken for the deploy mount it contains'() {
			// '/bog/smalljs/app/-/' contains '/smalljs/' as a substring
			$mol_assert_equal( case_at( '/bog/smalljs/app/-/index.html' ).site_base(), '/' )
		},

		'runner uris when the app is served from the root'() {
			$mol_assert_equal(
				case_at( '/' ).frame_uri( 'mol' ),
				'/bog/smalljs/versus/runner/-/index.html?case=race',
			)
		},

		'every invalid reason gets its own line, and an unknown one still gets a line'() {
			const view = case_at( '/' )
			view.invalid_tab_hidden = ()=> 'hidden'
			view.invalid_timers_throttled = ()=> 'throttled'
			view.invalid_frame_offscreen = ()=> 'offscreen'
			view.invalid_other = ()=> 'general'

			$mol_assert_equal( view.invalid_text( 'tab-hidden' ), 'hidden' )
			$mol_assert_equal( view.invalid_text( 'timers-throttled' ), 'throttled' )
			$mol_assert_equal( view.invalid_text( 'frame-offscreen' ), 'offscreen' )
			// a reason added to the protocol later must not fall through to an error
			$mol_assert_equal( view.invalid_text( 'gpu-asleep' ), 'general' )
			$mol_assert_equal( view.invalid_text( undefined ), 'general' )
		},

	})

}
