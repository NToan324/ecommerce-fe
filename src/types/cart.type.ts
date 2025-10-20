import { Image } from './common.type'

export interface CartDetail {
  _id: string
  product_id: string
  variant_name: string
  attributes: Record<string, string>
  original_price: number
  price: number
  available_quantity: number
  quantity: number
  discount: number
  images: Image[]
}

export interface CreateCart {
  productVariantId: string
  quantity: number
}

export interface Cart {
  _id: string
  user_id: string
  items: CartItemDetail[]
  createdAt: string
  updatedAt: string
}

export interface CartItemDetail {
  product_variant_id: string
  product_variant_name: string
  quantity: number
  unit_price: number
  discount: number
  images: Image
  product_detail: CartDetail
}
