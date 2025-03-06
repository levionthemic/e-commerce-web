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
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PHONE_NUMBER_RULE, PHONE_NUMBER_RULE_MESSAGE } from '~/utils/validators'

const formSchema = Joi.object({
  fullName: Joi.string().required().trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  email: Joi.string().required().pattern(EMAIL_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': EMAIL_RULE_MESSAGE
  }),
  phoneNumber: Joi.string().pattern(PHONE_NUMBER_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': PHONE_NUMBER_RULE_MESSAGE
  }),
  address: Joi.string().required().trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  note: Joi.string().empty('')
})


function Information() {
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

  const handleUpdateUser = (data) => {
    console.log((data))
  }

  return (
    <div className="my-6 border border-b-[#ddd] rounded-md p-4 w-[85%]">
      <div className="text-mainColor1-600 font-medium text-lg mb-4">Thông tin người nhận</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-8">
          <div className='grid grid-cols-3 gap-14'>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vd: Nguyễn Văn A"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['fullName'] && 'border-red-500'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=''>
                  Họ và tên này sẽ được in trên đơn vận chuyển.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vd: example@levionthemic.com"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['email'] && 'border-red-500'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=''>
                    Email này sẽ được in trên đơn vận chuyển.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vd: 0123456789"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['phoneNumber'] && 'border-red-500'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=''>
                    Người vận chuyển sẽ liên hệ bạn qua số điện thoại này.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base'>Địa chỉ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vd: 123 đường ABC, phường X, quận Y, TPHCM"
                    className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['address'] && 'border-red-500'}`}
                    {...field}
                  />
                </FormControl>
                <FormDescription className=''>
                  Địa chỉ nhận hàng của bạn.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base'>Ghi chú</FormLabel>
                <FormControl>
                  <Textarea
                    className={'placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus-visible:ring-0 focus:border-[2px] border border-mainColor1-100/50'}
                    {...field}
                  />
                </FormControl>
                <FormDescription className=''>
                  Ghi chú thêm như thời gian vận chuyển, yêu cầu khác,...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full bg-mainColor1-600 hover:bg-mainColor1-800 text-white text-md font-semibold rounded-lg'>Xác nhận</Button>
        </form>
      </Form>
    </div>
  )
}

export default Information