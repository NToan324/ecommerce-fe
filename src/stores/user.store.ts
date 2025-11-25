import { create } from 'zustand'

interface UserState {
  page: number
  limit: number
  totalPages: number
  setPage: (v: number) => void
  setTotalPages: (v: number) => void
}

export const useUserStore = create<UserState>((set) => ({
  page: 1,
  limit: 10,
  totalPages: 0,
  setPage: (v) => set({ page: v }),
  setTotalPages: (v) => set({ totalPages: v }),
}))
