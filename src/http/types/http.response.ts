export interface IHttpResponseDto<T> {
  success: number
  message: string
  data: T
}

export interface IHttpErrorResponseDto {
  success: number
  message: string
  errorCode: string
  timestamp: string
}

export interface DeleteByIdDTO {
  id: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  pagination?: Pagination
  timestamp: string
}

export interface SearchParams {
  type?: string
  page?: number
  limit?: number
  search?: string
  sort?: string[]
  status?: string
  dateFrom?: string
  dateTo?: string
}

export interface Pagination {
  page: number
  limit: number
  totalItems: number
  totalPages: number
}
