import { PAGE_TYPE } from '~/utils/constants'
import HeaderBuyer from './HeaderBuyer/HeaderBuyer'

function Header({ type }) {
  return (
    <>
      {type === PAGE_TYPE.BUYER && <HeaderBuyer />}
    </>

  )
}

export default Header