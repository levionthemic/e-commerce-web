'use client'

import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '~/components/ui/command'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useId, useState } from 'react'

export default function Autocomplete({ data, label, title, getDetails, flag, error, defaultValue }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  return (
    (<div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-xl focus:outline-none focus:border-[2px] border border-mainColor1-100/50 w-full flex justify-between ${error && 'border-red-500'}`}>
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value
                ? data?.find((i) => i.value === value)?.label
                : title}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start">
          <Command>
            <CommandInput placeholder="Tìm kiếm..." className='border-none focus:border-none outline-none' />
            <CommandList>
              <CommandEmpty>Không có kết quả.</CommandEmpty>
              <CommandGroup>
                {data?.map((i) => (
                  <CommandItem
                    key={i.id}
                    value={i.value}
                    onSelect={(currentValue) => {
                      getDetails({ id: i.id, type: flag })
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}>
                    {i.label}
                    {value === i.value && <CheckIcon size={16} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>)
  )
}
