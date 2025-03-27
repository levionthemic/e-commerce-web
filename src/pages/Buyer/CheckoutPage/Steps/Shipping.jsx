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
  FormMessage
} from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { useEffect, useId, useState } from 'react'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import ghtkLogo from '~/assets/ghtk-logo.png'
import ghnLogo from '~/assets/ghn-logo.png'
import { cloneDeep } from 'lodash'
import { SHIPPING_METHOD } from '~/utils/constants'


const formSchema = Joi.object({
  address: Joi.string().required().trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  shippingMethod: Joi.string().required().valid(...Object.values(SHIPPING_METHOD)).messages({
    'any.required': FIELD_REQUIRED_MESSAGE
  })
})

function Shipping({ setStep, listCheckoutProducts, checkoutInfo, setCheckoutInfo }) {
  const id = useId()
  const currentUser = useSelector(selectCurrentUser)
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      address: '0',
      shippingMethod: checkoutInfo?.shipping?.type
    }
  })

  const [shippingData, setShippingData] = useState([])

  useEffect(() => {
    fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
      method: 'POST',
      headers: { token: import.meta.env.VITE_GHN_TOKEN_API, 'Content-Type': 'application/json', shop_id: import.meta.env.VITE_GHN_SHOP_ID },
      body: JSON.stringify({
        service_type_id: 2,
        to_district_id: checkoutInfo?.address.district,
        to_ward_code: checkoutInfo?.address.ward,
        weight: 3000,
        insurance_value: 0,
        coupon: null,
        items: listCheckoutProducts.map(p => ({ name: p.name, quantity: p.quantity }))
      }
      )
    }).then(res => res.json()).then(data => {
      const result = [
        {
          type: 'ghtk',
          detail: {}
        }, {
          type: 'ghn',
          detail: data.data
        }
      ]
      setShippingData(result)
    })
  }, [checkoutInfo?.address.district, checkoutInfo?.address.ward, listCheckoutProducts])

  const handleUpdateShipping = (data) => {
    setCheckoutInfo({
      ...checkoutInfo,
      shipping: shippingData.find(s => s.type === data.shippingMethod)
    })
    setStep(3)
  }

  const handleBack = () => {
    const oldCheckoutInfo = cloneDeep(checkoutInfo)
    delete oldCheckoutInfo.shipping
    setCheckoutInfo(oldCheckoutInfo)
    setStep(1)
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
                        {/* {currentUser?.address?.map((address, index) =>
                          <SelectItem key={index} value={`${index}`}>
                            {`${address.detail}, ${address.ward}, ${address.district}, ${address.province}`}
                          </SelectItem>)
                        } */}
                        <SelectItem value="0">{checkoutInfo?.shortAddress}</SelectItem>
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
            <FormField
              control={form.control}
              name="shippingMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup className="gap-2" defaultValue={field.value} onValueChange={field.onChange}>
                      <FormItem className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <FormControl>
                          <RadioGroupItem
                            value={SHIPPING_METHOD.GHTK}
                            id={`${id}-1`}
                            aria-describedby={`${id}-1-description`}
                            className="order-1 after:absolute after:inset-0" />
                        </FormControl>

                        <div className="flex grow items-start gap-3">
                          <img src={ghtkLogo} alt='' width={30} height={30} />
                          <div className="grid grow gap-2">
                            <Label htmlFor={`${id}-1`}>
                          Giao hàng tiết kiệm{' '}
                              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            (Giao vào thứ 7)
                              </span>
                            </Label>
                            <p id={`${id}-1-description`} className="text-muted-foreground text-xs">
                          Chi phí: 0đ - Free
                            </p>
                          </div>
                        </div>
                      </FormItem>

                      <FormItem className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <FormControl>
                          <RadioGroupItem
                            value={SHIPPING_METHOD.GHN}
                            id={`${id}-2`}
                            aria-describedby={`${id}-2-description`}
                            className="order-1 after:absolute after:inset-0" />
                        </FormControl>
                        <div className="flex grow items-start gap-3">
                          <img src={ghnLogo} alt='' width={30} height={30} />
                          <div className="grid grow gap-2">
                            <Label htmlFor={`${id}-2`}>
                          Giao hàng nhanh{' '}
                              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            (Giao trong 2 giờ)
                              </span>
                            </Label>
                            <p id={`${id}-2-description`} className="text-muted-foreground text-xs">
                          Chi phí: {shippingData ? shippingData[1]?.detail?.total?.toLocaleString('vi-VN') : 0}đ
                            </p>
                          </div>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Chọn bất kì dịch vụ vận chuyển mà bạn muốn.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <Button className='border bg-white text-mainColor1-600  border-mainColor1-600 hover:bg-white text-md font-semibold rounded-lg hover:drop-shadow-xl' onClick={handleBack}>Quay lại</Button>
            <Button type='submit' className='bg-mainColor1-600 hover:bg-mainColor1-800 text-white text-md font-semibold rounded-lg hover:drop-shadow-xl'>Tiếp tục</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Shipping
