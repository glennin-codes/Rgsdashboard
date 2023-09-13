// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import customizationReducer from 'store/customizationReducer';
import roleSlice from './RoleSlyce'
const authStore = configureStore({
  reducer: {

  customization: customizationReducer,
    auth: authReducer,
    role:roleSlice
    // other reducers...
  },
});

export default authStore;
