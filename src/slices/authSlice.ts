import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface AuthState {
  accessToken: string | null;
  currentUser: { id: string; name: string } | null; // Adjust the type based on your user object structure
  isUserLoggedIn: boolean;
}

// Define the initial state
const initialState: AuthState = {
  accessToken: null,
  currentUser: null,
  isUserLoggedIn: false,
};

// Define the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: AuthState['currentUser']; token: string }>
    ) => {
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.token;
      state.isUserLoggedIn = true;
    },

    logout: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.isUserLoggedIn = false;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
