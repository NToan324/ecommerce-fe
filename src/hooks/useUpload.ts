import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IHttpErrorResponseDto } from '@/http/types/http.response'
import uploadService from '@/services/upload.service'

class UseUpload {
  uploadImage = () => {
    return useMutation({
      mutationKey: ['uploadImage'],
      mutationFn: (file: FormData) => uploadService.uploadImage(file),
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred while uploading image. Please try again.')
        }
      },
    })
  }

  uploadMultipleImages = () => {
    return useMutation({
      mutationKey: ['uploadMultipleImages'],
      mutationFn: (files: File[]) => uploadService.uploadMultipleImages(files),
      onError: (error: IHttpErrorResponseDto) => {
        if (error.error.message) {
          toast.error(`${error.error.message}`)
        } else {
          toast.error('Error occurred while uploading image. Please try again.')
        }
      },
    })
  }
}

const useUpload = new UseUpload()
export default useUpload
