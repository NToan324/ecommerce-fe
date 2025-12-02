'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { IoIosArrowDown } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getTrackingDescription } from '@/features/order/orderTracking'
import { Order } from '@/types/order.type'
import { formatFirstLetterUppercase, formatPrice } from '@/utils/helpers'

interface DialogOrderDetailsProps {
  order: Order
  open: boolean
  setOpen: (open: boolean) => void
}

export default function DialogOrderDetails({ order, open, setOpen }: DialogOrderDetailsProps) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="rounded-xl px-5 py-2 text-sm font-semibold text-blue-secondary border-blue-secondary"
          onClick={() => setOpen(true)}
        >
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-[1050px] max-h-[90vh] overflow-y-auto p-0 border-none rounded-2xl">
        <DialogHeader className="px-7 pt-4 pb-2">
          <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row p-8">
          <div className="flex flex-col justify-between items-start gap-8 rounded-2xl bg-gradient-to-b from-blue-gray/50 to-blue-primary/10 p-9">
            {order.order_tracking.map((item, index) => (
              <div key={item._id} className="flex justify-start items-start gap-6 h-full w-full">
                {/* DATE COLUMN */}
                <div className="flex flex-col justify-start items-start gap-4">
                  <p className="w-[100px] text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50 min-h-[100px]">
                    {format(new Date(item.updated_at), 'MMMM dd, yyyy')}
                  </p>
                </div>

                {/* LINE COLUMN */}
                <div className="flex flex-col justify-start items-center">
                  {/* cục tròn */}
                  <span
                    className={`block w-5 h-5 rounded-full border-[6px] 
                 ${index === 0 ? 'border-blue-secondary' : 'border-blue-secondary/50'}`}
                  ></span>

                  {/* vertical line giữa các node */}
                  {<span className="block h-[90px] w-px bg-blue-secondary mt-1"></span>}

                  {/* nhỏ nhỏ dưới */}
                  <span className="block h-px w-4 bg-blue-secondary mt-1"></span>
                  <span className="block h-px w-4 bg-blue-secondary mt-1"></span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-start items-start gap-2 min-h-[100px]">
                  <p className="font-bold text-[clamp(0.875rem,2vw,1.125rem)]">
                    {formatFirstLetterUppercase(item.status)}
                  </p>
                  <p className="text-[clamp(0.875rem,2vw,1.125rem)] font-medium text-black/50">
                    {getTrackingDescription(item.status)}
                  </p>
                </div>
              </div>
            ))}
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
                      <div className="relative w-[100px] min-h-[100px] shrink-0 bg-gradient-to-br from-blue-secondary to-white rounded-2xl">
                        <Image src={item.images.url} alt="Laptop" fill className="object-contain" />
                      </div>
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <h3 className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">{item.product_variant_name}</h3>
                        <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]"></p>
                        <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]">Silver</p>
                        <div className="flex justify-between items-center gap-2 w-full">
                          <p className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">
                            {formatPrice(item.unit_price)}
                          </p>
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
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                      {discountAmount > 0 ? formatPrice(-discountAmount) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Voucher</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                      {order.discount_amount > 0 ? formatPrice(-order.discount_amount) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Loyalty point</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                      {formatPrice(order.loyalty_points_used * 1000)}
                    </span>
                  </div>
                  <div className="flex justify-start w-full gap-1 italic text-[clamp(0.875rem,2vw,1.125rem)]">
                    You’ve redeemed
                    <span className="font-semibold text-blue-secondary">
                      {order.loyalty_points_used.toLocaleString('vi-VN')}
                    </span>
                    loyalty points.
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
      </DialogContent>
    </Dialog>
  )
}
