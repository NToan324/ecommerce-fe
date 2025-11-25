import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { Brand, BrandPagination, CreateBrand, UpdateBrand } from '@/types/brand.type'
import { Image, SearchParams } from '@/types/common.type'
import { CreateProduct, CreateVariantProduct } from '@/types/product.type'

class BrandService {
  createBrand = async (payload: CreateBrand) => {
    const response = await axios.post<ApiResponse<Brand>>('/brand', payload)
    return response.data
  }

  getAllBrands = async (params: Partial<SearchParams>) => {
    const response = await axios.get<ApiResponse<BrandPagination>>('/brand/admin', { params })
    return response.data
  }

  getAllBrandsByUser = async () => {
    const response = await axios.get<ApiResponse<BrandPagination>>('/brand')
    return response.data
  }

  updateBrand = async (brandId: string, payload: Partial<UpdateBrand>) => {
    const response = await axios.put<ApiResponse<Brand>>(`/brand/${brandId}`, payload)
    return response.data
  }

  deleteBrand = async (brandId: string) => {
    const response = await axios.delete<ApiResponse<null>>(`/brand/${brandId}`)
    return response.data
  }

  uploadBrandImage = async (file: FormData) => {
    const response = await axios.post<ApiResponse<Image>>('/brand/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

const brandService = new BrandService()
export default brandService
