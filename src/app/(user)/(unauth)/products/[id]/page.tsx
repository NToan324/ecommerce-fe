'use client'

import React from 'react'
import { notFound, useParams } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
// import { useQueryClient } from '@tanstack/react-query'
import Lottie from 'lottie-react'

import useProduct from '@/hooks/useProduct'
import ProductDetailsPage from '@/page/product/productDetails'

export default function page() {
  // const queryClient = useQueryClient()
  const params = useParams()
  const {
    data: productVariant,
    isSuccess: isSuccessProductVariant,
    isPending: isPendingProductVariant,
  } = useProduct.getProductVariantById(params?.id as string)

  // const handleAddReview = () => {
  //   queryClient.invalidateQueries({
  //     queryKey: ['getReviewsProductVariant', params?.id, { limit: 10, page: 1 }],
  //   })
  // }

  if (isPendingProductVariant) {
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
