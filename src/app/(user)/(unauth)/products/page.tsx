'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import ShoppingCardLoader from '@public/lotties/Shopping Cart Loader.json'
import Lottie from 'lottie-react'

import ProductPage from '@/features/product/product'
import useBrand from '@/hooks/useBrand'
import useCategory from '@/hooks/useCategory'
import useProduct from '@/hooks/useProduct'
import { useProductVariantStore } from '@/stores/product.store'

function ProductPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pageParam = searchParams.get('page')
  const limitParam = searchParams.get('limit')
  const nameParam = searchParams.get('name')

  const page = useProductVariantStore((state) => state.page)
  const limit = useProductVariantStore((state) => state.limit)
  const setPage = useProductVariantStore((state) => state.setPage)
  const setLimit = useProductVariantStore((state) => state.setLimit)
  const setName = useProductVariantStore((state) => state.setName)

  const { data: brands, isSuccess: isSuccessBrands, isPending: isPendingBrands } = useBrand.getAllBrandsByUser()
  const [isLoading, setIsLoading] = useState(true)

  const {
    data: categories,
    isSuccess: isSuccessCategories,
    isPending: isPendingCategories,
  } = useCategory.getAllCategoriesByUser()

  const {
    data: products,
    isSuccess: isSuccessProducts,
    isPending: isPendingProducts,
    isFetching: isFetchingProducts,
  } = useProduct.getProductVariantsByUser()

  useEffect(() => {
    if (!isFetchingProducts) {
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
    }
  }, [isFetchingProducts])

  useEffect(() => {
    if (pageParam && limitParam) {
      setPage(Number(pageParam))
      setLimit(Number(limitParam))
    }
    if (nameParam) {
      setName(nameParam)
    } else {
      setName('')
    }
    if (!pageParam || !limitParam) {
      router.replace(`/products?page=${page}&limit=${limit}`)
    }
  }, [page, limit, pageParam, limitParam, setPage, setLimit, router, nameParam, setName])

  if (isPendingBrands || isPendingCategories || isPendingProducts || isLoading) {
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
      <ProductPage products={products.data} categories={categories.data.categories} brands={brands.data.brands} />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductPageContent />
    </Suspense>
  )
}
