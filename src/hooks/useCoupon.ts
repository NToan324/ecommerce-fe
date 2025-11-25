import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toastError, toastSuccess } from '@/components/toastify'
import { IHttpErrorResponseDto } from '@/http/types/http.response'
import couponService from '@/services/coupon.service'
import { useCouponStore } from '@/stores/coupon.store'
import { CreateCoupon } from '@/types/coupon.type'
import { formatPrice } from '@/utils/helpers'

interface UseCouponProps {
  onClose: () => void
}

class UseCoupon {
  getAllCoupons = () => {
    const page = useCouponStore((state) => state.page)
    const limit = useCouponStore((state) => state.limit)
    const params = { page, limit }
    return useQuery({
      queryKey: ['coupons', params],

      queryFn: () => couponService.getAllCoupons(params),
    })
  }

  createCoupon = (props: UseCouponProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['createCoupon'],
      mutationFn: (payload: CreateCoupon) => couponService.createCoupon(payload),
      onSuccess: async (response) => {
        if (response.data) {
          toastSuccess('Coupon created successfully!')
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] })
          }, 800)
        } else {
          toastError('Error occurred while creating coupon. Please try again.')
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

  updateCoupon = (couponId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateCoupon'],
      mutationFn: (payload: Partial<CreateCoupon>) => couponService.updateCoupon(couponId, payload),
      onSuccess: async (response) => {
        if (response.data) {
          toastSuccess('Coupon updated successfully!')
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] })
          }, 800)
        } else {
          toastError('Error occurred while updating coupon. Please try again.')
        }
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

  deleteCoupon = (props: UseCouponProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['deleteCoupon'],
      mutationFn: (couponId: string) => couponService.deleteCoupon(couponId),
      onSuccess: async () => {
        toastSuccess('Coupon deleted successfully!')
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['coupons'] })
        }, 800)
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while deleting coupon. Please try again.')
        }
        props.onClose()
      },
    })
  }

  getCouponByCode = (props: UseCouponProps) => {
    return useMutation({
      mutationKey: ['coupon'],
      mutationFn: (code: string) => couponService.getCouponByCode(code),
      onSuccess: async (response) => {
        if (response.data.usage_limit === response.data.usage_count) {
          toastError(`Coupon has reached its usage limit.`)
        } else {
          toastSuccess(`Apply coupon ${formatPrice(response.data.discount_amount)} successfully`)
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred while fetching coupon. Please try again.')
        }
        props.onClose()
      },
    })
  }
}

const useCoupon = new UseCoupon()
export default useCoupon
