import React from 'react'
import { ScrollProgress, ScrollProgressProvider } from '@components/animate-ui/primitives/animate/index'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { CommonLayoutProps } from '@/types/common.type'

export const MainLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div>
      <ScrollProgressProvider global>
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </ScrollProgressProvider>
    </div>
  )
}
