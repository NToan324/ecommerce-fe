import { z } from 'zod'

class ProfileSchema {
  basicInfo = z.object({
    fullName: z.string().nonempty('Please enter your full name').min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .nonempty('Please enter your email')
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
    provinceCity: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    address: z.string().optional(),
  })

  addressDetails = z.object({
    fullName: z.string().optional(),
    phoneNumber: z
      .string()
      .min(10, 'Phone number must be at least 10 characters')
      .max(11, 'Phone number must be at most 11 characters')
      .regex(/^[0-9]+$/, 'Phone number must only contain digits')
      .optional(),
    provinceCity: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    address: z.string().nonempty('Please enter your address').min(5, 'Address must be at least 5 characters'),
  })

  changePassword = z.object({
    oldPassword: z.string().nonempty('Please enter your old password'),
    newPassword: z.string().nonempty('Please enter your new password'),
    confirmNewPassword: z.string().nonempty('Please enter your confirm new password'),
  })
}

const profileSchema = new ProfileSchema()
export default profileSchema
