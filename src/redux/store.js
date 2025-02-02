import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import productReducer from './slices/ProductSlice'
import cartReducer from './slices/cartSlice'
import updatePasswordReducer from './slices/UpdatePasswordModalSlice'
import updateEmailReducer from './slices/UpdateEmailModalSlice'
import loaderReducer from './slices/loaderSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    updatePasswordModal: updatePasswordReducer,
    updateEmailModal: updateEmailReducer,
    loader: loaderReducer
  }
})

export default store
