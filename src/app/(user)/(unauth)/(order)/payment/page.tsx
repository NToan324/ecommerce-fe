'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from 'react-icons/io'

import { formatPrice } from '@/utils/helpers'

export default function page() {
  const [openSummary, setOpenSummary] = useState(false)
  const route = useRouter()

  return (
    <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden bg-white p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
        Payment
      </h1>
      <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row">
        {/* Personal Information */}
        <div className="flex flex-col justify-start items-center gap-12 w-full">
          <div
            className="relative w-[200px] h-[200px] md:w-[450px] md:h-[450px]"
            onClick={() => route.push('/thank-you')}
          >
            <Image src={'/images/qr-code.png'} alt="QR Code" fill objectFit="contain" />
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
