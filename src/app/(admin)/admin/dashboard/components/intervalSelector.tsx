'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { INTERVAL } from '@/constant'

const intervalOptions = [
  { value: INTERVAL.week, label: 'Week' },
  { value: INTERVAL.month, label: 'Month' },
  { value: INTERVAL.year, label: 'Year' },
  { value: INTERVAL.day, label: 'Day' },
]

export default function IntervalSelect({ value, onChange }: { value: string; onChange: (val: INTERVAL) => void }) {
  return (
    <Select value={value} onValueChange={(value) => onChange(value as INTERVAL)}>
      <SelectTrigger className="w-[150px] bg-white border border-gray-200 !text-black">
        <SelectValue placeholder="Interval" />
      </SelectTrigger>
      <SelectContent>
        {intervalOptions.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
