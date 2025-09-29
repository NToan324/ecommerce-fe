import React from 'react'

import { CommonLayoutProps } from '@/types/common.type'
import Footer from '../Footer'
import Header from '../Header'

export const MainLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
