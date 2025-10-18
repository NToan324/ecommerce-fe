import { toastError, toastSuccess } from '@components/toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import brandService from '@/services/brand.service'
import { CreateBrand } from '@/types/brand.type'

interface UseBrandProps {
  onClose: () => void
}

class UseBrand {
  getAllBrands = () => {
    return useQuery({
      queryKey: ['brands'],
      queryFn: () => brandService.getAllBrands(),
    })
  }

  getAllBrandsByUser = () => {
    return useQuery({
      queryKey: ['brandsByUser'],
      queryFn: () => brandService.getAllBrandsByUser(),
    })
  }

  createBrand = (props: UseBrandProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['createBrand'],
      mutationFn: (payload: CreateBrand) => brandService.createBrand(payload),
      onSuccess: async (response) => {
        if (response.data) {
          toastSuccess('Brand created successfully!')
          queryClient.invalidateQueries({ queryKey: ['brands'] })
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

  deleteBrand = (props: UseBrandProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['deleteBrand'],
      mutationFn: (brandId: string) => brandService.deleteBrand(brandId),
      onSuccess: async () => {
        toastSuccess('Brand deleted successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['brands'] })
        }, 800)
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while deleting brand. Please try again.')
        }
        props.onClose()
      },
    })
  }

  updateBrand = (brandId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateBrand', brandId],
      mutationFn: (payload: Partial<CreateBrand>) => brandService.updateBrand(brandId, payload),
      onSuccess: () => {
        toastSuccess('Brand updated successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['brands'] })
        }, 800)
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while updating brand. Please try again.')
        }
      },
    })
  }
}
const useBrand = new UseBrand()
export default useBrand
