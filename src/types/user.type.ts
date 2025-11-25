export interface UserPagination {
  total: number
  page: number
  limit: number
  totalPages: number
  users: Profile[]
}

export interface Profile {
  _id: string
  email: string
  fullName: string
  address: string[]
  avatar: Avatar
  loyalty_points: number
  created_at: string
  updatedAt: string
  phone?: string
}

export interface UpdateProfile {
  fullName?: string
  address?: string[]
  phone?: string
  avatar?: Avatar
  isActive?: boolean
}

export interface Avatar {
  url: string
  public_id?: string
}
