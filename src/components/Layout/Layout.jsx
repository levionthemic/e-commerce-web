/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import Footer from '../Footer/Footer'
import SiderSeller from '../Sider/SiderSeller'
import SiderAdmin from '../Sider/SiderAdmin'
import HeaderAdmin from '../Header/HeaderAdmin'
import HeaderBuyer from '../Header/HeaderBuyer/HeaderBuyer'
import { Box } from '@mui/material'

function DefaultComponent({ children, isShowHeader, role }) {
  if (role === 'seller') {
    return (
      <>
        <div className="row">
          <div className="col-2 position-relative">
            <SiderSeller />
          </div>
          <div className="col-10">
            <main>{children}</main>
          </div>
        </div>
      </>
    )
  }
  if (role === 'admin') {
    return (
      <div className="row">
        <div className="col-2">
          <SiderAdmin />
        </div>
        <div className="col-10">
          <HeaderAdmin />
          <main>{children}</main>
        </div>
      </div>
    )
  }

  return (
    <Box>
      {isShowHeader ? <HeaderBuyer /> : <Fragment />}
      <main>{children}</main>
      <Footer />
    </Box>
  )
}

export default DefaultComponent
