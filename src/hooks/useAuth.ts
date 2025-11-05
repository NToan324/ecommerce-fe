import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'

import { toastError, toastSuccess } from '@/components/toastify'
import { USER_ROLE } from '@/constant'
import { IHttpErrorResponseDto } from '@/http/types/http.response'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { ChangePassword, ResetPassword, Signin, Signup, VerifyCode } from '@/types/auth.type'
import { useSyncUserData } from './useSyncUserData'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  const { syncUserData } = useSyncUserData()

  const signin = useMutation({
    mutationKey: ['signin'],
    mutationFn: (payload: Signin) => authService.signin(payload),
    onSuccess: async (response) => {
      if (response.data) {
        const accessToken = response.data.accessToken
        authStore.setAccessToken(accessToken)
        authStore.storeAccessTokenCookie?.(accessToken)
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        toastSuccess('Signin successful!')
        const role = jwtDecode<{ role: string }>(accessToken).role
        if (role === USER_ROLE.ADMIN) {
          router.push('/admin')
        } else {
          router.push('/')
        }
        await syncUserData()
      } else {
        toastError('Signin failed! Please try again.')
      }
    },
    onError: (error: IHttpErrorResponseDto) => {
      if (error.error.message) {
        toastError(`${error.error.message}`)
      } else {
        toastError('Error occurred during signin. Please try again.')
      }
    },
  })

  const signup = useMutation({
    mutationKey: ['signup'],
    mutationFn: (payload: Signup) => authService.signup(payload),
    onSuccess: (response) => {
      if (response.data) {
        toastSuccess('Signup successful! Please log in.')
        router.push('/signin')
      } else {
        toastError('Signup failed! Please try again.')
      }
    },
    onError: (error: IHttpErrorResponseDto) => {
      if (error.error.message) {
        toastError(`${error.error.message}`)
      } else {
        toastError('Error occurred during signup. Please try again.')
      }
    },
  })

  const changePassword = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (payload: ChangePassword) => authService.changePassword(payload),
    onSuccess: (response) => {
      if (response.data !== null) {
        toastSuccess('Change password successful!')
      } else {
        toastError('Change password failed! Please try again.')
      }
    },
    onError: (error: IHttpErrorResponseDto) => {
      if (error.error.message) {
        toastError(`${error.error.message}`)
      } else {
        toastError('Error occurred during changing password. Please try again.')
      }
    },
  })

  const forgotPassword = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (response) => {
      if (response.data.id !== null) {
        localStorage.setItem('forgotPasswordUserId', response.data.id)
        router.push(`/verify-code`)
        toastSuccess('OTP sent to your email address!')
      } else {
        toastError('Request failed! Please try again.')
      }
    },
    onError: (error: IHttpErrorResponseDto) => {
      if (error.error.message) {
        toastError(`${error.error.message}`)
      } else {
        toastError('Error occurred during the request. Please try again.')
      }
    },
  })

  const verifyOtp = useMutation({
    mutationKey: ['verifyOtp'],
    mutationFn: (payload: VerifyCode) => authService.verifyOtp(payload),
    onSuccess: (response) => {
      if (response.data !== null) {
        toastSuccess('Verification successful! You can now reset your password.')
        router.push('/reset-password')
      } else {
        toastError('Verification failed! Please try again.')
      }
    },
    onError: (error: IHttpErrorResponseDto) => {
      if (error.error.message) {
        toastError(`${error.error.message}`)
      } else {
        toastError('Error occurred during verification. Please try again.')
      }
    },
  })

  const resetPassword = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (payload: ResetPassword) => authService.resetPassword(payload),
    onSuccess: (response) => {
      if (response.data !== null) {
        toastSuccess('Password reset successful! Please log in with your new password.')
        router.push('/signin')
        localStorage.removeItem('forgotPasswordUserId')
      } else {
        toastError('Password reset failed! Please try again.')
      }
    },
    onError: (error: IHttpErrorResponseDto) => {
      if (error.error.message) {
        toastError(`${error.error.message}`)
      } else {
        toastError('Error occurred during password reset. Please try again.')
      }
    },
  })

  return { signin, signup, changePassword, forgotPassword, verifyOtp, resetPassword }
}
