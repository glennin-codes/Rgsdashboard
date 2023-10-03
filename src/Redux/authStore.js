// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import customizationReducer from 'store/customizationReducer';
import roleSlice from './RoleSlyce';
import dateRangeReducer from "./dateRangeSlice";
import refreshReducer from './RefreshSlice';
const authStore = configureStore({
  reducer: {

  customization: customizationReducer,
    auth: authReducer,
    role:roleSlice,
    dateRange: dateRangeReducer,
    refresh:refreshReducer,

  },
});

export default authStore;
