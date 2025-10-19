import { httpClient as axios } from '@/http/index'
import { ApiResponse } from '@/http/types/http.response'
import { Coupon, CouponPagination, CreateCoupon } from '@/types/coupon.type'

class CouponService {
  createCoupon = async (payload: Partial<CreateCoupon>) => {
    const response = await axios.post<ApiResponse<Coupon>>('/coupon', payload)
    return response.data
  }

  getAllCoupons = async () => {
    const response = await axios.get<ApiResponse<CouponPagination>>('/coupon')
    return response.data
  }

  updateCoupon = async (code: string, payload: Partial<CreateCoupon>) => {
    const response = await axios.put<ApiResponse<Coupon>>(`/coupon/${code}`, payload)
    return response.data
  }

  getCouponByCode = async (code: string) => {
    const response = await axios.get<ApiResponse<Coupon>>(`/coupon/${code}`)
    return response.data
  }
}

const couponService = new CouponService()
export default couponService
