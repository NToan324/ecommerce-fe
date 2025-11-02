import { Image } from './common.type'

export interface BrandPagination {
  total: number
  page: number
  limit: number
  totalPages: number
  brands: Brand[]
}

export interface Brand {
  _id: string
  brand_name: string
  brand_image: Image
  isActive: boolean
}

export interface CreateBrand {
  brand_name: string
  brand_image: Image
}

export interface UpdateBrand {
  brand_name: string
  brand_image: Image
  isActive: boolean
}
