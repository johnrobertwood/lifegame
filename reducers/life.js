const life = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_LIFE':
		  return {
		  	loc: action.loc,
		  	alive: true
		  }
		case 'TOGGLE_LIFE':
		  if (state.loc !== action.loc) {
		  	return state
		  }

		  return Object.assign({}, state, {
		  	alive: !state.alive
		  })

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
	  case 'TOGGLE_TODO':
	    return state.map(l =>
	    	todo(l, action)
    	)
  	default:
  	  return state
	}
}

export default lives