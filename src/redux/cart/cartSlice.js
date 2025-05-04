import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizedAxios'

export const fetchCurrentCartAPI = createAsyncThunk(
  'cart/fetchCurrentCartAPI',
  async () => {
    const response = await authorizedAxiosInstance.get('/cart')
    return response.data
  }
)

export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post('/cart/add`', data)
    return response.data
  }
)

export const updateCartQuantityAPI = createAsyncThunk(
  'cart/updateCartQuantityAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put('/cart/update', data)
    return response.data
  }
)

export const deleteItemAPI = createAsyncThunk(
  'cart/deleteItemAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put('/cart/delete', data)
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
    clearCart: (state) => {
      state.currentCart = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCartAPI.fulfilled, (state, action) => {
      state.currentCart = action.payload
    })
    builder.addCase(addToCartAPI.fulfilled, (state, action) => {
      state.currentCart = action.payload
    })
    builder.addCase(updateCartQuantityAPI.fulfilled, () => {})
    builder.addCase(deleteItemAPI.fulfilled, () => {})
  }
})

export const { setCart, clearCart } = cartSlice.actions

export const selectCurrentCart = (state) => {
  return state.cart.currentCart
}

export const cartReducer = cartSlice.reducer
