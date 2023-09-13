import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: '',
  reducers: {
    setRole: (_state, action) => action.payload,
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;