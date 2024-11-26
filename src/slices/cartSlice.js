import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: []
	},
	reducers: {
		add: (state, action) => {
			state.items.push(action.payload);
		},

		remove: (state, action) => {
			const items = state.items.filter(item => item !== action.payload);
			state.items = items;
		},

		clear: (state) => {
			state.items = [];
		}
	}
});

export const {add, remove, clear} = cartSlice.actions;
export default cartSlice.reducer;