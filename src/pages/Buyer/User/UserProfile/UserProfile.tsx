import { useDispatch, useSelector } from 'react-redux'

import {
  logoutUserAPI,
  selectCurrentUser,
  updateUserAPI
} from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import productImg from '~/assets/logo.png'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import UploadAvatar from '~/components/UploadAvatar'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PHONE_NUMBER_RULE,
  PHONE_NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { IoIosLogOut, IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import UserHeader from '~/pages/Buyer/User/UserHeader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { toast } from 'sonner'
import Rating from 'react-rating'
import { useEffect, useId, useState } from 'react'
import { Switch } from '~/components/ui/switch'
import { ACCOUNT_STATUS, GENDER } from '~/utils/constants'
import { Pencil, TrendingUp } from 'lucide-react'
import { Separator } from '~/components/ui/separator'
import Autocomplete from '~/components/Autocomplete'
import OTP from '~/components/OTP'
import { clearCart } from '~/redux/cart/cartSlice'
import { useLoading } from '~/contexts/LoadingContext'
import { AppDispatch } from '~/redux/store'

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = async () => {
    dispatch(clearCart())
    toast.promise(dispatch(logoutUserAPI()), {
      loading: 'Đang đăng xuất...'
    })
  }

  const currentUser = useSelector(selectCurrentUser)

  const joiSchema = Joi.object({
    email: Joi.string().pattern(EMAIL_RULE).messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': EMAIL_RULE_MESSAGE
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
    }),
    phone: Joi.string()
      .pattern(PHONE_NUMBER_RULE)
      .message(PHONE_NUMBER_RULE_MESSAGE)
      .messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      }),
    username: Joi.string(),
    name: Joi.string().messages({
      'string.empty': FIELD_REQUIRED_MESSAGE
    }),
    gender: Joi.string()
      .valid(...Object.values(GENDER))
      .messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      })
  })

  const leftForm = useForm({
    resolver: joiResolver(joiSchema),
    defaultValues: {
      buyerAddress: currentUser?.buyerAddress?.[0] || {},
      phone: currentUser?.phone || '',
      name: currentUser?.name || '',
      gender: currentUser?.gender || GENDER.MALE
    }
  })

  const rightForm = useForm({
    resolver: joiResolver(joiSchema),
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email
    }
  })

  const [listProvinces, setListProvinces] = useState([])
  const [listDistricts, setListDistricts] = useState([])
  const [listWards, setListWards] = useState([])

  const [provinceId, setProvinceId] = useState(
    currentUser?.buyerAddress?.[0].province || null
  )
  const [districtId, setDistrictId] = useState(
    currentUser?.buyerAddress?.[0].district || null
  )
  const [wardId, setWardId] = useState(
    currentUser?.buyerAddress?.[0].ward || null
  )

  const { startLoading, endLoading } = useLoading()

  useEffect(() => {
    startLoading()
    fetch(
      'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
      {
        headers: { token: import.meta.env.VITE_GHN_TOKEN_API }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setListProvinces(data.data)
      })
      .finally(() => endLoading())
  }, [])

  useEffect(() => {
    startLoading()
    setListWards([])
    if (provinceId) {
      fetch(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
        {
          method: 'POST',
          headers: {
            token: import.meta.env.VITE_GHN_TOKEN_API,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            province_id: provinceId
          })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data?.length) setListDistricts(data.data)
        })
        .finally(() => endLoading())
    }
  }, [provinceId])

  useEffect(() => {
    startLoading()
    if (districtId) {
      fetch(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
        {
          method: 'POST',
          headers: {
            token: import.meta.env.VITE_GHN_TOKEN_API,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            district_id: districtId
          })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data?.length) setListWards(data.data)
        })
        .finally(() => endLoading())
    }
  }, [districtId])

  useEffect(() => {
    leftForm.setValue('buyerAddress', {
      province: provinceId,
      district: districtId,
      ward: wardId,
      address: leftForm.watch('buyerAddress.address')
    })
  }, [
    provinceId,
    districtId,
    wardId,
    leftForm,
    listProvinces,
    listDistricts,
    listWards
  ])

  const getDetails = (data) => {
    if (data.type === 'province') setProvinceId(data.id)
    else if (data.type === 'district') setDistrictId(data.id)
    else setWardId(data.id)
  }

  const [disableEmail, setDisableEmail] = useState(true)
  const [showPasswordInput, setShowPasswordInput] = useState(true)
  const handleChangeEmail = () => {
    //
  }

  const handleLeftFormSubmit = (data) => {
    const updateData = {
      ...data,
      buyerAddress: [data.buyerAddress],
      status: currentUser?.status,
      role: currentUser?.role
    }
    toast.promise(dispatch(updateUserAPI(updateData)), {
      loading: 'Đang cập nhật...',
      success: (res) => {
        if (!res.error) return 'Cập nhật thành công!'
        throw res
      }
    })
  }

  const id = useId()
  const [checked, setChecked] = useState(
    currentUser?.status === ACCOUNT_STATUS.ACTIVE
  )

  return (
    <div className='px-4'>
      <div className='flex items-center bg-white rounded-lg h-[100vh] overflow-auto relative'>
        <div className='px-2 h-full w-[75%]'>
          {/* Header */}
          <UserHeader />

          {/* Content */}
          <div>
            <div className='text-3xl font-semibold uppercase text-mainColor1-800'>
              Hồ sơ
            </div>
            <p className='text-sm text-gray-500'>
              Chào mừng bạn trở về nhà! Đây là nơi bạn có thể kiểm tra các hoạt
              động đã làm của mình.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-8'>
            <div className='my-4'>
              <div className='text-lg font-medium text-mainColor2-800'>
                Thông tin cá nhân
              </div>
              <Form {...leftForm}>
                <form
                  action='#'
                  onSubmit={leftForm.handleSubmit(handleLeftFormSubmit)}
                >
                  <FormField
                    control={leftForm.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='mt-2 mb-4'>
                        <FormLabel className='text-base'>Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!leftForm.formState.errors['name'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Mặc định chúng tôi sẽ lấy họ và tên này in trên đơn
                          hàng.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='grid grid-cols-2 gap-4 my-4'>
                    <FormField
                      control={leftForm.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem className='my-3'>
                          <FormLabel className='text-base'>Giới tính</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='flex items-center gap-10 md:flex-col md:gap-4 md:items-start'
                            >
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='male' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Nam
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='female' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Nữ
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='other' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Khác
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={leftForm.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem className='my-2'>
                          <FormLabel className='text-base'>
                            Số điện thoại
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='VD: 0123456789'
                              className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-5 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!leftForm.formState.errors['phone'] && 'border-red-500'}`}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Số điện thoại này được dùng để liên lạc với người
                            vận chuyển.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={leftForm.control}
                    name=''
                    render={() => (
                      <FormItem className='mb-10'>
                        <FormLabel className='text-base'>Địa chỉ</FormLabel>
                        <FormControl>
                          <div className=''>
                            <div className='grid grid-cols-3 gap-4 mb-4'>
                              <FormField
                                control={leftForm.control}
                                name='buyerAddress.province'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Autocomplete
                                        data={listProvinces?.map((i) => ({
                                          value: i.ProvinceID,
                                          label: i.ProvinceName,
                                          id: i.ProvinceID
                                        }))}
                                        title={'Tỉnh/thành'}
                                        getDetails={getDetails}
                                        flag={'province'}
                                        error={
                                          !!leftForm.formState.errors[
                                            'buyerAddress.province'
                                          ]
                                        }
                                        defaultValue={field.value}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={leftForm.control}
                                name='buyerAddress.district'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Autocomplete
                                        data={listDistricts?.map((i) => ({
                                          value: i.DistrictID,
                                          label: i.DistrictName,
                                          id: i.DistrictID
                                        }))}
                                        title={'Quận/huyện'}
                                        getDetails={getDetails}
                                        flag={'district'}
                                        error={
                                          !!leftForm.formState.errors[
                                            'buyerAddress.district'
                                          ]
                                        }
                                        defaultValue={field.value}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={leftForm.control}
                                name='buyerAddress.ward'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Autocomplete
                                        data={listWards?.map((i) => ({
                                          value: i.WardCode,
                                          label: i.WardName,
                                          id: i.WardCode
                                        }))}
                                        title={'Phường/xã'}
                                        getDetails={getDetails}
                                        flag={'ward'}
                                        error={
                                          !!leftForm.formState.errors[
                                            'buyerAddress.ward'
                                          ]
                                        }
                                        defaultValue={field.value}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={leftForm.control}
                              name='buyerAddress.address'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='Vd: 123 đường ABC, phường X, quận Y, TPHCM'
                                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 ${!!leftForm.formState.errors['buyerAddress.address'] && 'border-red-500'}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className=''>
                          Địa chỉ nơi bạn cư trú.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex justify-center'>
                    <Button
                      type='submit'
                      className='w-[70%] rounded-full bg-mainColor2-800 text-white tex-lg uppercase'
                    >
                      Cập nhật
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className='my-4'>
              <div className='text-lg font-medium text-mainColor2-800'>
                Thông tin tài khoản
              </div>
              <Form {...rightForm}>
                <form action='#' onSubmit={rightForm.handleSubmit()}>
                  <FormField
                    control={rightForm.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem className='mt-2 mb-4'>
                        <FormLabel className='text-base'>
                          Tên tài khoản
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!rightForm.formState.errors['username'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tên tài khoản của bạn.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={rightForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='my-4'>
                        <FormLabel className='text-base'>Email</FormLabel>
                        <FormControl>
                          <div className='flex items-center gap-4'>
                            <Input
                              disabled={disableEmail}
                              className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!leftForm.formState.errors['email'] && 'border-red-500'}`}
                              {...field}
                            />
                            <OTP
                              trigger={
                                <Button
                                  variant='outline'
                                  type='button'
                                  onClick={handleChangeEmail}
                                >
                                  <Pencil />
                                  Thay đổi
                                </Button>
                              }
                              setState={setDisableEmail}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Mỗi tài khoản chỉ có duy nhất 1 email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={rightForm.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='my-4'>
                        <FormLabel className='text-base'>Mật khẩu</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              type='password'
                              className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!rightForm.formState.errors['password'] && 'border-red-500'} ${showPasswordInput && 'hidden'}`}
                              {...field}
                            />
                            <OTP
                              trigger={
                                <Button
                                  variant='outline'
                                  type='button'
                                  className={`${!showPasswordInput && 'hidden'}`}
                                >
                                  <Pencil />
                                  Thay đổi mật khẩu
                                </Button>
                              }
                              setState={setShowPasswordInput}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex items-center gap-4 my-4'>
                    <FormLabel className='text-base'>
                      Trạng thái tài khoản
                    </FormLabel>
                    <div className='relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium'>
                      <Switch
                        id={id}
                        checked={checked}
                        onCheckedChange={setChecked}
                        className='peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-lg [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full'
                      />
                      <span className='min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full'>
                        <span className='text-[10px] font-medium uppercase'>
                          Tạm khóa
                        </span>
                      </span>
                      <span className='min-w-78flex peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full'>
                        <span className='text-[10px] font-medium uppercase'>
                          Bình thường
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className='flex justify-center mt-6'>
                    <Button
                      type='submit'
                      className='w-[70%] rounded-full bg-mainColor2-800 text-white tex-lg uppercase'
                    >
                      Cập nhật
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-8'>
            <div className=''>
              <div className='text-lg font-medium text-mainColor2-800 mb-1/2'>
                Sản phẩm đã xem gần đây
              </div>
              <p className='mb-3 text-sm text-muted-foreground'>
                Hãy xem tuần vừa rồi bạn đã xem các sản phẩm nào!
              </p>
              <ul>
                <li className='flex items-center gap-4 mb-4'>
                  <div className='flex items-center flex-1 gap-3'>
                    <img
                      src={productImg}
                      alt=''
                      className='w-10 h-10 rounded-lg'
                    />
                    <div className='flex flex-col'>
                      <span className='font-medium line-clamp-1'>
                        Tên sản phẩm
                      </span>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span>{4.5}</span>
                        <Rating
                          emptySymbol={<IoMdStarOutline />}
                          fullSymbol={<IoMdStar />}
                          initialRating={4.5}
                          readonly
                          className='text-[#FBCA04] text-lg leading-none'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                    Xem chi tiết
                  </div>
                </li>
                <li className='flex items-center gap-4 mb-4'>
                  <div className='flex items-center flex-1 gap-3'>
                    <img
                      src={productImg}
                      alt=''
                      className='w-10 h-10 rounded-lg'
                    />
                    <div className='flex flex-col'>
                      <span className='font-medium line-clamp-1'>
                        Tên sản phẩm
                      </span>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span>{4.5}</span>
                        <Rating
                          emptySymbol={<IoMdStarOutline />}
                          fullSymbol={<IoMdStar />}
                          initialRating={4.5}
                          readonly
                          className='text-[#FBCA04] text-lg leading-none'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                    Xem chi tiết
                  </div>
                </li>
                <li className='flex items-center gap-4 mb-4'>
                  <div className='flex items-center flex-1 gap-3'>
                    <img
                      src={productImg}
                      alt=''
                      className='w-10 h-10 rounded-lg'
                    />
                    <div className='flex flex-col'>
                      <span className='font-medium line-clamp-1'>
                        Tên sản phẩm
                      </span>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span>{4.5}</span>
                        <Rating
                          emptySymbol={<IoMdStarOutline />}
                          fullSymbol={<IoMdStar />}
                          initialRating={4.5}
                          readonly
                          className='text-[#FBCA04] text-lg leading-none'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                    Xem chi tiết
                  </div>
                </li>
                <li className='flex items-center gap-4 mb-4'>
                  <div className='flex items-center flex-1 gap-3'>
                    <img
                      src={productImg}
                      alt=''
                      className='w-10 h-10 rounded-lg'
                    />
                    <div className='flex flex-col'>
                      <span className='font-medium line-clamp-1'>
                        Tên sản phẩm
                      </span>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span>{4.5}</span>
                        <Rating
                          emptySymbol={<IoMdStarOutline />}
                          fullSymbol={<IoMdStar />}
                          initialRating={4.5}
                          readonly
                          className='text-[#FBCA04] text-lg leading-none'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                    Xem chi tiết
                  </div>
                </li>
              </ul>
            </div>
            <div className=''>
              <div className='text-lg font-medium text-right text-mainColor2-800'>
                Đánh giá của bạn
              </div>
              <p className='mb-3 text-sm text-right text-muted-foreground'>
                Hãy xem tuần vừa rồi bạn đã tương tác như thế nào!
              </p>
            </div>
          </div>
        </div>

        <div className='flex-1 px-4 flex items-center sticky top-0 right-0 min-h-[100vh]'>
          <div className='bg-gray-100/80 h-[95vh] rounded-xl flex-1 grid grid-rows-2 py-4'>
            <div className='relative flex flex-col items-center justify-center text-center'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <IoIosLogOut className='absolute top-0 text-xl cursor-pointer right-3 text-mainColor1-800' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn muốn đăng xuất?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn sẽ cần phải đăng nhập lại trước khi truy cập vào hệ
                      thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Đăng xuất
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <UploadAvatar avatar={currentUser?.avatar} />
              <div className='mt-6 text-xl font-medium text-mainColor2-800'>
                {currentUser?.name}
              </div>
              <div className='text-xs text-mainColor2-800/90'>
                {currentUser?.email}
              </div>
            </div>
            <div className='grid grid-rows-4 py-2 mx-6 bg-white rounded-xl'>
              <div className='py-2 mx-2'>
                <div className='bg-[#F7F7FE] w-fit text-center text-xs text-mainColor1-600 px-2 py-1.5 rounded-lg font-medium'>
                  Sản phẩm đã xem
                </div>
                <div className='flex items-end justify-between mt-1 mb-4'>
                  <span className='my-1 ml-1 text-xl font-bold leading-none'>
                    2380
                  </span>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <TrendingUp className='w-4 leading-none' />
                    <span>6.53%</span>
                  </div>
                </div>

                <Separator />
              </div>

              <div className='py-2 mx-2'>
                <div className='bg-[#F9F6FE] w-fit text-center text-xs text-mainColor2-800/90 px-3 py-1.5 rounded-lg font-medium'>
                  Đơn đặt hàng
                </div>
                <div className='flex items-end justify-between mt-1 mb-4'>
                  <span className='my-1 ml-1 text-xl font-bold leading-none'>
                    32
                  </span>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <TrendingUp className='w-4 leading-none' />
                    <span>6.53%</span>
                  </div>
                </div>
                <Separator />
              </div>

              <div className='py-2 mx-2'>
                <div className='bg-[#FEF6F5] w-fit text-center text-xs text-red-500 px-3 py-1.5 rounded-lg font-medium'>
                  Sản phẩm yêu thích
                </div>
                <div className='flex items-end justify-between mt-1 mb-4'>
                  <span className='my-1 ml-1 text-xl font-bold leading-none'>
                    127
                  </span>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <TrendingUp className='w-4 leading-none' />
                    <span>6.53%</span>
                  </div>
                </div>
                <Separator />
              </div>
              <div className='py-2 mx-2'>
                <div className='bg-[#F3FEF8] w-fit text-center text-xs text-green-500 px-3 py-1.5 rounded-lg font-medium'>
                  Đánh giá
                </div>
                <div className='flex items-end justify-between mt-1'>
                  <span className='my-1 ml-1 text-xl font-bold leading-none'>
                    12
                  </span>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <TrendingUp className='w-4 leading-none' />
                    <span>6.53%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
