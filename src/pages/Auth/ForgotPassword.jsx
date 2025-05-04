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
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import { useNavigate } from 'react-router-dom'
import OTP from '~/components/OTP'
import { useState } from 'react'
import { toast } from 'sonner'
import { forgotPasswordAPI } from '~/apis'
import { asyncHandler } from '~/utils/asyncHandler'

const formSchema = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RULE).messages({
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'string.pattern.base': EMAIL_RULE_MESSAGE
  })
})

function ForgotPassword() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const navigate = useNavigate()

  const handleForgotPassword = async (data) => {
    const toastId = toast.loading('Đang xử lý...')

    const [res] = await asyncHandler(forgotPasswordAPI(data))

    toast.dismiss(toastId)

    if (res) {
      setOpen(true)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[url("~/assets/background-auth.jpg")] bg-cover bg-no-repeat bg-center'>
      <div className='w-full h-full bg-gray-900 bg-opacity-60 flex items-center justify-center animate-fadeIn'>
        <div className='w-[500px] min-h-[500px] bg-gray-200 bg-opacity-10 rounded-3xl border-gray-100 border-solid border-[1px] px-10 pb-4 animate-fadeInTop backdrop-blur-sm'>
          <div className='text-center font-semibold text-3xl text-white mt-10'>
            Lấy lại mật khẩu
          </div>

          <div className='text-white text-sm mt-8 mb-10'>
            Bạn quên mật khẩu? Đừng quá lo lắng, chỉ cần điền email và chúng tôi
            có thể giúp bạn khôi phục lại mật khẩu!
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleForgotPassword)}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-base'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập email tài khoản của bạn'
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

              <Button
                type='submit'
                className='bg-mainColor2-800/85 rounded-full w-full animate-fadeInTop py-5 text-md'
              >
                Tiếp tục
              </Button>
            </form>
          </Form>

          <div className='mt-8 text-xs text-white mb-2'>
            <div
              className='hover:underline cursor-pointer flex items-center gap-2'
              onClick={() => navigate('/login')}
            >
              <ArrowLeft size={16} />
              Quay lại trang Đăng nhập
            </div>
          </div>
        </div>
      </div>

      <OTP open={open} setOpen={setOpen} email={form.getValues('email')} />
    </div>
  )
}

export default ForgotPassword
