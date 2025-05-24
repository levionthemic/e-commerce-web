import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { PAGE_TYPE } from '~/utils/constants'
import { useLoading } from '~/contexts/LoadingContext'
import { useEffect } from 'react'
import NProgress from '~/components/Nprogress/Progress'

function BuyerLayout() {
  const { isPageLoading, setPageLoading, apiLoadingCount } = useLoading()

  const location = useLocation()

  useEffect(() => {
    setPageLoading(true)

    const timeout = setTimeout(() => {
      setPageLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [location.pathname, setPageLoading])

  return (
    <div className='font-nunitoSans relative max-h-full'>
      <NProgress
        isAnimating={apiLoadingCount > 0 || isPageLoading}
        key={location.key}
      />
      <Header type={PAGE_TYPE.BUYER} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default BuyerLayout
