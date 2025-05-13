import { Banknote, PackageOpen, RotateCcw, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import { getProductsAPI } from '~/apis/sellerApis'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '~/components/ui/breadcrumb'
import { useLoading } from '~/contexts/LoadingContext'
import { useTimeCount } from '~/hooks/use-time-count'
import ProductTable from '~/pages/Seller/Products/ProductTable'

function Products() {
  const { date, time } = useTimeCount()
  const { setDataLoading } = useLoading()

  const [products, setProducts] = useState([])
  useEffect(() => {
    setDataLoading(true)
    getProductsAPI()
      .then((data) => setProducts(data?.products))
      .finally(() => {
        setDataLoading(false)
      })
  }, [setDataLoading])

  return (
    <div className='px-6 py-4'>
      <div className='flex items-center justify-between mb-4 gap-8'>
        <div className='flex-1 flex items-center justify-between'>
          <div className=''>
            <div className='font-bold text-xl mb-2'>Quản lý sản phẩm</div>
            <Breadcrumb>
              <BreadcrumbList className='text-sm'>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to='/seller'>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to='/seller/products'>Sản phẩm</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Quản lý sản phẩm</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <span className='italic text-sm text-gray-500 text-right'>
          {time}
          <br />
          {date}
        </span>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Tổng Sản phẩm trong kho
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={1461}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>sản phẩm</span>
            </span>
          </div>
          <div className='bg-[#F0FAFF] text-blue-500 p-2 rounded-full'>
            <PackageOpen />
          </div>
        </div>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Sản phẩm trong đơn hàng
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={214}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>sản phẩm</span>
            </span>
          </div>
          <div className='bg-[#FFFAEF] text-yellow-500 p-2 rounded-full'>
            <Truck />
          </div>
        </div>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Sản phẩm đã bán
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={148}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>sản phẩm</span>
            </span>
          </div>
          <div className='bg-[#F1FCF6] text-green-600 p-2 rounded-full'>
            <Banknote />
          </div>
        </div>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Sản phẩm hoàn trả
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={50}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>sản phẩm</span>
            </span>
          </div>
          <div className='bg-[#E8E8E8] text-gray-500 p-2 rounded-full'>
            <RotateCcw />
          </div>
        </div>
      </div>

      <ProductTable data={products} setData={setProducts} />
    </div>
  )
}

export default Products
