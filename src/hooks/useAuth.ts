import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toastError, toastSuccess } from '@/components/toastify'
import { IHttpErrorResponseDto } from '@/http/types/http.response'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { ChangePassword, Signin, Signup } from '@/types/auth.type'
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
        authStore.setAccessToken(response.data.accessToken)
        authStore.storeAccessTokenCookie?.(response.data.accessToken)
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        toastSuccess('Signin successful!')

        await syncUserData()
        router.push('/')
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

  return { signin, signup, changePassword }
}
