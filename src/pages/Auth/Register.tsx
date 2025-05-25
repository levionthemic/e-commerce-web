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
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { registerUserAPI } from '~/apis/authApis'
import { FaGoogle } from 'react-icons/fa'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
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
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .pattern(PASSWORD_RULE)
    .messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': PASSWORD_RULE_MESSAGE,
      'any.only': 'Mật khẩu xác nhận không trùng khớp!'
    }),
  role: Joi.string()
    .required()
    .valid(...Object.values(PAGE_TYPE))
})

function Register() {
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: Role.Buyer
    }
  })

  const navigate = useNavigate()

  const submitRegister = (data: {
    email: string
    password: string
    role: RoleValue
  }) => {
    const { email, password, role } = data
    toast.promise(registerUserAPI({ email, password, role }), {
      loading: 'Đang đăng ký...',
      success: (user) => {
        if (!user.error) {
          navigate(`/login?registeredEmail=${user.email}`)
          return 'Đăng ký thành công!'
        }
        throw user
      }
    })
  }
  const submitRegisterWithGoogle = (
    data: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>
  ) => {
    toast.promise(registerUserAPI(data), {
      loading: 'Đang đăng ký...',
      success: (res) => {
        if (!res.error) {
          navigate('/login')
          return 'Đăng ký thành công!'
        }
        throw res
      }
    })
  }

  const handleRegisterWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      submitRegisterWithGoogle(codeResponse)
    },
    onError: (error) => toast.error(error as string)
  })

  return (
    <div className='w-[100vw] h-[100vh] bg-[url("~/assets/background-auth.jpg")] bg-cover bg-no-repeat bg-center'>
      <div className='flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-60 animate-fadeIn'>
        <div className='min-w-[500px] min-h-[600px] bg-gray-200 bg-opacity-10 rounded-3xl border-gray-100 border-solid border-[1px] px-10 pb-4 animate-fadeInTop backdrop-blur-sm'>
          <div className='mt-10 text-4xl font-semibold text-center text-white uppercase'>
            SIGN UP
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitRegister)}
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
                        className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['email'] && 'border-red-500'}`}
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
                        className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['password'] && 'border-red-500'}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base text-white'>
                      Xác nhận mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Vd: 12345678a'
                        className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 text-white rounded-full focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['confirmPassword'] && 'border-red-500'}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        className='flex justify-center gap-2 text-white'
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
                Đăng ký
              </Button>
            </form>
          </Form>

          {form.getValues('role') === PAGE_TYPE.BUYER && (
            <div className='flex items-center justify-center gap-6 mt-6 text-sm text-white'>
              <span>hoặc đăng ký bằng: </span>
              <div className='flex items-center justify-between gap-2'>
                <div
                  onClick={() => handleRegisterWithGoogle()}
                  className='border border-white rounded-full p-1.5 cursor-pointer hover:bg-mainColor1-600 hover:border-[2px] hover:scale-105 hover:duration-300 hover:ease-in-out transition-transform'
                >
                  <FaGoogle />
                </div>
                <span className='text-xs text-muted'>(Chỉ cho Người mua)</span>
              </div>
            </div>
          )}
          <div className='mt-8 text-xs text-center text-white'>
            Đã có tài khoản?{' '}
            <div
              className='font-semibold underline scale-100 cursor-pointer hover:scale-110 hover:transition-transform hover:ease-in-out hover:duration-200'
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
