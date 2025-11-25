'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CiDiscount1 } from 'react-icons/ci'
import { FiPackage } from 'react-icons/fi'
import { HiOutlineInbox } from 'react-icons/hi2'
import { LuLayoutDashboard, LuLogOut, LuUserRoundCog } from 'react-icons/lu'
import { PiLaptop } from 'react-icons/pi'
import { TbBrandAmigo } from 'react-icons/tb'

import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'

export default function Sidebar() {
  const router = useRouter()
  const location = usePathname()

  const [activeItem, setActiveItem] = useState<string | null>(null)
  const menuItems = [
    { href: '/admin/dashboard', icon: <LuLayoutDashboard size={35} strokeWidth={1.5} />, title: 'Dashboard' },
    { href: '/admin/products?page=1&limit=10', icon: <PiLaptop size={35} />, title: 'Products' },
    { href: '/admin/brands?page=1&limit=10', icon: <TbBrandAmigo size={35} strokeWidth={1.5} />, title: 'Brands' },
    { href: '/admin/categories?page=1&limit=10', icon: <HiOutlineInbox size={35} />, title: 'Categories' },
    { href: '/admin/users?page=1&limit=10', icon: <LuUserRoundCog size={35} strokeWidth={1.5} />, title: 'Users' },
    { href: '/admin/orders?page=1&limit=10', icon: <FiPackage size={35} strokeWidth={1.5} />, title: 'Orders' },
    { href: '/admin/coupons?page=1&limit=10', icon: <CiDiscount1 size={35} strokeWidth={0.5} />, title: 'Coupons' },
  ]

  useEffect(() => {
    if (location === '/admin') {
      setActiveItem('/admin/dashboard')
      return
    }
    setActiveItem(location)
  }, [location])

  const logout = useAuthStore((state) => state.logout)
  const clearCart = useCartStore((state) => state.clearCart)

  const handleLogout = async () => {
    logout()
    clearCart()
    router.push('/signin')
  }

  return (
    <div className="w-full fixed max-w-[100px] h-screen flex flex-col justify-between items-center py-10 border-r border-black/25">
      {/* menu list */}
      <div className="flex flex-col justify-center items-center gap-14">
        {menuItems.map((item) => {
          const isActive = item.href.includes(activeItem!)
          return (
            <div
              key={item.href}
              className={`${isActive ? 'text-black' : 'text-black/30 hover:text-black'} cursor-pointer transition-all duration-500`}
              onClick={() => {
                setActiveItem(item.href)
                router.push(item.href)
              }}
            >
              {item.icon}
            </div>
          )
        })}
      </div>

      {/* Logout */}
      <div
        className="text-black/30 hover:text-red-600 cursor-pointer transition-all duration-500"
        onClick={handleLogout}
      >
        <LuLogOut size={35} strokeWidth={1.5} />
      </div>
    </div>
  )
}
