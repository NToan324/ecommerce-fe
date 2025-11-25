import { create } from 'zustand'

import { Product, ProductVariant } from '@/types/product.type'

interface ProductState {
  product: Product[]
  totalPages: number
  limit: number
  page: number
  name: string

  setName: (name: string) => void
  setProduct: (product: Product[]) => void
  setLimit: (limit: number) => void
  setTotalPages: (totalPages: number) => void
  setPage: (page: number) => void
}

interface ProductVariantState {
  productVariant: ProductVariant | null
  name: string
  category_ids: string[]
  brand_ids: string[]
  min_price: number
  max_price: number
  ratings: number
  sort_price?: 'asc' | 'desc'
  sort_name?: 'asc' | 'desc'
  page: number
  limit: number

  setProductVariant: (productVariant: ProductVariant | null) => void
  setName: (name: string) => void
  setCategoryIds: (category_ids: string[]) => void
  setBrandIds: (brand_ids: string[]) => void
  setMinPrice: (min_price: number) => void
  setMaxPrice: (max_price: number) => void
  setRatings: (ratings: number) => void
  setSortPrice: (sort_price: 'asc' | 'desc' | undefined) => void
  setSortName: (sort_name: 'asc' | 'desc' | undefined) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export const useProductVariantStore = create<ProductVariantState>((set) => ({
  productVariant: null,
  name: '',
  category_ids: [],
  brand_ids: [],
  min_price: 0,
  max_price: 100000000,
  ratings: 0,
  page: 1,
  limit: 12,
  setProductVariant: (productVariant) => set({ productVariant }),
  setName: (name) => set({ name }),
  setCategoryIds: (category_ids) => set({ category_ids }),
  setBrandIds: (brand_ids) => set({ brand_ids }),
  setMinPrice: (min_price) => set({ min_price }),
  setMaxPrice: (max_price) => set({ max_price }),
  setRatings: (ratings) => set({ ratings }),
  setSortPrice: (sort_price) => set({ sort_price }),
  setSortName: (sort_name) => set({ sort_name }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}))

export const useProductStore = create<ProductState>((set) => ({
  product: [],
  totalPages: 0,
  limit: 10,
  page: 1,
  name: '',
  setProduct: (product) => set({ product }),
  setLimit: (limit) => set({ limit }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setPage: (page) => set({ page }),
  setName: (name) => set({ name }),
}))
