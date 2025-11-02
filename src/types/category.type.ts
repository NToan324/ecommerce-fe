import { Image } from './common.type'

export interface CategoryPagination {
  total: number
  page: number
  limit: number
  totalPages: number
  categories: Category[]
}

export interface Category {
  _id: string
  category_name: string
  category_description?: string
  category_image: Image
  isActive: boolean
}

export interface CreateCategory {
  category_name: string
  category_description?: string
  category_image: Image
}

export interface UpdateCategory {
  category_name: string
  category_description: string
  category_image: Image
  isActive: boolean
}
