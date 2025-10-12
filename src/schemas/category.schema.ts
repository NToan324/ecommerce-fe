import { z } from 'zod'

class CategorySchema {
  createCategory = z.object({
    category_name: z.string().nonempty('Category name is required'),
    category_description: z.string().optional(),
    category_image: z.object({
      url: z.string().nonempty('Please upload a category image'),
      public_id: z.string().optional(),
    }),
  })
  updateCategory = this.createCategory.extend({
    isActive: z.boolean(),
  })
}
const categorySchema = new CategorySchema()
export default categorySchema
