import { create } from 'zustand'

import { Category } from '@/types/category.type'

export interface CategoryState {
  categories: Category[]
  setCategories: (data: Category[]) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (data) => set(() => ({ categories: data })),
}))
