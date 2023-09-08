// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import customizationReducer from 'store/customizationReducer';

const authStore = configureStore({
  reducer: {

  customization: customizationReducer,
    auth: authReducer,
    // other reducers...
  },
});

export default authStore;
