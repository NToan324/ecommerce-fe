import { httpClient as axios } from '@/http'
import { ApiResponse } from '@/http/types/http.response'
import { Image } from '@/types/common.type'

class UploadService {
  uploadImage = async (file: FormData) => {
    const response = await axios.post<ApiResponse<Image>>('/user/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  uploadMultipleImages = async (files: File[]) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    const response = await axios.post<ApiResponse<Image[]>>('/user/upload-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

const uploadService = new UploadService()
export default uploadService
