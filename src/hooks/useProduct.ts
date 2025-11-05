import { toastError, toastSuccess } from '@components/toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import productService from '@/services/product.service'
import { useProductVariantStore } from '@/stores/product.store'
import { useReviewStore } from '@/stores/review.store'
import { SearchParams } from '@/types/common.type'
import { CreateProduct, CreateVariantProduct } from '@/types/product.type'

interface UseProductProps {
  onClose: () => void
}

class UseProduct {
  getAllProducts = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: () => productService.getAllProducts(),
    })
  }

  getAllProductsByUser = () => {
    return useQuery({
      queryKey: ['productsByUser'],
      queryFn: () => productService.getAllProductsByUser(),
    })
  }

  getProductVariantsByUser = (enabled: boolean = true) => {
    const brand_ids = useProductVariantStore((state) => state.brand_ids)
    const category_ids = useProductVariantStore((state) => state.category_ids)
    const min_price = useProductVariantStore((state) => state.min_price)
    const max_price = useProductVariantStore((state) => state.max_price)
    const name = useProductVariantStore((state) => state.name)
    const sort_price = useProductVariantStore((state) => state.sort_price)
    const sort_name = useProductVariantStore((state) => state.sort_name)
    const page = useProductVariantStore((state) => state.page)
    const limit = useProductVariantStore((state) => state.limit)

    let params: Partial<SearchParams> = {}

    if (sort_price) {
      params.sort_price = sort_price
    }

    if (sort_name) {
      params.sort_name = sort_name
    }

    params = {
      ...params,
      brand_ids: brand_ids,
      category_ids: category_ids,
      min_price: min_price,
      max_price: max_price,
      name: name,
      page: page,
      limit: limit,
    }

    return useQuery({
      queryKey: ['productVariantsByUser', params],
      queryFn: () => productService.getProductVariantsByUser(params),
      enabled: enabled,
    })
  }

  getProductVariantById = (id: string) => {
    return useQuery({
      queryKey: ['productVariantById', id],
      queryFn: () => productService.getProductVariantById(id),
      enabled: !!id,
    })
  }

  checkProductVariantIdFromCart = () => {
    return useMutation({
      mutationKey: ['checkProductVariantId'],
      mutationFn: (productVariantId: string) => productService.getProductVariantById(productVariantId),
    })
  }

  getReviewsProductVariant = (id: string) => {
    const page = useReviewStore((state) => state.page)
    const limit = useReviewStore((state) => state.limit)
    const searchParams = { page, limit }
    return useQuery({
      queryKey: ['getReviewsProductVariant', id, searchParams],
      queryFn: () => productService.getReviewsProductVariant(id, searchParams),
      enabled: !!id,
    })
  }

  createProduct = (props: UseProductProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['createProduct'],
      mutationFn: (payload: CreateProduct) => productService.createProduct(payload),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Product created successfully')
          queryClient.invalidateQueries({ queryKey: ['products'] })
        } else {
          toastError(response.message || 'Failed to create product')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while creating product. Please try again.')
        }
        props.onClose()
      },
    })
  }

  createProductVariant = (props: UseProductProps) => {
    return useMutation({
      mutationKey: ['createProductVariant'],
      mutationFn: (payload: CreateVariantProduct) => productService.createVariantProduct(payload),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Product variant created successfully')
        } else {
          toastError(response.message || 'Failed to create product variant')
        }
        props.onClose
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while creating product variant. Please try again.')
        }
        props.onClose
      },
    })
  }

  updateProductById = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateProductById'],
      mutationFn: (data: { id: string; payload: Partial<CreateProduct> }) =>
        productService.updateProductById(data.id, data.payload),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Update product successfully')
          queryClient.invalidateQueries({ queryKey: ['products'] })
        } else {
          toastError(response.message || 'Failed to update product')
        }
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while creating product variant. Please try again.')
        }
      },
    })
  }

  updateProductVariantById = (props: UseProductProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateProductVariantById'],
      mutationFn: (data: { id: string; payload: Partial<CreateVariantProduct> }) =>
        productService.updateProductVariantById(data.id, data.payload),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Update product successfully')
          queryClient.invalidateQueries({ queryKey: ['getProductVariantsByProductId'] })
        } else {
          toastError(response.message || 'Failed to update product')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while creating product variant. Please try again.')
        }
        props.onClose()
      },
    })
  }

  getProductVariantsByProductId = (productId: string, enabled: boolean) => {
    return useQuery({
      queryKey: ['getProductVariantsByProductId', productId],
      queryFn: () => productService.getProductVariants(productId),
      enabled: !!productId && enabled,
    })
  }

  deleteProduct = (props: UseProductProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['deleteProduct'],
      mutationFn: (productId: string) => productService.deleteProduct(productId),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Product deleted successfully')
          queryClient.invalidateQueries({ queryKey: ['products'] })
        } else {
          toastError(response.message || 'Failed to delete product')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while deleting product. Please try again.')
        }
        props.onClose()
      },
    })
  }

  deleteProductVariant = (props: UseProductProps, productId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['deleteProductVariant'],
      mutationFn: (variantId: string) => productService.deleteProductVariantById(variantId),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Product variant deleted successfully')
          queryClient.invalidateQueries({ queryKey: ['getProductVariantsByProductId', productId] })
        } else {
          toastError(response.message || 'Failed to delete product variant')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while deleting product. Please try again.')
        }
        props.onClose()
      },
    })
  }
}

const useProduct = new UseProduct()
export default useProduct
