import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { Cart, CreateCart } from '@/types/cart.type'

class CartService {
  createCart = async (payload: CreateCart) => {
    const response = await axios.post<ApiResponse<Cart>>('/cart', payload)
    return response.data
  }
  getCartByUser = async () => {
    const response = await axios.get<ApiResponse<Cart>>('/cart')
    return response.data
  }

  updateCartByUser = async (id: string, payload: Partial<CreateCart>) => {
    const response = await axios.put<ApiResponse<Cart>>(`/cart/${id}`, payload)
    return response.data
  }

  deleteCartByUser = async (id: string) => {
    const response = await axios.delete<ApiResponse<null>>(`/cart/${id}`)
    return response.data
  }
}

const cartService = new CartService()
export default cartService
