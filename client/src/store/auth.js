import { createSlice } from "@reduxjs/toolkit";
import { login as loginService } from "../services/usersService";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false
	},
	reducers: {
		register: (state, action) => {
			console.log(action.payload);
			state.isLoggedIn = true;
		},
		login: (state, action) => {
			console.log(action.payload);
			state.isLoggedIn = true;
		},
		logout: (state) => state.isLoggedIn = false,
	}
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;