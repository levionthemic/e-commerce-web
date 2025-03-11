import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '~/components/ui/sidebar'
import Header from '~/components/Header/Header'
import { PAGE_TYPE } from '~/utils/constants'
import SellerSidebar from '~/components/Sidebar/SellerSidebar'

function SellerLayout() {
  return (
    <SidebarProvider>
      <SellerSidebar />
      <div className='flex-1 bg-[#F3F3F3]'>
        <Header type={PAGE_TYPE.SELLER} />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default SellerLayout