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
