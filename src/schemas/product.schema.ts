import { z } from 'zod'

class ProductSchema {
  updateProduct = z.object({
    name: z.string().nonempty('Please enter product name'),
    category: z.string().nonempty('Please select a category'),
    description: z.string().optional(),
    brand: z.string().optional(),
    quantity: z.number().min(0, 'Quantity must be at least 0'),
    unitPrice: z.number('Unit price must be a number').min(0, 'Unit price must be at least 0'),
    discount: z.number('Discount must be a number').min(0, 'Discount must be at least 0'),
    totalPrice: z.number('Total price must be a number').min(0, 'Total price must be at least 0'),
    currentStock: z.number('Current stock must be a number').min(0, 'Current stock must be at least 0'),
    status: z.literal('Active').or(z.literal('Inactive')),
  })
}
const productSchema = new ProductSchema()
export default productSchema
