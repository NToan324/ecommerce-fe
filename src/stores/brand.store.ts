import { create } from 'zustand'

import { Brand } from '@/types/brand.type'

export interface BrandState {
  brands: Brand[]
  totalPages: number
  limit: number
  page: number
  name: string

  setbrands: (data: Brand[]) => void
  setLimit: (limit: number) => void
  setTotalPages: (totalPages: number) => void
  setPage: (page: number) => void
  setName: (name: string) => void
}

export const useBrandStore = create<BrandState>((set) => ({
  brands: [],
  totalPages: 0,
  limit: 10,
  page: 1,
  name: '',
  setLimit: (limit) => set(() => ({ limit })),
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  setPage: (page) => set(() => ({ page })),
  setbrands: (data) => set(() => ({ brands: data })),
  setName: (name) => set(() => ({ name })),
}))
