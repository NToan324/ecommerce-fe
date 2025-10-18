import { toastError, toastSuccess } from '@components/toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import userService from '@/services/user.service'
import { UpdateProfile } from '@/types/user.type'

interface UserProps {
  onClose: () => void
}

class UseUser {
  getProfile = () => {
    return useQuery({
      queryKey: ['profile'],
      queryFn: () => userService.getProfile(),
    })
  }

  updateProfile = (props: UserProps) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['updateProfile'],
      mutationFn: (payload: Partial<UpdateProfile>) => userService.updateProfile(payload),
      onSuccess: (response) => {
        if (response.data) {
          toastSuccess('Profile updated successfully!')
          queryClient.invalidateQueries({
            queryKey: ['profile'],
          })
        } else {
          toastError('Update profile failed. Please try again.')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toastError(`${error.error.message}`)
        } else {
          toastError('Error occurred during updating profile. Please try again.')
        }
        props.onClose()
      },
    })
  }
}
const useUser = new UseUser()
export default useUser
