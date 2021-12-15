import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		userId: null,
		token: null,
	},
	reducers: {
		register: (state, action) => {
			state.userId = action.payload.userId;
			state.token = action.payload.token;
			state.isLoggedIn = true;
		},
		login: (state, action) => {
			state.isLoggedIn = true;
			state.userId = action.payload.userId;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.userId = null;
			state.token = null;
		},
	}
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;