'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import useBrand from '@/hooks/useBrand'
import useCategory from '@/hooks/useCategory'
import useProduct from '@/hooks/useProduct'
import ProductPage from '@/pages/product/product'

export default function page() {
  const { data: brands, isSuccess: isSuccessBrands, isPending: isPendingBrands } = useBrand.getAllBrandsByUser()
  const {
    data: categories,
    isSuccess: isSuccessCategories,
    isPending: isPendingCategories,
  } = useCategory.getAllCategoriesByUser()
  const {
    data: products,
    isSuccess: isSuccessProducts,
    isPending: isPendingProducts,
  } = useProduct.getProductVariantsByUser()

  if (isPendingBrands || isPendingCategories || isPendingProducts) {
    return (
      <div className="w-full relative flex justify-center flex-col items-center col-span-2 lg:col-span-3 h-screen">
        <Lottie animationData={ShoppingCardLoader} loop={true} />
      </div>
    )
  }

  if (!isSuccessBrands || !brands || !isSuccessCategories || !categories || !isSuccessProducts || !products) {
    return notFound()
  }

  return (
    <div>
      <ProductPage products={products.data.data} categories={categories.data.categories} brands={brands.data.brands} />
    </div>
  )
}
