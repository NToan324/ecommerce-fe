import { httpClient as axios } from '@/http/index'

class AuthService {
  //Demo test
  getTodos = async () => {
    const response = await axios.get('/todos/1')
    return response.data
  }
}

const authService = new AuthService()
export default authService
