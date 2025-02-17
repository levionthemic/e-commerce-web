import { configureStore } from '@reduxjs/toolkit'

import { cartQuantityReducer } from './cartQuantity/cartQuantitySlice'
import updatePasswordReducer from './slices/UpdatePasswordModalSlice'
import updateEmailReducer from './slices/UpdateEmailModalSlice'
import { userReducer } from './user/userSlice'

export const store = configureStore({
  reducer: {
    cartQuantity: cartQuantityReducer,
    user: userReducer,

    updatePasswordModal: updatePasswordReducer,
    updateEmailModal: updateEmailReducer
  }
})
