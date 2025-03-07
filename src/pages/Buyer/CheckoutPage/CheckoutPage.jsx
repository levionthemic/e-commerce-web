import { useSearchParams } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import { useSelector } from 'react-redux'
import { selectCurrentCart } from '~/redux/cart/cartSlice'
import TimelineComponent from '~/pages/Buyer/CheckoutPage/TimelineComponent'
import { useEffect, useState } from 'react'
import Information from '~/pages/Buyer/CheckoutPage/Information'
import Shipping from '~/pages/Buyer/CheckoutPage/Shipping/Shipping'
import Confirmation from '~/pages/Buyer/CheckoutPage/Confirmation'
import Payment from './Payment/Payment'

function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [searchParams] = useSearchParams()

  const currentCart = useSelector(selectCurrentCart)

  const totalPrice = currentCart?.fullProducts.reduce(
    (sum, item, index) =>
      sum +
      currentCart.products[index].quantity * item.price,
    0
  )

  useEffect(() => {
    setStep(searchParams.get('step') || 1)
  }, [searchParams])

  const handleCheckout = () => {
    //
  }

  const timelineItems = [
    {
      id: 1,
      title: 'Thông tin',
      description: 'Điền thông tin đơn hàng'
    },
    {
      id: 2,
      title: 'Vận chuyển',
      description: 'Chọn hình thức vận chuyển'
    },
    {
      id: 3,
      title: 'Thanh toán',
      description: 'Chọn phương thức thanh toán'
    },
    {
      id: 4,
      title: 'Xác nhận',
      description: 'Xác nhận đơn hàng'
    }
  ]

  return (
    <div className='container mx-auto py-6'>
      <div className='font-semibold text-3xl text-mainColor1-600 mb-8'>Thanh toán</div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-9'>
          <TimelineComponent items={timelineItems} />

          {step == 1 && <Information />}
          {step == 2 && <Shipping />}
          {step == 3 && <Payment />}
          {step == 4 && <Confirmation />}
        </div>

        <div className='col-span-3'>
          <div className='sticky top-7 left-0 h-fit mb-4'>
            <div className="border border-b-[#ddd] rounded-md mb-4 p-4 shadow-md">
              <div className='text-md text-mainColor1-800 font-medium'>Danh sách sản phẩm</div>
            </div>

            <div className='border border-b-[#ddd] rounded-md p-4 shadow-md'>
              <div className='text-md text-mainColor1-800 font-medium'>Chi tiết</div>

              <div className='px-2'>
                <div className='flex items-center justify-between text-sm my-2'>
                  <span className='opacity-40'>Tổng tiền hàng</span>
                  <span className='font-bold text-red-600'>
                    {totalPrice.toLocaleString()}
                    <sup>đ</sup>
                  </span>
                </div>
                <div className='flex items-center justify-between text-sm my-2'>
                  <span className='opacity-40'>Phí vận chuyển</span>
                  <span className='font-bold text-red-600'>0đ</span>
                </div>
              </div>

              <div>
                <div className='font-medium text-mainColor1-800'>Tổng tiền thanh toán</div>
                <div className='text-red-600 text-right text-xl font-bold'>
                  {(totalPrice + 0).toLocaleString()}
                  <sup>đ</sup>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <Button
                className='w-full bg-mainColor1-600 hover:bg-mainColor1-800 transition-all hover:ease-in-out hover:duration-300 text-white text-md rounded-full'
                onClick={handleCheckout}
              >
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
