'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import ResetPassword from '@/features/auth/resetPassword'

export default function page() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem('forgotPasswordUserId') || ''
    setUserId(id)
  }, [])

  if (userId === null) {
    return (
      <div className="w-full relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }

  if (userId === '') {
    notFound()
  }

  return <ResetPassword userId={userId} />
}
