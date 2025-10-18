// import { JwtPayload, jwtDecode } from 'jwt-decode'
import type { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import axiosBuilder from '@/http/axios-builder'
import type { IHttpResponseDto } from '@/http/types/http.response'

// const isRefreshToken = false

axiosBuilder
  .setBaseUrl(process.env.NEXT_PUBLIC_API_URL)
  .addInterceptor(async (config: any) => {
    const token = Cookies.get('accessToken') || ''
    config.params = {
      ...config.params,
    }
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
  .setResponseInterceptor(async (response: AxiosResponse<IHttpResponseDto<unknown>, unknown>) => {
    if (response.status === 200) {
      return response
    }
    return response
  })
  .setErrorInterceptor(async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // const refreshToken = Cookies.get('refreshToken')
      // if (!refreshToken) {
      //   throw error.response?.data || error
      // }
      // if (!isRefreshToken) {
      //   isRefreshToken = true
      //   try {
      //     const response = await authService.extendSessionLogin(refreshToken)
      //     if (response.accessToken && response.refreshToken) {
      //       Cookies.set('accessToken', response.accessToken, {
      //         expires: new Date(jwtDecode<{ exp: number }>(response.accessToken).exp * 1000),
      //         secure: true,
      //       })
      //       Cookies.set('refreshToken', response.refreshToken, {
      //         expires: new Date(jwtDecode<{ exp: number }>(response.refreshToken).exp * 1000),
      //         secure: true,
      //       })
      //     }
      //     toastSuccess('Phiên đăng nhập đã được gia hạn')
      //   } catch (error) {
      //     toastError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
      //     useAuthStore.getState().logout()
      //   } finally {
      //     isRefreshToken = false
      //     console.log('redirect to login')
      //   }
      // }
    }
    throw error.response?.data || error
  })
  .build()
export const httpClient = axiosBuilder
