import { z } from 'zod'

class ProfileSchema {
  basicInfo = z.object({
    fullName: z.string().nonempty('Please enter your full name').min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .nonempty('Please enter your email')
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
    phone: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true // allow empty value
        if (val.length < 10 || val.length > 11) {
          return { success: false, message: 'Phone number must be 10-11 digits' }
        }
        if (!/^[0-9]+$/.test(val)) {
          return { success: false, message: 'Phone number must only contain digits' }
        }
        return true
      }),
    provinceCity: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    address: z.string().optional(),
  })

  addressDetails = z.object({
    provinceCity: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    address: z.string().nonempty('Please enter your address').min(5, 'Address must be at least 5 characters'),
  })

  changePassword = z
    .object({
      oldPassword: z.string().nonempty('Please enter your old password'),
      newPassword: z.string().nonempty('Please enter your new password'),
      confirmNewPassword: z.string().nonempty('Please enter your confirm new password'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: 'Passwords do not match',
      path: ['confirmNewPassword'],
    })
}

const profileSchema = new ProfileSchema()
export default profileSchema
