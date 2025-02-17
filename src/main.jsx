import ReactDOM from 'react-dom/client'

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import { CssBaseline } from '@mui/material'

import App from './App'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'

import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
        <ToastContainer position='bottom-left' theme='colored' />
      </CssVarsProvider>
    </BrowserRouter>
  </Provider>
)
