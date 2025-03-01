import { configureStore } from '@reduxjs/toolkit'

import { cartReducer } from './cart/cartSlice'
import { userReducer } from './user/userSlice'

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root', // key của persist do chúng ta chỉ định, cứ để mặc định là root
  storage: storage, // Biến storage ở trên - lưu vào localStorage
  whiteList: ['user'] // định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần F5 trình duyệt
}

const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
