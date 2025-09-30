import React from 'react'

import Sidebar from '@/components/sidebar'
import { CommonLayoutProps } from '@/types/common.type'

export const AdminLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div className="flex w-full bg-gradient-to-b from-blue-sky via-blue-sky to-white">
      <Sidebar />
      <main className="w-full ml-[100px] p-16">{children}</main>
    </div>
  )
}
