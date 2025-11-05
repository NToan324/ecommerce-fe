import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Order } from '@/types/order.type'

interface OrderState {
  orderComplete: Order | null
  setOrderComplete: (order: Order | null) => void
  clearOrderComplete: () => void
}

interface OrderUser {
  orders: Order[]
  setOrders: (orders: Order[]) => void
  totalPages: number
  page: number
  limit: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setTotalPages: (totalPages: number) => void
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

export const useOrderUserStore = create<OrderUser>((set) => ({
  orders: [],
  setOrders: (orders: Order[]) => set({ orders }),
  page: 1,
  limit: 10,
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
  totalPages: 1,
  setTotalPages: (totalPages: number) => set({ totalPages }),
}))
