import { create } from 'zustand'

import { Coupon } from '@/types/coupon.type'

export interface CouponState {
  coupon: Coupon[]
  totalPages: number
  limit: number
  page: number
  setcoupon: (data: Coupon[]) => void
  setLimit: (limit: number) => void
  setTotalPages: (totalPages: number) => void
  setPage: (page: number) => void
}

export const useCouponStore = create<CouponState>((set) => ({
  coupon: [],
  totalPages: 0,
  limit: 10,
  page: 1,
  setLimit: (limit) => set(() => ({ limit })),
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  setPage: (page) => set(() => ({ page })),
  setcoupon: (data) => set(() => ({ coupon: data })),
}))
