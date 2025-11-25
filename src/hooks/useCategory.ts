import { toastError, toastSuccess } from '@components/toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import categoryService from '@/services/category.service'
import { useCategoryStore } from '@/stores/category.store'
import { CreateCategory } from '@/types/category.type'

interface UseCategoryProps {
  onClose: () => void
}

class UseCategory {
  getAllCategories = () => {
    const name = useCategoryStore((state) => state.name)
    const page = useCategoryStore((state) => state.page)
    const limit = useCategoryStore((state) => state.limit)
    const params = { page, limit }
    return useQuery({
      queryKey: ['categories', params],
      queryFn: () => categoryService.getAllCategories(params),
    })
  }

  getAllCategoriesByUser = () => {
    return useQuery({
      queryKey: ['categoriesByUser'],
      queryFn: () => categoryService.getAllCategoriesByUser(),
    })
  }

  createCategory = (props: UseCategoryProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['createCategory'],
      mutationFn: (payload: CreateCategory) => categoryService.createCategory(payload),
      onSuccess: async (response) => {
        if (response.data) {
          toastSuccess('Category created successfully!')
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
          }, 800)
        } else {
          toastError('Error occurred while creating category. Please try again.')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while creating brand. Please try again.')
        }
        props.onClose()
      },
    })
  }

  deleteCategory = (props: UseCategoryProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['deleteCategory'],
      mutationFn: (categoryId: string) => categoryService.deleteCategory(categoryId),
      onSuccess: async () => {
        toastSuccess('Category deleted successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['categories'] })
        }, 800)
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while deleting category. Please try again.')
        }
        props.onClose()
      },
    })
  }

  updateCategory = (categoryId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateCategory', categoryId],
      mutationFn: (payload: Partial<CreateCategory>) => categoryService.updateCategory(categoryId, payload),
      onSuccess: () => {
        toastSuccess('Category updated successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['categories'] })
        }, 800)
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while updating category. Please try again.')
        }
      },
    })
  }
}
const useCategory = new UseCategory()
export default useCategory
