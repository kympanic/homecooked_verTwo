import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	favorites: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("favoriteItems"))
		: [],
};

export const favoritesReducer = createReducer(initialState, {
	addToFavorites: (state, action) => {
		const item = action.payload;
		const doesItemExist = state.favorites.find((i) => i._id === item._id);
		if (doesItemExist) {
			return {
				...state,
				favorites: state.favorites.map((i) =>
					i._id === doesItemExist._id ? item : i
				),
			};
		} else {
			return {
				...state,
				favorites: [...state.favorites, item],
			};
		}
	},
	removeFromFavorites: (state, action) => {
		return {
			...state,
			favorites: state.favorites.filter((i) => i._id !== action.payload),
		};
	},
});
