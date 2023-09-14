import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	cart: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
};

export const cartReducer = createReducer(initialState, {
	addToCart: (state, action) => {
		const item = action.payload;
		const doesItemExist = state.cart.find((i) => i._id === item._id);
		if (doesItemExist) {
			return {
				...state,
				cart: state.cart.map((i) =>
					i._id === doesItemExist._id ? item : i
				),
			};
		} else {
			return {
				...state,
				cart: [...state.cart, item],
			};
		}
	},
	removeFromCart: (state, action) => {
		return {
			...state,
			cart: state.cart.filter((i) => i._id !== action.payload),
		};
	},
});
