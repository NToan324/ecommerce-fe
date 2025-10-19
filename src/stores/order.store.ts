import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Order } from '@/types/order.type'

interface OrderState {
  orderComplete: Order | null
  setOrderComplete: (order: Order | null) => void
  clearOrderComplete: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orderComplete: null,
      setOrderComplete: (order: Order | null) => set({ orderComplete: order }),
      clearOrderComplete: () => {
        localStorage.removeItem('order-storage')
        set({ orderComplete: null })
      },
    }),
    {
      name: 'order-storage',
    }
  )
)
