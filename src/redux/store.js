import { configureStore } from '@reduxjs/toolkit'

import { cartQuantityReducer } from './cartQuantitySlice/cartQuantitySlice'
import updatePasswordReducer from './slices/UpdatePasswordModalSlice'
import updateEmailReducer from './slices/UpdateEmailModalSlice'

export const store = configureStore({
  reducer: {
    cartQuantity: cartQuantityReducer,
    updatePasswordModal: updatePasswordReducer,
    updateEmailModal: updateEmailReducer
  }
})
