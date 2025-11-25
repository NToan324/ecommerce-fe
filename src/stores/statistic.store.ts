import { addDays } from 'date-fns'
import { create } from 'zustand/react'

import { INTERVAL } from '@/constant'
import { formatDateTime } from '@/utils/helpers'

interface statisticState {
  fromDate: Date | string
  toDate: Date | string
  interval: INTERVAL
  setFromDate: (fromDate: string | undefined) => void
  setToDate: (toDate: string | undefined) => void
  setInterval: (interval: INTERVAL) => void
}

export const useStatisticStore = create<statisticState>((set) => ({
  fromDate: formatDateTime(addDays(new Date(), -90)),
  toDate: formatDateTime(new Date()),
  interval: INTERVAL.week,
  setFromDate: (fromDate: string | undefined) => set(() => ({ fromDate })),
  setToDate: (toDate: string | undefined) => set(() => ({ toDate })),
  setInterval: (interval: INTERVAL) => set(() => ({ interval })),
}))
