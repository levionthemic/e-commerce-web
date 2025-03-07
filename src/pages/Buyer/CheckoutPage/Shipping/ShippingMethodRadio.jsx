import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { useId } from 'react'
import ghtkLogo from '~/assets/ghtk-logo.png'
import ghnLogo from '~/assets/ghn-logo.png'

export default function ShippingMethodRadio() {
  const id = useId()
  return (
    <RadioGroup className="gap-2" defaultValue="1">
      <div
        className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="1"
          id={`${id}-1`}
          aria-describedby={`${id}-1-description`}
          className="order-1 after:absolute after:inset-0" />
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
      </div>

      <div
        className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="2"
          id={`${id}-2`}
          aria-describedby={`${id}-2-description`}
          className="order-1 after:absolute after:inset-0" />
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
              Chi phí: 20,000đ
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>
  )
}
