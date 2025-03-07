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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import ShippingMethodRadio from '~/pages/Buyer/CheckoutPage/Shipping/ShippingMethodRadio'

const formSchema = Joi.object({
  address: Joi.string().required().trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  })
})

function Shipping() {
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
            <div className="text-mainColor1-600 font-medium text-lg mb-2">Địa chỉ nhận hàng</div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn địa chỉ nhận hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* {currentUser?.addresses?.map((address, index) => <SelectItem key={index} value="apple">{address || '123 đường ABC, phường X, quận Y, TPHCM'}</SelectItem>)} */}
                        <SelectItem value="apple">123 đường ABC, phường X, quận Y, TPHCM</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Mặc định là địa chỉ nhà của bạn. Bạn có thể chọn địa chỉ khác theo ý muốn.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="text-mainColor1-600 font-medium text-lg mb-2">Dịch vụ vận chuyển</div>
            <ShippingMethodRadio />
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

export default Shipping
