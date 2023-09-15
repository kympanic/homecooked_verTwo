//add to favorites

export const addToFavorites = (data) => async (dispatch, getState) => {
	dispatch({
		type: "addToFavorites",
		payload: data,
	});

	localStorage.setItem(
		"favoriteItems",
		JSON.stringify(getState().favorites.favorites)
	);
	return data;
};

//remove from favorites

export const removeFromFavorites = (data) => async (dispatch, getState) => {
	dispatch({
		type: "removeFromFavorites",
		payload: data._id,
	});
	localStorage.setItem(
		"favoriteItems",
		JSON.stringify(getState().favorites.favorites)
	);
	return data;
};
