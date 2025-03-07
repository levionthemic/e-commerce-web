import { SidebarProvider } from '~/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import UserSidebar from '~/pages/Buyer/User/UserSidebar'

function UserLayout() {
  return (
    <SidebarProvider>
      <UserSidebar />
      <main className='flex-1'>
        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default UserLayout