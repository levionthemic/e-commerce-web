import { Outlet, useLocation } from 'react-router-dom'
import { SidebarProvider } from '~/components/ui/sidebar'
import Header from '~/components/Header/Header'
import { PAGE_TYPE } from '~/utils/constants'
import SellerSidebar from '~/components/Sidebar/SellerSidebar'
import NProgress from '~/components/Nprogress/Progress'
import { useLoading } from '~/contexts/LoadingContext'
import { useEffect } from 'react'

function SellerLayout() {
  const { isPageLoading, setPageLoading, isDataLoading } = useLoading()
  const location = useLocation()

  useEffect(() => {
    setPageLoading(true)

    const timeout = setTimeout(() => {
      setPageLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [location.pathname, setPageLoading])
  return (
    <div className='font-quicksand'>
      <NProgress
        isAnimating={isDataLoading || isPageLoading}
        key={location.key}
      />
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
