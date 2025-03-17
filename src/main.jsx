import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { injectStore } from './utils/authorizedAxios.js'

import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'

const persistor = persistStore(store)
injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
