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
      <div className="border-blue-primary/70 flex h-[80px] bg-white items-center justify-between gap-12 border-b px-7 py-4 lg:px-[120px]">
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
          <div className="md:hidden flex flex-col gap-4 border-t border-blue-primary/70 pt-4 w-full">
            <Link href="/profile" className="w-full" onClick={() => setOpen(false)}>
              Profile
            </Link>
            <Link href="/orders" className="w-full" onClick={() => setOpen(false)}>
              Orders
            </Link>
            <Link href="/settings" className="w-full" onClick={() => setOpen(false)}>
              Settings
            </Link>
            <Link href="/logout" className="w-full" onClick={() => setOpen(false)}>
              Logout
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 md:gap-10">
          <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <FiShoppingCart strokeWidth={1.2} className="text-3xl md:text-[40px]" />
            <span className="absolute top-0 -right-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#738FBD] text-center text-[8px] font-medium text-black md:h-[18px] md:w-[18px] md:text-xs">
              2
            </span>
          </div>
          <div className="group relative">
            <div className="relative h-[36px] w-[36px] overflow-hidden rounded-full md:h-[45px] md:w-[45px] cursor-pointer">
              <Image
                src="https://avatar.iran.liara.run/public"
                alt="avatar"
                width={45}
                height={45}
                className="object-cover"
              />
            </div>
            <div className="md:flex hidden opacity-100 scale-0 group-hover:scale-100 origin-top-right group-hover:opacity-100 transition-all duration-300 absolute z-[9999] -left-[165px] -bottom-[170px] w-[200px] rounded-2xl shadow-2xl shadow-blue-primary bg-gradient-to-bl from-blue-primary to-white via-blue-primary flex-col justify-start items-start gap-4 p-4">
              <Link href="/profile" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Profile</p>
              </Link>
              <Link href="/orders" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Orders</p>
              </Link>
              <Link href="/settings" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Settings</p>
              </Link>
              <Link href="/logout" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Logout</p>
              </Link>
            </div>
          </div>
          <HiOutlineMenuAlt4 size={30} className="cursor-pointer md:hidden" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </header>
  )
}
