import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

import Layout from './components/Layout/Layout'
import HomePage from './pages/Buyer/HomePage/HomePage'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

const PrivateRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to='/buyer' replace={true} />
      } />

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/verify-account' element={<AccountVerification />} />

      <Route element={<PrivateRoute user={currentUser} />}>
        {/* Buyer pages */}
        <Route path='buyer' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
