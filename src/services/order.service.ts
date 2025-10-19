import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { CreateOrder, Order } from '@/types/order.type'

class OrderService {
  createOrder = async (payload: Partial<CreateOrder>) => {
    const response = await axios.post<ApiResponse<Order>>('/order', payload)
    return response.data
  }
  getOrderById = async (id: string) => {
    const response = await axios.get<ApiResponse<Order>>(`/order/${id}`)
    return response.data
  }
}

const orderService = new OrderService()
export default orderService
