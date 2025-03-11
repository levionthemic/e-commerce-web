import { Label } from '~/components/ui/label'
import { FaStar } from 'react-icons/fa'

export default function ReviewRate() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Label className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[#FBCA04]" aria-hidden="true">
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
          </span>
          <span className="sr-only">5 stars</span>{' '}
          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
            (5,168)
          </span>
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Label className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[#FBCA04]" aria-hidden="true">
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} className="opacity-30" />
          </span>
          <span className="sr-only">4 stars</span>{' '}
          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
            (4,726)
          </span>
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Label className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[#FBCA04]" aria-hidden="true">
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} className="opacity-30" />
            <FaStar size={16} className="opacity-30" />
          </span>
          <span className="sr-only">3 stars</span>{' '}
          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
            (3,234)
          </span>
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Label className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[#FBCA04]" aria-hidden="true">
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} className="opacity-30" />
            <FaStar size={16} className="opacity-30" />
            <FaStar size={16} className="opacity-30" />
          </span>
          <span className="sr-only">2 stars</span>{' '}
          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
            (1,842)
          </span>
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Label className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[#FBCA04]" aria-hidden="true">
            <FaStar size={16} />
            <FaStar size={16} className="opacity-30" />
            <FaStar size={16} className="opacity-30" />
            <FaStar size={16} className="opacity-30" />
            <FaStar size={16} className="opacity-30" />
          </span>
          <span className="sr-only">1 star</span>{' '}
          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">(452)</span>
        </Label>
      </div>
    </div>
  )
}
