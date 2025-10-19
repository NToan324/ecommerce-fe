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
  discount?: number
  images: Image[]
}
