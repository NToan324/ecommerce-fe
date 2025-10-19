'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toastSuccess } from '@components/toastify'
import { FiShoppingCart } from 'react-icons/fi'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'

import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'

export default function Header() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const cartQuantity = useCartStore((state) => state.cartQuantity)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    logout?.()
    router.push('/')
    toastSuccess('So sad to see you go! You have been logged out successfully.')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        if (window.scrollY > 80) {
          header.current.classList.add('lg:backdrop-blur-2xl')
        } else {
          header.current.classList.remove('lg:backdrop-blur-2xl')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <header className="sticky top-0 z-300">
      {Array.from({ length: 3 }).map((_, index) => {
        const delay = index * 100
        const opacity = index * 10 + 20
        return (
          <div
            key={index}
            onClick={() => setOpen(false)}
            className={`${open ? `bg-black/${opacity} translate-x-0` : 'bg-transparent -translate-x-[100%]'} delay-${delay} fixed h-screen w-full block transition-all duration-300 md:hidden z-40`}
          ></div>
        )
      })}
      <div
        className={`${open === true ? 'translate-x-0' : 'translate-x-[224px]'} md:hidden fixed top-0 right-0 z-50 flex h-full min-h-screen md:min-h-0 w-2/3 max-w-[200px] flex-col gap-4 bg-white p-8 text-base font-bold shadow-2xl duration-300 md:relative md:w-full md:max-w-[600px] md:translate-x-0 md:flex-row md:items-center md:justify-between md:bg-transparent md:p-0 md:text-sm md:shadow-none`}
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
        <Link href="/products" onClick={() => setOpen(false)}>
          Product
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
          {!user ? (
            <Link href={'/signin'} className="w-full" onClick={() => setOpen(false)}>
              Sign in
            </Link>
          ) : (
            <p
              className="w-full"
              onClick={() => {
                setOpen(false)
                handleLogout()
              }}
            >
              Logout
            </p>
          )}
        </div>
      </div>
      <div
        ref={header}
        className="border-blue-primary/70 flex h-[80px] backdrop-blur-2xl bg-white/30 items-center justify-between gap-12 border-b px-7 py-4 lg:px-[120px]"
      >
        <h1 className="text-2xl font-bold">COMPX</h1>
        <div className="justify-center items-center gap-8 md:gap-10 lg:gap-16 font-bold hidden md:flex">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/products" onClick={() => setOpen(false)}>
            Product
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
            <span className="absolute top-0 -right-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#738FBD] text-center text-[6px] font-medium text-white md:h-[18px] md:w-[18px] md:text-[10px]">
              {cartQuantity}
            </span>
          </div>
          <div className="group relative">
            <div className="relative h-[36px] w-[36px] overflow-hidden rounded-full md:h-[45px] md:w-[45px] cursor-pointer">
              <Image
                src={user?.avatar.url ? user.avatar.url : 'https://avatar.iran.liara.run/public'}
                alt="avatar"
                width={45}
                height={45}
                className="object-cover"
              />
            </div>
            <div className="md:flex hidden opacity-100 scale-0 group-hover:scale-100 origin-top-right group-hover:opacity-100 transition-all duration-300 absolute z-[50] -left-[165px] -bottom-[170px] w-[200px] rounded-2xl shadow-2xl shadow-blue-primary bg-gradient-to-bl from-blue-primary to-white via-blue-primary flex-col justify-start items-start gap-4 p-4">
              <Link href="/profile" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Profile</p>
              </Link>
              <Link href="/orders" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Orders</p>
              </Link>
              <Link href="/settings" className="w-full" onClick={() => setOpen(false)}>
                <p className="w-full text-sm font-semibold text-black/70 hover:underline">Settings</p>
              </Link>
              {!user || user === null ? (
                <Link href="/signin" className="w-full" onClick={() => setOpen(false)}>
                  <p className="w-full text-sm font-semibold text-black/70 hover:underline">Sign in</p>
                </Link>
              ) : (
                <p
                  className="w-full text-sm font-semibold text-black/70 hover:underline cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              )}
            </div>
          </div>
          <HiOutlineMenuAlt4 size={30} className="cursor-pointer md:hidden" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </header>
  )
}
