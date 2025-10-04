import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { ChangePassword, Signin, Signup } from '@/types/auth.type'

class UseAuth {
  signin = () => {
    const router = useRouter()
    const authStore = useAuthStore()
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: (payload: Signin) => authService.signin(payload),
      onSuccess: (response) => {
        if (response.data) {
          authStore.setAcessToken(response.data.accessToken)
          authStore.setRefreshToken(response.data.accessToken)
          authStore.storeAccessTokenCookie?.(response.data.accessToken)
          toast.success('Signin successful!')
          router.push('/')
          queryClient.invalidateQueries({ queryKey: ['profile'] })
        } else {
          toast.error('Signin failed! Please try again.')
        }
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred during signin. Please try again.')
        }
      },
    })
  }

  signup = () => {
    const router = useRouter()
    return useMutation({
      mutationKey: ['signup'],
      mutationFn: (payload: Signup) => authService.signup(payload),
      onSuccess: (response) => {
        if (response.data) {
          toast.success('Signup successful! Please log in.')
          router.push('/signin')
        } else {
          toast.error('Signup failed! Please try again.')
        }
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred during signup. Please try again.')
        }
      },
    })
  }

  changePassword = () => {
    return useMutation({
      mutationKey: ['changePassword'],
      mutationFn: (payload: ChangePassword) => authService.changePassword(payload),
      onSuccess: (response) => {
        if (response.data !== null) {
          toast.success('Change password successful!')
        } else {
          toast.error('Change password failed! Please try again.')
        }
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred during changing password. Please try again.')
        }
      },
    })
  }
}

const useAuth = new UseAuth()
export default useAuth
