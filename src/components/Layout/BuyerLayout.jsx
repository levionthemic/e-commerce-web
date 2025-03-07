import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { PAGE_TYPE } from '~/utils/constants'

function BuyerLayout() {
  return (
    <div>
      <Header type={PAGE_TYPE.BUYER} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default BuyerLayout