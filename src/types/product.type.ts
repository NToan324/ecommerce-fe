import { Image } from './common.type'
import { Profile } from './user.type'

export interface ProductPagination {
  total: number
  page: number
  limit: number
  totalPage: number
  data: Product[]
}

export interface Product {
  _id: string
  product_name: string
  product_image: Image
  brand_id: string
  category_id: string
  brand_name: string
  category_name: string
  isActive: boolean
}

export interface CreateProduct {
  product_name: string
  brand_id: string
  category_id: string
  product_image: Image
  isActive?: boolean
}

export interface CreateVariantProduct {
  variant_name: string
  attributes: Record<string, string>
  variant_description: string
  original_price: number
  price: number
  quantity: number
  discount?: number
  images: Image[]
}

export interface ProductVariantPagination {
  total: number
  page: number
  limit: number
  totalPage: number
  data: ProductVariant[]
}

export interface ProductVariant {
  _id: string
  product_id: string
  brand_id: string
  category_id: string
  variant_name: string
  attributes: Record<string, string>
  variant_description: string
  original_price: number
  price: number
  quantity: number
  discount: number
  images: Image[]
  isActive: boolean
}

export interface ProductVariantDetail {
  productVariant: ProductVariant & {
    average_rating: number
    review_count: number
    category_name: string
    brand_name: string
  }
  relatedVariants: ProductVariant[]
}

export interface ReviewPagination {
  total: number
  page: number
  limit: number
  totalPage: number
  average_rating: number
  review_count: number
  reviews_with_rating: number
  data: Review[]
}

export interface Review {
  _id: string
  product_variant_id: string
  user_id: string
  content: string
  rating: number
  createdAt: string
  updatedAt: string
  user: UserReview
}

export interface UserReview {
  id: string
  name: string
  avatar: string
}
