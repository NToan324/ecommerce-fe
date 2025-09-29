import { useEffect, useState } from 'react'
import { Check, ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type OptionItem = {
  id: string
  name: string
  status: boolean | string
  fullName?: string
  active?: boolean
}

interface ComboboxProps<T> {
  isError?: boolean
  isDisabled?: boolean
  data: T[]
  selectedData: T[]
  index: number
  limitData?: number
  handleOnChange: (value: string) => void
  titleTrigger?: string
}

export function Combobox<T extends OptionItem>({
  data,
  handleOnChange,
  selectedData,
  index,
  isError = false,
  isDisabled = false,
  limitData = 10,
  titleTrigger = 'Chọn',
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
  const displayData = searchValue ? filteredData : filteredData.slice(0, limitData)

  useEffect(() => {
    setValue(
      data.find((item) => item.id === selectedData[index]?.id)
        ? `${selectedData[index]?.id}|${selectedData[index]?.name}`
        : ''
    )
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={isDisabled} asChild className={`${isError ? 'border-red-500' : ''} !h-12 !w-full`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${value ? '' : 'text-black/50 hover:text-black/50'} w-full justify-between bg-white hover:bg-white rounded-[20px]`}
        >
          {value ? data.find((item) => `${item.id}|${item.name}` === value)?.name : titleTrigger}
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
        <Command>
          <CommandInput placeholder="Tìm kiếm" className="h-9" onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>Không có kết quả nào</CommandEmpty>
            <CommandGroup>
              {displayData.length > 0
                ? displayData.map((item) => {
                    return (
                      <CommandItem
                        key={item.id}
                        value={`${item.id}|${item.name}`}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue)
                          handleOnChange(value === currentValue ? '' : currentValue.split('|')[0])
                          setOpen(false)
                        }}
                      >
                        {item.name}
                        <Check
                          className={cn('ml-auto', value === `${item.id}|${item.name}` ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    )
                  })
                : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
