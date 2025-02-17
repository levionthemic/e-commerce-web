import { useLocation } from 'react-router-dom'
import BuyerLayout from './BuyerLayout'
import SellerLayout from './SellerLayout'
import AdminLayout from './AdminLayout'

function Layout() {
  const location = useLocation()

  const isBuyer = location.pathname === '/buyer'
  const isSeller = location.pathname === '/seller'
  const isAdmin = location.pathname === '/admin'

  return (
    <>
      {isBuyer && <BuyerLayout />}
      {isSeller && <SellerLayout />}
      {isAdmin && <AdminLayout />}
    </>
  )
}

export default Layout
