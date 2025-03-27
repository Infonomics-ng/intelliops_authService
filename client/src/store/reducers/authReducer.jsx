import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginR: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutR: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { loginR, logoutR } = authSlice.actions;
export default authSlice.reducer;
