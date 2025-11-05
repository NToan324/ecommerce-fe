import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { SearchParams } from '@/types/common.type'
import { CreateOrder, Order, OrderPagination } from '@/types/order.type'

class OrderService {
  createOrder = async (payload: Partial<CreateOrder>) => {
    const response = await axios.post<ApiResponse<Order>>('/order', payload)
    return response.data
  }
  getOrderById = async (id: string) => {
    const response = await axios.get<ApiResponse<Order>>(`/order/${id}`)
    return response.data
  }

  // orders
  getAllOrders = async (params: SearchParams) => {
    const response = await axios.get<ApiResponse<OrderPagination>>('/user/orders', { params })
    return response.data
  }
}

const orderService = new OrderService()
export default orderService
