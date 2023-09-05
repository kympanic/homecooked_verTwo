import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
};

export const shopReducer = createReducer(initialState, {
	LoadShopRequest: (state) => {
		state.isLoading = true;
	},
	LoadShopSuccess: (state, action) => {
		state.isSeller = true;
		state.isLoading = false;
		state.seller = action.payload;
	},
	LoadShopFail: (state, action) => {
		state.isLoading = false;
		state.error = action.payload;
		state.isSeller = false;
	},
	clearErrors: (state) => {
		state.error = null;
	},
});
