import { useLocation } from 'react-router-dom'
import TimelineComponent from '~/pages/Buyer/CheckoutPage/TimelineComponent'
import { useEffect, useState } from 'react'
import Information from '~/pages/Buyer/CheckoutPage/Steps/Information'
import Shipping from '~/pages/Buyer/CheckoutPage/Steps/Shipping'
import Confirmation from '~/pages/Buyer/CheckoutPage/Steps/Confirmation'
import Payment from './Steps/Payment/Payment'
import { toast } from 'sonner'
import { addOrderAPI, clusterOrderAPI } from '~/apis'

function CheckoutPage() {
  const [step, setStep] = useState(1)

  const [checkoutInfo, setCheckoutInfo] = useState(JSON.parse(localStorage.getItem('checkoutInfo')))
  const [clusterOrders, setClusterOrders] = useState([])

  const listCheckoutProducts = useLocation()?.state?.selectedRows

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

  useEffect(() => {
    const data = {
      itemList: listCheckoutProducts.map(prod => ({
        productId: prod?._id,
        typeId: prod.type.typeId,
        quantity: prod.quantity
      }))
    }
    clusterOrderAPI(data).then(data => setClusterOrders(data))
  }, [listCheckoutProducts])

  useEffect(() => { window.scrollTo(0, 0) }, [step])

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


      <div className=''>
        <TimelineComponent items={timelineItems} step={step} />

        {step == 1 &&
          <Information
            setCheckoutInfo={setCheckoutInfo}
            setStep={setStep}
            checkoutInfo={checkoutInfo}
          />
        }
        {step == 2 &&
          <Shipping
            setStep={setStep}
            clusterOrders={clusterOrders}
            checkoutInfo={checkoutInfo}
            setCheckoutInfo={setCheckoutInfo}
          />
        }
        {step == 3 &&
          <Payment
            clusterOrders={clusterOrders}
            setCheckoutInfo={setCheckoutInfo}
            setStep={setStep}
            checkoutInfo={checkoutInfo}
          />
        }
        {step == 4 &&
          <Confirmation
            clusterOrders={clusterOrders}
            setStep={setStep}
            checkoutInfo={checkoutInfo}
            handleCheckout={handleCheckout}
          />
        }
      </div>


    </div>
  )
}

export default CheckoutPage
