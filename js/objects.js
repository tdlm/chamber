var game_state = {
	'current_scene': 'a1',
	'items'        : ['lighter']
};

var scenes = {
		'a1': {
			text      : 'You wake up shrouded in darkness.',
			body_class: 'dark a1'
		},
		'a2': {
			text      : 'Unfortunately, you haven\'t the slightest clue who you are. Add that to the list of mysteries.',
			body_class: 'dark a2'
		},
		'a3': {
			text      : 'You call out into the darkness but hear only echoes. Not the most comfortable feeling.',
			body_class: 'dark a3'
		},
		'a4': {
			text      : 'You search around in your pockets and find...',
			body_class: 'dark a4'
		},
		'a5': {
			text      : 'With your trembling hand, you try to ignite the lighter. It makes only sparks...',
			body_class: 'dark a5'
		},
		'a6': {
			text      : 'You continue making sparks, which don\'t do much good to light up your surroundings...',
			body_class: 'dark a6'
		},
		'a7': {
			text      : 'Finally, the flame springs into life. You are momentarily blinded but after a few moments, your eyes adjust to the dim room.',
			body_class: 'dim a7'
		}
	},

	tools = {
		'hammer' : {
			'label': 'Rock Hammer I',
			'power': 0.05
		},
		'hammer2': {
			'label': 'Rock Hammer II',
			'power': 0.1
		},
		'hammer3': {
			'label': 'Rock Hammer III',
			'power': 0.15
		},
		'pick'   : {
			'label': 'Steel Pick I',
			'power': 0.2
		},
		'pick2'  : {
			'label': 'Steel Pick II',
			'power': 0.25
		},
		'pick3'  : {
			'label': 'Steel Pick III',
			'power': 0.3
		}
	},

	monsters = {
		'mouse'       : {
			'label': 'Mouse',
			'hp'   : 20
		},
		'mutant_mouse': {
			'hp'   : 40,
			'label': 'Mutant Mouse'
		}
	};