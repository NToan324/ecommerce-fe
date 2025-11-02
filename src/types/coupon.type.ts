export interface CouponPagination {
  total: number
  page: number
  limit: number
  totalPages: number
  data: Coupon[]
}

export interface Coupon {
  _id: string
  code: string
  discount_amount: number
  usage_count: number
  usage_limit?: number
  orders_used: string[]
  isActive: boolean
}

export interface CreateCoupon {
  code: string
  discount_amount: number
  usage_limit?: number
  isActive?: boolean
}
