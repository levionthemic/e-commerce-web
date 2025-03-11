import { PAGE_TYPE } from '~/utils/constants'
import HeaderBuyer from './HeaderBuyer/HeaderBuyer'
import HeaderAdmin from '~/components/Header/HeaderAdmin/HeaderAdmin'
import SellerHeader from '~/components/Header/SellerHeader'

function Header({ type }) {
  return (
    <>
      {type === PAGE_TYPE.BUYER && <HeaderBuyer />}
      {type === PAGE_TYPE.ADMIN && <HeaderAdmin />}
      {type === PAGE_TYPE.SELLER && <SellerHeader />}
    </>

  )
}

export default Header