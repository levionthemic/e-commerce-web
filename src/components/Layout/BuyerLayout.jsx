import Box from '@mui/material/Box'
import HeaderBuyer from '../Header/HeaderBuyer/HeaderBuyer'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

function BuyerLayout() {
  return (
    <Box>
      <HeaderBuyer />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default BuyerLayout