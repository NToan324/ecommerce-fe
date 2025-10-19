import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartDetail } from '@/types/cart.type'
import { Coupon } from '@/types/coupon.type'

interface useCartState {
  cart: CartDetail[]
  setCart: (cart: CartDetail) => void
  deleteProductFromCart: (cartId: string) => void
  clearCart: () => void
  cartQuantity: number
  coupon: Partial<Coupon> | null
  setCoupon: (coupon: Partial<Coupon>) => void
  address: string | null
  setAddress: (address: string | null) => void
}

export const useCartStore = create<useCartState>()(
  persist(
    (set) => ({
      cartQuantity: 0,
      cart: [],
      address: null,
      coupon: null,
      setCart: (cart) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex((item) => item._id === cart._id)
          let newCart
          if (existingItemIndex !== -1) {
            newCart = [...state.cart]
            newCart[existingItemIndex].quantity += cart.quantity
          } else {
            newCart = [...state.cart, cart]
          }
          const totalQuantity = newCart.reduce((total, item) => total + item.quantity, 0)
          return {
            cart: newCart,
            cartQuantity: totalQuantity,
          }
        }),
      deleteProductFromCart: (cartId) => {
        set((state) => {
          const updatecart = state.cart.filter((item) => item._id !== cartId)
          const totalQuantity = updatecart.reduce((total, item) => total + item.quantity, 0)
          if (totalQuantity === 0) {
            localStorage.removeItem('cart-storage')
          }
          return {
            cart: updatecart,
            cartQuantity: totalQuantity,
          }
        })
      },
      clearCart: () =>
        set(() => {
          localStorage.removeItem('cart-storage')
          return {
            cart: [],
            cartQuantity: 0,
          }
        }),
      setCoupon: (coupon: Partial<Coupon>) => set(() => ({ coupon })),
      setAddress: (address: string | null) => set(() => ({ address })),
    }),
    {
      name: 'cart-storage',
    }
  )
)
