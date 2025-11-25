import { create } from 'zustand'

import { Category } from '@/types/category.type'

export interface CategoryState {
  categories: Category[]
  totalPages: number
  limit: number
  page: number
  name: string

  setName: (name: string) => void
  setCategories: (data: Category[]) => void
  setLimit: (limit: number) => void
  setTotalPages: (totalPages: number) => void
  setPage: (page: number) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  totalPages: 0,
  limit: 10,
  page: 1,
  name: '',
  setLimit: (limit) => set(() => ({ limit })),
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  setPage: (page) => set(() => ({ page })),
  setCategories: (data) => set(() => ({ categories: data })),
  setName: (name) => set(() => ({ name })),
}))
