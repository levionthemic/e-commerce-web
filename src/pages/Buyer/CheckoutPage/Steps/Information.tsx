import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Autocomplete from '~/components/Autocomplete'
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
import { selectCurrentUser } from '~/redux/user/userSlice'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PHONE_NUMBER_RULE, PHONE_NUMBER_RULE_MESSAGE } from '~/utils/validators'

const formSchema = Joi.object({
  name: Joi.string().required().trim().strict().messages({
    'string.empty': FIELD_REQUIRED_MESSAGE
  }),
  email: Joi.string().required().pattern(EMAIL_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': EMAIL_RULE_MESSAGE
  }),
  phone: Joi.string().pattern(PHONE_NUMBER_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': PHONE_NUMBER_RULE_MESSAGE
  }),
  buyerAddress: Joi.object({
    province: Joi.number().required().messages({
      'any.required': FIELD_REQUIRED_MESSAGE
    }),
    district: Joi.number().required().messages({
      'any.required': FIELD_REQUIRED_MESSAGE
    }),
    ward: Joi.string().required().trim().strict().messages({
      'any.required': FIELD_REQUIRED_MESSAGE
    }),
    address: Joi.string().required().trim().strict().messages({
      'any.required': FIELD_REQUIRED_MESSAGE
    })

  })
})

function Information({ setCheckoutInfo, setStep, checkoutInfo }) {
  const currentUser = useSelector(selectCurrentUser)

  const [listProvinces, setListProvinces] = useState([])
  const [listDistricts, setListDistricts] = useState([])
  const [listWards, setListWards] = useState([])

  const [provinceId, setProvinceId] = useState(checkoutInfo?.buyerAddress.province || currentUser?.buyerAddress[0].province)
  const [districtId, setDistrictId] = useState(checkoutInfo?.buyerAddress.district || currentUser?.buyerAddress[0].district)
  const [wardId, setWardId] = useState(checkoutInfo?.buyerAddress.ward || currentUser?.buyerAddress[0].ward)

  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      buyerAddress: checkoutInfo?.buyerAddress || currentUser?.buyerAddress[0],
      email: checkoutInfo?.email || currentUser?.email,
      name: checkoutInfo?.name || currentUser?.name,
      phone: checkoutInfo?.phone || currentUser?.phone
    }
  })

  useEffect(() => {
    fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: { token: import.meta.env.VITE_GHN_TOKEN_API }
    })
      .then(res => res.json())
      .then(data => {
        setListProvinces(data.data)
      })
  }, [])

  useEffect(() => {
    setListWards([])
    if (provinceId) {
      fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
        method: 'POST',
        headers: { token: import.meta.env.VITE_GHN_TOKEN_API, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          province_id: provinceId
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.data?.length) setListDistricts(data.data)
        })
    }
  }, [provinceId])

  useEffect(() => {
    if (districtId) {
      fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id', {
        method: 'POST',
        headers: { token: import.meta.env.VITE_GHN_TOKEN_API, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          district_id: districtId
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.data?.length) setListWards(data.data)
        })
    }
  }, [districtId])

  useEffect(() => {
    form.setValue('buyerAddress', {
      province: provinceId,
      district: districtId,
      ward: wardId,
      address: form.watch('buyerAddress.address')
    })
  }, [provinceId, districtId, wardId, form, listProvinces, listDistricts, listWards])

  const getDetails = (data) => {
    if (data.type === 'province') setProvinceId(data.id)
    else if (data.type === 'district') setDistrictId(data.id)
    else setWardId(data.id)
  }

  const handleUpdateUser = (data) => {
    const buyerAddress = data.buyerAddress

    const wardName = listWards.find(i => i.WardCode === buyerAddress.ward).WardName
    const districtName = listDistricts.find(i => i.DistrictID === buyerAddress.district).DistrictName
    const provinceName = listProvinces.find(i => i.ProvinceID === buyerAddress.province).ProvinceName

    const shortAddress = `${buyerAddress.address}, ${wardName}, ${districtName}, ${provinceName}`

    setCheckoutInfo({ ...data, shortAddress: shortAddress })
    setStep(2)
  }

  return (
    <div className="my-6 border border-b-[#ddd] rounded-md p-4 w-[95%]">
      <div className="text-mainColor1-600 font-medium text-lg">Thông tin người nhận</div>
      <p className='text-sm text-muted-foreground mb-4'>Mặc định sẽ lấy thông tin cá nhân trong tài khoản của bạn. Bạn có thể thay đổi chúng nếu muốn.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-8">
          <div className='grid grid-cols-3 gap-14'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vd: Nguyễn Văn A"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['name'] && 'border-red-500'}`}
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vd: 0123456789"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['phone'] && 'border-red-500'}`}
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
            name=""
            render={() => (
              <FormItem>
                <FormLabel className='text-base'>Địa chỉ</FormLabel>
                <FormControl>
                  <div className="">
                    <div className="grid grid-cols-3 gap-10 mb-4">
                      <FormField
                        control={form.control}
                        name="buyerAddress.province"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Autocomplete
                                data={listProvinces?.map(i => ({ value: i.ProvinceID, label: i.ProvinceName, id: i.ProvinceID }))}
                                title={'Tỉnh/thành'}
                                getDetails={getDetails}
                                flag={'province'}
                                error={!!form.formState.errors['buyerAddress.province']}
                                defaultValue={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="buyerAddress.district"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Autocomplete
                                data={listDistricts?.map(i => ({ value: i.DistrictID, label: i.DistrictName, id: i.DistrictID }))}
                                title={'Quận/huyện'}
                                getDetails={getDetails}
                                flag={'district'}
                                error={!!form.formState.errors['buyerAddress.district']}
                                defaultValue={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="buyerAddress.ward"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Autocomplete
                                data={listWards?.map(i => ({ value: i.WardCode, label: i.WardName, id: i.WardCode }))}
                                title={'Phường/xã'}
                                getDetails={getDetails}
                                flag={'ward'}
                                error={!!form.formState.errors['buyerAddress.ward']}
                                defaultValue={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="buyerAddress.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Vd: 123 đường ABC, phường X, quận Y, TPHCM"
                              className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!form.formState.errors['buyerAddress.address'] && 'border-red-500'}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormDescription className=''>Địa chỉ nhận hàng của bạn.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-5'>
            <Button type='submit' className='bg-mainColor1-600 hover:bg-mainColor1-800 text-white text-md font-semibold rounded-lg hover:drop-shadow-xl'>Tiếp tục</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Information