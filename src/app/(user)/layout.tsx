import type { Metadata } from 'next'

import '@/app/globals.css'

import { MainLayout } from '@/components/layout'
import { Provider } from '@/providers/provider'
import { CommonLayoutProps } from '@/types/common.type'

export const metadata: Metadata = {
  title: 'COMPX',
  description: 'Your one-stop solution for tech essentials',
}

export default function RootLayout({ children }: CommonLayoutProps) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider>
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  )
}
