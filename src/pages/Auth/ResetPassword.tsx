import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { ArrowLeft } from 'lucide-react'
import { Input } from '~/components/ui/input'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { resetPasswordAPI } from '~/apis/authApis'
import { asyncHandler } from '~/utils/asyncHandler'

const formSchema = Joi.object({
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
    })
})

function ResetPassword() {
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleChangePassword = async (data: { password: string }) => {
    const toastId = toast.loading('Đang cập nhật...')

    const [res] = await asyncHandler(
      resetPasswordAPI({
        password: data.password,
        resetToken: searchParams.get('token')
      })
    )

    if (res) {
      toast.success(
        <div>
          <p className='font-bold'>Cập nhật mật khẩu thành công!</p>
          <p className='text-xs font-light'>
            Vui lòng đăng nhập lại để tiếp tục.
          </p>
        </div>
      )
      navigate('/login', { replace: true })
    }

    toast.dismiss(toastId)
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[url("~/assets/background-auth.jpg")] bg-cover bg-no-repeat bg-center'>
      <div className='flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-60 animate-fadeIn'>
        <div className='w-[500px] min-h-[500px] bg-gray-200 bg-opacity-10 rounded-3xl border-gray-100 border-solid border-[1px] px-10 pb-4 animate-fadeInTop backdrop-blur-sm'>
          <div className='my-10 text-3xl font-semibold text-center text-white'>
            Đổi mật khẩu
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChangePassword)}
              className='space-y-6'
            >
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

              <Button
                type='submit'
                className='w-full py-5 rounded-full bg-mainColor2-800/85 animate-fadeInTop text-md'
              >
                Tiếp tục
              </Button>
            </form>
          </Form>

          <div className='mt-8 mb-2 text-xs text-white'>
            <div
              className='flex items-center gap-2 cursor-pointer hover:underline'
              onClick={() => navigate('/login')}
            >
              <ArrowLeft size={16} />
              Quay lại trang Đăng nhập
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
