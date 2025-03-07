import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
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
import { selectCurrentUser } from '~/redux/user/userSlice'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import PaymentMethodRadio from './PaymentMethodRadio'
import { Input } from '~/components/ui/input'

const formSchema = Joi.object({
  address: Joi.string().required().trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  })
})

function Payment() {
  const currentUser = useSelector(selectCurrentUser)
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      note: ''
    }
  })

  const handleUpdateShipping = (data) => {
    console.log((data))
  }
  return (
    <div className="my-6 border border-b-[#ddd] rounded-md p-4 w-[95%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateShipping)} className="space-y-8">
          <div>
            <div className="text-mainColor1-600 font-medium text-lg mb-2">Phương thức thanh toán</div>
            <PaymentMethodRadio />
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
            <Button type='submit' className='border bg-white text-mainColor1-600  border-mainColor1-600 hover:bg-white text-md font-semibold rounded-lg hover:drop-shadow-xl'>Quay lại</Button>
            <Button type='submit' className='bg-mainColor1-600 hover:bg-mainColor1-800 text-white text-md font-semibold rounded-lg hover:drop-shadow-xl'>Tiếp tục</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Payment
