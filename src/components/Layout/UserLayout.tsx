import { SidebarProvider } from '~/components/ui/sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import UserSidebar from '~/pages/Buyer/User/UserSidebar'
import { useLoading } from '~/contexts/LoadingContext'
import React, { useEffect } from 'react'
import NProgress from '~/components/Nprogress/Progress'

function UserLayout() {
  const { setPageLoading, apiLoadingCount } = useLoading()

  const location = useLocation()

  useEffect(() => {
    setPageLoading(true)

    const timeout = setTimeout(() => {
      setPageLoading(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [location.pathname, setPageLoading])
  return (
    <>
      <NProgress isAnimating={apiLoadingCount > 0} key={location.key} />
      <SidebarProvider
        className='font-nunitoSans'
        style={{ '--sidebar-width': '14rem' } as React.CSSProperties}
      >
        <UserSidebar />
        <main className='flex-1 overflow-x-auto'>
          {/* <SidebarTrigger /> */}
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  )
}

export default UserLayout
