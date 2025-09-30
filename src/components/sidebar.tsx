'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CiDiscount1 } from 'react-icons/ci'
import { FiPackage } from 'react-icons/fi'
import { LuLayoutDashboard, LuUserRoundCog } from 'react-icons/lu'
import { PiLaptop } from 'react-icons/pi'

export default function Sidebar() {
  const router = useRouter()
  const location = usePathname()

  const [activeItem, setActiveItem] = useState<string | null>(null)
  const menuItems = [
    {
      href: '/admin/dashboard',
      icon: <LuLayoutDashboard size={35} strokeWidth={1.5} />,
      title: 'Dashboard',
    },
    {
      href: '/admin/products',
      icon: <PiLaptop size={35} />,
      title: 'Products',
    },
    {
      href: '/admin/users',
      icon: <LuUserRoundCog size={35} strokeWidth={1.5} />,
      title: 'Users',
    },
    {
      href: '/admin/orders',
      icon: <FiPackage size={35} strokeWidth={1.5} />,
      title: 'Orders',
    },
    {
      href: '/admin/coupons',
      icon: <CiDiscount1 size={35} strokeWidth={0.5} />,
      title: 'Coupons',
    },
  ]

  useEffect(() => {
    if (location === '/admin') {
      setActiveItem('/admin/dashboard')
      return
    }
    setActiveItem(location)
  }, [location])

  return (
    <div className="w-full fixed max-w-[100px] h-screen flex flex-col justify-center items-center gap-15 border-r border-black/25">
      {menuItems.map((item) => {
        const isActive = item.href === activeItem
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
  )
}
