import SiderAdmin from '../Sider/SiderAdmin'
import HeaderAdmin from '../Header/HeaderAdmin'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="row">
      <div className="col-2">
        <SiderAdmin />
      </div>
      <div className="col-10">
        <HeaderAdmin />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout