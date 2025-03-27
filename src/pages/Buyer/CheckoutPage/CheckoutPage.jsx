import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import TimelineComponent from '~/pages/Buyer/CheckoutPage/TimelineComponent'
import { useEffect, useState } from 'react'
import Information from '~/pages/Buyer/CheckoutPage/Steps/Information'
import Shipping from '~/pages/Buyer/CheckoutPage/Steps/Shipping'
import Confirmation from '~/pages/Buyer/CheckoutPage/Steps/Confirmation'
import Payment from './Steps/Payment/Payment'
import { Badge } from '~/components/ui/badge'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'
import clsx from 'clsx'
import { toast } from 'sonner'
import { addOrderAPI } from '~/apis'

function CheckoutPage() {
  const [step, setStep] = useState(1)

  const [checkoutInfo, setCheckoutInfo] = useState(JSON.parse(localStorage.getItem('checkoutInfo')))

  const navigate = useNavigate()
  const listCheckoutProducts = useLocation()?.state?.selectedRows

  const totalPrice = listCheckoutProducts?.reduce(
    (sum, item) =>
      sum +
      item.quantity * item.type.price,
    0
  )

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      localStorage.removeItem('checkoutInfo')
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (checkoutInfo) {
      localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo))
    }
  }, [checkoutInfo])

  const handleCheckout = () => {
    const checkoutData = {
      ...checkoutInfo,
      productVariants: listCheckoutProducts
    }

    console.log(checkoutData)

    toast.promise(addOrderAPI(checkoutData), {
      pending: 'Đang xử lý...'
    })

    // navigate('/buyer/checkout/complete', { state: { checkoutData: checkoutData } })
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

      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-9'>
          <TimelineComponent items={timelineItems} step={step} />

          {step == 1 && <Information setCheckoutInfo={setCheckoutInfo} setStep={setStep} checkoutInfo={checkoutInfo} />}
          {step == 2 && <Shipping setStep={setStep} listCheckoutProducts={listCheckoutProducts} checkoutInfo={checkoutInfo} setCheckoutInfo={setCheckoutInfo}/>}
          {step == 3 && <Payment setCheckoutInfo={setCheckoutInfo} setStep={setStep} checkoutInfo={checkoutInfo} />}
          {step == 4 && <Confirmation setStep={setStep} checkoutInfo={checkoutInfo} />}
        </div>

        <div className='col-span-3'>
          <div className='sticky top-7 left-0 h-fit mb-4'>
            <div className="border border-b-[#ddd] rounded-md mb-4 p-4 shadow-md">
              <div className='text-md text-mainColor1-800 font-medium'>Danh sách sản phẩm</div>
              {listCheckoutProducts?.map((product, index) => (
                <div key={index} className='flex items-center gap-2 my-6 overflow-hidden'>
                  <img src={product?.avatar} alt="" width={40} height={40} />
                  <div className='flex flex-col gap-1'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className='text-sm line-clamp-1 text-mainColor2-800 leading-none'>{product?.name}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{product?.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className='line-clamp-1 text-xs text-gray-400 mb-0.5'>Loại: {product.type.typeName}</p>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4'>
                      <Badge className='bg-mainColor2-800/90'>{product.quantity} sản phẩm</Badge>
                      <span className='text-[0.8rem] text-muted-foreground'>x {product?.type.price.toLocaleString('vi-VN')}<sup>đ</sup></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='border border-b-[#ddd] rounded-md p-4 shadow-md'>
              <div className='text-md text-mainColor1-800 font-medium'>Chi tiết</div>

              <div className='px-2'>
                <div className='flex items-center justify-between text-sm my-2'>
                  <span className='opacity-40'>Tổng tiền hàng</span>
                  <span className='font-bold text-red-600'>
                    {totalPrice?.toLocaleString('vi-VN')}
                    <sup>đ</sup>
                  </span>
                </div>
                <div className='flex items-center justify-between text-sm my-2'>
                  <span className='opacity-40'>Phí vận chuyển</span>
                  <span className='font-bold text-red-600'>{(checkoutInfo?.shipping?.detail?.total || 0)?.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div>
                <div className='font-medium text-mainColor1-800'>Tổng tiền thanh toán</div>
                <div className='text-red-600 text-right text-xl font-bold'>
                  {(totalPrice + (checkoutInfo?.shipping?.detail?.total || 0)).toLocaleString('vi-VN')}
                  <sup>đ</sup>
                </div>
              </div>
            </div>

            <div className={clsx({ 'mt-6': true, 'hidden': step < 4 })}>
              <Button
                className='w-full bg-mainColor1-600 hover:bg-mainColor1-800 transition-all hover:ease-in-out hover:duration-300 text-white text-xl py-6 rounded-xl'
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
