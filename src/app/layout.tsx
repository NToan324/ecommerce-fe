import type { Metadata } from 'next'

import './globals.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Provider } from '@/providers/provider'

export const metadata: Metadata = {
  title: 'COMPX',
  description: 'Your one-stop solution for tech essentials',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
