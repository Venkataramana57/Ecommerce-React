import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		accessToken: null,
		currentUser: null,
		isUserLoggedIn: false
	},
	reducers: {
		login: (state, action) => {
			state.currentUser = action.payload.user;
			state.accessToken = action.payload.token;
			state.isUserLoggedIn = true;
		},

		logout: (state, action) => {
			state.currentUser = null;
			state.accessToken = null;
			state.isUserLoggedIn = false;
		}
	}
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;