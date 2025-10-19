'use client'

import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import OrderCompletePage from '@/features/order/orderComplete'
import { useOrderStore } from '@/stores/order.store'

export default function page() {
  const orderCompleteStore = useOrderStore((state) => state.orderComplete)
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

  if (orderCompleteStore === null) {
    return notFound()
  }

  return (
    <div>
      <OrderCompletePage order={orderCompleteStore} />
    </div>
  )
}
