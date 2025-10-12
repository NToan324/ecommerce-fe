import { z } from 'zod'

class ProductSchema {
  createProduct = z.object({
    product_name: z.string().nonempty('Product name is required'),
    brand_id: z.string().nonempty('Brand ID is required'),
    category_id: z.string().nonempty('Category ID is required'),
    product_image: z.object({
      url: z.string().nonempty('Please upload a product image'),
      public_id: z.string().optional(),
    }),
  })

  updateProduct = z.object({
    product_name: z.string().nonempty('Please enter product name'),
    brand_id: z.string().nonempty('Please select a category'),
    category_id: z.string().nonempty('Please select a brand'),
    category_name: z.string().optional(),
    brand_name: z.string().optional(),
    product_image: z.object({
      public_id: z.string().nonempty('Please upload a product image'),
      url: z.string().optional(),
    }),
    isActive: z.boolean(),
  })

  createProductVariant = z.object({
    product_id: z.string().optional(),
    variant_name: z.string().nonempty('Variant name is required'),
    attributes: z
      .array(
        z.object({
          key: z.string().nonempty('Please enter attribute key'),
          value: z.string().nonempty('Please enter attribute value'),
        })
      )
      .optional(),
    variant_description: z.string().nonempty('Please enter variant description'),
    original_price: z.number().min(1, 'Original price must be greater than 0'),
    price: z.number().min(1, 'Price must be greater than 0'),
    quantity: z.number().int('Quantity must be an integer').min(1, 'Quantity must be greater than or equal to 1'),
    discount: z
      .number()
      .min(0, 'Discount must be greater than or equal to 0')
      .max(50, 'Discount must be less than or equal to 50')
      .optional(),
    images: z.array(
      z.object({
        url: z.string().nonempty('Image URL is required'),
        public_id: z.string().optional(),
      })
    ),
  })
}
const productSchema = new ProductSchema()
export default productSchema
