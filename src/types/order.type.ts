import { ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from '@/constant'

export interface CreateOrder {
  name: string
  email: string
  coupon_code?: string
  address: string
  items: OrderItemDetail[]
  payment_method: PAYMENT_METHOD
}

export interface OrderItemDetail {
  product_variant_id: string
  product_variant_name: string
  quantity: number
  unit_price: number
  discount?: number
  images: {
    url: string
  }
}

export interface Order {
  _id: string
  user_id: string
  user_name: string
  email: string
  address: string
  total_amount: number
  items: OrderItemDetail[]
  discount_amount: number
  loyalty_points_used: number
  loyalty_points_earned: number
  status: ORDER_STATUS
  payment_method: PAYMENT_METHOD
  payment_status: PAYMENT_STATUS
  order_tracking: {
    _id: string
    status: string
    updated_at: string
  }
  createdAt: string
  updated_at: string
}
