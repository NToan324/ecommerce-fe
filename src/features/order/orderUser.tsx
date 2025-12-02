'use client'

import { useEffect, useRef, useState } from 'react'
import OrderTable from '@user/(unauth)/(personal)/orders/components/orderTable'

import { ORDER_STATUS } from '@/constant'
import { useOrderUserStore } from '@/stores/order.store'

export default function OrderUser() {
  const scroller = useRef<HTMLSpanElement[] | null>([])
  const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS>(ORDER_STATUS.PENDING)
  const orderStatus = [ORDER_STATUS.PENDING, ORDER_STATUS.SHIPPING, ORDER_STATUS.CANCELLED, ORDER_STATUS.DELIVERED]
  const orders = useOrderUserStore((state) => state.orders)

  const handleStatus = (status: ORDER_STATUS, index: number) => {
    setSelectedStatus(status)
    if (scroller.current) {
      scroller.current[index]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }

  useEffect(() => {
    if (scroller.current) {
      const orderStatusIndex = orderStatus.indexOf(selectedStatus)
      scroller.current[orderStatusIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [])

  return (
    <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden bg-white p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
        Order History
      </h1>
      <div className="w-full space-y-9">
        <div className="flex justify-start no-scrollbar items-center gap-8 md:gap-25 overflow-x-auto">
          {orderStatus.map((status, index) => {
            return (
              <div
                key={index}
                ref={(rel) => {
                  if (scroller.current && rel) {
                    scroller.current[index] = rel
                  }
                }}
                onClick={() => handleStatus(status, index)}
                className={`${selectedStatus === status ? 'font-bold' : 'text-black/50'} min-w-[80px] md:min-w-[100px] text-[clamp(0.875rem,1vw,1rem)] transition-all duration-500 cursor-pointer flex items-center gap-2`}
              >
                <span className="mt-1">{status}</span>
                <div
                  className={`${selectedStatus === status ? 'bg-black' : 'bg-black/20'} size-5 rounded-[6px] text-center flex items-center justify-center text-xs text-white transition-all duration-500`}
                >
                  {orders.filter((order) => order.status === status).length}
                </div>
              </div>
            )
          })}
        </div>
        <OrderTable selectedStatus={selectedStatus} />
      </div>
    </div>
  )
}
