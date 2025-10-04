import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

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
      mutationFn: (payload: UpdateProfile) => userService.updateProfile(payload),
      onSuccess: (response) => {
        if (response.data) {
          toast.success('Profile updated successfully!')
          queryClient.invalidateQueries({
            queryKey: ['profile'],
          })
        } else {
          toast.error('Update profile failed. Please try again.')
        }
        props.onClose()
      },
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred during updating profile. Please try again.')
        }
        props.onClose()
      },
    })
  }
}
const useUser = new UseUser()
export default useUser
