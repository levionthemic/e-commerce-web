import { PAGE_TYPE } from '~/utils/constants'
import HeaderBuyer from './HeaderBuyer/HeaderBuyer'
import HeaderAdmin from '~/components/Header/HeaderAdmin'
import SellerHeader from '~/components/Header/SellerHeader'

type PageType = (typeof PAGE_TYPE)[keyof typeof PAGE_TYPE]

interface HeaderProps {
  type: PageType
}

function Header({ type }: HeaderProps) {
  return (
    <>
      {type === PAGE_TYPE.BUYER && <HeaderBuyer />}
      {type === PAGE_TYPE.ADMIN && <HeaderAdmin />}
      {type === PAGE_TYPE.SELLER && <SellerHeader />}
    </>
  )
}

export default Header
