import { z } from 'zod'

import { PAYMENT_METHOD } from '@/constant'

class OrderSchema {
  createOrder = z.object({
    name: z.string().nonempty('Please enter your name'),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
    coupon_code: z.string().optional(),
    address: z.string().nonempty('Please enter your address'),
    items: z.array(
      z.object({
        product_variant_id: z.string().nonempty('Product variant ID is required'),
        product_variant_name: z.string().nonempty('Product variant name is required'),
        quantity: z.number().int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
        unit_price: z.number().min(0, 'Price must be at least 0'),
        discount: z.number().min(0, 'Discount must be at least 0').optional(),
        images: z.object({
          url: z.string().nonempty('Image URL is required'),
        }),
      })
    ),
    payment_method: z.enum(PAYMENT_METHOD, 'Please select a valid payment method'),
  })
}

const orderSchema = new OrderSchema()
export default orderSchema
