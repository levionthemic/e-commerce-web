import { Navigate, useLocation } from 'react-router-dom'
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
    <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
      {isLogin && <Login />}
      {isRegister && <Register />}
    </div>
  )
}

export default Auth