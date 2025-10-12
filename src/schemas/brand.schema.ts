import { z } from 'zod'

class BrandSchema {
  createBrand = z.object({
    brand_name: z.string().nonempty('Brand name is required'),
    brand_image: z.object({
      url: z.string().nonempty('Please upload a brand image'),
      public_id: z.string().optional(),
    }),
  })

  updateBrand = this.createBrand.extend({
    isActive: z.boolean(),
  })
}
const brandSchema = new BrandSchema()
export default brandSchema
