'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import OrderTracking from '@/features/order/orderTracking'
import useOrder from '@/hooks/useOrder'

export default function page() {
  const params = useParams()
  const { data, isPending, isSuccess } = useOrder.getOrderById(params.id as string)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isPending) {
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
    }
  }, [isPending])

  if (isPending || isLoading) {
    return (
      <div className="w-full relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }
  if (!isSuccess || !data?.data) {
    return notFound()
  }

  return <OrderTracking order={data?.data} />
}
