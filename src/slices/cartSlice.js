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
			console.log("HELLLLOI");
			const items = state.items.filter(item => item !== action.payload);
			console.log("HELLLLOI", items);
			state.items = items;
		}
	}
});

export const {add, remove} = cartSlice.actions;
export default cartSlice.reducer;