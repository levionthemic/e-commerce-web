import { useLocation } from 'react-router-dom'
import BuyerLayout from './BuyerLayout'
import SellerLayout from './SellerLayout'
import AdminLayout from './AdminLayout'
import { PAGE_TYPE } from '~/utils/constants'

function Layout() {
  const location = useLocation()

  const isBuyer = location.pathname === `/${PAGE_TYPE.BUYER}`
  const isSeller = location.pathname === `/${PAGE_TYPE.SELLER}`
  const isAdmin = location.pathname === `/${PAGE_TYPE.ADMIN}`

  return (
    <>
      {isBuyer && <BuyerLayout type={PAGE_TYPE.BUYER} />}
      {isSeller && <SellerLayout />}
      {isAdmin && <AdminLayout />}
    </>
  )
}

export default Layout
