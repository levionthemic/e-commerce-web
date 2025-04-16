import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '~/components/ui/sidebar'
import Header from '~/components/Header/Header'
import { PAGE_TYPE } from '~/utils/constants'
import SellerSidebar from '~/components/Sidebar/SellerSidebar'

function SellerLayout() {
  return (
    <div className='font-roboto'>
      <SidebarProvider>
        <SellerSidebar />
        <div className='flex-1 bg-slate-100 w-[100vh-256px] overflow-x-hidden'>
          <Header type={PAGE_TYPE.SELLER} />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>

  )
}

export default SellerLayout