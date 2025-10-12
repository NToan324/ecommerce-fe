import { create } from 'zustand'

import { Brand } from '@/types/brand.type'
import { Category } from '@/types/category.type'

export interface BrandState {
  brands: Brand[]
  setbrands: (data: Brand[]) => void
}

export const useBrandStore = create<BrandState>((set) => ({
  brands: [],
  setbrands: (data) => set(() => ({ brands: data })),
}))
