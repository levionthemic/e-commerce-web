import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

import HomePage from './pages/Buyer/HomePage/HomePage'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import ProductDetailPage from './pages/Buyer/ProductDetailPage/ProductDetailPage'
import BuyerLayout from './components/Layout/BuyerLayout'
import LandingPage from './pages/LandingPage/LandingPage'
import SearchPage from './pages/Buyer/SearchPage/SearchPage'

const PrivateRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={
        <LandingPage />
      } />

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/verify-account' element={<AccountVerification />} />

      <Route element={<PrivateRoute user={currentUser} />}>
        {/* Buyer pages */}
        <Route path='/buyer' element={<BuyerLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='product/:productId' element={<ProductDetailPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
