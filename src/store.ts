import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
});

// Configuration for redux-persist
const persistConfig = {
  key: 'ecom', // The key for the root state in localStorage
  storage, // Use localStorage as the default storage mechanism
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: EnhancedStore = configureStore({
  reducer: persistedReducer
});

// Create the persistor for redux-persist
export const persistor: Persistor = persistStore(store);
export default store;