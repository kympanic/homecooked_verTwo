import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isLoading: true,
	allProducts: [],
	error: null,
};

export const productReducer = createReducer(initialState, {
	//get all products
	getAllProductsRequest: (state) => {
		state.isLoading = true;
	},
	getAllProductsSuccess: (state, action) => {
		state.isLoading = false;
		state.allProducts = action.payload;
	},
	getAllProductsFailed: (state, action) => {
		state.isLoading = false;
		state.error = action.payload;
	},
	//clear errors
	clearErrors: (state) => {
		state.error = null;
	},
});
