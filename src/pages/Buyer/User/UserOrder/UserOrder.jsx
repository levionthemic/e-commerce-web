import OrderTable from '~/pages/Buyer/User/UserOrder/OrderTable'
import {
  CheckCheck,
  Loader,
  Package,
  TrendingDown,
  TrendingUp,
  Truck
} from 'lucide-react'
import UserHeader from '~/pages/Buyer/User/UserHeader'
import { useEffect, useState } from 'react'
import { fetchOrdersAPI } from '~/apis/buyerApis'
import { getAddressString } from '~/utils/helpers'
import { useLoading } from '~/contexts/LoadingContext'

function UserOrder() {
  const [orderData, setOrderData] = useState([])

  const { startLoading, endLoading } = useLoading()

  useEffect(() => {
    startLoading()
    fetchOrdersAPI()
      .then((data) => {
        Promise.all(
          data.map(async (d) => {
            startLoading()
            d.buyerAddress = await getAddressString(d.buyerAddress)
            endLoading()
            return d
          })
        ).then((res) => setOrderData(res))
      })
      .finally(() => endLoading())
  }, [])

  return (
    <div className='px-4'>
      <div className='flex items-center bg-white rounded-lg h-[100vh] overflow-auto relative'>
        <div className='px-2 h-full w-full'>
          {/* Header */}
          <UserHeader />

          {/* Content */}
          <div className='mb-6'>
            <div className='text-3xl text-mainColor1-800 font-semibold uppercase'>
              Đơn hàng
            </div>
            <p className='text-gray-500 text-sm'>
              Hãy xem những hoạt động mua hàng của bạn trong tuần vừa qua!
            </p>
          </div>

          <div className='grid grid-cols-4 gap-5 my-6'>
            <div className='py-2 bg-white rounded-lg border w-full'>
              <div className='text-md text-mainColor1-600 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                <span>Tổng số đơn hàng</span>
                <div className='bg-[#F7F7FE] p-2 rounded-full'>
                  <Package />
                </div>
              </div>
              <div className='flex items-end gap-10'>
                <span className='font-bold ml-4 my-1 text-2xl leading-none'>
                  2380
                </span>
                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <TrendingUp className='w-4 leading-none' />
                  <span>6.53%</span>
                </div>
              </div>
            </div>

            <div className='py-2 bg-white rounded-lg border w-full'>
              <div className='text-md text-mainColor2-800/90 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                <span>Đơn đang xử lý</span>
                <div className='bg-[#F9F6FE] p-2 rounded-full'>
                  <Loader />
                </div>
              </div>
              <div className='flex items-end gap-10'>
                <span className='font-bold ml-4 my-1 text-2xl leading-none'>
                  32
                </span>
                <div className='flex items-center gap-2 text-sm text-red-500'>
                  <TrendingDown className='w-4 leading-none' />
                  <span>6.53%</span>
                </div>
              </div>
            </div>

            <div className='py-2 bg-white rounded-lg border w-full'>
              <div className='text-md text-red-500 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                <span>Đơn đang vận chuyển</span>
                <div className='bg-[#FEF6F5] p-2 rounded-full'>
                  <Truck />
                </div>
              </div>
              <div className='flex items-end gap-10'>
                <span className='font-bold ml-4 my-1 text-2xl leading-none'>
                  127
                </span>
                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <TrendingUp className='w-4 leading-none' />
                  <span>6.53%</span>
                </div>
              </div>
            </div>

            <div className='py-2 bg-white rounded-lg border w-full'>
              <div className='text-md text-green-500 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                <span>Đơn đã giao</span>
                <div className='bg-[#F3FEF8] p-2 rounded-full'>
                  <CheckCheck />
                </div>
              </div>
              <div className='flex items-end gap-10'>
                <span className='font-bold ml-4 my-1 text-2xl leading-none'>
                  29
                </span>
                <div className='flex items-center gap-2 text-sm text-red-500'>
                  <TrendingDown className='w-4 leading-none' />
                  <span>6.53%</span>
                </div>
              </div>
            </div>
          </div>

          <OrderTable data={orderData} setData={setOrderData} />
        </div>
      </div>
    </div>
  )
}

export default UserOrder
