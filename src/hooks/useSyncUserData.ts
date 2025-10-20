import { useQueryClient } from '@tanstack/react-query'

import { toastSuccess } from '@/components/toastify'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'
import { CartItemDetail } from '@/types/cart.type'
import useCart from './useCart'

export const useSyncUserData = () => {
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const { data: cartByUser, refetch } = useCart.getCartByUser(!!user)
  const cart = useCartStore((state) => state.cart)
  const { mutateAsync: updateCartByUser } = useCart.updateCartByUser(false)
  const { mutateAsync: createCart } = useCart.createCart(false)

  const syncUserData = async () => {
    const result = await refetch()
    const cartData = result.data ? result.data : cartByUser

    //Đây là bug BE: Khi user chưa có cart, API trả về data: [] chứ không phải null
    if (cart.length > 0 && Array.isArray(cartData?.data) && (cartData.data as CartItemDetail[]).length === 0) {
      console.log('Cart is already synchronized', cart)
      await Promise.all(
        cart.map(
          (
            item // dùng toàn bộ cart local khi server rỗng
          ) =>
            createCart({
              productVariantId: item._id,
              quantity: item.quantity,
            })
        )
      )
      toastSuccess('Cart synchronized successfully')
      queryClient.invalidateQueries({ queryKey: ['getCartByUser'] })
      return
    }

    const productVariantMap = new Map(cartData?.data.items.map((p) => [p.product_variant_id, p.quantity]))
    const checkCartisDifferent = cart.filter((item) => !productVariantMap.has(item._id))

    const cartItemsInDB = cart
      .filter((item) => productVariantMap.has(item._id) && productVariantMap.get(item._id) !== item.quantity)
      .map((item) => ({
        id: item._id,
        quantity: item.quantity,
      }))

    console.log('cartItemsInDB:', cartItemsInDB)
    console.log('checkCartisDifferent:', checkCartisDifferent)

    if (cartItemsInDB.length > 0) {
      await Promise.all(
        cartItemsInDB.map((item) =>
          updateCartByUser({
            id: item.id,
            payload: { quantity: item.quantity },
          })
        )
      )
    }

    if (checkCartisDifferent.length > 0) {
      await Promise.all(
        cart.map(
          (
            item // dùng toàn bộ cart local khi server rỗng
          ) =>
            createCart({
              productVariantId: item._id,
              quantity: item.quantity,
            })
        )
      )
    }

    toastSuccess('Cart synchronized successfully')
    queryClient.invalidateQueries({ queryKey: ['getCartByUser'] })
  }
  return { syncUserData }
}
