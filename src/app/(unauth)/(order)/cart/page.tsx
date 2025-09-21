'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { HiOutlineTrash } from 'react-icons/hi2'
import { IoIosArrowDown } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/utils/helpers'

export default function page() {
  const [openSummary, setOpenSummary] = useState(false)
  const route = useRouter()

  return (
    <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
        Your Cart
      </h1>
      {/* Product List */}
      <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row">
        <div className="flex flex-col justify-start items-start gap-12 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex flex-col justify-start items-center gap-4 w-full max-w-[600px]" key={index}>
              <div className="flex justify-start items-center w-full gap-16 border-b border-blue-primary/90 pb-4">
                <div className="relative w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] bg-gradient-to-br from-blue-secondary to-white rounded-2xl">
                  <Image src={'/images/laptop.png'} alt="Laptop" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <h3 className="font-bold text-[clamp(1rem,2vw,1.5rem)]">Laptop Lenovo Idea Slim 5</h3>
                  <p className="font-medium text-[clamp(0.75rem,2vw,1rem)]">16GB RAM, 512GB SSD</p>
                  <p className="font-medium text-[clamp(0.75rem,2vw,1rem)]">Silver</p>
                  <p className="font-bold text-[clamp(1rem,2vw,1.5rem)]">{formatPrice(15960000)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex items-center justify-between gap-4">
                  <Button variant={'ghost'} className="hover:bg-transparent border border-blue-primary/90 w-9 h-9">
                    <FiMinus size={24} className="text-black" strokeWidth={3} />
                  </Button>
                  <span className="text-black text-[clamp(0.875rem,2vw,1.25rem)]">1</span>
                  <Button variant={'ghost'} className="hover:bg-transparent border border-blue-primary/90 w-9 h-9">
                    <GoPlus size={24} className="text-black" strokeWidth={1} />
                  </Button>
                </div>
                <Button variant={'ghost'} className="hover:bg-transparent border border-blue-primary/90 w-9 h-9">
                  <HiOutlineTrash size={24} className="text-black" strokeWidth={1} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="flex md:flex-col flex-col-reverse justify-start items-center gap-10 md:gap-4 w-full max-w-[400px]">
          <div className="relative overflow-hidden flex flex-col gap-6 justify-between items-center p-0 md:p-9 bg-transparent md:bg-gradient-to-b from-white to-blue-secondary/20 rounded-none md:rounded-2xl w-full">
            <h2 className="md:block hidden font-bold text-[clamp(1.25rem,2vw,1.5rem)] text-blue-tertiary w-full text-start">
              Order summary
            </h2>
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
              <Button
                className="rounded-4xl bg-violet-primary w-full h-14 hover:bg-violet-primary/90"
                onClick={() => route.push('/checkout')}
              >
                Process to Checkout
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6 justify-between items-center p-6 md:p-9 bg-gradient-to-b from-white to-blue-secondary/20 rounded-2xl w-full">
            <h2 className="font-bold text-[clamp(1rem,2vw,1.25rem)] text-blue-tertiary w-full text-start">
              Have a coupon?
            </h2>
            <div className="rounded-2xl border border-blue-primary p-2 flex justify-between items-center gap-4 w-full">
              <Input
                type="text"
                placeholder="Coupon code"
                className="border-none outline-none focus-visible:ring-0 shadow-none"
              />
              <Button
                variant={'ghost'}
                className="text-blue-secondary hover:bg-transparent duration-500 transition-colors"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
