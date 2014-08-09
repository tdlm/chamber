jQuery( document ).ready( function ( $ ) {

	/** Gameplay **/
	$( '#who_am_i' ).on( 'click', function () {
		game_state.current_scene = 'a2';
		update_canvas();
	} );

	$( '#am_i_alone' ).on( 'click', function () {
		game_state.current_scene = 'a3';
		update_canvas();
	} );

	$( '#its_dark_in_here' ).on( 'click', function () {
		game_state.current_scene = 'a4';
		update_canvas();
	} );

	$( '#lighter' ).on( 'click', function () {

		switch ( game_state.current_scene ) {
			case 'a4':
				game_state.current_scene = 'a5';
				break;
			case 'a5':
				game_state.current_scene = 'a6';
				break;
			case 'a6':
				game_state.current_scene = 'a7';
				earn_achievement( 'light' );
				break;
		}

		update_canvas();
	} );

	var earn_achievement = function ( achievement ) {
		game_state.achievements.push( achievements[achievement] );
		update_game_message( 'You earned an achievement!' );
		update_canvas();
	}

	/** Game Menu **/
	$( '#save_game' ).on( 'click', function () {
		save_game();
	} );

	$( '#reset_game' ).on( 'click', function () {
		var confirm_reset = confirm( 'Are you sure you want to reset the game? You will lose all your progress.' );

		if ( confirm_reset ) {
			reset_game();
		} else {
			update_game_message( 'Game reset canceled.' );
		}
	} );

	var update_game_message = function ( message ) {

		$( '#game_message' ).text('').animate( {opacity: 0}, function () {
			$( this ).text( message )
				.animate( {opacity: 1}, function () {
					$( this ).animate( {opacity: 0}, 3000 );
				} )
		}, 0 )
	};

	/** Primary Game Functionality **/
	var game_loop = function () {

	};

	var load_game = function () {
		if ( !localStorage['chamber_save'] ) {
			game_state = {
				'current_scene': 'a1',
				'items'        : ['lighter'],
				'achievements' : []
			};
		} else {
			game_state = JSON.parse( atob( localStorage['chamber_save'] ) );
		}

		update_canvas();
	};

	var save_game = function () {
		localStorage['chamber_save'] = btoa( JSON.stringify( game_state ) );
		update_game_message( 'Game saved.' );
	};

	var reset_game = function () {
		localStorage.removeItem( 'chamber_save' );
		load_game();
		update_canvas();
		update_game_message( 'Game reset.' );
	};

	var update_canvas = function () {
		var body = $( 'body' ),
			canvas = $( '#canvas' ),
			messages = $( '#messages' ),
			achievements_list = $( '#achievements ul' );

		achievements_list.find('li' ).remove();

		for (var i = game_state.achievements.length - 1; i >= 0; i--) {
			var list_item = jQuery('<li>' + game_state.achievements[i].label + '</li>');
			achievements_list.append(list_item);
		}

		if ( messages.html() ) {
			messages.fadeOut( 'slow', function () {
				body.removeClass();
				body.addClass( scenes[game_state.current_scene].body_class );

				messages.html( scenes[game_state.current_scene].text );
				messages.fadeIn( 'slow' );
			} );
		} else {
			body.removeClass();
			body.addClass( scenes[game_state.current_scene].body_class );

			messages.html( scenes[game_state.current_scene].text );
			messages.fadeIn( 'slow' );
		}

		save_game();
	};

	/** Game Loop and Animation **/
	var animate_frame = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		null;

	if ( animate_frame !== null ) {

		var recursive_animation = function () {
			game_loop();
			animate_frame( recursive_animation );
		};

		animate_frame( recursive_animation );
	} else {
		var ONE_FRAME_TIME = 1000.0 / 60.0;
		setInterval( game_loop, ONE_FRAME_TIME );
	}

	load_game();
} );