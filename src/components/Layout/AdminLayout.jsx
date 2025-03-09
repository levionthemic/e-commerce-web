import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '~/components/ui/sidebar'
import Header from '~/components/Header/Header'
import { PAGE_TYPE } from '~/utils/constants'
import AdminSidebar from '~/components/Sidebar/AdminSidebar/AdminSidebar'

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className='flex-1 bg-[#F3F3F3]'>
        <Header type={PAGE_TYPE.ADMIN} />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout