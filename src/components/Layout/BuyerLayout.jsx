import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { PAGE_TYPE } from '~/utils/constants'

function BuyerLayout() {
  return (
    <Box>
      <Header type={PAGE_TYPE.BUYER} />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default BuyerLayout