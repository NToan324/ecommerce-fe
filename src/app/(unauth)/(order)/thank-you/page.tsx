'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utils/helpers'

export default function page() {
  const [openSummary, setOpenSummary] = useState(false)
  const route = useRouter()

  return (
    <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden bg-white p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-4xl text-center font-bold bg-gradient-to-r leading-14 bg-clip-text text-transparent from-violet-primary to-blue-light">
          A Great Big Thank You!
        </h1>
        <p className="font-medium text-sm text-black/50 text-center leading-7 md:max-w-[600px] line-clamp-3 md:line-clamp-6">
          We sent an email to <span className="font-bold text-blue-primary">example@gmail.com</span> with your order
          confirmation and receipt. If the email hasn’t arrived within two mins, please check your spam folder to see if
          the email was routed there.
        </p>
        <Button
          className="rounded-4xl max-w-[150px] px-1 py-4 bg-violet-primary w-full h-6 hover:bg-violet-primary/90"
          onClick={() => route.push('/')}
        >
          Back to Home
        </Button>
      </div>
      <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row">
        {/* Personal Information */}
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <div className="flex justify-start items-center gap-4 w-full">
            <p className="text-[clamp(0.75rem,2vw,1.125rem)]">Order Id</p>
            <span className="text-[clamp(0.75rem,2vw,1.125rem)] font-bold">thanhbinhcutie</span>
          </div>
          <div className="flex justify-start items-center gap-4 w-full">
            <p className="text-[clamp(0.75rem,2vw,1.125rem)]">Date</p>
            <span className="text-[clamp(0.75rem,2vw,1.125rem)] font-bold">Sep 10, 2025</span>
          </div>
          <div className="p-[2px] md:shadow-2xl md:bg-gradient-to-br shadow-blue-primary/50 from-blue-gray to-blue-primary via-blue-primary w-full rounded-2xl max-w-[650px]">
            <div className="flex flex-col gap-4 justify-start items-start p-6 md:p-4 bg-white rounded-[14px] w-full">
              <p className="text-[clamp(0.75rem,2vw,1.125rem)] font-bold">Personal Information</p>
              <div className="flex flex-col gap-3">
                <p className="text-[clamp(0.75rem,2vw,1.125rem)]">Thanh Binh</p>
                <p className="text-[clamp(0.75rem,2vw,1.125rem)] md:max-w-[200px] w-full">
                  19 Nguyen Huu Tho Tan Hung Ward, Ho Chi Minh City
                </p>
              </div>
            </div>
          </div>
          {/* Payment method */}
          <div className="p-[2px] bg-gradient-to-br to-blue-primary via-blue-primary/90 w-full rounded-2xl ">
            <div className="flex flex-col gap-4 justify-start items-start p-6 md:p-4 bg-white rounded-[14px] w-full">
              <p className="text-[clamp(0.75rem,2vw,1.125rem)] font-bold">Payment method</p>
              <div className="flex justify-start items-center gap-3">
                <div className="relative w-9 h-9 overflow-hidden">
                  <Image src={'/images/zalopay.webp'} alt="ZaloPay" fill className="object-contain" />
                </div>
                <p className="text-[clamp(0.75rem,2vw,1.125rem)]">Zalo Pay</p>
              </div>
            </div>
          </div>
          {/* Reward Point */}
          <div className="p-[2px] bg-gradient-to-br to-blue-primary via-blue-primary/90 w-full rounded-2xl ">
            <div className="flex flex-col gap-4 justify-start items-start p-6 md:p-4 bg-white rounded-[14px] w-full">
              <p className="text-[clamp(0.75rem,2vw,1.125rem)] font-bold">Reward Point</p>
              <div className="flex justify-start items-center gap-3">
                <div className="relative w-9 h-9 overflow-hidden">
                  <Image src={'/images/gift.png'} alt="Gift" fill className="object-contain" />
                </div>
                <p className="text-[clamp(0.75rem,2vw,1.125rem)]">
                  You’ve got <span className="font-bold text-orange-foreground">100</span> points for your next order!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="p-1 md:shadow-2xl md:bg-gradient-to-br shadow-blue-primary/50 from-white to-blue-primary via-white w-full rounded-2xl max-w-[400px]">
          <div className="relative overflow-hidden flex flex-col gap-6 justify-between items-center p-0 md:p-9 bg-transparent md:bg-gradient-to-b from-white to-blue-secondary/20 rounded-none md:rounded-xl w-full">
            <h2 className="md:block hidden font-bold text-[clamp(1.25rem,2vw,1.5rem)] text-blue-tertiary w-full text-start">
              Order summary
            </h2>
            <div className="flex flex-col justify-start items-start gap-6 w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="flex justify-start items-center w-full gap-4 border-b border-blue-primary/90 pb-4"
                  key={index}
                >
                  <div className="relative w-[100px] h-[100px] bg-gradient-to-br from-blue-secondary to-white rounded-2xl">
                    <Image src={'/images/laptop.png'} alt="Laptop" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">Laptop Lenovo Idea Slim 5</h3>
                    <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]">16GB RAM, 512GB SSD</p>
                    <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]">Silver</p>
                    <p className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">{formatPrice(15960000)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`${openSummary ? 'flex' : 'hidden md:flex'} flex-col gap-4 justify-between items-center w-full`}
            >
              <div className="flex justify-between items-center gap-4 w-full">
                <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Subtotal</p>
                <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">1.596.000 VND</span>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Tax</p>
                <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">1.596.000 VND</span>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Shipping</p>
                <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">1.596.000 VND</span>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Discount</p>
                <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">1.596.000 VND</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
              <div className="flex justify-between items-center gap-4 w-full">
                <p className="font-bold text-xl">Total</p>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold text-xl">1.596.000 VND</span>
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
  )
}
