'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoIosArrowDown } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { formatPrice } from '@/utils/helpers'

export default function page() {
  const [openSummary, setOpenSummary] = useState(false)

  return (
    <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden p-7 lg:px-[120px] lg:py-20">
      <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
        Check out
      </h1>
      <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row">
        {/* Personal Information */}
        <div className="flex flex-col justify-start items-center gap-12 w-full">
          <div className="flex justify-between items-center gap-6 w-full md:flex-row flex-col">
            <div className="relative w-full md:w-1/2">
              <FloatingInput id="floating-customize" className="h-12 rounded-[20px]" />
              <FloatingLabel htmlFor="floating-customize">Name</FloatingLabel>
            </div>
            <div className="relative w-full md:w-1/2">
              <FloatingInput type="email" id="floating-customize" className="h-12 rounded-[20px]" />
              <FloatingLabel htmlFor="floating-customize">Email</FloatingLabel>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-4">
            <div className="w-full flex justify-between items-center gap-4">
              <div className="flex justify-start items-center gap-4">
                <IoLocationOutline size={24} className="text-black/40" />
                <p className="text-lg font-medium line-clamp-1">
                  19 Nguyen Huu Tho, Tan Hung Ward, District 7, Ho Chi Minh City
                </p>
              </div>
              <Button
                variant={'ghost'}
                className="text-violet-primary/50 text-lg font-medium hover:bg-transparent duration-500 transition-colors"
              >
                Change Address
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-6 md:overflow-hidden overflow-auto md:flex-wrap">
            <div className="border border-blue-primary/90 rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] md:h-[80px]">
              <span className="font-bold text-lg">COD</span>
              <div className="relative w-[60px] h-[60px] overflow-hidden">
                <Image src={'/images/cod.png'} alt="COD" fill className="object-contain" />
              </div>
            </div>
            <div className="border border-blue-primary/90 rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]">
              <span className="font-bold text-lg">Momo</span>
              <div className="relative w-[60px] h-[60px] overflow-hidden">
                <Image src={'/images/momo.webp'} alt="MoMo" fill className="object-contain" />
              </div>
            </div>
            <div className="border border-blue-primary/90 rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]">
              <span className="font-bold text-lg">ZaloPay</span>
              <div className="relative w-[60px] h-[60px] overflow-hidden">
                <Image src={'/images/zalopay.webp'} alt="Zalo Pay" fill className="object-contain" />
              </div>
            </div>
            <div className="border border-blue-primary/90 rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]">
              <span className="font-bold text-lg">VNPay</span>
              <div className="relative w-[60px] h-[60px] overflow-hidden">
                <Image src={'/images/vnpay.jpg'} alt="VN Pay" fill className="object-contain" />
              </div>
            </div>
          </div>
          <Button className="rounded-4xl bg-violet-primary w-full h-14 hover:bg-violet-primary/90 ">
            Confirm My Order
          </Button>
        </div>
        {/* Payment Summary */}
        <div className="relative overflow-hidden flex flex-col gap-6 justify-between items-center p-0 md:p-9 bg-transparent md:bg-gradient-to-b from-white to-blue-secondary/20 rounded-none md:rounded-2xl w-full">
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
            <Button className="rounded-4xl bg-violet-primary w-full h-14 hover:bg-violet-primary/90">
              Process to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
