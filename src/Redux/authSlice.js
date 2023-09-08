// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    AuthLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, AuthLogout } = authSlice.actions;
export default authSlice.reducer;
