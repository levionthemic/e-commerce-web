import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Login from './Login'
import Register from './Register'
import { PAGE_TYPE } from '~/utils/constants'

function Auth() {
  const location = useLocation()

  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const role = location?.state?.role

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    if (currentUser.role === PAGE_TYPE.BUYER)
      return <Navigate to='/buyer' replace={true} />
    return <Navigate to='/seller' replace={true} />
  }

  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
      {isLogin && <Login role={role} />}
      {isRegister && <Register />}
    </div>
  )
}

export default Auth
