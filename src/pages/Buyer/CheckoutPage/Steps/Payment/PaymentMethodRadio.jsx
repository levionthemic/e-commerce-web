import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { useId } from 'react'
import creditCardLogo from '~/assets/credit-card-black-logo.png'
import momoLogo from '~/assets/momo-logo.png'
import vnpayLogo from '~/assets/vnpay-logo.png'
import { FaMoneyBillAlt } from 'react-icons/fa'

export default function PaymentMethodRadio({ handleChoosePaymentMethod }) {
  const id = useId()
  return (
    <RadioGroup className="gap-2" defaultValue="4" onValueChange={(value) => {handleChoosePaymentMethod(value)}}>
      <div
        className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="1"
          id={`${id}-1`}
          aria-describedby={`${id}-1-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-start gap-3">
          <img src={creditCardLogo} alt='' width={30} height={30} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-1`}>
              Thanh toán bằng thẻ tín dụng{' '}
              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                (Credit card)
              </span>
            </Label>
            <p id={`${id}-1-description`} className="text-muted-foreground text-xs">
              Cần điền đầy đủ thông tin bên dưới.
            </p>
          </div>
        </div>
      </div>

      <div
        className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="2"
          id={`${id}-2`}
          aria-describedby={`${id}-2-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-start gap-3">
          <img src={momoLogo} alt='' width={30} height={30} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-2`}>
              Thanh toán qua ví Momo{' '}
            </Label>
            <p id={`${id}-2-description`} className="text-muted-foreground text-xs">
              Đảm bảo tài khoản của bạn đã liên kết với ví Momo.
            </p>
          </div>
        </div>
      </div>

      <div
        className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="3"
          id={`${id}-3`}
          aria-describedby={`${id}-3-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-start gap-3">
          <img src={vnpayLogo} alt='' width={30} height={30} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-3`}>
              Thanh toán qua VNPAY{' '}
            </Label>
            <p id={`${id}-3-description`} className="text-muted-foreground text-xs">
              Đảm bảo tài khoản của bạn đã liên kết với VNPAY.
            </p>
          </div>
        </div>
      </div>

      <div
        className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="4"
          id={`${id}-4`}
          aria-describedby={`${id}-4-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-center gap-3">
          <FaMoneyBillAlt className='text-3xl text-green-600'/>
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-4`}>
              Thanh toán bằng tiền mặt{' '}
              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                (COD)
              </span>
            </Label>
          </div>
        </div>
      </div>
    </RadioGroup>
  )
}
