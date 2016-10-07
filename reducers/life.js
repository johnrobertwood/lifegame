const life = (state = {}, action) => {
	// console.log(state);
	switch (action.type) {
		case 'ADD_LIFE':
		  return {
		  	loc: action.loc,
		  	alive: true
		  }

	  case 'TOGGLE_LIFE':
	  	if (state.loc !== action.loc) {
	  		return state;
	  	}
	  	return Object.assign({}, state, {
	  		alive: !state.alive
	  	});

		case 'REMOVE_LIFE':
		  return {
		  	loc: action.loc,
		  	alive: false
		  }

	  default:
	    return state
	}
} 

const lives = (state = [], action) => {
	switch (action.type) {
		case 'ADD_LIFE':
		  return [
		    ...state,
		    life(undefined, action)
		  ]

		case 'TOGGLE_LIFE':
		  return state.map( l => life(l, action));

		case 'REMOVE_LIFE':
		  return state.filter((box) => {
		  	return box.loc !== action.loc
	  	})

  	default:
  	  return state
	}
}

export default lives