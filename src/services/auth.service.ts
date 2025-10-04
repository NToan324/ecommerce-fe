import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { ChangePassword, Signin, SigninResponse, Signup } from '@/types/auth.type'

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
}

const authService = new AuthService()
export default authService
