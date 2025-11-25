import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { Category, CategoryPagination, CreateCategory, UpdateCategory } from '@/types/category.type'
import { Image, SearchParams } from '@/types/common.type'

class CategoryService {
  createCategory = async (payload: CreateCategory) => {
    const response = await axios.post<ApiResponse<Category>>('/category', payload)
    return response.data
  }

  getAllCategories = async (params: Partial<SearchParams>) => {
    const response = await axios.get<ApiResponse<CategoryPagination>>('/category/admin', { params })
    return response.data
  }

  getAllCategoriesByUser = async () => {
    const response = await axios.get<ApiResponse<CategoryPagination>>('/category')
    return response.data
  }

  updateCategory = async (categoryId: string, payload: Partial<UpdateCategory>) => {
    const response = await axios.put<ApiResponse<Category>>(`/category/${categoryId}`, payload)
    return response.data
  }

  deleteCategory = async (categoryId: string) => {
    const response = await axios.delete<ApiResponse<null>>(`/category/${categoryId}`)
    return response.data
  }

  uploadCategoryImage = async (file: FormData) => {
    const response = await axios.post<ApiResponse<Image>>('/category/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

const categoryService = new CategoryService()
export default categoryService
