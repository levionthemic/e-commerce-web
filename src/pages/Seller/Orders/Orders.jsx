import { Banknote, CircleX, NotepadText, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import { fetchOrdersAPI } from '~/apis/sellerApis'
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
import OrderTable from '~/pages/Seller/Orders/OrderTable'

function Orders() {
  const { date, time } = useTimeCount()
  const { setDataLoading } = useLoading()

  const [orders, setOrders] = useState([])

  useEffect(() => {
    setDataLoading(true)
    fetchOrdersAPI()
      .then((data) => setOrders(data))
      .finally(() => setDataLoading(false))
  }, [setDataLoading])

  return (
    <div className='px-6 py-4'>
      <div className='flex items-center justify-between mb-4 gap-8'>
        <div className='flex-1'>
          <div className='font-bold text-xl mb-2'>Quản lý đơn hàng</div>
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
                  <Link to='/seller/orders'>Đơn hàng</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Quản lý đơn hàng</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <span className='italic text-sm text-gray-500 text-right'>
          {time}
          <br />
          {date}
        </span>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Tổng Đơn hàng đã nhận
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={173}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>đơn hàng</span>
            </span>
          </div>
          <div className='bg-[#F0FAFF] text-blue-500 p-2 rounded-full'>
            <NotepadText />
          </div>
        </div>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Đơn hàng đang vận chuyển
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={14}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>đơn hàng</span>
            </span>
          </div>
          <div className='bg-[#FFFAEF] text-yellow-500 p-2 rounded-full'>
            <Truck />
          </div>
        </div>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Đơn hàng thành công
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={150}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>đơn hàng</span>
            </span>
          </div>
          <div className='bg-[#F1FCF6] text-green-600 p-2 rounded-full'>
            <Banknote />
          </div>
        </div>
        <div className='col-span-1 bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className=''>
            <span className='font-medium text-sm text-gray-500 mb-2 inline-block'>
              Đơn hàng đã hủy
            </span>
            <span className='text-2xl font-bold flex items-end gap-1'>
              <CountUp
                end={9}
                duration={1.5}
                separator='.'
                className='leading-none'
              />
              <span className='text-xs text-gray-600'>đơn hàng</span>
            </span>
          </div>
          <div className='bg-[#E8E8E8] text-gray-500 p-2 rounded-full'>
            <CircleX />
          </div>
        </div>
      </div>

      <OrderTable data={orders} setData={setOrders} />
    </div>
  )
}

export default Orders
