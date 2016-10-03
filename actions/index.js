export const addLife = (loc) => {
	return {
		type: 'ADD_LIFE',
		loc
	}
}

export const removeLife = (loc) => {
	return {
		type: 'REMOVE_LIFE',
		loc
	}
}