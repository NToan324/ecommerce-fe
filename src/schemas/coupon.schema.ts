import { z } from 'zod'

class CouponSchema {
  createCoupon = z.object({
    code: z
      .string()
      .nonempty('Please enter coupon code')
      .regex(
        /^[A-Z0-9_-]{5}$/,
        'Coupon code must be exactly 5 characters long and can only contain uppercase letters, numbers, hyphens, and underscores'
      ),
    discount_amount: z.number().min(1, 'Discount amount must be greater than 0'),
    usage_limit: z
      .number()
      .int('Usage limit must be an integer')
      .min(1, 'Usage limit must be at least 1')
      .max(10, 'Usage limit must be at most 10')
      .optional(),
  })

  updateCoupon = this.createCoupon.extend({
    isActive: z.boolean(),
  })
}

const couponSchema = new CouponSchema()
export default couponSchema
