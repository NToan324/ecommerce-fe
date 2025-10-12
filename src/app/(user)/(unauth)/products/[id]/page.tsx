'use client'

import React from 'react'
import { notFound, useParams } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import useProduct from '@/hooks/useProduct'
import ProductDetailsPage from '@/pages/product/productDetails'

export default function page() {
  const params = useParams()
  const {
    data: productVariant,
    isSuccess: isSuccessProductVariant,
    isPending: isPendingProductVariant,
  } = useProduct.getProductVariantById(params?.id as string)

  const {
    data: reviews,
    isSuccess: isSuccessReviews,
    isPending: isPendingReviews,
    isFetching: isFetchingReviews,
  } = useProduct.getReviewsProductVariant(params?.id as string, {
    limit: 10,
    page: 1,
  })

  if (isPendingProductVariant || isPendingReviews || isFetchingReviews) {
    return (
      <div className="w-full relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }

  if (
    !isSuccessProductVariant ||
    !productVariant.data ||
    !productVariant.data.productVariant ||
    !isSuccessReviews ||
    !reviews
  ) {
    return notFound()
  }

  return (
    <div>
      <ProductDetailsPage product={productVariant.data} reviews={reviews.data} />
    </div>
  )
}
