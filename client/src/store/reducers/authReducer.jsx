import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: {},
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginR: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.accessToken
    },
    logoutR: (state) => {
      state.isAuthenticated = false
      state.user = {}
      state.token = null
    }
  }
})

export const { loginR, logoutR } = authSlice.actions
export default authSlice.reducer
