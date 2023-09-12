import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isLoading: true,
	// allProducts: [],
	// error: null,
};

export const productReducer = createReducer(initialState, {
	//create product
	productCreateRequest: (state) => {
		state.isLoading = true;
	},
	productCreateSuccess: (state, action) => {
		state.isLoading = false;
		state.product = action.payload;
		state.success = true;
	},
	productCreateFail: (state, action) => {
		state.isLoading = false;
		state.error = action.payload;
		state.success = false;
	},
	//delete product
	deleteProductRequest: (state) => {
		state.isLoading = true;
	},
	deleteProductSuccess: (state, action) => {
		state.isLoading = false;
		state.message = action.payload;
	},
	deleteProductFail: (state, action) => {
		state.isLoading = false;
		state.error = action.payload;
	},

	//get all products of shop
	getAllProductsShopRequest: (state) => {
		state.isLoading = true;
	},
	getAllProductsShopSuccess: (state, action) => {
		state.isLoading = false;
		state.products = action.payload;
	},
	getAllProductsShopFail: (state, action) => {
		state.isLoading = false;
		state.error = action.payload;
	},
	// //get all products
	// getAllProductsRequest: (state) => {
	// 	state.isLoading = true;
	// },
	// getAllProductsSuccess: (state, action) => {
	// 	state.isLoading = false;
	// 	state.allProducts = action.payload;
	// },
	// getAllProductsFailed: (state, action) => {
	// 	state.isLoading = false;
	// 	state.error = action.payload;
	// },

	//clear errors
	clearErrors: (state) => {
		state.error = null;
	},
});
