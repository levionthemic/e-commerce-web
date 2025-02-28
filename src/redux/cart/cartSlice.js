import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const fetchCurrentCartAPI = createAsyncThunk(
  'cart/fetchCurrentCartAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cart`)
    return response.data
  }
)
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentCart: null
  },
  reducers: {
    setCart: (state, action) => {
      state.currentCart = action.payload
    },
    clearCart: (state) => state.currentCart = null
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCartAPI.fulfilled, (state, action) => {
      state.currentCart = action.payload
    })

  }
})

export const { setCart, clearCart } = cartSlice.actions

export const selectCurrentCart = (state) => {
  return state.cart.currentCart
}

export const cartReducer = cartSlice.reducer
