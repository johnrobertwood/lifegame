const life = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_LIFE':
		  return {
		  	loc: action.loc,
		  	alive: true
		  }

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

		case 'REMOVE_LIFE':
		  return state.filter((box) => {
		  	return box.loc !== action.loc
	  	})

  	default:
  	  return state
	}
}

export default lives