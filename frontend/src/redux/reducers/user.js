import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
	LoadUserRequest: (state) => {
		state.loading = true;
	},
	LoadUserSuccess: (state, action) => {
		state.isAuthenticated = true;
		state.loading = false;
		state.user = action.payload;
	},
	LoadUserFail: (state, action) => {
		state.loading = false;
		state.error = action.payload;
		state.isAuthenticated = false;
	},

	//update user info
	UpdateUserInfoRequest: (state) => {
		state.loading = true;
	},
	UpdateUserInfoSuccess: (state, action) => {
		state.loading = false;
		state.user = action.payload;
	},
	UpdateUserInfoFail: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	},
});
