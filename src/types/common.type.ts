import React from 'react'

import { INTERVAL } from '@/constant'

export interface CommonLayoutProps {
  children: React.ReactNode
}

export interface Image {
  url: string
  public_id?: string
}

export interface avatarPreviewType {
  src: string
  name: string
  size: number
  file?: File
}

export interface SearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  name?: string
  category_ids?: string[]
  brand_ids?: string[]
  min_price?: number
  max_price?: number
  ratings?: number
  sort_price?: 'asc' | 'desc'
  sort_name?: 'asc' | 'desc'
  from_date?: string | Date
  to_date?: string | Date
  interval?: INTERVAL
}
