import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import categoryService from '@/services/category.service'
import { CreateCategory } from '@/types/category.type'

interface UseCategoryProps {
  onClose: () => void
}

class UseCategory {
  getAllCategories = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => categoryService.getAllCategories(),
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
          toast.success('Category created successfully!')
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
          }, 800)
        } else {
          toast.error('Error occurred while creating category. Please try again.')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred while creating brand. Please try again.')
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
        toast.success('Category deleted successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['categories'] })
        }, 800)
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred while deleting category. Please try again.')
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
        toast.success('Category updated successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['categories'] })
        }, 800)
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred while updating category. Please try again.')
        }
      },
    })
  }
}
const useCategory = new UseCategory()
export default useCategory
