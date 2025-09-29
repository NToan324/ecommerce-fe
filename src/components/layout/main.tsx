import React from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { CommonLayoutProps } from '@/types/common.type'

export const MainLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
