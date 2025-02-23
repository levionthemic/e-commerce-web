import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function BuyerLayout({ type }) {
  return (
    <Box>
      <Header type={type} />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default BuyerLayout