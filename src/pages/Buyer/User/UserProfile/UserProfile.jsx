import { useDispatch, useSelector } from 'react-redux'

import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
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
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
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
import { useId, useState } from 'react'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'

function UserProfile() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    toast.promise(dispatch(logoutUserAPI()), {
      loading: 'Đang đăng xuất...'
    })
  }

  const currentUser = useSelector(selectCurrentUser)
  const joiSchema = Joi.object({
    email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
    address: Joi.string(),
    phoneNumber: Joi.string()
  })

  const form = useForm({
    resolver: joiResolver(joiSchema),
    defaultValues: {
      email: currentUser.email,
      address: '',
      phoneNumber: ''
    }
  })

  const id = useId()
  const [checked, setChecked] = useState(true)

  return (
    <div className='px-4'>
      <div className="flex items-center bg-white rounded-lg h-[100vh] overflow-auto relative">
        <div className="px-2 h-full w-[75%]">
          {/* Header */}
          <UserHeader />

          {/* Content */}
          <div>
            <div className='text-3xl text-mainColor1-800 font-semibold uppercase'>Hồ sơ</div>
            <p className='text-gray-500 text-sm'>Chào mừng bạn trở về nhà! Đây là nơi bạn có thể kiểm tra các hoạt động đã làm của mình.</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className='my-4'>
              <div className='text-lg font-medium text-mainColor2-800'>Thông tin cá nhân</div>
              <Form {...form}>
                <form action="#" onSubmit={form.handleSubmit()}>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className='mb-4 mt-2'>
                        <FormLabel className='text-base'>Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['fullName'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Mặc định chúng tôi sẽ lấy họ và tên này in trên đơn hàng.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 my-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="my-3">
                          <FormLabel className='text-base'>Giới tính</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex items-center gap-10"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Nam
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Nữ
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="other" />
                                </FormControl>
                                <FormLabel className="font-normal">Khác</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className='my-2'>
                          <FormLabel className='text-base'>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='VD: 0123456789'
                              className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['phoneNumber'] && 'border-red-500'}`}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                        Số điện thoại này được dùng để liên lạc với người vận chuyển.
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
                      <FormItem className='my-4'>
                        <FormLabel className='text-base'>Địa chỉ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Vd: 123 đường XYZ'
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['address'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Đia chỉ nhận hàng của bạn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className='my-4'>
                        <FormLabel className='text-base'>Email</FormLabel>
                        <FormControl>
                          <Input
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['email'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Email của bạn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button type="submit" className="w-[70%] rounded-full bg-mainColor2-800 text-white tex-lg uppercase">Cập nhật</Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className='my-4'>
              <div className='text-lg font-medium text-mainColor2-800'>Thông tin tài khoản</div>
              <Form {...form}>
                <form action="#" onSubmit={form.handleSubmit()}>

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className='mb-4 mt-2'>
                        <FormLabel className='text-base'>Tên tài khoản</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Vd: 123 đường XYZ'
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['username'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Đia chỉ nhận hàng của bạn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className='my-4'>
                        <FormLabel className='text-base'>Mật khẩu</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='VD: 0123456789'
                            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['password'] && 'border-red-500'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                        Số điện thoại này được dùng để liên lạc với người vận chuyển.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex items-center gap-4 my-4'>
                    <FormLabel className='text-base'>Trạng thái tài khoản</FormLabel>
                    <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
                      <Switch
                        id={id}
                        checked={checked}
                        onCheckedChange={setChecked}
                        className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-lg [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
                      />
                      <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
                        <span className="text-[10px] font-medium uppercase">Tạm khóa</span>
                      </span>
                      <span className="min-w-78flex peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
                        <span className="text-[10px] font-medium uppercase">Bình thường</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button type="submit" className="w-[70%] rounded-full bg-mainColor2-800 text-white tex-lg uppercase">Cập nhật</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="">
              <div className='text-lg font-medium text-mainColor2-800 mb-1/2'>Sản phẩm đã xem gần đây</div>
              <p className='text-sm text-muted-foreground mb-3'>Hãy xem tuần vừa rồi bạn đã xem các sản phẩm nào!</p>
              <ul>
                <li className='flex items-center gap-4 mb-4'>
                  <div className="flex items-center gap-3 flex-1">
                    <img src={productImg} alt="" className='w-10 h-10 rounded-lg'/>
                    <div className="flex flex-col">
                      <span className='line-clamp-1 font-medium'>Tên sản phẩm</span>
                      <div className='flex items-center gap-2 text-muted-foreground text-xs'>
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
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>Xem chi tiết</div>
                </li>
                <li className='flex items-center gap-4 mb-4'>
                  <div className="flex items-center gap-3 flex-1">
                    <img src={productImg} alt="" className='w-10 h-10 rounded-lg'/>
                    <div className="flex flex-col">
                      <span className='line-clamp-1 font-medium'>Tên sản phẩm</span>
                      <div className='flex items-center gap-2 text-muted-foreground text-xs'>
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
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>Xem chi tiết</div>
                </li>
                <li className='flex items-center gap-4 mb-4'>
                  <div className="flex items-center gap-3 flex-1">
                    <img src={productImg} alt="" className='w-10 h-10 rounded-lg'/>
                    <div className="flex flex-col">
                      <span className='line-clamp-1 font-medium'>Tên sản phẩm</span>
                      <div className='flex items-center gap-2 text-muted-foreground text-xs'>
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
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>Xem chi tiết</div>
                </li>
                <li className='flex items-center gap-4 mb-4'>
                  <div className="flex items-center gap-3 flex-1">
                    <img src={productImg} alt="" className='w-10 h-10 rounded-lg'/>
                    <div className="flex flex-col">
                      <span className='line-clamp-1 font-medium'>Tên sản phẩm</span>
                      <div className='flex items-center gap-2 text-muted-foreground text-xs'>
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
                  <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>Xem chi tiết</div>
                </li>
              </ul>
            </div>
            <div className="">
              <div className='text-lg font-medium text-mainColor2-800 text-right'>Đánh giá của bạn</div>
              <p className='text-sm text-muted-foreground mb-3 text-right'>Hãy xem tuần vừa rồi bạn đã tương tác như thế nào!</p>
            </div>
          </div>

        </div>

        <div className="flex-1 px-6 flex items-center sticky top-0 right-0 min-h-[100vh]">
          <div className='bg-gray-100/80 h-[95vh] rounded-3xl flex-1'>
            <div className="text-center relative py-32">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <IoIosLogOut className='absolute top-3 right-3 text-mainColor1-800 text-xl cursor-pointer'/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn sẽ cần phải đăng nhập lại trước khi truy cập vào hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <UploadAvatar previewUrl={currentUser?.avatar} />
              <div className='text-xl mt-2 text-mainColor2-800 font-medium'>{currentUser.displayName}</div>
              <div className='text-xs text-mainColor2-800/90'>{currentUser.email}</div>
            </div>
            <div className="bg-white rounded-xl grid grid-cols-2 mx-6 py-4 gap-y-3">
              <div className="mx-2 py-2">
                <div className='bg-[#F7F7FE] w-[80%] text-center text-xs text-mainColor1-600 px-3 py-1.5 rounded-lg font-medium mx-auto'>Sản phẩm đã xem</div>
                <div className='font-bold ml-4 my-1'>2380</div>
              </div>
              <div className="mx-2 py-2">
                <div className='bg-[#F9F6FE] w-[80%] text-center text-xs text-mainColor2-800/90 px-3 py-1.5 rounded-lg font-medium mx-auto'>Đơn đặt hàng</div>
                <div className='font-bold ml-4 my-1'>32</div>
              </div>
              <div className="mx-2 py-2">
                <div className='bg-[#FEF6F5] w-[80%] text-center text-xs text-red-500 px-3 py-1.5 rounded-lg font-medium mx-auto'>Sản phẩm yêu thích</div>
                <div className='font-bold ml-4 my-1'>127</div>
              </div>
              <div className="mx-2 py-2">
                <div className='bg-[#F3FEF8] w-[80%] text-center text-xs text-green-500 px-3 py-1.5 rounded-lg font-medium mx-auto'>Đánh giá</div>
                <div className='font-bold ml-4 my-1'>29</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
