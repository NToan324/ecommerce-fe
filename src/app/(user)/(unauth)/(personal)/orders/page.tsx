'use client'

import { useEffect, useState } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import OrderUser from '@/features/order/orderUser'
import useOrder from '@/hooks/useOrder'
import { useOrderUserStore } from '@/stores/order.store'

export default function page() {
  const searchParams = useSearchParams()
  const { data: orders, isSuccess, isPending } = useOrder.getAllOrders()
  const setOrders = useOrderUserStore((state) => state.setOrders)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const pageStore = useOrderUserStore((state) => state.page)
  const limitStore = useOrderUserStore((state) => state.limit)

  const setPage = useOrderUserStore((state) => state.setPage)
  const setLimit = useOrderUserStore((state) => state.setLimit)
  const setTotalPages = useOrderUserStore((state) => state.setTotalPages)

  useEffect(() => {
    if (isSuccess && orders.data.data.length > 0) {
      setOrders(orders.data.data)
    }
    if (!isPending) {
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
    }
  }, [orders, isPending, isSuccess, setOrders])

  useEffect(() => {
    const { page, limit } = Object.fromEntries([...searchParams.entries()])
    if (!page || !limit) {
      router.replace(`/orders?page=${pageStore}&limit=${limitStore}`)
    }
    if (page) {
      setPage(Number(page))
    }
    if (limit) {
      setLimit(Number(limit))
    }
    if (isSuccess && orders.data) {
      setTotalPages(orders.data.totalPages)
    }
  }, [searchParams, router, pageStore, limitStore, setPage, setLimit, isSuccess, orders, setTotalPages])

  if (isPending || isLoading) {
    return (
      <div className="w-full relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }

  if (!isSuccess || !orders?.data) {
    return notFound()
  }

  return <OrderUser />
}
