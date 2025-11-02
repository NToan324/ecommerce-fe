import { create } from 'zustand'

import { Review } from '@/types/product.type'

interface ReviewState {
  review: Review | null
  page: number
  limit: number

  setReview: (review: Review | null) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export const useReviewStore = create<ReviewState>((set) => ({
  review: null,
  page: 1,
  limit: 10,
  setReview: (review) => set({ review }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}))
