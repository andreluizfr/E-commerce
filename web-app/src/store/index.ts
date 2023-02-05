import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import cartReducer from './features/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
