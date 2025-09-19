'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiShoppingCart } from 'react-icons/fi'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'

export default function Header() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <header>
      <div className="border-blue-primary/70 flex h-[80px] items-center justify-between gap-12 overflow-hidden border-b px-7 py-4 lg:px-[120px]">
        <h1 className="text-2xl font-bold">COMPX</h1>
        <div
          className={`${open === true ? 'translate-x-0' : 'translate-x-[224px]'} fixed top-0 right-0 z-50 flex h-full w-2/3 max-w-[200px] flex-col gap-4 bg-white p-8 text-base font-bold shadow-2xl duration-300 md:relative md:w-full md:max-w-[600px] md:translate-x-0 md:flex-row md:items-center md:justify-between md:bg-transparent md:p-0 md:text-sm md:shadow-none`}
        >
          <div
            className="bg-blue-secondary absolute -left-[24px] flex h-8 w-6 cursor-pointer items-center justify-center rounded-l-2xl md:hidden"
            onClick={() => setOpen(!open)}
          >
            <IoIosArrowForward className="rotate-180 text-white" />
          </div>
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/categories" onClick={() => setOpen(false)}>
            Categories
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About us
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
        <div className="flex items-center justify-between gap-8 md:gap-10">
          <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <FiShoppingCart strokeWidth={1.2} className="text-3xl md:text-[40px]" />
            <span className="absolute top-0 -right-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#738FBD] text-center text-[8px] font-medium text-black md:h-[18px] md:w-[18px] md:text-xs">
              2
            </span>
          </div>
          <div className="relative h-[36px] w-[36px] overflow-hidden rounded-full md:h-[45px] md:w-[45px]">
            <Image
              src="https://avatar.iran.liara.run/public"
              alt="avatar"
              width={45}
              height={45}
              className="object-cover"
            />
          </div>
          <HiOutlineMenuAlt4 size={30} className="cursor-pointer md:hidden" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </header>
  )
}
