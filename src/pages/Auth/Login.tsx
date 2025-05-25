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

import { Check } from 'lucide-react'
import { Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

import { Input } from '~/components/ui/input'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { PAGE_TYPE } from '~/utils/constants'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'sonner'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { FaGoogle } from 'react-icons/fa'
import { asyncHandler } from '~/utils/asyncHandler'
import { Checkbox } from '~/components/ui/checkbox'
import { useState } from 'react'
import { AppDispatch } from '~/redux/store'
import { Role, RoleValue } from '~/types/role'

const formSchema = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': EMAIL_RULE_MESSAGE
  }),
  password: Joi.string().required().pattern(PASSWORD_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': PASSWORD_RULE_MESSAGE
  }),
  role: Joi.string()
    .required()
    .valid(...Object.values(PAGE_TYPE))
})

function Login({ role }: { role: RoleValue }) {
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: role || Role.Buyer
    }
  })

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [rememberMeCheck, setRememberMeCheck] = useState(false)

  const [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogIn = async (
    data:
      | { email: string; password: string }
      | Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>
  ) => {
    const [res] = await asyncHandler(
      dispatch(loginUserAPI({ ...data, rememberMe: rememberMeCheck })),
      'Đang đăng nhập...'
    )

    if (res) {
      if (res.payload.role === Role.Buyer) navigate('/buyer')
      else navigate('/seller')
      toast.success('Đăng nhập thành công!')
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      submitLogIn(codeResponse)
    },
    onError: (error) => toast.error(error as string)
  })

  return (
    <div className='w-[100vw] h-[100vh] bg-[url("~/assets/background-auth.jpg")] bg-cover bg-no-repeat bg-center'>
      <div className='flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-60 animate-fadeIn'>
        <div className='w-[500px] min-h-[500px] bg-gray-200 bg-opacity-10 rounded-3xl border-gray-100 border-solid border-[1px] px-10 pb-4 animate-fadeInTop backdrop-blur-sm'>
          <div className='mt-10 text-4xl font-semibold text-center text-white uppercase'>
            Login
          </div>

          <div className='py-4'>
            {verifiedEmail && (
              <Alert className='bg-[#EDF7ED]/80'>
                <Check className='w-4 h-4' />
                <AlertTitle className='font-semibold'>
                  Xác nhận thành công!
                </AlertTitle>
                <AlertDescription>
                  Email của bạn:&nbsp;
                  <b>
                    <i>{verifiedEmail}</i>
                  </b>
                  &nbsp;đã được xác thực. Ngay bây giờ bạn có thể đăng nhập để
                  có thể trải nghiệm dịch vụ của chúng tôi! <br />
                  Chúc bạn một ngày tốt lành!
                </AlertDescription>
              </Alert>
            )}
            {registeredEmail && (
              <Alert className='bg-[#E5F6FD]/80'>
                <Info className='items-center w-4 h-4' />
                <AlertTitle>Thông báo!</AlertTitle>
                <AlertDescription>
                  Chúng tôi đã gửi 1 email đến email:&nbsp;
                  <br />
                  <b>{registeredEmail}</b> <br />
                  Hãy kiểm tra và xác thực trước khi đăng nhập!
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitLogIn)}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base text-white'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Vd: levionthemic@example.com'
                        className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${
                          !!form.formState.errors['email'] && 'border-red-500'
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base text-white'>
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Vd: 12345678a'
                        className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${
                          !!form.formState.errors['password'] &&
                          'border-red-500'
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1.5 text-white mt-1/2'>
                        <Checkbox
                          id='remember-me'
                          className='border-white'
                          checked={rememberMeCheck}
                          onCheckedChange={(checked) =>
                            setRememberMeCheck(!!checked)
                          }
                        />
                        <label
                          htmlFor='remember-me'
                          className='text-sm leading-none cursor-pointer hover:underline'
                        >
                          Lưu mật khẩu trong 14 ngày
                        </label>
                      </div>

                      <Link
                        to='/forgot-password'
                        className='text-xs text-right text-white cursor-pointer hover:underline'
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base text-white'>
                      Vai trò
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex items-center justify-center gap-2 text-white'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0 hover:bg-mainColor2-800/50 px-4 py-3 rounded-md hover:transition-all hover:ease-in-out hover:duration-400 cursor-pointer has-[button[data-state=checked]]:bg-mainColor2-800/50'>
                          <FormControl>
                            <RadioGroupItem
                              value={PAGE_TYPE.BUYER}
                              className='bg-white border-white'
                            />
                          </FormControl>
                          <FormLabel className='font-normal cursor-pointer'>
                            Người mua
                          </FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0 hover:bg-mainColor2-800/50 px-4 py-3 rounded-md hover:transition-all hover:ease-in-out hover:duration-400 cursor-pointer has-[button[data-state=checked]]:bg-mainColor2-800/50'>
                          <FormControl>
                            <RadioGroupItem
                              value={PAGE_TYPE.SELLER}
                              className='bg-white border-white'
                            />
                          </FormControl>
                          <FormLabel className='font-normal cursor-pointer'>
                            Người bán
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full py-5 rounded-full bg-mainColor2-800/85 animate-fadeInTop text-md'
              >
                Đăng nhập
              </Button>
            </form>
          </Form>

          <div className='flex items-center justify-center gap-6 mt-6 text-sm text-white'>
            <span>hoặc đăng nhập bằng: </span>
            <div
              onClick={() => handleLoginWithGoogle()}
              className='border border-white rounded-full p-1.5 cursor-pointer hover:bg-mainColor1-600 hover:border-[2px] hover:scale-105 hover:duration-300 hover:ease-in-out transition-transform'
            >
              <FaGoogle />
            </div>
          </div>

          <div className='mt-8 text-xs text-center text-white'>
            Chưa có tài khoản?{' '}
            <div
              className='font-semibold underline scale-100 cursor-pointer hover:scale-110 hover:transition-transform hover:ease-in-out hover:duration-200'
              onClick={() => navigate('/register')}
            >
              Đăng kí
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
