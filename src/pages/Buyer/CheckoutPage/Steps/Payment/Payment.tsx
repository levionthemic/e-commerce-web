import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import PaymentMethodRadio from './PaymentMethodRadio'
import { Input } from '~/components/ui/input'
import { cloneDeep } from 'lodash'
import { useState } from 'react'
import { Separator } from '~/components/ui/separator'
import RightSidebar from '~/pages/Buyer/CheckoutPage/RightSidebar'

const formSchema = Joi.object({
  creditName: Joi.string().empty('').trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  creditNumber: Joi.string().empty('').trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  creditExpireDay: Joi.string().empty('').trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  creditCvv: Joi.string().empty('').trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  })
})

function Payment({ setStep, checkoutInfo, setCheckoutInfo, clusterOrders }) {
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      creditName: '',
      creditNumber: '',
      creditExpireDay: '',
      creditCvv: ''
    }
  })

  const [payments, setPayments] = useState([...Array(clusterOrders.length)].map(() => ({ type: 'cod', detail: {} })))

  const handleChoosePaymentMethod = (paymentMethod, index) => {
    if (parseInt(paymentMethod) === 1) {
      setPayments(prevState => {
        prevState[index] = { type: 'cod', detail: {} }
        return prevState
      })
    } else if (parseInt(paymentMethod) === 2) {
      setPayments(prevState => {
        prevState[index] = { type: 'momo', detail: {} }
        return prevState
      })
    } else if (parseInt(paymentMethod) === 3) {
      setPayments(prevState => {
        prevState[index] = { type: 'vnpay', detail: {} }
        return prevState
      })
    } else if (parseInt(paymentMethod) === 4) {
      setPayments(prevState => {
        prevState[index] = { type: 'cc', detail: {} }
        return prevState
      })
    }
  }

  const handleBack = () => {
    const oldCheckoutInfo = cloneDeep(checkoutInfo)
    delete oldCheckoutInfo.payment
    setCheckoutInfo(oldCheckoutInfo)
    setStep(2)
  }

  const handleUpdatePayment = () => {
    setCheckoutInfo({
      ...checkoutInfo,
      payment: payments
    })
    setStep(4)
  }

  return (
    <div>
      <div className='text-red-400 font-semibold mt-4 mb-10'>Lưu ý: Đơn hàng của bạn có thể được TÁCH thành nhiều đơn hàng nhỏ theo chính sách của chúng tôi!</div>
      {clusterOrders?.map(((clusterOrder, index) => (
        <div key={index} className="grid grid-cols-12 gap-12">
          <div className="border-[2px] border-b-[#ddd] rounded-md p-4 col-span-9">
            <div className='font-semibold text-xl text-mainColor1-800'>Đơn hàng {index + 1}</div>
            <Separator className='mt-1 mb-4'/>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdatePayment)} className="space-y-8">
                <div>
                  <div className="text-mainColor1-600 font-medium text-lg mb-2">Phương thức thanh toán</div>
                  <PaymentMethodRadio
                    handleChoosePaymentMethod={handleChoosePaymentMethod }
                    index={index}
                    checkoutInfo={checkoutInfo}
                  />
                </div>

                <div>
                  <div className="text-mainColor1-600 font-medium text-lg mb-2">Chi tiết thanh toán</div>
                  <FormField
                    control={form.control}
                    name="creditName"
                    render={({ field }) => (
                      <FormItem className='mb-4'>
                        <FormLabel>Tên trên thẻ</FormLabel>
                        <FormControl>
                          <Input
                            className=''
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                        Điền đúng họ và tên trên thẻ tín dụng của bạn.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="creditNumber"
                    render={({ field }) => (
                      <FormItem className='mb-4'>
                        <FormLabel>Số thẻ</FormLabel>
                        <FormControl>
                          <Input
                            className=''
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                        Điền đúng số thẻ trên thẻ tín dụng của bạn.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name="creditExpireDay"
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel>Ngày hết hạn</FormLabel>
                          <FormControl>
                            <Input
                              className=''
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                          Điền đúng ngày hết hạn trên thẻ tín dụng của bạn.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="creditCvv"
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input
                              className=''
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Điền đúng CVV trên thẻ tín dụng của bạn.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                </div>
                <div className='grid grid-cols-2 gap-5'>
                  <Button className='border bg-white text-mainColor1-600  border-mainColor1-600 hover:bg-white text-md font-semibold rounded-lg hover:drop-shadow-xl' onClick={handleBack}>Quay lại</Button>
                  <Button type='submit' className='bg-mainColor1-600 hover:bg-mainColor1-800 text-white text-md font-semibold rounded-lg hover:drop-shadow-xl'>Tiếp tục</Button>
                </div>
              </form>
            </Form>
          </div>
          <div className='col-span-3'>
            <RightSidebar clusterOrder={clusterOrder} checkoutInfo={checkoutInfo} index={index} />
          </div>
        </div>
      )))}
    </div>
  )
}

export default Payment
