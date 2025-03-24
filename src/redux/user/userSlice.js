import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (userData) => {
    let response = {}
    if (userData.access_token) {
      response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/auth/login/google/callback`, userData)
    } else {
      response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/auth/login`, userData)
    }
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showToastMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/auth/logout`)
    if (showToastMessage) {
      toast.success('Đăng xuất thành công!')
    }
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/buyer/profile/update`, data)
    return response.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    }),
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// export const { } = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
