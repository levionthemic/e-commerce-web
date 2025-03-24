import { SidebarProvider } from '~/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import UserSidebar from '~/pages/Buyer/User/UserSidebar'

function UserLayout() {
  return (
    <SidebarProvider className='font-nunitoSans' style={{ '--sidebar-width': '14rem' }}>
      <UserSidebar />
      <main className='flex-1 overflow-x-auto'>
        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default UserLayout