import React from 'react'
import SiderSeller from '../Sider/SiderSeller'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

function SellerLayout() {
  return (
    <Box>
      <div className="row">
        <div className="col-2 position-relative">
          <SiderSeller />
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </Box>
  )
}

export default SellerLayout