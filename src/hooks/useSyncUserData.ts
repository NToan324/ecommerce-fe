import { useQueryClient } from '@tanstack/react-query'

import { toastSuccess } from '@/components/toastify'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'
import { CartItemDetail, CartStore } from '@/types/cart.type'
import useCart from './useCart'

export const useSyncUserData = () => {
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const { data: cartByUser, refetch } = useCart.getCartByUser(!!user)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const setCart = useCartStore((state) => state.setCart)
  const { mutateAsync: createCart } = useCart.createCart(false)

  const syncUserData = async () => {
    const result = await refetch()
    const cartData = result.data ? result.data : cartByUser

    let cartFromDb: CartStore[] = []

    const response = await Promise.all(
      cart.map(async (item) => {
        const response = await createCart({
          productVariantId: item._id,
          quantity: item.quantity,
        })
        return response.data.items
      })
    )

    if (response && response.length > 0) {
      cartFromDb = response[response.length - 1].map((item: CartItemDetail) => ({
        _id: item.product_variant_id,
        variant_name: item.product_variant_name,
        attributes: item.attributes,
        price: item.unit_price,
        quantity: item.quantity,
        images: item.images,
        discount: item.discount,
      }))
    }

    if (cartData && cartData.data && cartData.data.items.length > 0 && cart.length === 0) {
      cartFromDb = [
        ...cartFromDb,
        ...(cartData?.data.items.map((item) => ({
          _id: item.product_variant_id,
          variant_name: item.product_variant_name,
          attributes: item.attributes,
          price: item.unit_price,
          quantity: item.quantity,
          images: item.images,
          discount: item.discount,
        })) || []),
      ]
      cartFromDb.forEach((item) => {
        setCart(item)
      })
    }

    clearCart()

    cartFromDb.forEach((item) => {
      setCart(item)
    })

    queryClient.invalidateQueries({ queryKey: ['getCartByUser'] })
  }
  return { syncUserData }
}
