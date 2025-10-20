import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toastError, toastSuccess } from '@/components/toastify'
import { IHttpErrorResponseDto } from '@/http/types/http.response'
import cartService from '@/services/cart.service'
import { CreateCart } from '@/types/cart.type'

class UseCart {
  getCartByUser = (enabled: boolean) => {
    return useQuery({
      queryKey: ['getCartByUser'],
      queryFn: () => cartService.getCartByUser(),
      enabled: enabled,
      refetchOnMount: true,
    })
  }

  createCart = (enableToast: boolean = true) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['createCart'],
      mutationFn: (payload: CreateCart) => cartService.createCart(payload),
      onSuccess: () => {
        enableToast && toastSuccess('Cart created successfully')
        queryClient.invalidateQueries({ queryKey: ['getCartByUser'] })
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

  updateCartByUser = (enableToast: boolean = true) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateCartByUser'],
      mutationFn: (data: { id: string; payload: Partial<CreateCart> }) =>
        cartService.updateCartByUser(data.id, data.payload),
      onSuccess: () => {
        enableToast && toastSuccess('Cart updated successfully')
        queryClient.invalidateQueries({ queryKey: ['getCartByUser'] })
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

  deleteCartByUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['deleteCartByUser'],
      mutationFn: (id: string) => cartService.deleteCartByUser(id),
      onSuccess: () => {
        toastSuccess('Your cart has been cleared successfully.')
        queryClient.invalidateQueries({ queryKey: ['getCartByUser'] })
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
}

const useCart = new UseCart()
export default useCart
