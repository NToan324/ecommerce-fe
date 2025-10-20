'use client'

import React, { useEffect, useState } from 'react'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import CartPage from '@/features/order/cart'
import useCart from '@/hooks/useCart'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'

export default function page() {
  const cart = useCartStore((state) => state.cart)
  const user = useAuthStore((state) => state.user)
  const { data: cartByUser } = useCart.getCartByUser(!!user)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (cartByUser) {
      console.log('Cart data from server:', cartByUser)
    }
  }, [cartByUser])
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }

  return (
    <div>
      <CartPage cart={cart} />
    </div>
  )
}
