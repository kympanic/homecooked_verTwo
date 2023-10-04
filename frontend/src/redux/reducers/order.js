import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isLoading: true,
};

export const orderReducer = createReducer(initialState, {
	//get all orders of user
	getAllOrdersUserRequest: (state) => {
		state.isLoading = true;
	},
	getAllOrdersUserSuccess: (state, action) => {
		state.isLoading = false;
		state.orders = action.payload;
	},
	getAllOrdersUserFail: (state, action) => {
		state.isLoading = false;
		state.error = action.payload;
	},

	//clear errors
	clearErrors: (state) => {
		state.error = null;
	},
});
