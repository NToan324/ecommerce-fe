import { z } from 'zod'

class AuthSchema {
  login = z.object({
    email: z
      .string()
      .nonempty('Please enter your email')
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
    password: z.string().nonempty('Please enter your password').min(6, 'Password must be at least 6 characters'),
  })
  signup = z
    .object({
      fullName: z.string().nonempty('Please enter your full name').min(2, 'Full name must be at least 2 characters'),
      email: z
        .string()
        .nonempty('Please enter your email')
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
      provinceCity: z.string().optional(),
      district: z.string().optional(),
      ward: z.string().optional(),
      address: z.string().nonempty('Please enter your address').min(5, 'Address must be at least 5 characters'),
      password: z.string().nonempty('Please enter your password').min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().nonempty('Please enter your confirm password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
}

const authSchema = new AuthSchema()
export { authSchema }
