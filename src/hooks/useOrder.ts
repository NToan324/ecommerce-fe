import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toastError, toastSuccess } from '@/components/toastify'
import { IHttpErrorResponseDto } from '@/http/types/http.response'
import orderService from '@/services/order.service'
import { useCartStore } from '@/stores/cart.store'
import { useOrderStore } from '@/stores/order.store'
import { CreateOrder } from '@/types/order.type'

class UseOrder {
  createOrder = () => {
    const queryClient = useQueryClient()
    const setOrderCompleteStore = useOrderStore((state) => state.setOrderComplete)
    const clearCartStore = useCartStore((state) => state.clearCart)
    const route = useRouter()
    return useMutation({
      mutationKey: ['createOrder'],
      mutationFn: (payload: Partial<CreateOrder>) => orderService.createOrder(payload),
      onSuccess: async (response) => {
        if (response.data) {
          toastSuccess('Order created successfully!')
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] })
          }, 800)
          setOrderCompleteStore(response.data)
          clearCartStore()
          route.push(`/order-complete/${response.data._id}`)
        } else {
          toastError('Error occurred while creating order. Please try again.')
        }
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while updating brand. Please try again.')
        }
      },
    })
  }

  getOrderById = (id: string) => {
    return useQuery({
      queryKey: ['order', id],
      queryFn: () => orderService.getOrderById(id),
      enabled: !!id,
    })
  }
}
const useOrder = new UseOrder()
export default useOrder
