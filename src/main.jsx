import ReactDOM from 'react-dom/client'
import './index.css'

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import { CssBaseline, GlobalStyles } from '@mui/material'

import App from './App'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'

import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Loader from './components/Loader/Loader.jsx'
import { injectStore } from './utils/authorizedAxios.js'

import { ConfirmProvider } from 'material-ui-confirm'

const persistor = persistStore(store)
injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'primary', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' },
            allowClose: false
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer position='bottom-left' theme='colored' />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
