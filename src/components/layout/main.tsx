'use client'

import React, { useEffect } from 'react'
import { ScrollProgress, ScrollProgressProvider } from '@components/animate-ui/primitives/animate/index'
import Cookies from 'js-cookie'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import useUser from '@/hooks/useUser'
import { useAuthStore } from '@/stores/auth.store'
import { CommonLayoutProps } from '@/types/common.type'

export const MainLayout = ({ children }: CommonLayoutProps) => {
  const accessToken = Cookies.get('accessToken')
  const { data: profile, isSuccess } = useUser.getProfile(!!accessToken)
  const setUser = useAuthStore((state) => state.setUser)
  useEffect(() => {
    if (isSuccess && profile.data._id !== '') {
      setUser(profile.data)
    }
  }, [isSuccess, profile])

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
