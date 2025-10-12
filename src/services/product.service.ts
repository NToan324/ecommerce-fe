import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { Image, SearchParams } from '@/types/common.type'
import {
  CreateProduct,
  CreateVariantProduct,
  Product,
  ProductPagination,
  ProductVariant,
  ProductVariantDetail,
  ProductVariantPagination,
  Review,
  ReviewPagination,
} from '@/types/product.type'

class ProductService {
  createProduct = async (payload: CreateProduct) => {
    const response = await axios.post<ApiResponse<CreateProduct>>('/product', payload)
    return response.data
  }

  createVariantProduct = async (payload: CreateVariantProduct) => {
    const response = await axios.post<ApiResponse<CreateVariantProduct>>('/product/variant', payload)
    return response.data
  }

  updateProductVariantById = async (id: string, payload: Partial<CreateVariantProduct>) => {
    const response = await axios.put<ApiResponse<CreateVariantProduct>>(`/product/variant/${id}`, payload)
    return response.data
  }

  getAllProducts = async () => {
    const response = await axios.get<ApiResponse<ProductPagination>>('/product')
    return response.data
  }

  getAllProductsByUser = async () => {
    const response = await axios.get<ApiResponse<ProductPagination>>('/product/search')
    return response.data
  }

  getProductVariantById = async (id: string) => {
    const response = await axios.get<ApiResponse<ProductVariantDetail>>(`/product/variant/${id}`)
    return response.data
  }

  getProductVariantsByUser = async () => {
    const response = await axios.get<ApiResponse<ProductVariantPagination>>(`/product/variant`)
    return response.data
  }

  getProductVariants = async (productId: string) => {
    const response = await axios.get<ApiResponse<ProductVariantPagination>>(`/product/${productId}/variants`)
    return response.data
  }

  deleteProduct = async (id: string) => {
    const response = await axios.delete<ApiResponse<null>>(`/product/${id}`)
    return response.data
  }

  updateProductById = async (id: string, payload: Partial<CreateProduct>) => {
    const response = await axios.put<ApiResponse<Product>>(`/product/${id}`, payload)
    return response.data
  }

  getReviewsProductVariant = async (id: string, searchParams: SearchParams) => {
    const { page = 1, limit = 10 } = searchParams
    const response = await axios.get<ApiResponse<ReviewPagination>>(
      `/product/variant/${id}/reviews?page=${page}&limit=${limit}`
    )
    return response.data
  }

  uploadProductImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post<ApiResponse<Image>>('/product/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

const productService = new ProductService()
export default productService
