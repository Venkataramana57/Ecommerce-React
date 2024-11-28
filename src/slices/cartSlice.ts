import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a cart item (you can customize this type based on your application's requirements)
type CartItem = string; // Example: `string` for simplicity, replace with a more complex type if needed

// Define the state type
interface CartState {
  items: CartItem[];
}

// Initial state with type
const initialState: CartState = {
  items: [],
};

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(item => item !== action.payload);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

// Export actions and reducer
export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
