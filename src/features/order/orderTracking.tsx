'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { IoIosArrowDown } from 'react-icons/io'

import { Order } from '@/types/order.type'
import { formatPrice } from '@/utils/helpers'

interface OrderTrackingProps {
  order: Order
}

export default function OrderTracking({ order }: OrderTrackingProps) {
  const [openSummary, setOpenSummary] = useState(false)
  const [orderUser, setOrderUser] = useState({
    fullName: '',
    address: '',
  })

  const subtotal = useMemo(
    () => order.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0),
    [order.items]
  )
  const discountAmount = useMemo(
    () => order.items.reduce((sum, item) => sum + item.unit_price * item.discount * item.quantity, 0),
    [order.items]
  )
  const vatAmount = useMemo(() => (subtotal - discountAmount) * 0.1, [subtotal, discountAmount])

  useEffect(() => {
    setOrderUser({
      fullName: order.user_name,
      address: order.address,
    })
  }, [order])

  return (
    <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden bg-white p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
        Order Details
      </h1>
      <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row">
        <div className="flex flex-col justify-between items-start gap-8 rounded-2xl bg-gradient-to-b from-blue-gray/50 to-blue-primary/10 p-9">
          {/* Timeline */}
          <div className="flex justify-start items-start gap-6 h-full w-full">
            <div className="flex flex-col justify-start items-start gap-4">
              <p className="w-[60px] text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50 min-h-[100px]">
                Sep 9 2025
              </p>
            </div>
            <div className="flex flex-col justify-start items-center">
              <span className="block w-5 h-5 rounded-full border-[6px] border-blue-secondary"></span>
              <span className="block h-[90px] w-px bg-blue-secondary mt-1"></span>
              <span className="block h-px w-4 bg-blue-secondary"></span>
              <span className="block h-px w-4 bg-blue-secondary mt-1"></span>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 min-h-[100px]">
              <p className="font-bold text-[clamp(0.875rem,2vw,1.125rem)]">Confirmation</p>
              <p className="text-[clamp(0.875rem,2vw,1.125rem)] font-medium text-black/50">
                Seller confirmed the order
              </p>
            </div>
          </div>
          {/* Confirmation */}
          <div className="flex justify-start items-start gap-6 h-full w-full">
            <div className="flex flex-col justify-start items-start gap-4">
              <p className="w-[60px] text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50 min-h-[100px]">
                Sep 9 2025
              </p>
              <p className="w-[60px] text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50 min-h-[100px]">
                Sep 9 2025
              </p>
              <p className="w-[60px] text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50 min-h-[100px]">
                Sep 9 2025
              </p>
            </div>
            <div className="flex flex-col justify-start items-center h-[400px]">
              <span className="block w-5 h-5 rounded-full border-[6px] border-blue-secondary "></span>
              <span className="block flex-1 w-px bg-blue-secondary mt-1"></span>
              <span className="block h-px w-4 bg-blue-secondary"></span>
              <span className="block h-px w-4 bg-blue-secondary mt-1"></span>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="flex flex-col justify-start items-start gap-2 min-h-[100px]">
                <p className="font-bold text-[clamp(0.875rem,2vw,1.125rem)]">Confirmation</p>
                <p className="text-[clamp(0.875rem,2vw,1.125rem)] font-medium text-black/50">
                  Seller confirmed the order
                </p>
              </div>
              <div className="flex flex-col justify-start items-start gap-2 min-h-[100px]">
                <p className="font-bold text-[clamp(0.875rem,2vw,1.125rem)]">Order successful</p>
                <p className="text-[clamp(0.875rem,2vw,1.125rem)] font-medium text-black/50">
                  You have successfully placed your order.
                </p>
              </div>
              <div className="flex flex-col justify-start items-start gap-2 min-h-[100px]">
                <p className="font-bold text-[clamp(0.875rem,2vw,1.125rem)]">
                  Order <span className="text-blue-secondary">#thanhbinhcutie</span> — Successful
                </p>
                <p className="text-[clamp(0.875rem,2vw,1.125rem)] font-medium text-black/50">
                  Order placed successfully. Paid via ZaloPay.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-8 w-full max-w-[650px]">
          <div className="p-[2px] md:shadow-2xl md:bg-gradient-to-br shadow-blue-primary/50 from-blue-gray to-blue-primary via-blue-primary w-full rounded-2xl">
            <div className="flex flex-col gap-4 justify-start items-start p-6 md:p-9 bg-white rounded-[14px] w-full">
              <p className="text-[clamp(0.75rem,2vw,1.125rem)] font-bold">Personal Information</p>
              <div className="flex flex-col gap-3">
                <p className="text-[clamp(0.75rem,2vw,1.125rem)]">{orderUser.fullName}</p>
                <p className="text-[clamp(0.75rem,2vw,1.125rem)] w-full">{orderUser.address}</p>
              </div>
            </div>
          </div>
          <div className="p-[2px] md:shadow-2xl md:bg-gradient-to-br shadow-blue-primary/50 from-blue-gray to-blue-primary via-blue-primary w-full rounded-2xl">
            <div className="relative overflow-hidden flex flex-col gap-6 justify-between items-center p-0 md:p-9 bg-white rounded-none md:rounded-[14px] w-full">
              <h2 className="md:block hidden font-bold text-[clamp(1.25rem,2vw,1.5rem)] text-blue-tertiary w-full text-start">
                Products
              </h2>
              <div className="flex flex-col justify-start items-start gap-6 w-full">
                {order.items.map((item) => (
                  <div
                    className="flex justify-start items-center w-full gap-4 border-b border-blue-primary/90 pb-4"
                    key={item.product_variant_id}
                  >
                    <div className="relative w-[100px] min-h-[100px] bg-gradient-to-br from-blue-secondary to-white rounded-2xl">
                      <Image src={item.images.url} alt="Laptop" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2 w-full">
                      <h3 className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">{item.product_variant_name}</h3>
                      <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]"></p>
                      <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]">Silver</p>
                      <div className="flex justify-between items-center gap-2 w-full">
                        <p className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">{formatPrice(item.unit_price)}</p>
                        <span className="text-sm font-medium">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`${openSummary ? 'flex' : 'hidden md:flex'} flex-col gap-4 justify-between items-center w-full`}
              >
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Subtotal</p>
                  <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Tax</p>
                  <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(vatAmount)}</span>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Shipping</p>
                  <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(49000)}</span>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Discount</p>
                  <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(discountAmount)}</span>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Voucher</p>
                  <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                    {formatPrice(order.discount_amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Loyalty point</p>
                  <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                    {formatPrice(order.loyalty_points_used * 1000)}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="flex justify-between items-center gap-4 w-full">
                  <p className="font-bold text-xl">Total</p>
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-bold text-xl">{formatPrice(order.total_amount)}</span>
                    <IoIosArrowDown
                      size={16}
                      className={`${openSummary ? 'rotate-180' : ''} duration-300 transition-all text-black/40 md:hidden cursor-pointer`}
                      onClick={() => setOpenSummary((prev) => !prev)}
                      title="Detail Summary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
