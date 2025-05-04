import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { OTPInput } from 'input-otp'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { verifyOtpAPI } from '~/apis'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { asyncHandler } from '~/utils/asyncHandler'

export default function OTP({ trigger, open, setOpen, email }) {
  const [value, setValue] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const [hasGuessed, setHasGuessed] = useState(undefined)
  const inputRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus()
    }
  }, [hasGuessed])

  async function onSubmit(e) {
    e?.preventDefault?.()

    inputRef.current?.select()
    await new Promise((r) => setTimeout(r, 1_00))

    const toastId = toast.loading('Đang xác nhận...')

    const [res] = await asyncHandler(
      verifyOtpAPI({ otpCode: value, email: email })
    )

    toast.dismiss(toastId)

    if (res) {
      setToken(res.resetToken)
      setHasGuessed(true)
      setValue('')

      setTimeout(() => {
        inputRef.current?.blur()
      }, 20)
    }
  }

  const handleMoveToResetPassword = () => {
    navigate({
      pathname: '/reset-password',
      search: `?${createSearchParams({ token })}`
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className='flex flex-col items-center gap-2'>
          <div
            className='flex size-11 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <svg
              className='stroke-zinc-800 dark:stroke-zinc-100'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 32 32'
              aria-hidden='true'
            >
              <circle cx='16' cy='16' r='12' fill='none' strokeWidth='8' />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className='sm:text-center'>
              {hasGuessed ? 'Xác thực thành công!' : 'Nhập mã xác nhận'}
            </DialogTitle>
            <DialogDescription className='sm:text-center'>
              {hasGuessed
                ? 'Mã OTP của bạn đã được xác thực!'
                : 'Kiểm tra email của bạn và nhập mã OTP'}
            </DialogDescription>
          </DialogHeader>
        </div>

        {hasGuessed ? (
          <div className='text-center'>
            <DialogClose asChild>
              <Button
                type='button'
                onClick={handleMoveToResetPassword}
                ref={closeButtonRef}
              >
                Đóng
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex justify-center'>
              <OTPInput
                id='cofirmation-code'
                ref={inputRef}
                value={value}
                onChange={setValue}
                containerClassName='flex items-center gap-3 has-disabled:opacity-50'
                maxLength={6}
                onFocus={() => setHasGuessed(undefined)}
                render={({ slots }) => (
                  <div className='flex gap-2'>
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                onComplete={onSubmit}
              />
            </div>
            {hasGuessed === false && (
              <p
                className='text-muted-foreground text-center text-xs'
                role='alert'
                aria-live='polite'
              >
                Mã không hợp lệ. Hãy thử lại.
              </p>
            )}
            <p className='text-center text-sm'>
              <a className='underline hover:no-underline' href='#'>
                Gửi lại mã
              </a>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Slot(props) {
  return (
    <div
      className={cn(
        'border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]',
        { 'border-ring ring-ring/50 z-10 ring-[3px]': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
