'use client'

import React, { useEffect, useState } from 'react'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import CheckoutPage from '@/features/order/checkout'
import { useCartStore } from '@/stores/cart.store'

export default function page() {
  const cart = useCartStore((state) => state.cart)
  const coupon = useCartStore((state) => state.coupon)
  const [isLoading, setIsLoading] = useState(true)

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
      <CheckoutPage cart={cart} coupon={coupon} />
    </div>
  )
}
