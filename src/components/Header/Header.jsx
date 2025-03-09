import { PAGE_TYPE } from '~/utils/constants'
import HeaderBuyer from './HeaderBuyer/HeaderBuyer'
import HeaderAdmin from '~/components/Header/HeaderAdmin/HeaderAdmin'

function Header({ type }) {
  return (
    <>
      {type === PAGE_TYPE.BUYER && <HeaderBuyer />}
      {type === PAGE_TYPE.ADMIN && <HeaderAdmin />}
    </>

  )
}

export default Header