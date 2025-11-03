import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { ChangePassword, ResetPassword, Signin, SigninResponse, Signup, VerifyCode } from '@/types/auth.type'

class AuthService {
  signup = async (payload: Signup) => {
    const response = await axios.post<ApiResponse<Signup>>('/auth/signup', payload)
    return response.data
  }

  signin = async (payload: Signin) => {
    const response = await axios.post<ApiResponse<SigninResponse>>('/auth/login', payload, {
      skipAuth: true,
    })
    return response.data
  }

  changePassword = async (payload: ChangePassword) => {
    const response = await axios.put<ApiResponse<null>>('/user/change-password', payload)
    return response.data
  }

  forgotPassword = async (email: string) => {
    const response = await axios.post<ApiResponse<{ id: string }>>(
      '/auth/forgot-password',
      { email },
      { skipAuth: true }
    )
    return response.data
  }

  verifyOtp = async (payload: VerifyCode) => {
    const response = await axios.post<ApiResponse<null>>('/auth/verify-otp', payload, { skipAuth: true })
    return response.data
  }

  resetPassword = async (payload: ResetPassword) => {
    const response = await axios.post<ApiResponse<null>>('/auth/forgot-password-reset', payload, { skipAuth: true })
    return response.data
  }
}

const authService = new AuthService()
export default authService
