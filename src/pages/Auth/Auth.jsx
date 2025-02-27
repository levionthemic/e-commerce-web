import { Navigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
// import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Login from './Login'
import Register from './Register'

function Auth() {
  const location = useLocation()

  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/buyer' replace={true} />
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',

      backgroundImage: 'url("src/assets/background-login.gif")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
    }}>
      {/* {isLogin && <LoginForm />} */}
      {isLogin && <Login />}
      {isRegister && <Register />}
    </Box>
  )
}

export default Auth