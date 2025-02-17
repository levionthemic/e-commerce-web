import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '~/services/ApiService'

export const fetchCurrentCartQuantityAPI = createAsyncThunk(
  'cartQuantity/fetchCurrentCartQuantityAPI',
  async () => {
    const response = await axiosApi.get('api/v1/cart/' + localStorage.getItem('cartId'))
    return response.data.data.length
  }
)
const cartQuantitySlice = createSlice({
  name: 'cart',
  initialState: {
    currentCartQuantity: 0
  },
  reducers: {
    setCartQuantity: (state, action) => {
      state.currentCartQuantity = action.payload
    },
    increaseCartQuantity: (state, action) => {
      state.currentCartQuantity = state.currentCartQuantity + action.payload
    },
    decreaseCartQuantity: (state, action) => {
      state.currentCartQuantity = state.currentCartQuantity - action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCartQuantityAPI.fulfilled, (state, action) => {
      const cartQuantity = action.payload
      state.currentCartQuantity = cartQuantity
    })

  }
})

export const { setCartQuantity, increaseCartQuantity, decreaseCartQuantity } = cartQuantitySlice.actions

export const selectCurrentCartQuantity = (state) => {
  return state.cartQuantity.currentCartQuantity
}

export const cartQuantityReducer = cartQuantitySlice.reducer
