import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { Profile, UpdateProfile, UserPagination } from '@/types/user.type'

class UserService {
  getProfile = async () => {
    const response = await axios.get<ApiResponse<Profile>>('/user/profile')
    return response.data
  }

  updateProfile = async (payload: Partial<UpdateProfile>) => {
    const response = await axios.put<ApiResponse<Profile>>('/user/profile', payload)
    return response.data
  }

  getAllUsers = async () => {
    const response = await axios.get<ApiResponse<UserPagination>>('/user')
    return response.data
  }
}

const userService = new UserService()
export default userService
