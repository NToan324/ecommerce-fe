'use client'

import React, { useEffect } from 'react'
import { ScrollProgress, ScrollProgressProvider } from '@components/animate-ui/primitives/animate/index'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import useUser from '@/hooks/useUser'
import { useAuthStore } from '@/stores/auth.store'
import { CommonLayoutProps } from '@/types/common.type'

export const MainLayout = ({ children }: CommonLayoutProps) => {
  const { data: profile, isSuccess, isFetching } = useUser.getProfile()
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    if (!isFetching) {
      if (isSuccess && profile?.data?._id) {
        setUser(profile.data)
      } else {
        setUser(null)
      }
    }
  }, [isFetching, isSuccess, profile])

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
