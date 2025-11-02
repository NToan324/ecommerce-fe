'use client'

import React, { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
// import { useQueryClient } from '@tanstack/react-query'
import Lottie from 'lottie-react'

import ProductDetailsPage from '@/features/product/productDetails'
import useProduct from '@/hooks/useProduct'

export default function page() {
  // const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()
  const {
    data: productVariant,
    isSuccess: isSuccessProductVariant,
    isPending: isPendingProductVariant,
  } = useProduct.getProductVariantById(params?.id as string)

  useEffect(() => {
    if (!isPendingProductVariant) {
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
    }
  }, [isPendingProductVariant])

  if (isPendingProductVariant || isLoading) {
    return (
      <div className="w-full relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }

  if (!isSuccessProductVariant || !productVariant.data || !productVariant.data.productVariant) {
    return notFound()
  }

  return (
    <div>
      <ProductDetailsPage product={productVariant.data} />
    </div>
  )
}
