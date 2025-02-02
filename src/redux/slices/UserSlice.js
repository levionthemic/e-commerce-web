import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.isLoading = false
      state.user = action.payload
    },
    loginFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
    },
    resetUser(state) {
      state.user = null
      state.error = null
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, resetUser, updateUser } = userSlice.actions

export default userSlice.reducer
